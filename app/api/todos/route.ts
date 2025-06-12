import { NextRequest, NextResponse } from 'next/server';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const todos: TodoItem[] = [
    { id: 1, title: 'Buy Gift for Friend Birthday', completed: false },
    { id: 2, title: 'Do homework', completed: true },
    { id: 3, title: 'Read a book', completed: false },
  ];

export async function GET() {
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

  const todo = todos.find(t => t.id === Number(id));
  if (todo) {
    todo.completed = completed;
    return NextResponse.json(todo);
  } else {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get('id');

  if (!idParam) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const id = Number(idParam);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  const deleted = todos.splice(index, 1);
  return NextResponse.json({ success: true, deleted });
}
