const MODULES = [
  { name: 'Dashboard', desc: 'Apps, users, MRR, deploy health' },
  { name: 'Apps', desc: '1,961 specialty apps registry' },
  { name: 'Sites', desc: 'Standalone domains & deploy status' },
  { name: 'Verticals', desc: 'Books, Music, Movies mega-categories' },
  { name: 'Content', desc: 'Catalog, AI enrichment, publish' },
  { name: 'Users', desc: 'Cross-app identity & tiers' },
  { name: 'Billing', desc: 'Tier 2 ($4) / Tier 3 ($18)' },
  { name: 'AI Config', desc: 'OpenAI prompts per app' },
  { name: 'Themes', desc: 'Per-site branding' },
  { name: 'Deploy', desc: 'Netlify provisioning' },
  { name: 'Self-Build', desc: 'AI app generator' },
  { name: 'Analytics', desc: 'Per-site metrics' },
];

export default function AdminHomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <p style={{ color: '#6B6B70', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        FoundryOS Control Plane
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 8 }}>Admin Dashboard</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8 }}>
        One dashboard. Every standalone site. 1,961 apps.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 32 }}>
        {MODULES.map((m) => (
          <div
            key={m.name}
            style={{
              padding: '1rem 1.25rem',
              border: '1px solid #1E1E22',
              borderRadius: 8,
              backgroundColor: '#0F0F12',
            }}
          >
            <div style={{ color: '#C8A96E', fontSize: 13, fontWeight: 500 }}>{m.name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{m.desc}</div>
          </div>
        ))}
      </div>
      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>
        Pass 1 scaffold — full admin UI in Pass 2. See docs/ADMIN_ARCHITECTURE.md
      </p>
    </main>
  );
}
