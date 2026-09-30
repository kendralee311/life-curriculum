import { ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { colorClasses } from "../lib/colors";
import { ProgressRing } from "./ProgressRing";

export function SubjectsGrid({ onOpenSubject }) {
  const { subjects } = useApp();

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold">Subjects</h2>
        <span className="font-mono text-xs text-ink-soft dark:text-ink-soft-dark">
          {subjects.length} courses in progress
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {subjects.map((s) => {
          const c = colorClasses(s.color);
          return (
            <button
              key={s.id}
              onClick={() => onOpenSubject(s.id)}
              className="group card-surface relative overflow-hidden rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className={`font-mono text-xs ${c.text}`}>{s.code}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold leading-snug">
                    {s.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-soft dark:text-ink-soft-dark">
                    {s.tagline}
                  </p>
                </div>
                <ProgressRing
                  value={s.progress}
                  size={64}
                  strokeWidth={6}
                  colorClass={c.text}
                />
              </div>

              <div className="relative mt-4 flex items-center justify-between border-t border-line dark:border-line-dark pt-3">
                <span className="text-xs text-ink-soft dark:text-ink-soft-dark">
                  {s.goal}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowUpRight size={13} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
