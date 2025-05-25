import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ message: 'API test endpoint working!' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Check if streaming is requested
    const searchParams = new URL(request.url).searchParams;
    const stream = searchParams.get('stream') === 'true';
    
    if (stream) {
      // Return a streaming response
      return new Response(
        new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            const messages = [
              "This is a streaming test response.\n",
              "The API endpoint is working correctly.\n",
              "Your request data was received.\n",
              JSON.stringify(body, null, 2)
            ];
            
            for (const message of messages) {
              controller.enqueue(encoder.encode(message));
              // Simulate delay between chunks
              await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            controller.close();
          }
        }),
        {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          }
        }
      );
    }
    
    // Regular JSON response
    return NextResponse.json({ 
      message: 'POST request received', 
      receivedData: body 
    });
  } catch (error) {
    console.error('Error in test API:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}