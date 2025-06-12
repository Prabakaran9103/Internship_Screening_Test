'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8 sm:p-20 font-sans">
      <header className="mb-12 text-center">

        <h1 className="text-3xl font-bold mt-6 text-gray-800">Intership Screening Test Tasks</h1>
	<h3 className="text-3xl font-bold mt-6 text-gray-800">Attended by, Prabakaran C</h3>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link
          href="/todos"
          className="flex flex-col items-center justify-center gap-4 bg-white hover:bg-blue-50 border border-gray-200 p-6 rounded-2xl shadow transition-all hover:shadow-lg"
        >
          <Image src="/checklist.svg" alt="Todo Icon" width={75} height={75} />
          <h2 className="text-lg font-semibold text-gray-800">Todo App</h2>
          <p className="text-sm text-gray-500 text-center">Manage your tasks and boost productivity.</p>
        </Link>

        <Link
          href="/notes"
          className="flex flex-col items-center justify-center gap-4 bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-2xl shadow transition-all hover:shadow-lg"
        >
          <Image src="/notes.svg" alt="Notes Icon" width={75} height={75} />
          <h2 className="text-lg font-semibold text-gray-800">NoteSync</h2>
          <p className="text-sm text-gray-500 text-center">Write, edit, and sync your notes seamlessly.</p>
        </Link>

        <Link
          href="/chat"
          className="flex flex-col items-center justify-center gap-4 bg-white hover:bg-indigo-50 border border-gray-200 p-6 rounded-2xl shadow transition-all hover:shadow-lg"
        >
          <Image src="/chat.svg" alt="Chat Icon" width={75} height={75} />
          <h2 className="text-lg font-semibold text-gray-800">AI Chat</h2>
          <p className="text-sm text-gray-500 text-center">Chat with AI for questions, help, or fun!</p>
        </Link>

        <Link
          href="/ai_integration_essay"
          className="flex flex-col items-center justify-center gap-4 bg-white hover:bg-purple-50 border border-gray-200 p-6 rounded-2xl shadow transition-all hover:shadow-lg"
        >
          <Image src="/ai.svg" alt="AI Icon" width={75} height={75} />
          <h2 className="text-lg font-semibold text-gray-800">AI Integration Essay</h2>
        </Link>

        <Link
          href="/developer_mindset_essay"
          className="flex flex-col items-center justify-center gap-4 bg-white hover:bg-yellow-50 border border-gray-200 p-6 rounded-2xl shadow transition-all hover:shadow-lg"
        >
          <Image src="/mindset.svg" alt="Mindset Icon" width={75} height={75} />
          <h2 className="text-lg font-semibold text-gray-800">Developer Mindset Essay</h2>
        </Link>
      </main>
    </div>
  );
}
