import { useApp } from "../context/AppContext";
import { BookCard } from "./BookCard";

export function SubjectsGrid({ onOpenSubject }) {
  const { subjects } = useApp();

  return (
    <section>
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Subjects</h2>
        <span className="font-mono text-xs text-ink-soft dark:text-ink-soft-dark">
          {subjects.length} courses on the shelf
        </span>
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-end justify-center gap-5 px-2 pb-3 sm:justify-start">
          {subjects.map((s) => (
            <BookCard key={s.id} subject={s} onOpen={onOpenSubject} />
          ))}
        </div>
        {/* shelf ledge */}
        <div className="mx-2 h-2.5 rounded-sm bg-graphite/90 dark:bg-graphite/70" />
        <div className="mx-2 h-1.5 bg-graphite/30 dark:bg-graphite/20" style={{ clipPath: "polygon(0 0, 100% 0, 97% 100%, 3% 100%)" }} />
      </div>
    </section>
  );
}
