// Dummy sample data so the app feels alive on first load.
// Everything here is copied into localStorage on first run and
// then owned entirely by the user's edits from that point on.

export const SUBJECT_DEFS = [
  {
    id: "portfolio-web",
    code: "ARCH 401",
    name: "Portfolio & Web Business",
    tagline: "Studio site, case studies, first paying clients.",
    vision:
      "Turn six years of spatial-architecture thinking into a productized web design practice: a portfolio that proves the Physical x Digital angle, and a pipeline that turns strangers into clients.",
    color: "brand",
    goal: "Launch studio site + land first paid client",
    progress: 58,
    milestones: [
      { id: "m1", label: "Define service tiers & pricing", done: true },
      { id: "m2", label: "Case study: Local Bakery Rebrand", done: true },
      { id: "m3", label: "Case study: 3D Product Website", done: false },
      { id: "m4", label: "Launch studio site v1", done: false },
      { id: "m5", label: "Land first paid client", done: false },
    ],
  },
  {
    id: "content",
    code: "MEDIA 210",
    name: "Content Creation",
    tagline: "Micro-tutorials and candid studio-build storytelling.",
    vision:
      "Document the studio build in real time — high-energy voiceovers on moving to Hong Kong, paired with fast 3D/UI micro-tutorials that prove the multi-disciplinary angle.",
    color: "clay",
    goal: "Consistent 2x/week posting with a repeatable format",
    progress: 41,
    milestones: [
      { id: "m1", label: "Define 3 repeatable formats", done: true },
      { id: "m2", label: "Batch-film 10 micro-tutorials", done: false },
      { id: "m3", label: "Hit 2x/week publish cadence", done: false },
      { id: "m4", label: "First format hits repeatable traction", done: false },
    ],
  },
  {
    id: "hardware",
    code: "SPTECH 330",
    name: "Physical Hardware & Spatial Tech",
    tagline: "Tactile micro-animations, sensors, phygital prototypes.",
    vision:
      "Prototype the physical/digital bridge for real — tactile interfaces, embedded sensors, and small hardware builds that make FIELD's phygital app concept touchable.",
    color: "sage",
    goal: "Working phygital prototype demo",
    progress: 22,
    milestones: [
      { id: "m1", label: "Research sensor + microcontroller stack", done: true },
      { id: "m2", label: "Order prototyping kit", done: false },
      { id: "m3", label: "Build first tactile interaction demo", done: false },
      { id: "m4", label: "Pair demo with FIELD app screen", done: false },
    ],
  },
  {
    id: "cafe",
    code: "VENTURE 500",
    name: "Future Vision: Listening Cafe Commune",
    tagline: "Spatial design, furniture, and event programming.",
    vision:
      "The long arc: a physical listening-cafe commune in Hong Kong — spatial layout, custom furniture, and an events program that turns the studio's audience into a real-world community.",
    color: "gold",
    goal: "Concept deck + site scouting shortlist",
    progress: 9,
    milestones: [
      { id: "m1", label: "Write concept one-pager", done: true },
      { id: "m2", label: "Mood board: spatial + furniture direction", done: false },
      { id: "m3", label: "Shortlist 3 candidate neighborhoods", done: false },
      { id: "m4", label: "Draft events programming outline", done: false },
    ],
  },
];

export const NOTE_SEED = {
  "portfolio-web": [
    {
      id: "n1",
      content:
        "Portfolio triad should open with the Bakery Rebrand — it's the most legible 'before/after' for a cold visitor.",
      tags: ["#ui-design", "#content"],
    },
    {
      id: "n2",
      content:
        "Pricing page idea: show tiers as 'course credits' — Studio 101 / 201 / 301 — matches the whole Life Curriculum framing.",
      tags: ["#ui-design"],
    },
    {
      id: "n3",
      content:
        "Client intake friction: people don't know if they need a 3D site or a normal one. Add a 2-question quiz on the site.",
      tags: ["#ui-design", "#content"],
    },
  ],
  content: [
    {
      id: "n4",
      content:
        "Format that's working: 'I moved to Hong Kong to build a studio' cold open + jump cut to desk setup. Candid > polished.",
      tags: ["#content"],
    },
    {
      id: "n5",
      content:
        "Micro-tutorial idea: 60s screen-record of building a subtle tactile hover animation in Figma, voiceover explaining the physical-material logic behind it.",
      tags: ["#ui-design", "#content"],
    },
    {
      id: "n6",
      content:
        "Hook bank: 'Architects would never design a building like this app is designed.'",
      tags: ["#content"],
    },
  ],
  hardware: [
    {
      id: "n7",
      content:
        "Capacitive touch strip on a wood panel, wired to trigger a screen transition — first tactile demo candidate.",
      tags: ["#hardware", "#spatial"],
    },
    {
      id: "n8",
      content:
        "Look into ESP32 + simple haptic motor for a 'physical notification' prototype tied to the FIELD app.",
      tags: ["#hardware"],
    },
  ],
  cafe: [
    {
      id: "n9",
      content:
        "Furniture direction: modular low seating that reconfigures for listening sessions vs. work-in-cafe mode.",
      tags: ["#spatial"],
    },
    {
      id: "n10",
      content:
        "Event format idea: monthly 'silent listening + sketch' night — ties spatial design crowd to design peers.",
      tags: ["#spatial", "#content"],
    },
  ],
};

export const TASK_SEED = [
  {
    id: "t1",
    title: "Finish 3D Product Website case study copy",
    subjectId: "portfolio-web",
    priority: "high",
    done: false,
  },
  {
    id: "t2",
    title: "Film: tactile hover animation micro-tutorial",
    subjectId: "content",
    priority: "high",
    done: false,
  },
  {
    id: "t3",
    title: "Order ESP32 + haptic motor prototyping kit",
    subjectId: "hardware",
    priority: "medium",
    done: false,
  },
  {
    id: "t4",
    title: "Draft studio site pricing page (course-credit framing)",
    subjectId: "portfolio-web",
    priority: "medium",
    done: true,
  },
  {
    id: "t5",
    title: "Sketch mood board direction for cafe seating",
    subjectId: "cafe",
    priority: "low",
    done: false,
  },
];

export const ALL_TAGS = ["#hardware", "#spatial", "#ui-design", "#content"];
