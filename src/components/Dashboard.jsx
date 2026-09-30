import { DailyFocus } from "./DailyFocus";
import { ProgressOverview } from "./ProgressOverview";
import { SubjectsGrid } from "./SubjectsGrid";

export function Dashboard({ onOpenSubject }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-wide text-primary">Today</span>
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight">A light plan to review.</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyFocus />
        <ProgressOverview />
      </div>

      <SubjectsGrid onOpenSubject={onOpenSubject} />
    </div>
  );
}
