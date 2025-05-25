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

import axios from 'axios';
import * as cheerio from 'cheerio';

async function extractTextFromJobLink(url: string): Promise<string> {
  try {
    console.log('Extracting job details from URL:', url);
    
    // Normalize the URL by adding https:// if missing
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    try {
      // Fetch HTML content from the job posting URL
      const response = await axios.get(normalizedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br'
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      const html = response.data;
      
      if (!html || typeof html !== 'string') {
        console.error('Invalid HTML content received');
        throw new Error('Failed to retrieve valid content from the job link');
      }
        // First, check if the content is likely a job posting and assess its quality
      const jobDetectionPrompt = `
      Analyze this HTML content carefully and determine:
      
      1. Is this a job posting/description? 
         - Return "YES" if it's definitely a job posting with job requirements, responsibilities, etc.
         - Return "MAYBE" if it might be related to a job but doesn't have detailed information.
         - Return "NO" if it's definitely not a job posting (e.g., a homepage, blog post, product page, etc.)
      
      2. If it is or might be a job posting, assess its quality on a scale of 0-100:
         - 90-100: Complete job posting with detailed requirements, responsibilities, qualifications, company info, etc.
         - 70-89: Good job posting with most key details
         - 40-69: Basic job posting with some information but missing important details
         - 1-39: Poor quality with minimal job-related information
         - 0: Not a job posting at all
      
      3. Identify any missing key information:
         - List any critical job posting elements that are missing (requirements, responsibilities, etc.)
      
      Format your response exactly like this:
      STATUS: [YES/MAYBE/NO]
      QUALITY: [0-100]
      MISSING: [list of missing elements, comma separated]
      
      HTML Content (excerpt):
      ${html.substring(0, 5000)}
      `;
      
      const jobDetectionResponse = await openai.chat.completions.create({
        model: "o4-mini",
        messages: [{ role: "user", content: jobDetectionPrompt }],
      });
      
      const detectionResult = jobDetectionResponse.choices[0].message.content?.trim() || "";
      console.log('Job detection result:', detectionResult);
      
      // Parse the detection result
      const statusMatch = detectionResult.match(/STATUS:\s*(YES|MAYBE|NO)/i);
      const qualityMatch = detectionResult.match(/QUALITY:\s*(\d+)/i);
      const missingMatch = detectionResult.match(/MISSING:\s*(.+)$/im);
      
      const isJobPosting = statusMatch ? statusMatch[1].toUpperCase() : "NO";
      const jobQuality = qualityMatch ? parseInt(qualityMatch[1]) : 0;
      const missingElements = missingMatch ? missingMatch[1].trim() : "complete information";
      
      console.log(`Job detection: Status=${isJobPosting}, Quality=${jobQuality}, Missing=${missingElements}`);
      
      if (isJobPosting === "NO") {
        return `This URL does not appear to contain job posting information. Please provide a URL that leads directly to a job description with requirements and responsibilities. The system will create a cover letter based on your CV and generic job information.`;
      }
      
      // For low-quality job postings, add a note about limitations
      let qualityNote = "";
      if (jobQuality < 40 && isJobPosting !== "NO") {
        qualityNote = `Note: The job information from this URL appears to be limited. The cover letter will be created with the available information, but it may be less specific than if a complete job description was provided. Missing information: ${missingElements}.`;
      }
      
      // Use OpenAI to extract and structure the job information
      const prompt = `
      Extract and structure the job information from this HTML content. 
      Focus on:
      1. Company name
      2. Job title
      3. Job description
      4. Requirements and qualifications
      5. Responsibilities
      6. Benefits (if available)
      7. Location
      8. Job type (full-time, part-time, etc.)
      
      ${isJobPosting === "MAYBE" ? "Since this might not be a complete job posting, extract whatever relevant information is available and indicate what's missing." : "Present the information in a clear, structured format."}
      
      HTML Content:
      ${html.substring(0, 15000)} // Limit to avoid token limits
      `;
      
      const response2 = await openai.chat.completions.create({
        model: "o4-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
      });      const extractedText = response2.choices[0].message.content;
      console.log('Extracted job information:', extractedText);
      
      if (isJobPosting === "MAYBE") {
        return `Note: This URL might not contain complete job posting information. Here's what could be extracted:\n\n${extractedText || 'No job information could be extracted from the provided link.'}`;
      }
      
      // Add the quality note if needed
      if (qualityNote) {
        return `${qualityNote}\n\n${extractedText || 'Limited job information could be extracted from the provided link.'}`;
      }
      
      return extractedText || 'No job information could be extracted from the provided link.';
    } catch (fetchError) {
      console.error('Error fetching from URL:', fetchError);
      
      // Try a different approach with just the domain and path analysis if direct fetch fails
      console.log('Attempting alternative extraction approach...');
      
      // Extract domain and analyze URL pattern to identify job source
      const urlObj = new URL(normalizedUrl);
      const domain = urlObj.hostname;
      const path = urlObj.pathname;
      
      // Check if the path contains job-related keywords
      const jobKeywords = ['job', 'career', 'position', 'opening', 'vacancy', 'apply', 'employment'];
      const pathHasJobKeyword = jobKeywords.some(keyword => path.toLowerCase().includes(keyword));
      
      let promptContent = `I'm trying to extract job information from a URL but cannot access the content directly.`;
      
      if (pathHasJobKeyword) {
        promptContent += `
        The URL path suggests this might be a job posting page.
        Based on the URL structure, please provide a generic template for what information might be expected from this job source.
        URL: ${normalizedUrl}
        Domain: ${domain}
        Path: ${path}
        
        Please generate a structured placeholder with common job posting elements that would help a user craft a cover letter, noting that this is based on the URL pattern only, not the actual content.`;
      } else {
        promptContent += `
        The URL doesn't appear to contain obvious job-related keywords.
        URL: ${normalizedUrl}
        Domain: ${domain}
        Path: ${path}
        
        Please generate a brief note explaining that this doesn't appear to be a job posting URL, and provide a generic job posting structure that could be used as a placeholder.`;
      }
      
      const response3 = await openai.chat.completions.create({
        model: "o4-mini",
        messages: [
          { role: "user", content: promptContent }
        ],
      });
      
      const alternativeText = response3.choices[0].message.content;
      return `Note: We could not directly access the content from the provided URL. ${pathHasJobKeyword ? 
        "The following is a general structure based on the URL pattern:" : 
        "The URL provided doesn't appear to be a typical job posting link. Using generic job information instead:"}\n\n${alternativeText}`;
    }
  } catch (error) {
    console.error('Error extracting text from job link:', error);
    throw new Error('Failed to process job link. Please check if the URL is correct and accessible.');
  }
}

async function extractTextFromPDF(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const data = await pdfParse.default(Buffer.from(pdfBuffer));
    const extractedText = data.text;
    console.log('Extracted text from PDF:', extractedText.substring(0, 200) + '...');
    
    // Assess CV quality if text was extracted
    if (extractedText && extractedText.length > 0) {
      const cvQuality = assessCVQuality(extractedText);
      if (cvQuality.score < 40) {
        return `Note: The CV provided appears to have limited information. The cover letter will be created with the available details, but may be less specific than with a comprehensive CV. ${cvQuality.issues}\n\n${extractedText}`;
      }
    }
    
    return extractedText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}

async function extractTextFromDOCX(docxBuffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer: Buffer.from(docxBuffer) });
    const extractedText = result.value;
    console.log('Extracted text from DOCX:', extractedText.substring(0, 200) + '...');
    
    // Assess CV quality if text was extracted
    if (extractedText && extractedText.length > 0) {
      const cvQuality = assessCVQuality(extractedText);
      if (cvQuality.score < 40) {
        return `Note: The CV provided appears to have limited information. The cover letter will be created with the available details, but may be less specific than with a comprehensive CV. ${cvQuality.issues}\n\n${extractedText}`;
      }
    }
    
    return extractedText;
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file');
  }
}

/**
 * Assesses the quality of CV text
 * @param cvText The extracted CV text
 * @returns Quality assessment with score and issues
 */
function assessCVQuality(cvText: string): { score: number, issues: string } {
  let score = 0;
  const issues = [];
  
  // Base score for having content
  if (cvText && cvText.trim().length > 0) {
    score += 20;
  } else {
    issues.push("Empty or nearly empty CV");
    return { score: 0, issues: "CV appears to be empty or contains no readable text." };
  }
  
  // Check for common CV sections
  const sections = [
    { name: "work experience", keywords: ["experience", "employment", "work history", "professional experience"] },
    { name: "education", keywords: ["education", "degree", "university", "college", "school"] },
    { name: "skills", keywords: ["skills", "proficient", "competent", "abilities"] },
    { name: "contact information", keywords: ["email", "phone", "contact", "address", "@"] }
  ];
  
  const lowercaseCV = cvText.toLowerCase();
    // Check for each section
  const missingSections: string[] = [];
  
  sections.forEach(section => {
    const hasSection = section.keywords.some(keyword => lowercaseCV.includes(keyword));
    if (hasSection) {
      score += 15; // Max 60 points for all sections
    } else {
      missingSections.push(section.name);
    }
  });
  
  // Check length as a quality proxy
  if (cvText.length > 2000) {
    score += 20;
  } else if (cvText.length > 1000) {
    score += 10;
    issues.push("CV appears to be relatively short");
  } else {
    issues.push("CV contains minimal text");
  }
  
  // Generate issues message
  let issuesMessage = "";
  if (missingSections.length > 0) {
    issuesMessage = `The CV may be missing information about: ${missingSections.join(", ")}.`;
  }
  
  // Cap the score at 100
  score = Math.min(100, score);
  
  return {
    score,
    issues: issuesMessage
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const language = formData.get('language') as string || 'english';
    const jobInputType = formData.get('jobInputType') as string || 'image';
    const jobPoster = formData.get('jobPoster') as File | null;
    const jobLink = formData.get('jobLink') as string || '';
    const cv = formData.get('cv') as File | null;

    if ((!jobPoster && jobInputType === 'image') || (!jobLink && jobInputType === 'link') || !cv) {
      return NextResponse.json(
        { error: 'Please provide either job information (image or link) or a CV file' },
        { status: 400 }
      );
    }

    let jobPosterText = '';
    let cvText = '';

    // Process job information based on input type
    if (jobInputType === 'image' && jobPoster) {
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
    } else if (jobInputType === 'link' && jobLink) {
      try {
        jobPosterText = await extractTextFromJobLink(jobLink);
        console.log('Job information extracted from link:', jobPosterText);
      } catch (error) {
        console.error('Error processing job link:', error);
        return NextResponse.json(
          { error: 'Failed to process job link. Please check if the URL is valid.' },
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
    }    // Use enhanced input analysis function to determine the best approach
    const { 
      systemPrompt, 
      userPrompt, 
      hasLimitedJobInfo, 
      hasLimitedCvInfo,
      isJobInfoRelevant 
    } = analyzeInputsAndGetInstructions(jobPosterText, cvText, language);

    // Log the analysis results for debugging
    console.log('Input analysis results:', {
      hasLimitedJobInfo,
      hasLimitedCvInfo,
      isJobInfoRelevant,
      jobTextLength: jobPosterText?.length || 0,
      cvTextLength: cvText?.length || 0
    });

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userPrompt
      }
    ];console.log('Sending request to OpenAI with messages:', JSON.stringify(messages, null, 2));

    // Create a new ReadableStream for streaming the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const stream = await openai.chat.completions.create({
            model: 'o4-mini',
            messages,
            stream: true,
          });

          // Process the stream chunks
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              // Encode and send the chunk
              const encoder = new TextEncoder();
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });    // Determine the generation mode based on input quality
    let generationMode = "standard";
    if (hasLimitedJobInfo && hasLimitedCvInfo) {
      generationMode = "generic";
    } else if (hasLimitedJobInfo || !isJobInfoRelevant) {
      generationMode = "cv_focused";
    } else if (hasLimitedCvInfo) {
      generationMode = "job_focused";
    }
    
    // Add headers to inform the frontend about input quality and generation approach
    const headers = {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Job-Info-Limited': hasLimitedJobInfo.toString(),
      'X-CV-Info-Limited': hasLimitedCvInfo.toString(),
      'X-Job-Info-Relevant': isJobInfoRelevant.toString(),
      'X-Generation-Mode': generationMode,
      'X-Job-Text-Length': (jobPosterText?.length || 0).toString(),
      'X-CV-Text-Length': (cvText?.length || 0).toString(),
    };
    
    console.log(`Generating cover letter in ${generationMode} mode`, {
      hasLimitedJobInfo,
      hasLimitedCvInfo,
      isJobInfoRelevant,
      jobTextLength: jobPosterText?.length || 0,
      cvTextLength: cvText?.length || 0
    });
    
    // Return the stream as the response with metadata headers
    return new Response(stream, { headers });
  } catch (error) {
    console.error('Error in generate API:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate cover letter' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Analyzes job and CV texts to determine input quality, relevance, and generate appropriate instructions
 * @param jobText Text extracted from job posting
 * @param cvText Text extracted from CV/resume
 * @param language Language to use for the cover letter
 * @returns Instructions for generating cover letter based on input quality and relevance
 */
function analyzeInputsAndGetInstructions(jobText: string, cvText: string, language: string): {
  systemPrompt: string;
  userPrompt: string;
  hasLimitedJobInfo: boolean;
  hasLimitedCvInfo: boolean;
  isJobInfoRelevant: boolean;
} {
  // Check if job information is limited or missing
  const hasLimitedJobInfo = !jobText || 
                          jobText.trim().length < 100 || 
                          jobText.includes('No text could be extracted') ||
                          jobText.includes('Failed to process') ||
                          jobText.includes('could not directly access');
                          
  // Check if CV information is limited or missing
  const hasLimitedCvInfo = !cvText || cvText.trim().length < 100;
  
  // Assess job information relevance (simple heuristics - for a real app, this could use more sophisticated NLP)
  const jobKeywords = ['job', 'position', 'work', 'role', 'responsibilities', 
                      'requirements', 'qualifications', 'skills', 'experience',
                      'company', 'team', 'organization', 'mission', 'values',
                      'salary', 'benefits', 'location', 'remote', 'hybrid'];
  
  // Count how many job-related keywords appear in the job text
  const keywordMatches = jobKeywords.filter(keyword => 
    jobText && jobText.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  
  // If we find at least some job-related keywords, consider it relevant
  // If extremely limited or no text, it's not relevant
  const isJobInfoRelevant = !hasLimitedJobInfo && keywordMatches >= 3;
  
  // Determine operating mode based on input quality and relevance
  let operatingMode = "standard"; // Default
  
  if (hasLimitedJobInfo && hasLimitedCvInfo) {
    operatingMode = "generic"; // Both inputs are limited
  } else if (hasLimitedJobInfo || !isJobInfoRelevant) {
    operatingMode = "cv_focused"; // Job info is limited or irrelevant, focus on CV
  } else if (hasLimitedCvInfo) {
    operatingMode = "job_focused"; // CV info is limited, focus on job
  }
  
  console.log(`Operating mode: ${operatingMode}, Limited job info: ${hasLimitedJobInfo}, Limited CV: ${hasLimitedCvInfo}, Job relevant: ${isJobInfoRelevant}`);
  
  // Base system prompt
  let systemPrompt = `You are a professional cover letter writer with expertise in creating compelling and personalized cover letters.
Your task is to create a professional cover letter that:`;

  // Adjust prompts based on operating mode
  switch (operatingMode) {
    case "generic":
      systemPrompt += `

1. Create a cover letter that makes general statements about the candidate's interest in the position:
   - Use generic terms that could apply to many positions
   - Focus on transferable skills and professional qualities
   - Make reasonable assumptions about what would be valuable in most workplaces
   - Emphasize the candidate's adaptability and eagerness to learn

2. Focus on generic professional capabilities that would be valuable in most workplaces:
   - Teamwork and collaboration skills
   - Problem-solving abilities
   - Communication skills
   - Adaptability and quick learning
   - Work ethic and reliability`;
      break;
    
    case "cv_focused":
      systemPrompt += `

1. Create a cover letter focused primarily on the candidate's strengths from their CV:
   - Use generic terms about the position that could apply to many jobs
   - Focus on the candidate's transferable skills that would be valuable in most roles
   - Make reasonable assumptions about what would be valuable in most workplaces

2. Carefully analyze the candidate's CV to identify and highlight:
   - Key experiences and responsibilities that demonstrate capability
   - Relevant skills that would be valuable in most professional roles
   - Achievements that show the candidate's potential
   - Education and certifications that establish credibility`;
      break;
    
    case "job_focused":
      systemPrompt += `

1. Carefully analyze the job posting to extract:
   - Company name and details
   - Hiring manager's name (if available)
   - Job title and department
   - Key job requirements and responsibilities
   - Company values and culture (if mentioned)
   - Location and work arrangement (if mentioned)

2. Since CV details are limited, focus on generic professional capabilities that would be valuable for this specific role:
   - Highlight transferable skills that align with the job requirements
   - Emphasize general professional capabilities like communication, problem-solving, etc.
   - Focus on the candidate's adaptability and eagerness to learn specifically for this role`;
      break;
    
    default: // standard mode
      systemPrompt += `

1. Carefully analyze the job posting to extract:
   - Company name and details
   - Hiring manager's name (if available)
   - Job title and department
   - Key job requirements and responsibilities
   - Company values and culture (if mentioned)
   - Location and work arrangement (if mentioned)

2. Analyze the candidate's CV to identify:
   - Relevant experience that matches the job requirements
   - Skills that align with the position
   - Achievements that demonstrate capability
   - Education and certifications relevant to the role`;
      break;
  }

  // Common letter structure for all modes
  systemPrompt += `

3. Create a cover letter that:
   ${operatingMode === "standard" || operatingMode === "job_focused" ? 
     `- Properly addresses the specific company and hiring manager
   - References specific job requirements and matches them with candidate's experience` : 
     `- Uses a generic but professional greeting
   - Mentions enthusiasm for the opportunity`}
   - Demonstrates understanding of the company and role
   - Maintains a professional and engaging tone
   - Is written in the specified language (${language})
   - Follows standard business letter format with proper greeting and closing

4. Structure the cover letter to:
   - Start with a strong opening ${operatingMode === "standard" || operatingMode === "job_focused" ? 
      `that mentions the specific position and company` : 
      `expressing enthusiasm for the position`}
   - Include 2-3 paragraphs connecting candidate's experience to ${operatingMode === "standard" ? 
      `job requirements` : 
      `professional requirements`}
   - End with a call to action and proper closing

${operatingMode !== "standard" ? 
  `Important: Since some of the provided information is limited or not directly relevant, create the best possible cover letter using what's available. Fill in gaps with reasonable professional content without making specific claims that aren't supported by the input data.` : 
  `Please ensure the cover letter is highly personalized and shows a clear connection between the candidate's qualifications and the specific job requirements.`}`;

  // User prompt with tailored instructions based on input quality and operating mode
  let userPrompt = `Please generate a cover letter based on the following information:

Job Requirements and Company Details ${operatingMode === "cv_focused" || operatingMode === "generic" ? 
  "(limited or generic information available)" : 
  "(extract and use these specific details)"}:
${jobText}

Candidate's CV and Experience ${operatingMode === "job_focused" || operatingMode === "generic" ? 
  "(limited information available)" : 
  "(match these with the job requirements)"}:
${cvText}

Please ensure the cover letter:
1. ${operatingMode === "standard" || operatingMode === "job_focused" ? 
      `Starts with "Dear [Hiring Manager/Company Name]" using the specific name/company from the job posting` : 
      `Starts with an appropriate professional greeting`}
2. ${operatingMode === "standard" || operatingMode === "job_focused" ? 
      `Mentions the exact job title and company name in the first paragraph` : 
      `Opens with enthusiasm for the position`}
3. ${operatingMode === "standard" ? 
      `References specific requirements from the job posting and matches them with the candidate's experience` : 
      operatingMode === "cv_focused" ? 
        `Highlights key qualifications from the candidate's experience` :
        operatingMode === "job_focused" ? 
          `References specific requirements from the job posting` :
          `Emphasizes transferable skills and professional qualities`}
4. ${operatingMode === "job_focused" || operatingMode === "generic" ? 
      `Presents the candidate as a well-rounded professional` : 
      `Uses concrete examples from the candidate's CV to demonstrate qualifications`}
5. Is written in ${language}
6. Follows professional business letter format with proper spacing and paragraphs

${operatingMode !== "standard" ? 
  `Note: Some specific details may be limited in the provided information. Create the best possible cover letter using what's available, and fill in with reasonable professional content where needed.` : 
  `Important: Make sure to extract and use the specific company name, job title, and any other unique details from the job poster to create a truly personalized cover letter.`}`;

  return {
    systemPrompt,
    userPrompt,
    hasLimitedJobInfo,
    hasLimitedCvInfo,
    isJobInfoRelevant: isJobInfoRelevant
  };
}