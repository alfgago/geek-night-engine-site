import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";
import { ModulePreview } from "./module-previews";

const productModules = [
  {
    id: "hub",
    n: "01",
    title: "Workspace & Organization Hub",
    desc: "Manage multi-project environments from a single command center. Organize individual work or spin up isolated workspace boundaries with fine-grained team configurations.",
    caps: [
      ["Multi-project hub", "Create, duplicate, archive, delete, or transfer ownership of independent 2D and 3D game projects cleanly."],
      ["Organization governance", "Assign distinct roles (Owner, Admin, Editor, Viewer, Playtester) and manage secure team access paths."],
      ["Project health badges", "Instantly track which systems are ready, compiling, failed, or awaiting developer attention across the organization."],
      ["Real-time activity logs", "A complete immutable audit trail tracking prompts, builds, snapshot changes, configuration updates, and billing actions."],
    ],
    previewKind: "hub",
  },
  {
    id: "ai",
    n: "02",
    title: "AI Game Architect & Ticket System",
    flip: true,
    desc: "Communicate complex game mechanics to a specialized multi-agent core that breaks down big visions into highly reliable, structured steps.",
    caps: [
      ["Atomic feature tickets", "Transform continuous conversations into explicit, draggable development tickets to prevent code overwrites."],
      ["Structured outputs", "Natural intent automatically populates an interactive, visual Game Design Document tree covering scenes, logic, and global variables."],
      ["Multimodal tasking", "Attach UI wireframes, character sheets, or layout drawings directly to tickets so the system can extract exact artistic directions."],
      ["Self-healing code loops", "If a build fails behind the scenes, our automated recovery loop reads the error log, deduces the root conflict, and heals the script before you ever notice a glitch."],
    ],
    previewKind: "ai",
  },
  {
    id: "scene",
    n: "03",
    title: "Scene Inspector & Structural Mutation System",
    desc: "Expose and manipulate your underlying game design model with high-precision engineering controls.",
    caps: [
      ["Visual node trees", "Audit structural scene graphs, child-parent node systems, and system property vectors instantly."],
      ["Typed operations", "Apply safe properties, update script data, manipulate 3D spatial dimensions, and reorder structural hierarchies smoothly."],
      ["Script inspector", "Read and verify underlying behavior logic through deep-dive readouts and automated script shortcuts."],
      ["Co-authoring presence", "Track remote team cursors, shared prompts, and active node selections inside a synchronized workspace canvas."],
    ],
    previewKind: "scene",
  },
  {
    id: "assets",
    n: "04",
    title: "Asset Generation & Synthesizer Labs",
    flip: true,
    desc: "Create, upload, store, and bind digital media properties directly to game nodes without leaving your environment.",
    caps: [
      ["Procedural pixel-art", "Generate custom 2D textures, tilesets, sprites, and environmental backgrounds out of text descriptions."],
      ["Audio synthesizer", "Build retro sound effects and chiptune score elements directly inside an interactive parameters panel."],
      ["3D model management", "Upload and parse industry-standard 3D assets, mapping complex materials and models to mesh instances."],
      ["Smart asset library", "Automatic tracking of storage weight, asset versioning, global search filters, and unused asset detection."],
    ],
    previewKind: "assets",
  },
  {
    id: "playtest",
    n: "05",
    title: "In-Browser Playtesting & Real-Time Telemetry",
    desc: "Test mechanics directly inside your creator interface or distribute sandboxed builds to external testers to harvest performance insights.",
    caps: [
      ["Instant web surface", "Launch responsive, full-screen interactive builds inside your control center the moment a compile task finishes."],
      ["Shareable review links", "Secure public or password-restricted links built explicitly for distribution to external playtesters."],
      ["Telemetry dashboard", "Gather session tracking, event frequency counts, completion thresholds, and execution logs from active players."],
      ["Contextual discussion", "Pin comments, upload bug screenshots, and organize collaborative feedback linked to specific builds or snapshots."],
    ],
    previewKind: "playtest",
  },
];

export function ProductPage() {
  return (
    <>
      <SiteNav current="product" />
      <PageHero
        eyebrow="Product architecture"
        heading="The complete AI-native game studio, inside a browser tab."
        sub="From asset generation and script composition to telemetry collection and organization management — explore the full creative suite."
        primaryCta="Launch workspace"
        secondaryCta="Open live demo"
      />
      {productModules.map((module) => (
        <ProductModule key={module.id} {...module} />
      ))}
      <CtaStrip
        heading="Five modules, one shared game design document."
        sub="Everything you ship lands in the same auditable model — so nothing the AI does is a black box."
        cta="Launch workspace"
      />
      <SiteFooter />
    </>
  );
}

function ProductModule({ id, n, title, desc, caps, previewKind, flip }) {
  return (
    <section id={id} data-anim-section="features" className="site-section" style={{ background: id.match(/^(ai|assets)$/) ? "var(--bg-0)" : "var(--bg-1)" }}>
      <div className="site-wrap product-module-grid">
        <div className={`product-module-copy ${flip ? "flip" : ""}`}>
          <div data-anim="reveal" className="gne-row" style={{ gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--lime)", letterSpacing: "0.12em" }}>{n} ·</span>
            <span className="label-cap">Module</span>
          </div>
          <h2 data-anim="reveal" className="pretty" style={{ fontSize: 36, fontWeight: 600, letterSpacing: 0, margin: 0, lineHeight: 1.1 }}>
            {title}
          </h2>
          <p data-anim="reveal" className="pretty" style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-1)", margin: "20px 0 26px", maxWidth: 500 }}>
            {desc}
          </p>
          <div data-anim-grid style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {caps.map(([heading, copy]) => (
              <div
                key={heading}
                data-anim-card
                className="gne-row"
                style={{ gap: 14, padding: "14px 16px", alignItems: "flex-start", background: "var(--bg-2)", border: "1px solid var(--border-1)", borderRadius: 8 }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    flex: "0 0 auto",
                    background: "var(--lime-bg)",
                    color: "var(--lime)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--lime-edge)",
                  }}
                >
                  <Icon d={I.check} size={13} stroke={2.4} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{heading}</div>
                  <div className="pretty" style={{ fontSize: 13, color: "var(--fg-1)", lineHeight: 1.55 }}>
                    {copy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-anim="reveal" className={`product-module-preview ${flip ? "flip" : ""}`}>
          <ModulePreview kind={previewKind} />
        </div>
      </div>
    </section>
  );
}
