import { NextResponse, NextRequest } from 'next/server';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

let todos: TodoItem[] = [
  { id: 1, title: 'Buy Gift for Harish Birthday', completed: false },
  { id: 2, title: 'Do homework', completed: true },
  { id: 3, title: 'Read a book', completed: false },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newTodo: TodoItem = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, completed } = body;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = completed;
    return NextResponse.json(todo);
  } else {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
}