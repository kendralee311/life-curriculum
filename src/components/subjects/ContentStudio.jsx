import { useMemo, useState } from "react";
import { Lightbulb, PenLine, Plus } from "lucide-react";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { useSyncProgress } from "../../lib/useSyncProgress";
import { makeId } from "../../lib/id";
import { IDEA_INCUBATOR_SEED, PIPELINE_STAGES, PIPELINE_SEED, SCRATCHPAD_SEED } from "../../data/seedData";
import { Button, Divider } from "../../lib/ds";

const SUBTASK_LABELS = { hook: "Hook", broll: "B-roll list", voiceover: "Voiceover", thumbnail: "Thumbnail" };
const FORMAT_TAGS = ["#short-form", "#vlog", "#dev-log"];

export function ContentStudio({ subject }) {
  const [ideas, setIdeas] = useLocalStorage(`lc:ideas:${subject.id}`, IDEA_INCUBATOR_SEED);
  const [cards, setCards] = useLocalStorage(`lc:pipeline:${subject.id}`, PIPELINE_SEED);
  const [scratch, setScratch] = useLocalStorage(`lc:scratchpad:${subject.id}`, SCRATCHPAD_SEED);

  const [ideaDraft, setIdeaDraft] = useState("");
  const [scratchDraft, setScratchDraft] = useState("");
  const [cardDraft, setCardDraft] = useState({ title: "", formatTag: FORMAT_TAGS[0] });

  const progress = useMemo(() => {
    if (cards.length === 0) return 0;
    const published = cards.filter((c) => c.stage === "published").length;
    return Math.round((published / cards.length) * 100);
  }, [cards]);
  useSyncProgress(subject.id, progress);

  function addIdea(e) {
    e.preventDefault();
    if (!ideaDraft.trim()) return;
    setIdeas((prev) => [{ id: makeId(), text: ideaDraft.trim() }, ...prev]);
    setIdeaDraft("");
  }

  function promoteIdea(idea) {
    setCards((prev) => [
      ...prev,
      { id: makeId(), title: idea.text, formatTag: FORMAT_TAGS[0], stage: "idea", subtasks: { hook: false, broll: false, voiceover: false, thumbnail: false } },
    ]);
    setIdeas((prev) => prev.filter((i) => i.id !== idea.id));
  }

  function addScratch(e) {
    e.preventDefault();
    if (!scratchDraft.trim()) return;
    setScratch((prev) => [{ id: makeId(), text: scratchDraft.trim(), createdAt: new Date().toISOString() }, ...prev]);
    setScratchDraft("");
  }

  function addCard(e) {
    e.preventDefault();
    if (!cardDraft.title.trim()) return;
    setCards((prev) => [
      ...prev,
      {
        id: makeId(),
        title: cardDraft.title.trim(),
        formatTag: cardDraft.formatTag,
        stage: "idea",
        subtasks: { hook: false, broll: false, voiceover: false, thumbnail: false },
      },
    ]);
    setCardDraft({ title: "", formatTag: FORMAT_TAGS[0] });
  }

  function setStage(cardId, stage) {
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, stage } : c)));
  }

  function toggleSubtask(cardId, key) {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, subtasks: { ...c.subtasks, [key]: !c.subtasks[key] } } : c)),
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="card-surface rounded-sm p-5">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-info" />
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">Idea Incubator</h2>
          </div>
          <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">Raw ideas before they earn a spot on the board.</p>
          <div className="mt-3">
            <Divider />
          </div>
          <form onSubmit={addIdea} className="mt-3 flex gap-2">
            <input
              value={ideaDraft}
              onChange={(e) => setIdeaDraft(e.target.value)}
              placeholder="Whatever's in your head…"
              className="flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-info"
            />
            <button type="submit" className="rounded-sm bg-info px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <Plus size={15} />
            </button>
          </form>
          <ul className="mt-3 space-y-2">
            {ideas.map((idea) => (
              <li key={idea.id} className="group flex items-start justify-between gap-2 rounded-sm border border-line dark:border-line-dark px-3 py-2">
                <span className="text-sm">{idea.text}</span>
                <button
                  onClick={() => promoteIdea(idea)}
                  className="shrink-0 rounded-sm border border-info px-2 py-0.5 text-[10px] font-mono uppercase text-info opacity-0 transition-opacity group-hover:opacity-100"
                >
                  → board
                </button>
              </li>
            ))}
            {ideas.length === 0 && (
              <li className="rounded-sm border border-dashed border-line dark:border-line-dark px-3 py-6 text-center text-sm text-ink-soft dark:text-ink-soft-dark">
                Empty — capture your next idea above.
              </li>
            )}
          </ul>
        </section>

        <section className="card-surface rounded-sm p-5">
          <div className="flex items-center gap-2">
            <PenLine size={16} className="text-info" />
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">Hook & Script Scratchpad</h2>
          </div>
          <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">Script snippets or titles, captured the moment they hit.</p>
          <form onSubmit={addScratch} className="mt-3 flex gap-2">
            <textarea
              value={scratchDraft}
              onChange={(e) => setScratchDraft(e.target.value)}
              placeholder="Type the line before you lose it…"
              rows={2}
              className="flex-1 resize-none rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-info"
            />
            <button type="submit" className="rounded-sm bg-info px-3 py-2 text-sm font-medium text-white hover:opacity-90 self-start">
              <Plus size={15} />
            </button>
          </form>
          <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
            {scratch.map((s) => (
              <li key={s.id} className="rounded-sm border border-line dark:border-line-dark px-3 py-2 text-sm italic">
                “{s.text}”
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card-surface rounded-sm p-5">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Production Pipeline</h2>
        <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">Idea → Scripted → Filming → Editing → Scheduled → Published.</p>
        <div className="mt-3">
          <Divider />
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage) => {
            const stageCards = cards.filter((c) => c.stage === stage.id);
            return (
              <div key={stage.id} className="w-56 shrink-0 rounded-sm border border-line dark:border-line-dark bg-paper dark:bg-paper-dark p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
                    {stage.label}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft dark:text-ink-soft-dark">{stageCards.length}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {stageCards.map((card) => (
                    <div key={card.id} className="card-surface rounded-sm p-2.5">
                      <span className="inline-block rounded-sm bg-info-soft px-1.5 py-0.5 font-mono text-[10px] text-info">
                        {card.formatTag}
                      </span>
                      <p className="mt-1.5 text-xs leading-snug">{card.title}</p>
                      <div className="mt-2 space-y-1">
                        {Object.entries(SUBTASK_LABELS).map(([key, label]) => (
                          <label key={key} className="flex items-center gap-1.5 text-[11px] text-ink-soft dark:text-ink-soft-dark">
                            <input
                              type="checkbox"
                              checked={card.subtasks[key]}
                              onChange={() => toggleSubtask(card.id, key)}
                              className="accent-info"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                      <select
                        value={card.stage}
                        onChange={(e) => setStage(card.id, e.target.value)}
                        className="mt-2 w-full rounded-sm border border-line dark:border-line-dark bg-transparent px-1.5 py-1 text-[11px] outline-none focus:border-info"
                      >
                        {PIPELINE_STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  {stageCards.length === 0 && (
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
            value={cardDraft.title}
            onChange={(e) => setCardDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="New piece of content…"
            className="min-w-[160px] flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-info"
          />
          <select
            value={cardDraft.formatTag}
            onChange={(e) => setCardDraft((d) => ({ ...d, formatTag: e.target.value }))}
            className="rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-info"
          >
            {FORMAT_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <Button type="submit" variant="primary">
            Add
          </Button>
        </form>
      </section>
    </div>
  );
}
