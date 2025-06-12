'use client';

import React from 'react';

export default function PdfDisplayPage() {

  const filePath: string = '/Developer_Mindset.txt'; // Path updated as per your request

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h2 className="mb-4 text-3xl font-extrabold text-gray-800 text-center">Developer Mindset</h2>
      <iframe
        src={filePath} // The source URL of the PDF.
        title="Text Document" // A descriptive title for accessibility.
        className="w-full max-w-4xl h-[80vh] border border-gray-300 rounded-lg shadow-lg"

      >
        {/* Fallback content for browsers that do not support iframes or PDF embedding. */}
        <p className="p-4 text-center text-gray-600">Your browser does not support iframes. You can <a href={filePath} className="text-blue-600 hover:underline">download the PDF instead</a>.</p>
      </iframe>
    </main>
  );
}
