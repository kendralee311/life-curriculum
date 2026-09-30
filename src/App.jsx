import { useEffect, useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Nav } from "./components/Nav";
import { Dashboard } from "./components/Dashboard";
import { SubjectsGrid } from "./components/SubjectsGrid";
import { SubjectDetail } from "./components/SubjectDetail";
import { QuickCapture } from "./components/QuickCapture";

function Shell() {
  const { theme } = useApp();
  const [view, setView] = useState("home");
  const [subjectId, setSubjectId] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function openSubject(id) {
    setSubjectId(id);
    setView("subject");
  }

  function navigate(next) {
    setView(next);
    if (next !== "subject") setSubjectId(null);
  }

  return (
    <div className="min-h-screen bg-dot-grid">
      <Nav view={view} onNavigate={navigate} />
      <main className="mx-auto max-w-6xl px-5 py-8">
        {view === "home" && <Dashboard onOpenSubject={openSubject} />}
        {view === "subjects" && <SubjectsGrid onOpenSubject={openSubject} />}
        {view === "subject" && subjectId && (
          <SubjectDetail subjectId={subjectId} onBack={() => navigate("subjects")} />
        )}
      </main>
      <QuickCapture />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
