// Literal Tailwind class names per subject color — written out in full
// (not built with template strings) so Tailwind's scanner can find them.
export const COLOR_MAP = {
  brand: {
    text: "text-brand",
    bg: "bg-brand",
    bgSoft: "bg-brand-soft",
    border: "border-brand",
    ring: "ring-brand",
    dot: "bg-brand",
  },
  clay: {
    text: "text-clay",
    bg: "bg-clay",
    bgSoft: "bg-clay-soft",
    border: "border-clay",
    ring: "ring-clay",
    dot: "bg-clay",
  },
  sage: {
    text: "text-sage",
    bg: "bg-sage",
    bgSoft: "bg-sage-soft",
    border: "border-sage",
    ring: "ring-sage",
    dot: "bg-sage",
  },
  gold: {
    text: "text-gold",
    bg: "bg-gold",
    bgSoft: "bg-gold-soft",
    border: "border-gold",
    ring: "ring-gold",
    dot: "bg-gold",
  },
};

export function colorClasses(color) {
  return COLOR_MAP[color] ?? COLOR_MAP.brand;
}

export const PRIORITY_STYLES = {
  high: {
    label: "High",
    dot: "bg-clay",
    text: "text-clay",
    bg: "bg-clay-soft",
  },
  medium: {
    label: "Medium",
    dot: "bg-gold",
    text: "text-gold",
    bg: "bg-gold-soft",
  },
  low: {
    label: "Low",
    dot: "bg-sage",
    text: "text-sage",
    bg: "bg-sage-soft",
  },
};
