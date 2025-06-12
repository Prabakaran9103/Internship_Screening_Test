'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  listNotes,
  createNote,
  updateNote,
  deleteNoteById,
} from '@/packages/integrations/notion/notesync/notesync.functions';

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // 🔁 New toggle state

  const fetchNotes = useCallback(async () => {
    const res = await listNotes({ maxResults: 10, query });
    setNotes(res.notes);
  }, [query]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);


  const handleAddOrUpdateNote = async () => {
    if (editNoteId) {
      await updateNote({ id: editNoteId, title: newTitle, content: newContent });
      setEditNoteId(null);
    } else {
      await createNote({ title: newTitle, content: newContent });
    }
    setNewTitle('');
    setNewContent('');
    setShowForm(false);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setNewTitle(note.title);
    setNewContent(note.content);
    setEditNoteId(note.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteNoteById(id);
    fetchNotes();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📒 Notes</h1>

      {/* Search Bar */}
      <input
        className="w-full border p-2 mb-4 rounded"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* ➕ Add Note Button */}
      <div className="flex justify-end mb-4">
        <button
          className="text-3xl text-blue-600 hover:text-blue-800"
          onClick={() => setShowForm(!showForm)}
          title={showForm ? 'Close Form' : 'Add Note'}
        >
          {showForm ? '✖' : '➕'}
        </button>
      </div>

      {/* Conditional Add/Edit Form */}
      {showForm && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <input
            className="w-full border p-2 mb-2 rounded"
            placeholder="Note Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-2 rounded"
            placeholder="Note Content"
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddOrUpdateNote}
          >
            {editNoteId ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      )}

      {/* Notes List */}
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <p className="text-gray-600 mt-1 whitespace-pre-wrap">{note.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
