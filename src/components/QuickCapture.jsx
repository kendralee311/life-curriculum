import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export function QuickCapture() {
  const { subjects, addTask } = useApp();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, subjectId, priority });
    setTitle("");
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:opacity-90"
      >
        <Sparkles size={16} />
        Capture idea
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="card-surface w-full max-w-md rounded-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight">Quick capture</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-xs text-ink-soft dark:text-ink-soft-dark">
              Drops straight into Today's Class Schedule — sort out the details later.
            </p>
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <textarea
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Whatever's in your head right now…"
                rows={3}
                className="w-full resize-none rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-primary"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} — {s.name}
                  </option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="high">High priority</option>
                <option value="medium">Medium priority</option>
                <option value="low">Low priority</option>
              </select>
              <button type="submit" className="w-full rounded-sm bg-primary py-2 text-sm font-medium text-white hover:opacity-90">
                Add to schedule
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
