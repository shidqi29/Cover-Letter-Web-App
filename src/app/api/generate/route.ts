import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function extractTextFromImage(imageBuffer: ArrayBuffer): Promise<string> {
  try {
    // Convert the image buffer to base64
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    
    // Use OpenAI's vision model to extract text from the image
    const response = await openai.chat.completions.create({
      model: "o4-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Please extract all text from this job posting image. Include company name, job title, requirements, and any other relevant details. Format the text in a clear, structured way." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      // max_tokens: 1000
    });

    const extractedText = response.choices[0].message.content;
    console.log('Extracted text from job poster:', extractedText);
    return extractedText || 'No text could be extracted from the job poster image.';
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to process job poster image');
  }
}

async function extractTextFromPDF(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const data = await pdfParse.default(Buffer.from(pdfBuffer));
    console.log('Extracted text from PDF:', data.text.substring(0, 200) + '...');
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}

async function extractTextFromDOCX(docxBuffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer: Buffer.from(docxBuffer) });
    console.log('Extracted text from DOCX:', result.value.substring(0, 200) + '...');
    return result.value;
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const language = formData.get('language') as string || 'english';
    const jobPoster = formData.get('jobPoster') as File;
    const cv = formData.get('cv') as File;

    if (!jobPoster && !cv) {
      return NextResponse.json(
        { error: 'Please provide either a job poster or CV file' },
        { status: 400 }
      );
    }

    let jobPosterText = '';
    let cvText = '';

    if (jobPoster) {
      try {
        const jobPosterBuffer = await jobPoster.arrayBuffer();
        jobPosterText = await extractTextFromImage(jobPosterBuffer);
        console.log('Job poster text extracted:', jobPosterText);
      } catch (error) {
        console.error('Error processing job poster:', error);
        return NextResponse.json(
          { error: 'Failed to process job poster image' },
          { status: 400 }
        );
      }
    }

    if (cv) {
      try {
        const cvBuffer = await cv.arrayBuffer();
        const fileType = cv.type;
        
        if (fileType === 'application/pdf') {
          cvText = await extractTextFromPDF(cvBuffer);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          cvText = await extractTextFromDOCX(cvBuffer);
        } else {
          return NextResponse.json(
            { error: 'Unsupported CV file format. Please upload a PDF or DOCX file.' },
            { status: 400 }
          );
        }
        console.log('CV text extracted:', cvText.substring(0, 200) + '...');
      } catch (error) {
        console.error('Error processing CV:', error);
        return NextResponse.json(
          { error: 'Failed to process CV file' },
          { status: 400 }
        );
      }
    }

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a professional cover letter writer with expertise in creating compelling and personalized cover letters.
Your task is to create a professional cover letter that:

1. First, carefully analyze the job poster to extract:
   - Company name and details
   - Hiring manager's name (if available)
   - Job title and department
   - Key job requirements and responsibilities
   - Company values and culture (if mentioned)
   - Location and work arrangement (if mentioned)

2. Then, analyze the candidate's CV to identify:
   - Relevant experience that matches the job requirements
   - Skills that align with the position
   - Achievements that demonstrate capability
   - Education and certifications relevant to the role

3. Create a cover letter that:
   - Properly addresses the specific company and hiring manager
   - References specific job requirements and matches them with candidate's experience
   - Demonstrates understanding of the company and role
   - Maintains a professional and engaging tone
   - Is written in the specified language (${language})
   - Follows standard business letter format with proper greeting and closing

4. Structure the cover letter to:
   - Start with a strong opening that mentions the specific position and company
   - Include 2-3 paragraphs connecting candidate's experience to job requirements
   - End with a call to action and proper closing

Please ensure the cover letter is highly personalized and shows a clear connection between the candidate's qualifications and the specific job requirements.`
      },
      {
        role: "user",
        content: `Please generate a cover letter based on the following information:

Job Requirements and Company Details (extract and use these specific details):
${jobPosterText}

Candidate's CV and Experience (match these with the job requirements):
${cvText}

Please ensure the cover letter:
1. Starts with "Dear [Hiring Manager/Company Name]" using the specific name/company from the job poster
2. Mentions the exact job title and company name in the first paragraph
3. References specific requirements from the job posting and matches them with the candidate's experience
4. Uses concrete examples from the candidate's CV to demonstrate qualifications
5. Is written in ${language}
6. Follows professional business letter format with proper spacing and paragraphs

Important: Make sure to extract and use the specific company name, job title, and any other unique details from the job poster to create a truly personalized cover letter.`
      }
    ];

    console.log('Sending request to OpenAI with messages:', JSON.stringify(messages, null, 2));

    const response = await openai.chat.completions.create({
      model: 'o4-mini',
      messages,
    });

    return NextResponse.json({ coverLetter: response.choices[0].message.content });
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate cover letter' },
      { status: 500 }
    );
  }
} 