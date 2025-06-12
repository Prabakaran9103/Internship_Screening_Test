import { ListNotesInput, ListNotesResponse } from './notesync.schema';
import { v4 as uuidv4 } from 'uuid'; // Use for generating unique note IDs

// In-memory mock data
let mockNotes = [
  { id: 'n1', title: 'Meeting Notes', content: 'Discuss project scope and deadlines.' },
  { id: 'n2', title: 'Shopping List', content: 'Milk\nBread\nEggs' },
  { id: 'n3', title: 'Ideas', content: 'Build a Next.js plugin for Notion.' },
  { id: 'n4', title: 'Reading List', content: 'Clean Code\nAtomic Habits' },
  { id: 'n5', title: 'Workout Plan', content: 'Pushups\nSquats\nPlank' },
  { id: 'n6', title: 'Vacation', content: 'Visit Goa\nBook hotel\nPack bags' },
  { id: 'n7', title: 'Books to Buy', content: 'You Don’t Know JS\nThe Pragmatic Programmer' },
  { id: 'n8', title: 'App Feedback', content: 'Improve UI\nFix bugs in dark mode' },
  { id: 'n9', title: 'Event Schedule', content: '10AM keynote\n12PM workshop' },
  { id: 'n10', title: 'Notesync Features', content: 'Add search\nDark mode\nExport to PDF' }
];

//  List Notes with optional search and limit
export async function listNotes(input: ListNotesInput): Promise<ListNotesResponse> {
  const { maxResults, query } = input;
  let filtered = mockNotes;
  if (query) {
    filtered = filtered.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
  }
  return { notes: filtered.slice(0, maxResults) };
}

//  Create a new note
export async function createNote({ title, content }: { title: string; content: string }) {
  const newNote = {
    id: uuidv4(),
    title,
    content
  };
  mockNotes.unshift(newNote); // Add to top
  return newNote;
}

//  Update an existing note
export async function updateNote({ id, title, content }: { id: string; title: string; content: string }) {
  const index = mockNotes.findIndex(note => note.id === id);
  if (index !== -1) {
    mockNotes[index] = { id, title, content };
    return mockNotes[index];
  }
  throw new Error('Note not found');
}

// Delete a note by ID
export async function deleteNoteById(id: string) {
  const initialLength = mockNotes.length;
  mockNotes = mockNotes.filter(note => note.id !== id);
  return mockNotes.length < initialLength;
}
