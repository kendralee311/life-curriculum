import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Award } from "lucide-react";
import { useApp } from "../context/AppContext";
import { ProgressRing } from "./ProgressRing";
import { colorClasses } from "../lib/colors";
import { Divider } from "../lib/ds";

export function ProgressOverview() {
  const { subjects } = useApp();

  const overall = Math.round(
    subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length,
  );

  const radarData = subjects.map((s) => ({
    subject: s.code,
    progress: s.progress,
    fullMark: 100,
  }));

  return (
    <section className="card-surface rounded-sm p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Award size={18} className="text-primary" />
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Graduation Credits</h2>
      </div>
      <p className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
        Overall progress toward launching the business and building the venue.
      </p>
      <div className="mt-3">
        <Divider />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex justify-center">
          <ProgressRing
            value={overall}
            size={128}
            strokeWidth={10}
            colorClass="text-primary"
            sublabel="Overall"
          />
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="75%">
              <PolarGrid stroke="currentColor" className="text-line dark:text-line-dark" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fontFamily: "IBM Plex Mono, monospace", fill: "currentColor" }}
                className="text-ink-soft dark:text-ink-soft-dark"
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="progress"
                stroke="#0a4084"
                fill="#0a4084"
                fillOpacity={0.35}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {subjects.map((s) => {
          const c = colorClasses(s.color);
          return (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-xs text-ink-soft dark:text-ink-soft-dark">
                {s.code}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper dark:bg-paper-dark border border-line dark:border-line-dark">
                <div
                  className={`h-full rounded-full ${c.bg}`}
                  style={{ width: `${s.progress}%`, transition: "width 0.5s ease" }}
                />
              </div>
              <span className="w-10 text-right text-xs font-mono text-ink-soft dark:text-ink-soft-dark">
                {s.progress}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
