// Literal Tailwind class names per subject color — written out in full
// (not built with template strings) so Tailwind's scanner can find them.
// Palette sourced from @eleven-labs/design-system color tokens.
//
// `text` is for use directly on the page/card background (adapts per
// theme). `chipText` is for use on top of `bgSoft`, which stays a light
// pastel in both themes — so chipText is a fixed dark color, never
// theme-adaptive, or it goes invisible in dark mode.
export const COLOR_MAP = {
  primary: {
    text: "text-primary",
    chipText: "text-primary",
    bg: "bg-primary",
    bgSoft: "bg-secondary",
    border: "border-primary",
    ring: "ring-primary",
    dot: "bg-primary",
    spine: "bg-primary",
  },
  info: {
    text: "text-info",
    chipText: "text-info",
    bg: "bg-info",
    bgSoft: "bg-info-soft",
    border: "border-info",
    ring: "ring-info",
    dot: "bg-info",
    spine: "bg-info",
  },
  graphite: {
    // graphite (#333) is too close to the dark-mode card background to
    // read on its own, so swap to a light color once .dark is active.
    text: "text-graphite dark:text-ink-dark",
    chipText: "text-graphite",
    bg: "bg-graphite",
    bgSoft: "bg-graphite-soft",
    border: "border-graphite",
    ring: "ring-graphite",
    dot: "bg-graphite",
    spine: "bg-graphite",
  },
  accent: {
    // on a card/page background, swap to the accent hue itself in dark
    // mode (graphite would be unreadably close to the dark background).
    text: "text-graphite dark:text-accent",
    chipText: "text-graphite",
    bg: "bg-accent",
    bgSoft: "bg-accent-soft",
    border: "border-accent",
    ring: "ring-accent",
    dot: "bg-accent",
    spine: "bg-accent",
  },
};

export function colorClasses(color) {
  return COLOR_MAP[color] ?? COLOR_MAP.primary;
}

export const PRIORITY_STYLES = {
  high: {
    label: "High",
    dot: "bg-info",
    text: "text-info",
    bg: "bg-info-soft",
  },
  medium: {
    label: "Medium",
    dot: "bg-primary",
    text: "text-primary",
    bg: "bg-secondary",
  },
  low: {
    label: "Low",
    dot: "bg-grey-dark",
    text: "text-grey-dark",
    bg: "bg-grey-ultralight",
  },
};
