import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { ALL_TAGS } from "../data/seedData";
import { TagPill } from "./TagPill";

export function QuickCapture() {
  const { subjects, addNote } = useApp();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [tags, setTags] = useState([]);

  function toggleTag(tag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    addNote(subjectId, { content, tags });
    setContent("");
    setTags([]);
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-medium text-white shadow-lg hover:opacity-90"
      >
        <Sparkles size={16} />
        Capture idea
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="card-surface w-full max-w-md rounded-2xl p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Quick capture</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <textarea
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Whatever's in your head right now…"
                rows={3}
                className="w-full resize-none rounded-lg border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full rounded-lg border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-brand"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} — {s.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <TagPill key={tag} tag={tag} active={tags.includes(tag)} onClick={() => toggleTag(tag)} />
                ))}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-brand py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Save to subject
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
