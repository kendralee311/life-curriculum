import { useEffect } from "react";
import { useApp } from "../context/AppContext";

// Lets a bespoke subject layout compute its own progress number and report
// it up to the shared subjects list (used by Home's overview + book covers).
export function useSyncProgress(subjectId, progress) {
  const { updateSubjectProgress } = useApp();
  useEffect(() => {
    updateSubjectProgress(subjectId, progress);
  }, [subjectId, progress, updateSubjectProgress]);
}
