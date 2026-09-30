import { ArrowLeft } from "lucide-react";
import { colorClasses } from "../lib/colors";
import { ProgressRing } from "./ProgressRing";

export function SubjectHeader({ subject, onBack, layoutLabel }) {
  const c = colorClasses(subject.color);
  return (
    <>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm text-ink-soft dark:text-ink-soft-dark hover:text-ink hover:dark:text-ink-dark"
      >
        <ArrowLeft size={15} /> All subjects
      </button>

      <div className="card-surface relative overflow-hidden rounded-sm p-6">
        <span className={`absolute inset-y-0 left-0 w-2 ${c.spine}`} aria-hidden="true" />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative flex flex-col gap-6 pl-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-mono text-xs ${c.text}`}>{subject.code}</span>
              {layoutLabel && (
                <span
                  className={`rounded-sm ${c.bgSoft} px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide ${c.chipText}`}
                >
                  {layoutLabel}
                </span>
              )}
            </div>
            <h1 className="mt-1 font-display text-4xl font-bold uppercase tracking-tight">{subject.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark">
              {subject.vision}
            </p>
          </div>
          <ProgressRing value={subject.progress} size={92} strokeWidth={8} colorClass={c.text} />
        </div>
      </div>
    </>
  );
}
