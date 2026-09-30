import { colorClasses } from "../lib/colors";
import { ProgressRing } from "./ProgressRing";

export function BookCard({ subject, onOpen }) {
  const c = colorClasses(subject.color);

  return (
    <button
      onClick={() => onOpen(subject.id)}
      style={{ transformOrigin: "bottom center" }}
      className="group relative flex h-64 w-48 shrink-0 flex-col overflow-hidden rounded-sm border border-line dark:border-line-dark bg-paper-raised dark:bg-paper-raised-dark text-left shadow-md transition-transform duration-200 ease-out hover:-translate-y-2 hover:rotate-[-1.5deg] hover:shadow-xl"
    >
      <span className={`absolute inset-y-0 left-0 w-3.5 ${c.spine}`} aria-hidden="true" />
      <span
        className="book-pages absolute inset-y-1 right-0 w-1.5 bg-paper dark:bg-paper-dark"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between py-4 pl-7 pr-3.5">
        <div>
          <span className={`font-mono text-[10px] tracking-wide ${c.text}`}>{subject.code}</span>
          <h3 className="mt-2 font-display text-xl font-bold uppercase leading-[1.1] tracking-tight">
            {subject.shortName ?? subject.name}
          </h3>
        </div>

        <div className="flex items-end justify-between gap-2">
          <p className="text-[11px] leading-snug text-ink-soft dark:text-ink-soft-dark line-clamp-3">
            {subject.tagline}
          </p>
          <ProgressRing
            value={subject.progress}
            size={40}
            strokeWidth={4}
            colorClass={c.text}
            labelClass="font-mono text-[10px] font-semibold leading-none"
          />
        </div>
      </div>
    </button>
  );
}
