# Redesign Concept A — "The site builds a game as you scroll"

Status: approved direction, **deferred until the branding refresh lands**. This document
preserves the concept so it can be executed against the new brand without re-discovery.

## Premise

Geek Engine's product loop is inherently cinematic: prompt → GDD → typed ops → compile →
playable game. No competitor's marketing site can honestly dramatize that loop; ours can,
because it is literally what the product does. The homepage stops being a brochure and
becomes a **single continuous scroll narrative that performs one full build**.

## The scroll narrative (homepage spine)

Six pinned "scenes", each a GSAP ScrollTrigger segment with scrubbed progress. The user's
scroll position IS the build progress.

1. **The prompt.** Near-empty viewport, oversized editorial type: a game idea types itself
   into a wizard-style input ("A cozy platformer about a lighthouse keeper…"). Caret blink,
   then the idea "submits" as the user keeps scrolling. Nav chrome fades to near-nothing.
2. **The interview.** Two or three wizard question cards cascade in and answer themselves
   (typewriter snippets of real wizard copy: gameplay loop, style, scope). Each answered
   card stamps a lime check and compresses into a doc fragment that flies toward scene 3.
3. **The GDD assembles.** A document literally builds: title bar, genre/dimension badges,
   core-mechanics list items sliding in one by one, scene-node tree drawing itself (SVG
   path draw-on). This is the centerpiece — the GDD is the product's soul. Mono type,
   paper-on-dark surface, section headers stamping like a printing press.
4. **Ops stream.** The GDD "compiles" into typed operations: a terminal column streams
   real op-array vocabulary (`addNode`, `setScript`, `bindAsset`, `setTransform3D`...)
   with syntax-highlighted JSON fragments scrolling at scrub speed. A progress bar runs.
   Brief red flash — a failed op — then the self-heal loop visibly retries and passes
   (honest drama; the product really does this).
5. **It's playable.** The terminal collapses into a game viewport: a mock build (CSS/canvas
   sprite scene, not video) with a pulsing PLAY affordance, telemetry chips ticking
   (sessions, events), a playtest share-link card sliding in beside it.
6. **The pitch.** Only now does conventional marketing appear: one massive headline
   ("Describe it. Play it."— final copy TBD with new brand voice), CTA pair, then the
   normal page flow (pillars, pricing teaser, footer) un-pinned below.

## Motion identity (signature moves, reused site-wide)

- **Typewriter + caret** as the recurring "AI is working" gesture (hero, docs callouts,
  404 page).
- **Document stamp**: sections/cards land with a 2-3px settle + shadow pulse, like a
  stamp on paper. Replaces generic fade-up everywhere.
- **Draw-on structure**: SVG node trees / pipeline connectors draw with scroll scrub
  (strokeDashoffset), echoing the scene-tree visual from the app.
- **Terminal stream**: scrub-tied log lines for anything "build"-flavored.
- Spring physics on interactive elements; no linear eases anywhere.

## Layout & type direction

- Editorial scale contrast: 8-12rem display headlines (tight tracking, balance-wrapped)
  against 0.65rem mono labels. The voice is "engineering zine".
- Broken grid in non-pinned sections: GDD fragments and screenshots overlap column
  boundaries; deliberate 2-6deg rotation on "stamped" artifacts.
- Keep the dark + single-accent system (accent color TBD by new brand; the concept is
  accent-agnostic).
- Grain overlay + scanline/checker textures already in the codebase carry over.

## Mega menu integration

The Product column of the mega menu doubles as scene-jump navigation on the homepage:
hovering Architect/Scenes/Assets/Playtest previews the corresponding narrative scene in
the menu's visual cell; clicking deep-links to the pinned scene (scroll-to with the
narrative scrubbing past intermediate scenes quickly — not teleporting).

## Performance & accessibility budget

- All pinned scenes are transform/opacity only; the GDD document is real DOM (selectable
  text — good for SEO too), not canvas. Target: no scene over ~40 active tweens.
- `prefers-reduced-motion`: the narrative degrades to a static six-panel storyboard
  (each scene becomes a normal section with its end-state visible). The story survives
  without motion.
- Mobile: pinning is shortened (scenes 2+3 merge, scene 4 becomes a short auto-playing
  loop) — scroll-jacking budgets are tighter on touch.
- Lighthouse gate: LCP < 2.5s (hero scene 1 is nearly empty by design — cheap LCP),
  CLS 0 (pins reserve height).

## Build plan sketch (when greenlit)

1. Scene framework: one `ScrollTrigger.create` per scene with a shared timeline factory,
   storyboard data in `data/i18n/{lang}/story.json` (copy localized like everything else).
2. Scenes 1-3 (prompt, interview, GDD) — pure DOM/type, lowest risk, biggest wow.
3. Scenes 4-5 (ops stream, playable) — terminal stream + mock viewport.
4. Scene-jump mega-menu wiring + reduced-motion storyboard fallback.
5. Interior pages inherit the stamp/draw-on/typewriter vocabulary (no pinning).

Estimated effort: the homepage narrative is roughly the size of the entire previous
redesign pass; interior-page propagation is mechanical afterwards.
