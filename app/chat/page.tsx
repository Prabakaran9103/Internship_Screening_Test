'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: chatHistory }),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content?.parts?.length > 0
      ) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: 'model', text: aiResponseText }]);
      } else {
        console.error('Unexpected response:', result);
        setMessages((prev) => [
          ...prev,
          { role: 'model', text: 'Sorry, I could not get a response.' },
        ]);
      }
    } catch (error) {
      console.error('API error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'An error occurred. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 shadow-lg">
        <h1 className="text-3xl font-bold text-center tracking-wide">Gemini AI Chatbot</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg">Start a conversation with Gemini!</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-md transition-all ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-5 py-3 rounded-2xl shadow-md bg-white text-gray-700">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-sm">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-4 shadow-inner flex gap-3 items-center">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ''}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
