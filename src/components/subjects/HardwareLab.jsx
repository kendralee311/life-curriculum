import { useMemo, useState } from "react";
import { Cpu, Table2, Trash2 } from "lucide-react";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { useSyncProgress } from "../../lib/useSyncProgress";
import { makeId } from "../../lib/id";
import { HARDWARE_STATES, COMPONENTS_SEED, BOM_SEED } from "../../data/seedData";
import { Button, Divider } from "../../lib/ds";

const stateIndex = (id) => HARDWARE_STATES.findIndex((s) => s.id === id);

export function HardwareLab({ subject }) {
  const [components, setComponents] = useLocalStorage(`lc:components:${subject.id}`, COMPONENTS_SEED);
  const [bom, setBom] = useLocalStorage(`lc:bom:${subject.id}`, BOM_SEED);

  const [compDraft, setCompDraft] = useState({ name: "", description: "" });
  const [bomDraft, setBomDraft] = useState({ part: "", type: "", pinout: "", baud: "", cad: "", notes: "" });

  const progress = useMemo(() => {
    if (components.length === 0) return 0;
    const total = (HARDWARE_STATES.length - 1) * components.length;
    const sum = components.reduce((acc, c) => acc + stateIndex(c.state), 0);
    return Math.round((sum / total) * 100);
  }, [components]);
  useSyncProgress(subject.id, progress);

  function cycleState(id) {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = (stateIndex(c.state) + 1) % HARDWARE_STATES.length;
        return { ...c, state: HARDWARE_STATES[next].id };
      }),
    );
  }

  function deleteComponent(id) {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  }

  function addComponent(e) {
    e.preventDefault();
    if (!compDraft.name.trim()) return;
    setComponents((prev) => [...prev, { id: makeId(), name: compDraft.name.trim(), description: compDraft.description.trim(), state: "concept" }]);
    setCompDraft({ name: "", description: "" });
  }

  function addBomRow(e) {
    e.preventDefault();
    if (!bomDraft.part.trim()) return;
    setBom((prev) => [...prev, { id: makeId(), ...bomDraft }]);
    setBomDraft({ part: "", type: "", pinout: "", baud: "", cad: "", notes: "" });
  }

  function deleteBomRow(id) {
    setBom((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="mt-6 space-y-6">
      <section className="card-surface rounded-sm p-5">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-graphite dark:text-ink-dark" />
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">Component Grid</h2>
        </div>
        <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
          Click a state pill to cycle it forward through the testing log.
        </p>
        <div className="mt-3">
          <Divider />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {components.map((c) => {
            const idx = stateIndex(c.state);
            return (
              <div key={c.id} className="group relative rounded-sm border border-line dark:border-line-dark p-3.5">
                <button
                  onClick={() => deleteComponent(c.id)}
                  className="absolute right-2 top-2 text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-info group-hover:opacity-100"
                  aria-label="Delete component"
                >
                  <Trash2 size={13} />
                </button>
                <h3 className="pr-5 font-display text-lg font-bold uppercase leading-tight">{c.name}</h3>
                <p className="mt-1 text-xs text-ink-soft dark:text-ink-soft-dark">{c.description}</p>

                <div className="mt-3 flex items-center gap-1">
                  {HARDWARE_STATES.map((s, i) => (
                    <span
                      key={s.id}
                      className={`h-1.5 flex-1 rounded-full ${i <= idx ? "bg-graphite dark:bg-accent" : "bg-line dark:bg-line-dark"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => cycleState(c.id)}
                  className="mt-2 w-full rounded-sm bg-graphite-soft dark:bg-graphite px-2 py-1.5 text-left font-mono text-[11px] uppercase tracking-wide text-graphite dark:text-ink-dark hover:opacity-90"
                >
                  {c.state === "prototype-tested" ? "✓ " : ""}
                  {HARDWARE_STATES[idx].label}
                </button>
              </div>
            );
          })}
        </div>

        <form onSubmit={addComponent} className="mt-4 flex flex-wrap gap-2 border-t border-line dark:border-line-dark pt-4">
          <input
            value={compDraft.name}
            onChange={(e) => setCompDraft((d) => ({ ...d, name: e.target.value }))}
            placeholder="New module name…"
            className="min-w-[160px] flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-graphite dark:focus:border-accent"
          />
          <input
            value={compDraft.description}
            onChange={(e) => setCompDraft((d) => ({ ...d, description: e.target.value }))}
            placeholder="One-line description"
            className="min-w-[160px] flex-1 rounded-sm border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-graphite dark:focus:border-accent"
          />
          <Button type="submit" variant="primary">
            Add
          </Button>
        </form>
      </section>

      <section className="card-surface rounded-sm p-5">
        <div className="flex items-center gap-2">
          <Table2 size={16} className="text-graphite dark:text-ink-dark" />
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">Bill of Materials &amp; Pins Log</h2>
        </div>
        <div className="mt-3">
          <Divider />
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-line dark:border-line-dark font-mono uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
                <th className="py-2 pr-3">Part</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Pinout</th>
                <th className="py-2 pr-3">Baud</th>
                <th className="py-2 pr-3">CAD</th>
                <th className="py-2 pr-3">Notes</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {bom.map((row) => (
                <tr key={row.id} className="group border-b border-line dark:border-line-dark">
                  <td className="py-2 pr-3 font-medium">{row.part}</td>
                  <td className="py-2 pr-3 text-ink-soft dark:text-ink-soft-dark">{row.type}</td>
                  <td className="py-2 pr-3 font-mono">{row.pinout}</td>
                  <td className="py-2 pr-3 font-mono">{row.baud}</td>
                  <td className="py-2 pr-3 font-mono">{row.cad}</td>
                  <td className="py-2 pr-3 text-ink-soft dark:text-ink-soft-dark">{row.notes}</td>
                  <td className="py-2">
                    <button
                      onClick={() => deleteBomRow(row.id)}
                      className="text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-info group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={addBomRow} className="mt-4 grid grid-cols-2 gap-2 border-t border-line dark:border-line-dark pt-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["part", "Part"],
            ["type", "Type"],
            ["pinout", "Pinout"],
            ["baud", "Baud"],
            ["cad", "CAD ver."],
            ["notes", "Notes"],
          ].map(([key, placeholder]) => (
            <input
              key={key}
              value={bomDraft[key]}
              onChange={(e) => setBomDraft((d) => ({ ...d, [key]: e.target.value }))}
              placeholder={placeholder}
              className="rounded-sm border border-line dark:border-line-dark bg-transparent px-2 py-1.5 text-xs outline-none focus:border-graphite dark:focus:border-accent"
            />
          ))}
          <div className="col-span-2 sm:col-span-3 lg:col-span-6">
            <Button type="submit" variant="secondary" className="w-full">
              Add row
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
