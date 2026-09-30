import { X } from "lucide-react";
import { TagPill } from "./TagPill";

export function NoteCard({ note, onDelete }) {
  return (
    <div className="group card-surface relative rounded-xl p-4">
      <button
        onClick={onDelete}
        aria-label="Delete note"
        className="absolute right-2 top-2 text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-clay group-hover:opacity-100"
      >
        <X size={14} />
      </button>
      <p className="pr-5 text-sm leading-relaxed">{note.content}</p>
      {note.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {note.tags.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
        </div>
      )}
    </div>
  );
}
