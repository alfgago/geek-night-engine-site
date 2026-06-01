import { PageHero, SiteFooter, SiteNav } from "./chrome";

const legalDate = "May 27, 2026";

const privacySections = [
  {
    title: "1. Scope",
    body: [
      "This Privacy Policy explains how Geek Night Engine collects, uses, discloses, and protects personal information when you visit our marketing site, create or join a workspace, build projects, upload assets, use AI-assisted game production features, receive playtest feedback, or contact support.",
      "The service is a professional creative tool. It is not directed to children under 13, and we do not knowingly collect personal information from children under 13.",
    ],
  },
  {
    title: "2. Information we collect",
    list: [
      "Account and workspace information: name, email address, password authentication data, organization membership, role, invitation status, plan, billing owner, and account settings.",
      "Project content: prompts, Game Design Document data, typed operation arrays, scenes, scripts, snapshots, comments, uploaded assets, generated assets, build artifacts, compile logs, and exports you create or store in the service.",
      "Playtest and telemetry data: share-link access data, feedback, comments, screenshots you submit, session identifiers, gameplay events, completion data, score changes, runtime logs, and other events configured by workspace owners.",
      "Billing information: plan selections, credit balances, transactions, subscription status, invoices, tax-related metadata, and payment identifiers. Full payment card details are processed by our payment processor and are not stored by Geek Night Engine.",
      "Device, log, and security data: IP address, browser type, operating system, referring pages, timestamps, session cookies, CSRF tokens, WebSocket connection metadata, error logs, rate-limit events, and audit trail records.",
      "Support and contact data: email address, workspace name, support category, message contents, attachments, and related correspondence.",
    ],
  },
  {
    title: "3. How we use information",
    list: [
      "Provide, secure, maintain, and improve the service.",
      "Create, mutate, compile, host, playtest, and export game projects at your direction.",
      "Run AI-assisted features, including prompt interpretation, design document updates, asset generation, self-healing build analysis, and related workflow automation.",
      "Manage organizations, invitations, roles, permissions, credits, subscriptions, and billing.",
      "Provide support, respond to requests, investigate abuse, and enforce our Terms.",
      "Generate usage analytics, product diagnostics, audit logs, and reliability metrics.",
      "Send service notices and, where permitted, product updates or marketing communications. You may opt out of non-essential marketing.",
    ],
  },
  {
    title: "4. Legal bases for processing",
    body: [
      "Where privacy laws require a legal basis, we process personal information to perform our contract with you, comply with legal obligations, protect legitimate interests such as security and service improvement, protect vital interests in exceptional cases, and with consent where required for optional communications or features.",
    ],
  },
  {
    title: "5. AI providers and generated content",
    body: [
      "Geek Night Engine may send prompts, project context, logs, assets, and related workflow data to AI model providers and infrastructure vendors solely to provide requested features, debug builds, generate outputs, or improve service reliability. Do not submit confidential third-party material, regulated personal data, or content you are not authorized to use.",
      "AI outputs can be probabilistic and may resemble existing works or contain errors. You are responsible for reviewing generated code, assets, text, audio, and game behavior before publication or commercial use.",
    ],
  },
  {
    title: "6. Sharing and disclosure",
    list: [
      "Service providers: hosting, storage, database, build infrastructure, payment processing, email, support, logging, security, analytics, and AI processing vendors.",
      "Workspace collaborators: information you add to an organization, project, comment thread, asset library, playtest, or audit log may be visible to other authorized members based on their roles.",
      "External playtesters: if you create public or password-restricted share links, playtest builds and selected feedback surfaces may be accessible to recipients you authorize.",
      "Legal and safety: we may disclose information to comply with law, protect rights and safety, prevent fraud or abuse, enforce agreements, or respond to valid legal requests.",
      "Business transfers: information may be transferred as part of a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets.",
    ],
  },
  {
    title: "7. Cookies and similar technologies",
    body: [
      "We use cookies, local storage, and similar technologies for authentication, session management, CSRF protection, preferences, security, diagnostics, and product analytics. Browser settings may let you block or delete cookies, but some service features may stop working.",
    ],
  },
  {
    title: "8. Data retention",
    body: [
      "We keep personal information for as long as reasonably necessary to provide the service, maintain audit trails, comply with legal obligations, resolve disputes, enforce agreements, preserve security, and maintain backups. Project content, snapshots, build logs, telemetry, and account records may remain until deleted by an authorized user or until the applicable retention period expires.",
    ],
  },
  {
    title: "9. Security",
    body: [
      "We use administrative, technical, and organizational safeguards designed to protect personal information, including access controls, authentication, encrypted transport, least-privilege service access, logging, backup controls, and vendor review. No system is perfectly secure, and you are responsible for protecting your account credentials and workspace permissions.",
    ],
  },
  {
    title: "10. Your privacy rights",
    body: [
      "Depending on where you live, you may have rights to request access, correction, deletion, portability, restriction, objection, withdrawal of consent, or information about how we process personal information. California residents may also have rights to know, delete, correct, limit use of sensitive personal information, and opt out of sale or sharing. We do not sell personal information or share it for cross-context behavioral advertising as those terms are commonly used under California privacy law.",
      "To exercise rights, contact privacy@geeknight.engine. We may need to verify your identity and authority before completing a request.",
    ],
  },
  {
    title: "11. International transfers",
    body: [
      "We may process and store information in the United States and other countries where we or our providers operate. Where required, we use appropriate transfer mechanisms and contractual safeguards.",
    ],
  },
  {
    title: "12. Changes and contact",
    body: [
      "We may update this Privacy Policy as the service changes. If changes are material, we will provide notice through the service or by another reasonable method.",
      "Contact: privacy@geeknight.engine for privacy requests, legal@geeknight.engine for legal notices, and hey@geeknight.engine for support.",
    ],
  },
];

const termsSections = [
  {
    title: "1. Agreement to these Terms",
    body: [
      "These Terms and Conditions govern access to and use of Geek Night Engine, including the marketing site, workspace, AI-assisted project tools, asset studios, compilers, playtest links, telemetry tools, support channels, and related services. By using the service, you agree to these Terms.",
      "If you use the service for a company, studio, organization, or client, you represent that you have authority to bind that entity.",
    ],
  },
  {
    title: "2. Accounts, eligibility, and workspace administration",
    list: [
      "You must be at least 13 years old, and if you are under the age of majority where you live, you may use the service only with permission and supervision from a parent or legal guardian.",
      "You are responsible for accurate account information, credential security, and all activity under your account.",
      "Workspace owners and administrators control member access, roles, permissions, share links, billing ownership, and project settings.",
      "We may suspend or terminate accounts that violate these Terms, create security risk, or expose the service or other users to legal risk.",
    ],
  },
  {
    title: "3. Your content and ownership",
    body: [
      "As between you and Geek Night Engine, you retain ownership of project content you submit, upload, or create, including prompts, design documents, scripts, assets, comments, feedback, and game concepts, subject to rights held by others and the licenses granted in these Terms.",
      "You grant Geek Night Engine a worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, transmit, display, compile, modify, create derivative technical artifacts from, and otherwise use your content as necessary to provide, secure, support, and improve the service.",
      "You represent that you have all rights needed to upload, process, generate from, and publish your content, and that your content does not infringe third-party rights or violate law.",
    ],
  },
  {
    title: "4. AI-assisted features",
    body: [
      "AI-assisted outputs may include game design data, scripts, assets, audio, 3D model metadata, debugging suggestions, and generated text. Outputs may be inaccurate, incomplete, unsafe, or similar to content generated for others. You are responsible for human review, testing, rights clearance, ratings compliance, export checks, and publication decisions.",
      "Geek Night Engine does not guarantee that AI outputs are unique, copyrightable, error-free, secure, commercially suitable, or accepted by any platform, marketplace, console, store, or publisher.",
    ],
  },
  {
    title: "5. Acceptable use",
    list: [
      "Do not upload or generate content that is illegal, infringing, deceptive, malicious, abusive, exploitative, or intended to compromise systems or accounts.",
      "Do not attempt to bypass rate limits, credit accounting, security controls, authentication, workspace permissions, or build isolation.",
      "Do not use the service to create malware, credential theft tools, non-consensual sexual content, content exploiting minors, or content that violates applicable platform rules.",
      "Do not submit regulated sensitive data such as health records, government identifiers, payment card numbers, or children's personal information unless we have expressly agreed in writing that the service is configured for that use.",
    ],
  },
  {
    title: "6. Builds, exports, playtests, and telemetry",
    body: [
      "Compiled builds, exports, snapshots, public playtest links, telemetry events, and generated assets are provided as workflow tools. You are responsible for testing game behavior, managing player-facing notices, obtaining tester consent where required, configuring telemetry appropriately, and complying with platform, advertising, privacy, content-rating, accessibility, and consumer-protection rules.",
      "Public or password-restricted share links are controlled by workspace users. Treat them as potentially accessible to anyone who receives the link or password.",
    ],
  },
  {
    title: "7. Plans, credits, billing, and cancellation",
    body: [
      "Paid plans, credits, add-ons, overages, and seat licensing are described on the pricing page or in an order form. Credits measure service consumption and are not cash, stored value, gift cards, or currency. Credits may expire or reset according to the applicable plan.",
      "Subscriptions may renew automatically unless canceled before renewal. You are responsible for keeping billing information current. Taxes may apply. Unless required by law or stated in a separate agreement, fees are non-refundable once incurred.",
    ],
  },
  {
    title: "8. Third-party services",
    body: [
      "The service may rely on third-party infrastructure, payment processors, AI model providers, hosting vendors, storage, email, analytics, support tools, game engines, open-source packages, and platform stores. Third-party services may have their own terms, policies, and availability constraints.",
    ],
  },
  {
    title: "9. Copyright and DMCA",
    body: [
      "If you believe content hosted through Geek Night Engine infringes your copyright, send a notice to dmca@geeknight.engine with the copyrighted work, the allegedly infringing material, contact information, a good-faith statement, an accuracy statement under penalty of perjury, and your physical or electronic signature.",
      "If Geek Night Engine seeks U.S. DMCA safe-harbor protection for hosted user content, it should maintain a designated agent with the U.S. Copyright Office and publish that agent's current contact information.",
    ],
  },
  {
    title: "10. Beta features, availability, and disclaimers",
    body: [
      "Some features may be experimental, metered, rate-limited, modified, suspended, or discontinued. The service is provided on an \"as is\" and \"as available\" basis without warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability, or error-free operation.",
    ],
  },
  {
    title: "11. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, Geek Night Engine will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, lost profits, lost revenue, lost data, loss of goodwill, or costs of substitute services. To the maximum extent permitted by law, Geek Night Engine's aggregate liability for claims relating to the service is limited to the amounts you paid to Geek Night Engine for the service in the three months before the event giving rise to the claim.",
    ],
  },
  {
    title: "12. Indemnity",
    body: [
      "You will defend, indemnify, and hold Geek Night Engine harmless from claims, damages, liabilities, costs, and expenses arising from your content, your projects, your published games, your use of the service, your violation of these Terms, or your violation of law or third-party rights.",
    ],
  },
  {
    title: "13. Governing law and disputes",
    body: [
      "These Terms are governed by the laws of Costa Rica, without regard to conflict-of-law rules, unless applicable consumer law requires otherwise. Before filing a claim, each party agrees to try to resolve disputes informally by contacting legal@geeknight.engine.",
    ],
  },
  {
    title: "14. Changes and contact",
    body: [
      "We may update these Terms as the service changes. Continued use after the effective date of updated Terms means you accept the updated Terms.",
      "Contact: legal@geeknight.engine for legal notices, dmca@geeknight.engine for copyright notices, and hey@geeknight.engine for support.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <LegalLayout
      current="privacy"
      eyebrow="Legal"
      heading="Privacy Policy"
      sub="How Geek Night Engine handles account data, project content, AI workflows, telemetry, support requests, and billing information."
      sections={privacySections}
    />
  );
}

export function TermsPage() {
  return (
    <LegalLayout
      current="terms"
      eyebrow="Legal"
      heading="Terms & Conditions"
      sub="The rules for using Geek Night Engine's marketing site, workspace, AI-assisted production tools, cloud builds, playtests, billing, and generated content."
      sections={termsSections}
    />
  );
}

function LegalLayout({ eyebrow, heading, sub, sections }) {
  return (
    <>
      <SiteNav />
      <PageHero eyebrow={eyebrow} heading={heading} sub={sub} />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div className="card" style={{ padding: "18px 22px", background: "var(--bg-2)", marginBottom: 26 }}>
            <div className="label-cap" style={{ marginBottom: 8 }}>
              Effective date
            </div>
            <div className="mono" style={{ fontSize: 13, color: "var(--fg-1)" }}>
              Last updated {legalDate}. These pages are implementation-ready drafts and should be reviewed against the final legal entity, jurisdictions, vendors, and launch model before production.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {sections.map((section) => (
              <LegalSection key={section.title} {...section} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

function LegalSection({ title, body, list }) {
  return (
    <article data-anim="reveal" className="card" style={{ padding: "24px 26px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0, margin: "0 0 14px", lineHeight: 1.15 }}>{title}</h2>
      {body?.map((paragraph) => (
        <p key={paragraph} className="pretty" style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--fg-1)", margin: "0 0 12px" }}>
          {paragraph}
        </p>
      ))}
      {list && (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((item) => (
            <li key={item} className="pretty" style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--fg-1)", paddingLeft: 18, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: 9, width: 6, height: 6, borderRadius: 999, background: "var(--lime)" }} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
