export function TagPill({ tag, active, onClick, size = "sm" }) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={`${sizeClass} font-mono rounded-sm border transition-colors ${
        active
          ? "border-primary bg-primary text-white dark:border-primary"
          : "border-line dark:border-line-dark text-ink-soft dark:text-ink-soft-dark hover:border-primary hover:text-primary"
      }`}
    >
      {tag}
    </Comp>
  );
}
