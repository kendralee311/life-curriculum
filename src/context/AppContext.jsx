import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { makeId } from "../lib/id";
import { SUBJECT_DEFS, NOTE_SEED, TASK_SEED } from "../data/seedData";

const AppContext = createContext(null);

function buildInitialSubjects() {
  return SUBJECT_DEFS.map((s) => ({
    ...s,
    notes: (NOTE_SEED[s.id] ?? []).map((n) => ({
      ...n,
      createdAt: new Date().toISOString(),
    })),
  }));
}

export function AppProvider({ children }) {
  const [subjects, setSubjects] = useLocalStorage(
    "lc:subjects",
    buildInitialSubjects,
  );
  const [tasks, setTasks] = useLocalStorage("lc:tasks", TASK_SEED);
  const [theme, setTheme] = useLocalStorage("lc:theme", "dark");

  const actions = useMemo(
    () => ({
      toggleTask(taskId) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, done: !t.done } : t,
          ),
        );
      },
      addTask({ title, subjectId, priority }) {
        if (!title.trim()) return;
        setTasks((prev) => [
          ...prev,
          {
            id: makeId(),
            title: title.trim(),
            subjectId,
            priority: priority ?? "medium",
            done: false,
          },
        ]);
      },
      deleteTask(taskId) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      },
      clearCompletedTasks() {
        setTasks((prev) => prev.filter((t) => !t.done));
      },
      addNote(subjectId, { content, tags }) {
        if (!content.trim()) return;
        setSubjects((prev) =>
          prev.map((s) =>
            s.id === subjectId
              ? {
                  ...s,
                  notes: [
                    {
                      id: makeId(),
                      content: content.trim(),
                      tags: tags ?? [],
                      createdAt: new Date().toISOString(),
                    },
                    ...s.notes,
                  ],
                }
              : s,
          ),
        );
      },
      deleteNote(subjectId, noteId) {
        setSubjects((prev) =>
          prev.map((s) =>
            s.id === subjectId
              ? { ...s, notes: s.notes.filter((n) => n.id !== noteId) }
              : s,
          ),
        );
      },
      toggleMilestone(subjectId, milestoneId) {
        setSubjects((prev) =>
          prev.map((s) => {
            if (s.id !== subjectId) return s;
            const milestones = s.milestones.map((m) =>
              m.id === milestoneId ? { ...m, done: !m.done } : m,
            );
            const done = milestones.filter((m) => m.done).length;
            const progress = Math.round((done / milestones.length) * 100);
            return { ...s, milestones, progress };
          }),
        );
      },
      toggleTheme() {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      },
    }),
    [setTasks, setSubjects, setTheme],
  );

  const value = useMemo(
    () => ({ subjects, tasks, theme, ...actions }),
    [subjects, tasks, theme, actions],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
