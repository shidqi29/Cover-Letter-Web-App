import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ message: 'API test endpoint working!' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ 
      message: 'POST request received', 
      receivedData: body 
    });
  } catch (error) {
    console.error('Error in test API:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
} 