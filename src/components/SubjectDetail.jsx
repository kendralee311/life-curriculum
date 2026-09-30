import { useApp } from "../context/AppContext";
import { SubjectHeader } from "./SubjectHeader";
import { PortfolioBoard } from "./subjects/PortfolioBoard";
import { ContentStudio } from "./subjects/ContentStudio";
import { HardwareLab } from "./subjects/HardwareLab";
import { CafeCanvas } from "./subjects/CafeCanvas";

const LAYOUTS = {
  "portfolio-web": { Component: PortfolioBoard, label: "Kanban Pipeline" },
  content: { Component: ContentStudio, label: "Content Funnel" },
  hardware: { Component: HardwareLab, label: "Lab Workbench" },
  cafe: { Component: CafeCanvas, label: "Spatial Canvas" },
};

export function SubjectDetail({ subjectId, onBack }) {
  const { subjects } = useApp();
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return null;

  const layout = LAYOUTS[subject.id];
  const Layout = layout?.Component;

  return (
    <section>
      <SubjectHeader subject={subject} onBack={onBack} layoutLabel={layout?.label} />
      {Layout && <Layout subject={subject} />}
    </section>
  );
}
