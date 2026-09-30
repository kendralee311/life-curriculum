export function TagPill({ tag, active, onClick, size = "sm" }) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={`${sizeClass} font-mono rounded-full border transition-colors ${
        active
          ? "border-brand bg-brand text-white dark:border-brand"
          : "border-line dark:border-line-dark text-ink-soft dark:text-ink-soft-dark hover:border-brand hover:text-brand"
      }`}
    >
      {tag}
    </Comp>
  );
}
