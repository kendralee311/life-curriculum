// Dummy sample data so the app feels alive on first load. Copied into
// localStorage on first run; owned entirely by the user's edits after that.

export const SUBJECT_DEFS = [
  {
    id: "portfolio-web",
    code: "ARCH 401",
    name: "Portfolio & Web Business",
    shortName: "Portfolio & Web",
    tagline: "Studio site, case studies, first paying clients.",
    vision:
      "Turn six years of spatial-architecture thinking into a productized web design practice: a portfolio that proves the Physical x Digital angle, and a pipeline that turns strangers into clients.",
    color: "primary",
    goal: "Launch studio site + land first paid client",
    progress: 33,
  },
  {
    id: "content",
    code: "MEDIA 210",
    name: "Content Creation",
    shortName: "Content Creation",
    tagline: "Micro-tutorials and candid studio-build storytelling.",
    vision:
      "Document the studio build in real time — high-energy voiceovers on moving to Hong Kong, paired with fast 3D/UI micro-tutorials that prove the multi-disciplinary angle.",
    color: "info",
    goal: "Consistent 2x/week posting with a repeatable format",
    progress: 20,
  },
  {
    id: "hardware",
    code: "SPTECH 330",
    name: "Physical Hardware & Spatial Tech",
    shortName: "Hardware & Spatial",
    tagline: "Tactile micro-animations, sensors, phygital prototypes.",
    vision:
      "Prototype the physical/digital bridge for real — tactile interfaces, embedded sensors, and small hardware builds that make FIELD's phygital app concept touchable.",
    color: "graphite",
    goal: "Working phygital prototype demo",
    progress: 38,
  },
  {
    id: "cafe",
    code: "VENTURE 500",
    name: "Future Vision: Listening Cafe Commune",
    shortName: "Cafe Commune",
    tagline: "Spatial design, furniture, and event programming.",
    vision:
      "The long arc: a physical listening-cafe commune in Hong Kong — spatial layout, custom furniture, and an events program that turns the studio's audience into a real-world community.",
    color: "accent",
    goal: "Concept deck + site scouting shortlist",
    progress: 38,
  },
];

// --- 1. Portfolio & Web Business — Kanban Pipeline + Project Spec Sheet ---

export const KANBAN_COLUMNS = [
  { id: "backlog", label: "Backlog" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "Review / QC" },
  { id: "live", label: "Live / Done" },
];

export const KANBAN_SEED = [
  { id: "k1", title: "Hero section — 3D scroll interaction", tags: ["#hero-section"], column: "live" },
  { id: "k2", title: "Case study: Local Bakery Rebrand", tags: ["#case-study-1"], column: "live" },
  { id: "k3", title: "Case study: 3D Product Website copy", tags: ["#case-study-1"], column: "in-progress" },
  { id: "k4", title: "Pricing table (course-credit framing)", tags: ["#pricing-table"], column: "review" },
  { id: "k5", title: "Client contract template", tags: ["#client-contract"], column: "backlog" },
  { id: "k6", title: "FIELD app case study writeup", tags: ["#case-study-1"], column: "backlog" },
];

export const SPEC_SHEET_SEED = {
  clientAvatar:
    "Early-stage tech/design founders in Hong Kong (or remote) who want a portfolio or product site with real spatial/architectural thinking behind the UX — not a template.",
  packages: [
    { id: "p1", name: "Studio 101", price: "$1.2k", desc: "1-page portfolio / landing site" },
    { id: "p2", name: "Studio 201", price: "$3.5k", desc: "Multi-page site + case study system" },
    { id: "p3", name: "Studio 301", price: "$7k+", desc: "3D product site / custom interaction build" },
  ],
  architecture: ["Home", "Work (Portfolio Triad)", "About / Studio", "Services", "Contact"],
};

// --- 2. Content Creation — Idea Incubator + Production Pipeline ---

export const IDEA_INCUBATOR_SEED = [
  { id: "i1", text: "Cold open: 'I moved to Hong Kong to build a studio' → jump cut to desk setup." },
  { id: "i2", text: "Hook: 'Architects would never design an app like this.'" },
  { id: "i3", text: "Behind the scenes: pricing a client project on camera." },
];

export const PIPELINE_STAGES = [
  { id: "idea", label: "Idea" },
  { id: "scripted", label: "Scripted" },
  { id: "filming", label: "Filming" },
  { id: "editing", label: "Editing" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
];

export const PIPELINE_SEED = [
  {
    id: "c1",
    title: "Tactile hover animation micro-tutorial",
    formatTag: "#short-form",
    stage: "editing",
    subtasks: { hook: true, broll: true, voiceover: true, thumbnail: false },
  },
  {
    id: "c2",
    title: "Studio-build vlog: first client call",
    formatTag: "#vlog",
    stage: "filming",
    subtasks: { hook: true, broll: false, voiceover: false, thumbnail: false },
  },
  {
    id: "c3",
    title: "How I make AI follow a design system",
    formatTag: "#dev-log",
    stage: "scripted",
    subtasks: { hook: true, broll: false, voiceover: false, thumbnail: false },
  },
  {
    id: "c4",
    title: "50 Design Styles for better prompting",
    formatTag: "#short-form",
    stage: "idea",
    subtasks: { hook: false, broll: false, voiceover: false, thumbnail: false },
  },
  {
    id: "c5",
    title: "Bakery Rebrand before/after",
    formatTag: "#short-form",
    stage: "published",
    subtasks: { hook: true, broll: true, voiceover: true, thumbnail: true },
  },
];

export const SCRATCHPAD_SEED = [
  { id: "s1", text: "'The building would never let its wiring show. Why does your app?'", createdAt: "" },
  { id: "s2", text: "Title test: 'I redesigned my studio site live — here's what broke'", createdAt: "" },
];

// --- 3. Physical Hardware & Spatial Tech — Component Grid + BOM ---

export const HARDWARE_STATES = [
  { id: "concept", label: "Concept" },
  { id: "parts-sourced", label: "Parts Sourced" },
  { id: "circuit-built", label: "Circuit Built" },
  { id: "ui-connected", label: "UI Connected" },
  { id: "prototype-tested", label: "Prototype Tested" },
];

export const COMPONENTS_SEED = [
  { id: "h1", name: "Motorized Stand", state: "concept", description: "Rotating display stand for phygital product demos." },
  { id: "h2", name: "Vinyl Kiosk", state: "parts-sourced", description: "Touch-triggered listening kiosk, record-shop aesthetic." },
  { id: "h3", name: "MQTT / Node-RED Middleware", state: "circuit-built", description: "Message bus between sensors and the FIELD app UI." },
  { id: "h4", name: "Capacitive Touch Panel", state: "ui-connected", description: "Wood-panel touch strip triggering screen transitions." },
];

export const BOM_SEED = [
  { id: "b1", part: "ESP32-WROOM-32", type: "Microcontroller", pinout: "GPIO 4/5 (I2C)", baud: "115200", cad: "v0.3", notes: "Primary node MCU" },
  { id: "b2", part: "MPR121 Capacitive Sensor", type: "Sensor", pinout: "I2C 0x5A", baud: "—", cad: "v0.1", notes: "12-channel touch input" },
  { id: "b3", part: "28BYJ-48 Stepper", type: "Actuator", pinout: "GPIO 12/13/14/15", baud: "—", cad: "v0.2", notes: "Motorized stand rotation" },
];

// --- 4. Future Vision: Listening Cafe Commune — Zone Map + Asset Vault ---

export const ZONE_DEFS = [
  { id: "interiors-acoustics", title: "Interiors & Acoustics" },
  { id: "furniture-automation", title: "Custom Hardware / Furniture Automation" },
  { id: "workshops-community", title: "Workshops & Creative Community" },
  { id: "operations-business", title: "Operations & Business Model" },
];

export const ZONES_SEED = {
  "interiors-acoustics": {
    tags: ["#spatial-layout", "#lighting"],
    milestones: [
      { id: "z1", label: "Mood board: spatial + lighting direction", done: true },
      { id: "z2", label: "Acoustic zoning study", done: false },
    ],
  },
  "furniture-automation": {
    tags: ["#furniture-mechanism"],
    milestones: [
      { id: "z3", label: "Modular seating mechanism sketch", done: false },
      { id: "z4", label: "Prototype reconfigurable table", done: false },
    ],
  },
  "workshops-community": {
    tags: ["#community-format"],
    milestones: [
      { id: "z5", label: "Draft monthly listening + sketch night format", done: true },
      { id: "z6", label: "List 5 potential collaborator studios", done: false },
    ],
  },
  "operations-business": {
    tags: [],
    milestones: [
      { id: "z7", label: "Write concept one-pager", done: true },
      { id: "z8", label: "Shortlist 3 candidate neighborhoods", done: false },
    ],
  },
};

export const ASSET_VAULT_SEED = [
  { id: "a1", title: "Modular low seating", note: "Reconfigures for listening sessions vs. work-in-cafe mode.", tag: "#furniture-mechanism", imageUrl: "" },
  { id: "a2", title: "Acoustic zoning reference", note: "Soft partition walls between listening zone and cafe counter.", tag: "#spatial-layout", imageUrl: "" },
];

export const TASK_SEED = [
  { id: "t1", title: "Finish 3D Product Website case study copy", subjectId: "portfolio-web", priority: "high", done: false },
  { id: "t2", title: "Film: tactile hover animation micro-tutorial", subjectId: "content", priority: "high", done: false },
  { id: "t3", title: "Order ESP32 + haptic motor prototyping kit", subjectId: "hardware", priority: "medium", done: false },
  { id: "t4", title: "Draft studio site pricing page (course-credit framing)", subjectId: "portfolio-web", priority: "medium", done: true },
  { id: "t5", title: "Sketch mood board direction for cafe seating", subjectId: "cafe", priority: "low", done: false },
];
