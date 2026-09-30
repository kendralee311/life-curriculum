import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, PenLine, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { colorClasses } from "../lib/colors";
import { ALL_TAGS } from "../data/seedData";
import { TagPill } from "./TagPill";
import { NoteCard } from "./NoteCard";
import { ProgressRing } from "./ProgressRing";

const TABS = ["Overview", "Scratchpad"];

export function SubjectDetail({ subjectId, onBack }) {
  const { subjects, addNote, deleteNote, toggleMilestone } = useApp();
  const subject = subjects.find((s) => s.id === subjectId);
  const [tab, setTab] = useState("Overview");
  const [draft, setDraft] = useState("");
  const [draftTags, setDraftTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const c = colorClasses(subject?.color);

  const filteredNotes = useMemo(() => {
    if (!subject) return [];
    if (!activeFilter) return subject.notes;
    return subject.notes.filter((n) => n.tags?.includes(activeFilter));
  }, [subject, activeFilter]);

  if (!subject) return null;

  function toggleDraftTag(tag) {
    setDraftTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNote(subject.id, { content: draft, tags: draftTags });
    setDraft("");
    setDraftTags([]);
  }

  return (
    <section>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm text-ink-soft dark:text-ink-soft-dark hover:text-ink hover:dark:text-ink-dark"
      >
        <ArrowLeft size={15} /> All subjects
      </button>

      <div className="card-surface relative overflow-hidden rounded-2xl p-6">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className={`font-mono text-xs ${c.text}`}>{subject.code}</span>
            <h1 className="mt-1 font-display text-3xl font-semibold">{subject.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark">
              {subject.vision}
            </p>
          </div>
          <ProgressRing value={subject.progress} size={92} strokeWidth={8} colorClass={c.text} />
        </div>
      </div>

      <div className="mt-6 flex gap-1 rounded-full border border-line dark:border-line-dark p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-brand text-white"
                : "text-ink-soft dark:text-ink-soft-dark hover:text-ink hover:dark:text-ink-dark"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="mt-5 card-surface rounded-2xl p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Milestones toward: {subject.goal}</h2>
          <ul className="mt-4 space-y-2">
            {subject.milestones.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => toggleMilestone(subject.id, m.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-line dark:border-line-dark px-3 py-2.5 text-left hover:border-brand"
                >
                  {m.done ? (
                    <CheckCircle2 size={18} className={c.text} />
                  ) : (
                    <Circle size={18} className="text-ink-soft dark:text-ink-soft-dark" />
                  )}
                  <span className={`text-sm ${m.done ? "line-through text-ink-soft dark:text-ink-soft-dark" : ""}`}>
                    {m.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Scratchpad" && (
        <div className="mt-5">
          <div className="card-surface rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <PenLine size={17} className={c.text} />
              <h2 className="font-display text-lg font-semibold">Card wall</h2>
            </div>
            <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
              Raw notes, hardware ideas, UI concepts, content hooks — capture fast, tag later.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-b border-line dark:border-line-dark pb-5">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Drop a raw idea here…"
                rows={2}
                className="w-full resize-none rounded-lg border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <div className="flex flex-wrap items-center gap-2">
                {ALL_TAGS.map((tag) => (
                  <TagPill
                    key={tag}
                    tag={tag}
                    active={draftTags.includes(tag)}
                    onClick={() => toggleDraftTag(tag)}
                  />
                ))}
                <button
                  type="submit"
                  className="ml-auto flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                >
                  <Plus size={14} /> Add card
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-ink-soft dark:text-ink-soft-dark">filter:</span>
              <TagPill tag="All" active={!activeFilter} onClick={() => setActiveFilter(null)} />
              {ALL_TAGS.map((tag) => (
                <TagPill
                  key={tag}
                  tag={tag}
                  active={activeFilter === tag}
                  onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={() => deleteNote(subject.id, note.id)}
                />
              ))}
              {filteredNotes.length === 0 && (
                <div className="col-span-full rounded-xl border border-dashed border-line dark:border-line-dark px-3 py-8 text-center text-sm text-ink-soft dark:text-ink-soft-dark">
                  No cards yet for this filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
