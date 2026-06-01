export const trustedStudios = [
  "PUNCHCARD GAMES",
  "PEBBLE STUDIO",
  "NOCTURNE LABS",
  "GRUB & CO.",
  "TANUKI WORKS",
  "HOLLOW MOON",
];

export const corePillars = [
  {
    icon: "sparkles",
    title: "Natural Language Engineering",
    body:
      "Describe architectural mechanics, system rules, and scene modifications. Watch our design architect translate your intentions into a perfect visual blueprint instantly.",
  },
  {
    icon: "build",
    title: "Cloud-Native Compilation",
    body:
      "Say goodbye to hours of local build times. Compile your game headlessly in the cloud and stream interactive runtime previews straight to your dashboard.",
  },
  {
    icon: "layers",
    title: "Modular Production Board",
    body:
      "Deconstruct massive game systems into clean, bite-sized engineering tickets. Sort, prioritize, inject image assets, and guide your AI agents with absolute precision.",
  },
];

export const studioBenefits = [
  {
    tag: "Solo creators & indie founders",
    title: "Ship a studio of one.",
    body:
      "Launch an independent gaming business without the overhead of an expensive engineering studio. Take your idea from design to monetization in record time.",
    chips: ["solo dev", "side project", "first launch"],
  },
  {
    tag: "Established studios",
    title: "Validate before you commit.",
    body:
      "Stop burning engineering weeks on unverified mechanics. Use our rapid template environments to build interactive proof-of-concepts over a single weekend.",
    chips: ["prototyping", "POCs", "weekend test"],
  },
  {
    tag: "Co-authoring teams",
    title: "Build together, in sync.",
    body:
      "Collaborate globally in real time with shared prompt pipelines, live workshop state synchronization, multiplayer presence, and automated audit trails.",
    chips: ["multiplayer presence", "shared prompts", "audit log"],
  },
];

export const productModules = [
  {
    id: "hub",
    number: "01",
    title: "Workspace & Organization Hub",
    desc:
      "Manage multi-project environments from a single command center. Organize individual work or spin up isolated workspace boundaries with fine-grained team configurations.",
    previewKind: "hub",
    caps: [
      ["Multi-project hub", "Create, duplicate, archive, delete, or transfer ownership of independent 2D and 3D game projects cleanly."],
      ["Organization governance", "Assign distinct roles (Owner, Admin, Editor, Viewer, Playtester) and manage secure team access paths."],
      ["Project health badges", "Instantly track which systems are ready, compiling, failed, or awaiting developer attention across the organization."],
      ["Real-time activity logs", "A complete immutable audit trail tracking prompts, builds, snapshot changes, configuration updates, and billing actions."],
    ],
  },
  {
    id: "ai",
    number: "02",
    title: "AI Game Architect & Ticket System",
    desc: "Communicate complex game mechanics to a specialized multi-agent core that breaks down big visions into highly reliable, structured steps.",
    previewKind: "ai",
    flip: true,
    caps: [
      ["Atomic feature tickets", "Transform continuous conversations into explicit, draggable development tickets to prevent code overwrites."],
      ["Structured outputs", "Natural intent automatically populates an interactive, visual Game Design Document tree covering scenes, logic, and global variables."],
      ["Multimodal tasking", "Attach UI wireframes, character sheets, or layout drawings directly to tickets so the system can extract exact artistic directions."],
      ["Self-healing code loops", "If a build fails behind the scenes, our automated recovery loop reads the error log, deduces the root conflict, and heals the script before you ever notice a glitch."],
    ],
  },
  {
    id: "scene",
    number: "03",
    title: "Scene Inspector & Structural Mutation System",
    desc: "Expose and manipulate your underlying game design model with high-precision engineering controls.",
    previewKind: "scene",
    caps: [
      ["Visual node trees", "Audit structural scene graphs, child-parent node systems, and system property vectors instantly."],
      ["Typed operations", "Apply safe properties, update script data, manipulate 3D spatial dimensions, and reorder structural hierarchies smoothly."],
      ["Script inspector", "Read and verify underlying behavior logic through deep-dive readouts and automated script shortcuts."],
      ["Co-authoring presence", "Track remote team cursors, shared prompts, and active node selections inside a synchronized workspace canvas."],
    ],
  },
  {
    id: "assets",
    number: "04",
    title: "Asset Generation & Synthesizer Labs",
    desc: "Create, upload, store, and bind digital media properties directly to game nodes without leaving your environment.",
    previewKind: "assets",
    flip: true,
    caps: [
      ["Procedural pixel-art", "Generate custom 2D textures, tilesets, sprites, and environmental backgrounds out of text descriptions."],
      ["Audio synthesizer", "Build retro sound effects and chiptune score elements directly inside an interactive parameters panel."],
      ["3D model management", "Upload and parse industry-standard 3D assets, mapping complex materials and models to mesh instances."],
      ["Smart asset library", "Automatic tracking of storage weight, asset versioning, global search filters, and unused asset detection."],
    ],
  },
  {
    id: "playtest",
    number: "05",
    title: "In-Browser Playtesting & Real-Time Telemetry",
    desc: "Test mechanics directly inside your creator interface or distribute sandboxed builds to external testers to harvest performance insights.",
    previewKind: "playtest",
    caps: [
      ["Instant web surface", "Launch responsive, full-screen interactive builds inside your control center the moment a compile task finishes."],
      ["Shareable review links", "Secure public or password-restricted links built explicitly for distribution to external playtesters."],
      ["Telemetry dashboard", "Gather session tracking, event frequency counts, completion thresholds, and execution logs from active players."],
      ["Contextual discussion", "Pin comments, upload bug screenshots, and organize collaborative feedback linked to specific builds or snapshots."],
    ],
  },
];

export const pipelineSteps = [
  {
    n: "01",
    label: "Blueprint",
    title: "Scaffolding from templates or prompt blueprints",
    copy:
      "Initialize your project via a blank slate or select from our curated production templates — including 2D/3D platformers, top-down tactical setups, endless runners, and shooter frameworks. Tell the AI Architect your thematic goals, and it auto-populates your target design rules, global variables, and starter asset libraries.",
  },
  {
    n: "02",
    label: "Decompose",
    title: "Modular task breakdown and ticket ordering",
    copy:
      "Our pipeline prevents the system from getting overwhelmed by complex instructions. When you prompt a massive system modification, the platform splits the intent into atomic execution tickets on an interactive kanban board. You review the board, reorder tasks to set priorities, add design image assets, and approve execution step-by-step.",
  },
  {
    n: "03",
    label: "Compile",
    title: "Headless cloud assembly and self-correction",
    copy:
      "The approved tasks are pulled into our cloud worker architecture. The system safely builds scenes, writes clean logic scripts, and compiles a headless distribution target. If the compiler encounters an error, our pre-flight environment checks and self-healing systems analyze the error log, update the faulty logic pattern, and re-compile instantly.",
  },
  {
    n: "04",
    label: "Deploy",
    title: "Continuous deployment and version snapshots",
    copy:
      "Every successful build generates an absolute snapshot of the entire game design model. You can label, pin, or revert to past snapshots at any time, protecting your work. The finalized code is securely routed to high-speed cloud distribution storage, delivering a live URL to your playtest iframe and external testers.",
  },
];

export const principles = [
  { icon: "layers", title: "Atomic, not monolithic", body: "Every prompt is split into typed operations. Nothing is a black box; nothing overwrites accidentally." },
  { icon: "doctor", title: "Self-correcting", body: "Pre-flight checks + automated error analysis patch broken builds without your team noticing." },
  { icon: "history", title: "Snapshot before & after", body: "Every successful build captures the full GDD. Roll back to any state in one click." },
  { icon: "users", title: "Audit-trailed", body: "Prompts, builds, snapshots, settings, billing — every action lands in the immutable log." },
];

export const pricingTiers = [
  {
    tier: "Hobbyist",
    price: "$0",
    per: "Free forever",
    seats: "1 seat",
    credits: "5,000 credits / mo",
    cta: "Start free",
    features: [
      "Browser-based game editing & template access",
      "Standard priority cloud build queue",
      "Web-only publishing via hosted platform player",
      "Client-side local storage for default game saves",
      "Basic asset library uploads and generation features",
    ],
  },
  {
    tier: "Core Creator",
    price: "$29",
    per: "per month",
    seats: "3 seats",
    credits: "30,000 credits / mo",
    cta: "Start Core Creator",
    featured: true,
    features: [
      "Real-time multiplayer team workspace collaboration",
      "High-priority cloud build queue access",
      "Web publishing with white-label & custom domain support",
      "Comprehensive snapshot version comparison tools",
      "Shared organization asset libraries",
    ],
  },
  {
    tier: "Studio Pro",
    price: "$99",
    per: "per month",
    seats: "10 seats",
    credits: "100,000 credits / mo",
    cta: "Talk to us",
    features: [
      "Direct cross-platform commercial export to Steam and Mobile stores",
      "Turbo priority cloud build queue (isolated worker instances)",
      "Advanced 3D model parsing and animation pipeline matching",
      "Full raw project source-code zip extraction and downloading",
      "Extended build history retention window",
    ],
  },
];

export const addOns = [
  {
    icon: "users",
    name: "Additional seat licensing",
    cost: "$10",
    per: "/ user / month",
    body:
      "Available across all subscription plans. Adding an extra user seat to your organization instantly unlocks advanced collaboration pathways and injects an additional 5,000 creation credits into your team's shared monthly workspace balance.",
  },
  {
    icon: "zap",
    name: "Metered credit overage top-ups",
    cost: "$1.50",
    per: "/ 1,000 credits",
    body: "Keep your design pipeline active. Purchase extra processing capacity whenever your studio hits peak development cycles.",
  },
  {
    icon: "layers",
    name: "Live cloud database add-on",
    cost: "$19",
    per: "/ month / project",
    body:
      "Unlock online persistence. The platform automatically provisions a secure, cloud-hosted relational database for your game. The AI automatically generates the remote network logic scripts required to run live multiplayer leaderboards, secure player accounts, and cloud saves.",
  },
];

export const pricingFaq = [
  {
    q: "How are credits calculated during production?",
    a:
      "Our credit system maps exactly to the background processing cost of your changes. Minor text tweaks or node reorder tasks cost minimal credits, whereas generating deep 3D assets or running intensive self-healing error analysis loops burns higher volumes of your allocated pool.",
  },
  {
    q: "Can teams pool their credits together?",
    a:
      "Yes. All credits included in your base plan, alongside any credits added by purchasing extra user seats, are placed into a centralized pool accessible by all authorized editors within that specific organization workspace.",
  },
  {
    q: "What happens if our project does not buy the cloud database?",
    a:
      "By default, your games utilize client-side local storage frameworks. This follows standard platform rules for single-player games, offline settings saving, and local machine progress. You only require the database add-on if you want your game to read and write records across a persistent global web network.",
  },
];

export const supportChannels = [
  {
    icon: "user",
    title: "Creator help desk",
    body: "Have questions about credit balances, seat licensing top-ups, or workspace permissions management?",
    cta: "Submit workspace ticket",
    reply: "Avg reply · 4h",
    color: "lime",
  },
  {
    icon: "layers",
    title: "Enterprise studio relations",
    body: "Request custom build environments, elevated storage thresholds, or white-label distribution agreements.",
    cta: "Request studio consultation",
    reply: "Avg reply · same business day",
    color: "cyan",
  },
  {
    icon: "sparkles",
    title: "Feature & community feedback",
    body: "Have recommendations for our task board pipeline, asset synthesizers, or self-healing error catchers?",
    cta: "Share feature request",
    reply: "Reviewed weekly · public roadmap",
    color: "violet",
  },
];
