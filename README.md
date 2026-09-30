# Life Curriculum

A personal dashboard that treats long-term creative ambitions as academic
subjects. Built with React, Vite, and Tailwind CSS; all state persists to
`localStorage`.

## Concept

Four "Subjects" organize the work:

1. **Portfolio & Web Business** — studio site, case studies, first clients
2. **Content Creation** — micro-tutorials and studio-build storytelling
3. **Physical Hardware & Spatial Tech** — tactile prototypes, sensors
4. **Future Vision: Listening Cafe Commune** — spatial design, furniture, events

## Views

- **Home** — "Today's Class Schedule" (daily focus checklist across all
  subjects) and "Graduation Credits" (radar chart + progress bars toward
  each subject's macro goal), plus a glance at all subjects.
- **Subjects** — a grid of subject cards; click into one for its
  **Overview** (vision statement + milestone checklist) and **Scratchpad**
  (a taggable card wall for raw notes, hardware ideas, UI concepts, and
  content hooks).
- A floating **Capture idea** button offers a low-friction way to log a
  note into any subject from anywhere in the app.

## Development

```bash
npm install
npm run dev
```

Sample data is seeded into `localStorage` on first load (see
`src/data/seedData.js`) so the app feels alive immediately. Everything —
tasks, notes, milestone progress, theme — persists across refreshes.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Recharts (radar chart)
- lucide-react (icons)
