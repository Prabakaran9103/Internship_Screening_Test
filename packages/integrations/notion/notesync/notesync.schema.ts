import { z } from 'zod';

// Input validation schema for list-notes
export const ListNotesSchema = z.object({
  maxResults: z.number().min(1).max(20).default(5),
  query: z.string().optional()
});

export type ListNotesInput = z.infer<typeof ListNotesSchema>;

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface ListNotesResponse {
  notes: Note[];
}