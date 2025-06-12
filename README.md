# 🧠 Intern Screening Test – Full Stack + AI Integration

Welcome! This is my submission for the AI-integrated full stack developer internship screening test. This repository contains the code for all 4 parts of the test as described in the original problem statement.

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Zod (for schema validation)
- React (Client Components)
- In-memory API Simulation
- Gemini for chat integration

---

```

## 📂 Project Structure

├── app/
│   ├── ai_integration_essay/
│   │   └── page.tsx                 # Essay: AI model choice and integration
│   │
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts             # Handles AI chat requests
│   │   └── todos/
│   │       └── route.ts             # Handles GET/POST for todo list
│   │
│   ├── chat/
│   │   └── page.tsx                 # UI to interact with AI chat
│   │
│   ├── developer_mindset_essay/
│   │   └── page.tsx                 # Essay: Tools, debugging approach, past project
│   │
│   ├── notes/
│   │   └── page.tsx                 # NoteSync: Search, Add, Edit, Delete mock notes
│   │
│   ├── todos/
│   │   └── page.tsx                 # Displays todos from API with add support
│   │
│   └── page.tsx                     # Home page
│
├── packages/
│   └── integrations/
│       └── notion/
│           └── notesync/
│               ├── notesync.functions.ts  # Mocked logic for listing, creating, updating notes
│               ├── notesync.schema.ts     # Zod validation schemas
│               └── notesync.embed.ts      # (optional) embed formatting file
│
├── .env.example                        # API key placeholder (if used)
├── README.md                           # You're here!

```
---

## ✅ Part 1: Full Stack API — Todos

- **Path:** `app/api/todos/route.ts`
- **Features:**
  - `GET`: Returns a list of static todo items
  - `POST`: Accepts a new todo (in-memory storage)
- **Includes:** TypeScript interfaces and JSON response using `NextResponse`

---

## 🤩 Part 2: Mock Integration — NoteSync

- **Folder:** `packages/integrations/notion/notesync/`
- **Files:**
  - `notesync.functions.ts`: Exposes a `listNotes()` method with mocked data
  - `notesync.schema.ts`: Validates input with Zod (e.g., `maxResults`, `query`)
  - `notesync.embed.ts`: (optional) format utility


## 🤖 Part 3: AI Integration (Essay + Bonus Component)
## 🌱 Part 4: Developer Mindset


---

## 🛠 How to Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
 
