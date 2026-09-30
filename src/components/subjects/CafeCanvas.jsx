import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Images, Trash2 } from "lucide-react";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { useSyncProgress } from "../../lib/useSyncProgress";
import { makeId } from "../../lib/id";
import { ZONE_DEFS, ZONES_SEED, ASSET_VAULT_SEED } from "../../data/seedData";
import { TagPill } from "../TagPill";
import { Button, Divider } from "../../lib/ds";

// Solid pastel tones (no dark: opacity variants — Tailwind's cascade
// doesn't reliably order a solid base class against an opacity-modified
// dark: sibling, so these stay identical across themes and pair with a
// fixed dark text color below).
const TILE_TONES = ["bg-secondary", "bg-info-soft", "bg-accent-soft", "bg-graphite-soft"];

export function CafeCanvas({ subject }) {
  const [zones, setZones] = useLocalStorage(`lc:zones:${subject.id}`, ZONES_SEED);
  const [vault, setVault] = useLocalStorage(`lc:vault:${subject.id}`, ASSET_VAULT_SEED);
  const [selected, setSelected] = useState(ZONE_DEFS[0].id);
  const [milestoneDraft, setMilestoneDraft] = useState("");
  const [assetDraft, setAssetDraft] = useState({ title: "", note: "", tag: "#spatial-layout", imageUrl: "" });

  const progress = useMemo(() => {
    const all = Object.values(zones).flatMap((z) => z.milestones);
    if (all.length === 0) return 0;
    return Math.round((all.filter((m) => m.done).length / all.length) * 100);
  }, [zones]);
  useSyncProgress(subject.id, progress);

  const activeZone = zones[selected];

  function toggleMilestone(zoneId, milestoneId) {
    setZones((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        milestones: prev[zoneId].milestones.map((m) => (m.id === milestoneId ? { ...m, done: !m.done } : m)),
      },
    }));
  }

  function addMilestone(e) {
    e.preventDefault();
    if (!milestoneDraft.trim()) return;
    setZones((prev) => ({
      ...prev,
      [selected]: {
        ...prev[selected],
        milestones: [...prev[selected].milestones, { id: makeId(), label: milestoneDraft.trim(), done: false }],
      },
    }));
    setMilestoneDraft("");
  }

  function addAsset(e) {
    e.preventDefault();
    if (!assetDraft.title.trim()) return;
    setVault((prev) => [{ id: makeId(), ...assetDraft }, ...prev]);
    setAssetDraft({ title: "", note: "", tag: assetDraft.tag, imageUrl: "" });
  }

  function deleteAsset(id) {
    setVault((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="mt-6 space-y-6">
      <section className="card-surface rounded-sm p-5">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Spatial Zone Map</h2>
        <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
          Four operational pillars of the commune — select a tile to work its milestones.
        </p>
        <div className="mt-3">
          <Divider />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ZONE_DEFS.map((zone, i) => {
            const z = zones[zone.id];
            const done = z.milestones.filter((m) => m.done).length;
            const isActive = selected === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelected(zone.id)}
                className={`rounded-sm border p-4 text-left transition-all ${TILE_TONES[i]} ${
                  isActive ? "border-graphite dark:border-accent ring-1 ring-graphite dark:ring-accent" : "border-line dark:border-line-dark"
                }`}
              >
                <h3 className="font-display text-lg font-bold uppercase leading-tight text-graphite">
                  {zone.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-graphite/70">
                  {done}/{z.milestones.length} milestones
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {z.tags.map((t) => (
                    <TagPill key={t} tag={t} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {activeZone && (
          <div className="mt-4 rounded-sm border border-line dark:border-line-dark p-4">
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
              {ZONE_DEFS.find((z) => z.id === selected)?.title} — milestones
            </h3>
            <ul className="mt-2 space-y-1.5">
              {activeZone.milestones.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => toggleMilestone(selected, m.id)}
                    className="flex w-full items-center gap-2.5 rounded-sm border border-line dark:border-line-dark px-3 py-2 text-left hover:border-graphite dark:hover:border-accent"
                  >
                    {m.done ? (
                      <CheckCircle2 size={16} className="text-graphite dark:text-accent" />
                    ) : (
                      <Circle size={16} className="text-ink-soft dark:text-ink-soft-dark" />
                    )}
                    <span className={`text-sm ${m.done ? "text-ink-soft dark:text-ink-soft-dark line-through" : ""}`}>
                      {m.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={addMilestone} className="mt-2 flex gap-2">
              <input
                value={milestoneDraft}
                onChange={(e) => setMilestoneDraft(e.target.value)}
                placeholder="Add a vision milestone…"
                className="flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-1.5 text-sm outline-none focus:border-graphite dark:focus:border-accent"
              />
              <Button type="submit" variant="secondary">
                Add
              </Button>
            </form>
          </div>
        )}
      </section>

      <section className="card-surface rounded-sm p-5">
        <div className="flex items-center gap-2">
          <Images size={16} className="text-graphite dark:text-ink-dark" />
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">Asset &amp; Inspiration Vault</h2>
        </div>
        <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
          Photos, spatial layouts, and furniture concepts — paste an image URL or just drop a note.
        </p>
        <div className="mt-3">
          <Divider />
        </div>

        <form onSubmit={addAsset} className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            value={assetDraft.title}
            onChange={(e) => setAssetDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="Title"
            className="rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-graphite dark:focus:border-accent"
          />
          <input
            value={assetDraft.imageUrl}
            onChange={(e) => setAssetDraft((d) => ({ ...d, imageUrl: e.target.value }))}
            placeholder="Image URL (optional)"
            className="rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-graphite dark:focus:border-accent"
          />
          <input
            value={assetDraft.note}
            onChange={(e) => setAssetDraft((d) => ({ ...d, note: e.target.value }))}
            placeholder="Note"
            className="sm:col-span-2 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-graphite dark:focus:border-accent"
          />
          <select
            value={assetDraft.tag}
            onChange={(e) => setAssetDraft((d) => ({ ...d, tag: e.target.value }))}
            className="rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-graphite dark:focus:border-accent"
          >
            {["#furniture-mechanism", "#spatial-layout", "#lighting", "#community-format"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Add to vault
          </Button>
        </form>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vault.map((a) => (
            <div key={a.id} className="group overflow-hidden rounded-sm border border-line dark:border-line-dark">
              {a.imageUrl ? (
                <img src={a.imageUrl} alt={a.title} className="h-32 w-full object-cover" />
              ) : (
                <div className="flex h-32 w-full items-center justify-center bg-accent-soft dark:bg-graphite">
                  <Images size={22} className="text-ink-soft dark:text-ink-soft-dark" />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{a.title}</h3>
                  <button
                    onClick={() => deleteAsset(a.id)}
                    className="shrink-0 text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-info group-hover:opacity-100"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <p className="mt-1 text-xs text-ink-soft dark:text-ink-soft-dark">{a.note}</p>
                <div className="mt-2">
                  <TagPill tag={a.tag} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
