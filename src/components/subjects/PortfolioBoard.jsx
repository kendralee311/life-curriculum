import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Plus, Trash2, Users } from "lucide-react";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { useSyncProgress } from "../../lib/useSyncProgress";
import { makeId } from "../../lib/id";
import { KANBAN_COLUMNS, KANBAN_SEED, SPEC_SHEET_SEED } from "../../data/seedData";
import { TagPill } from "../TagPill";

export function PortfolioBoard({ subject }) {
  const [cards, setCards] = useLocalStorage(`lc:kanban:${subject.id}`, KANBAN_SEED);
  const [spec, setSpec] = useLocalStorage(`lc:spec:${subject.id}`, SPEC_SHEET_SEED);
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [column, setColumn] = useState(KANBAN_COLUMNS[0].id);
  const [pkgDraft, setPkgDraft] = useState({ name: "", price: "", desc: "" });
  const [pageDraft, setPageDraft] = useState("");

  const progress = useMemo(() => {
    if (cards.length === 0) return 0;
    const live = cards.filter((c) => c.column === "live").length;
    return Math.round((live / cards.length) * 100);
  }, [cards]);
  useSyncProgress(subject.id, progress);

  function moveCard(cardId, dir) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const idx = KANBAN_COLUMNS.findIndex((col) => col.id === c.column);
        const nextIdx = Math.min(KANBAN_COLUMNS.length - 1, Math.max(0, idx + dir));
        return { ...c, column: KANBAN_COLUMNS[nextIdx].id };
      }),
    );
  }

  function deleteCard(cardId) {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }

  function addCard(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const tags = tagInput
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));
    setCards((prev) => [...prev, { id: makeId(), title: title.trim(), tags, column }]);
    setTitle("");
    setTagInput("");
  }

  function addPackage(e) {
    e.preventDefault();
    if (!pkgDraft.name.trim()) return;
    setSpec((prev) => ({ ...prev, packages: [...prev.packages, { id: makeId(), ...pkgDraft }] }));
    setPkgDraft({ name: "", price: "", desc: "" });
  }

  function removePackage(id) {
    setSpec((prev) => ({ ...prev, packages: prev.packages.filter((p) => p.id !== id) }));
  }

  function addPage(e) {
    e.preventDefault();
    if (!pageDraft.trim()) return;
    setSpec((prev) => ({ ...prev, architecture: [...prev.architecture, pageDraft.trim()] }));
    setPageDraft("");
  }

  function removePage(idx) {
    setSpec((prev) => ({ ...prev, architecture: prev.architecture.filter((_, i) => i !== idx) }));
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <section className="card-surface rounded-sm p-5">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Delivery Pipeline</h2>
        <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
          Kanban board — drag isn't wired up, use the arrows to move cards through the pipeline.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {KANBAN_COLUMNS.map((col) => {
            const colCards = cards.filter((c) => c.column === col.id);
            return (
              <div key={col.id} className="rounded-sm border border-line dark:border-line-dark bg-paper dark:bg-paper-dark p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
                    {col.label}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft dark:text-ink-soft-dark">{colCards.length}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {colCards.map((card) => {
                    const idx = KANBAN_COLUMNS.findIndex((c) => c.id === card.column);
                    return (
                      <div key={card.id} className="group card-surface rounded-sm p-2.5">
                        <p className="text-xs leading-snug">{card.title}</p>
                        {card.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {card.tags.map((t) => (
                              <TagPill key={t} tag={t} />
                            ))}
                          </div>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex gap-1">
                            <button
                              onClick={() => moveCard(card.id, -1)}
                              disabled={idx === 0}
                              className="rounded-sm border border-line dark:border-line-dark p-0.5 disabled:opacity-30"
                              aria-label="Move left"
                            >
                              <ChevronLeft size={12} />
                            </button>
                            <button
                              onClick={() => moveCard(card.id, 1)}
                              disabled={idx === KANBAN_COLUMNS.length - 1}
                              className="rounded-sm border border-line dark:border-line-dark p-0.5 disabled:opacity-30"
                              aria-label="Move right"
                            >
                              <ChevronRight size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-info group-hover:opacity-100"
                            aria-label="Delete card"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {colCards.length === 0 && (
                    <p className="rounded-sm border border-dashed border-line dark:border-line-dark px-2 py-4 text-center text-[11px] text-ink-soft dark:text-ink-soft-dark">
                      Empty
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={addCard} className="mt-4 flex flex-wrap gap-2 border-t border-line dark:border-line-dark pt-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New deliverable…"
            className="min-w-[160px] flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="#tags"
            className="w-32 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-primary"
          >
            {KANBAN_COLUMNS.map((col) => (
              <option key={col.id} value={col.id}>
                {col.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="flex items-center gap-1 rounded-sm bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <Plus size={15} />
            Add
          </button>
        </form>
      </section>

      <aside className="card-surface h-fit rounded-sm p-5 lg:sticky lg:top-20">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">Project Spec Sheet</h2>
        </div>

        <div className="mt-4">
          <h3 className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
            <Users size={12} /> Target Client Avatar
          </h3>
          <textarea
            value={spec.clientAvatar}
            onChange={(e) => setSpec((prev) => ({ ...prev, clientAvatar: e.target.value }))}
            rows={4}
            className="mt-1.5 w-full resize-none rounded-sm border border-line dark:border-line-dark bg-transparent px-2.5 py-2 text-xs leading-relaxed outline-none focus:border-primary"
          />
        </div>

        <div className="mt-5">
          <h3 className="font-mono text-[11px] uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
            Service Packages
          </h3>
          <div className="mt-1.5 space-y-1.5">
            {spec.packages.map((p) => (
              <div key={p.id} className="group flex items-start justify-between gap-2 rounded-sm border border-line dark:border-line-dark px-2.5 py-1.5">
                <div>
                  <p className="text-xs font-semibold">
                    {p.name} <span className="font-mono text-primary">{p.price}</span>
                  </p>
                  <p className="text-[11px] text-ink-soft dark:text-ink-soft-dark">{p.desc}</p>
                </div>
                <button
                  onClick={() => removePackage(p.id)}
                  className="mt-0.5 text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-info group-hover:opacity-100"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={addPackage} className="mt-2 grid grid-cols-[1fr_60px] gap-1.5">
            <input
              value={pkgDraft.name}
              onChange={(e) => setPkgDraft((p) => ({ ...p, name: e.target.value }))}
              placeholder="Tier name"
              className="rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-1.5 text-xs outline-none focus:border-primary"
            />
            <input
              value={pkgDraft.price}
              onChange={(e) => setPkgDraft((p) => ({ ...p, price: e.target.value }))}
              placeholder="$"
              className="rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-1.5 text-xs outline-none focus:border-primary"
            />
            <input
              value={pkgDraft.desc}
              onChange={(e) => setPkgDraft((p) => ({ ...p, desc: e.target.value }))}
              placeholder="What's included"
              className="col-span-2 rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-1.5 text-xs outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="col-span-2 rounded-sm bg-primary py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              + Add package
            </button>
          </form>
        </div>

        <div className="mt-5">
          <h3 className="font-mono text-[11px] uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
            Site Architecture
          </h3>
          <ul className="mt-1.5 space-y-1">
            {spec.architecture.map((page, i) => (
              <li key={page + i} className="group flex items-center justify-between rounded-sm border border-line dark:border-line-dark px-2.5 py-1 text-xs">
                <span className="font-mono text-ink-soft dark:text-ink-soft-dark">{i + 1}.</span>
                <span className="flex-1 px-2">{page}</span>
                <button
                  onClick={() => removePage(i)}
                  className="text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-info group-hover:opacity-100"
                >
                  <Trash2 size={11} />
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addPage} className="mt-2 flex gap-1.5">
            <input
              value={pageDraft}
              onChange={(e) => setPageDraft(e.target.value)}
              placeholder="Add page"
              className="flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-1.5 text-xs outline-none focus:border-primary"
            />
            <button type="submit" className="rounded-sm bg-primary px-2.5 py-1.5 text-xs font-medium text-white hover:opacity-90">
              +
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
