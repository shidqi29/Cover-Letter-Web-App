import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createWorker } from 'tesseract.js';
import pdfParse from 'pdf-parse';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { jobPoster, cv, language } = await request.json();

    // Extract text from job poster (image)
    const jobPosterText = await extractTextFromImage(jobPoster);

    // Extract text from CV (PDF)
    const cvText = await extractTextFromPDF(cv);

    const prompt = `Generate a cover letter in ${language} based on the following job poster and CV:\n\nJob Poster:\n${jobPosterText}\n\nCV:\n${cvText}`;

    const response = await openai.chat.completions.create({
      model: 'o4-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({ coverLetter: response.choices[0].message.content });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 });
  }
}

async function extractTextFromImage(imageData: string): Promise<string> {
  const worker = await createWorker();
  // @ts-ignore
  await worker.load();
  // @ts-ignore
  await worker.loadLanguage('eng');
  // @ts-ignore
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(imageData);
  await worker.terminate();
  return text;
}

async function extractTextFromPDF(pdfData: string): Promise<string> {
  // pdfData is a base64 data URL, so we need to decode it
  const base64 = pdfData.split(',')[1];
  const buffer = Buffer.from(base64, 'base64');
  const data = await pdfParse(buffer);
  return data.text;
} 