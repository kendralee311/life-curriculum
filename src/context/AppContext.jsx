import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { makeId } from "../lib/id";
import { SUBJECT_DEFS, TASK_SEED } from "../data/seedData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [subjects, setSubjects] = useLocalStorage("lc:subjects:v2", SUBJECT_DEFS);
  const [tasks, setTasks] = useLocalStorage("lc:tasks", TASK_SEED);
  const [theme, setTheme] = useLocalStorage("lc:theme", "dark");

  const actions = useMemo(
    () => ({
      toggleTask(taskId) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
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
      toggleTheme() {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      },
      // Each bespoke subject layout owns its own data, but reports a single
      // 0-100 progress number back up so Home's overview stays in sync.
      updateSubjectProgress(subjectId, progress) {
        setSubjects((prev) =>
          prev.map((s) =>
            s.id === subjectId && s.progress !== progress ? { ...s, progress } : s,
          ),
        );
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
