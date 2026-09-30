import { useState } from "react";
import { Check, ListTodo, Plus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { colorClasses, PRIORITY_STYLES } from "../lib/colors";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export function DailyFocus() {
  const { tasks, subjects, toggleTask, addTask, deleteTask, clearCompletedTasks } = useApp();
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "");
  const [priority, setPriority] = useState("medium");

  const sorted = [...tasks]
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
    .slice(0, 5);

  const completedCount = tasks.filter((t) => t.done).length;

  function subjectFor(id) {
    return subjects.find((s) => s.id === id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTask({ title, subjectId, priority });
    setTitle("");
  }

  return (
    <section className="card-surface rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListTodo size={18} className="text-brand" />
          <h2 className="font-display text-lg font-semibold">Today's Class Schedule</h2>
        </div>
        {completedCount > 0 && (
          <button
            onClick={clearCompletedTasks}
            className="text-xs font-mono text-ink-soft dark:text-ink-soft-dark hover:text-clay"
          >
            clear {completedCount} done
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
        Top priorities across every subject — check them off as you go.
      </p>

      <ul className="mt-4 space-y-2">
        {sorted.map((task) => {
          const subject = subjectFor(task.subjectId);
          const pri = PRIORITY_STYLES[task.priority];
          const c = colorClasses(subject?.color);
          return (
            <li
              key={task.id}
              className={`group flex items-center gap-3 rounded-xl border border-line dark:border-line-dark px-3 py-2.5 ${
                task.done ? "opacity-50" : ""
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                aria-label="Toggle done"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  task.done
                    ? "border-brand bg-brand text-white"
                    : "border-line dark:border-line-dark"
                }`}
              >
                {task.done && <Check size={13} strokeWidth={3} />}
              </button>

              <span className={`flex-1 text-sm ${task.done ? "line-through" : ""}`}>
                {task.title}
              </span>

              {subject && (
                <span
                  className={`hidden sm:inline-flex items-center gap-1.5 rounded-full ${c.bgSoft} px-2 py-0.5 text-[11px] font-mono ${c.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                  {subject.code}
                </span>
              )}

              <span className={`rounded-full ${pri.bg} px-2 py-0.5 text-[11px] font-medium ${pri.text}`}>
                {pri.label}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                className="text-ink-soft dark:text-ink-soft-dark opacity-0 transition-opacity hover:text-clay group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </li>
          );
        })}
        {sorted.length === 0 && (
          <li className="rounded-xl border border-dashed border-line dark:border-line-dark px-3 py-6 text-center text-sm text-ink-soft dark:text-ink-soft-dark">
            No priorities queued — add your first below.
          </li>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-2 border-t border-line dark:border-line-dark pt-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a high-impact task for today…"
          className="min-w-[180px] flex-1 rounded-lg border border-line dark:border-line-dark bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="rounded-lg border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-brand"
        >
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.code}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border border-line dark:border-line-dark bg-transparent px-2 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-1 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={15} />
          Add
        </button>
      </form>
    </section>
  );
}
