import { GraduationCap, Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

const TABS = [
  { id: "home", label: "Home" },
  { id: "subjects", label: "Subjects" },
];

export function Nav({ view, onNavigate }) {
  const { theme, toggleTheme } = useApp();
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 border-b border-line dark:border-line-dark bg-paper/90 dark:bg-paper-dark/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-white">
            <GraduationCap size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Life Curriculum
          </span>
        </div>

        <nav className="flex items-center gap-1 rounded-full border border-line dark:border-line-dark p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                view === tab.id || (tab.id === "subjects" && view === "subject")
                  ? "bg-brand text-white"
                  : "text-ink-soft dark:text-ink-soft-dark hover:text-ink hover:dark:text-ink-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden font-mono text-xs text-ink-soft dark:text-ink-soft-dark sm:inline">
            {today}
          </span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line dark:border-line-dark text-ink-soft dark:text-ink-soft-dark hover:text-ink hover:dark:text-ink-dark"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
