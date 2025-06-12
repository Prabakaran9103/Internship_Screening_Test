// app/api/chat/route.js
import { NextResponse } from 'next/server';

// Handle POST requests to /api/chat
export async function POST(request) {
  try {
    // Get the chat history from the request body.
    const { contents } = await request.json();

    // Retrieve the Gemini API key from environment variables.
    // IMPORTANT: Never expose your API key directly in client-side code.
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set.');
      return NextResponse.json(
        { error: 'Server configuration error: API key missing.' },
        { status: 500 }
      );
    }

    // Define the Gemini API endpoint.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Prepare the payload for the Gemini API.
    const payload = { contents };

    // Make the request to the Gemini API.
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Parse the response from the Gemini API.
    const result = await response.json();

    // Return the result from the Gemini API directly to the client.
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('Error in API route:', error);
    // Return a 500 error if something goes wrong on the server side.
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
