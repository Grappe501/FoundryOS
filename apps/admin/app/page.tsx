const CORE_MODULES = [
  { name: 'Dashboard', desc: 'Platform health' },
  { name: 'Verticals', desc: 'Public domains' },
  { name: 'Topics', desc: '1,961 registry entries' },
  { name: 'Sites', desc: 'Vertical domain deploy' },
  { name: 'Users', desc: 'Cross-vertical identity' },
  { name: 'Billing', desc: 'Tier 2/3' },
  { name: 'Deploy', desc: 'Netlify' },
];

const NEW_MODULES = [
  { name: 'Content Engine', desc: '11 content types, CMS + SEO factory', highlight: true },
  { name: 'Knowledge Graph', desc: 'Universal entities, relationships', highlight: true },
  { name: 'SEO', desc: 'Indexed, generated, entity paths', highlight: true },
  { name: 'Ownership Graph', desc: 'user_entity_relationships', highlight: true },
  { name: 'Collections', desc: 'User → Collection → Entities', highlight: true },
  { name: 'Entity Metrics', desc: 'Leaderboards, engagement counts', highlight: true },
  { name: 'Reputation', desc: 'Trust, expertise, badges', highlight: true },
  { name: 'AI Brain', desc: 'Personas, prompts, usage, cost', highlight: true },
  { name: 'Self-Build', desc: 'Topics ready, published, pending', highlight: true },
];

export default function AdminHomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <p style={{ color: '#6B6B70', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        FoundryOS Control Plane
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 8 }}>Admin Dashboard</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8 }}>Vertical domains + topics. Not 1,961 sites.</p>

      <h2 style={{ fontSize: 14, color: '#8A8A8E', marginTop: 32, fontWeight: 400 }}>Core</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 12 }}>
        {CORE_MODULES.map((m) => (
          <ModuleCard key={m.name} name={m.name} desc={m.desc} />
        ))}
      </div>

      <h2 style={{ fontSize: 14, color: '#C8A96E', marginTop: 32, fontWeight: 400 }}>Course Correction Additions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 12 }}>
        {NEW_MODULES.map((m) => (
          <ModuleCard key={m.name} name={m.name} desc={m.desc} highlight />
        ))}
      </div>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>PASS-003 · docs/OWNERSHIP_GRAPH.md · docs/SEO_PUBLISH_POLICY.md</p>
    </main>
  );
}

function ModuleCard({ name, desc, highlight }: { name: string; desc: string; highlight?: boolean }) {
  return (
    <div style={{ padding: '1rem 1.25rem', border: `1px solid ${highlight ? '#2A2520' : '#1E1E22'}`, borderRadius: 8, backgroundColor: highlight ? '#12100E' : '#0F0F12' }}>
      <div style={{ color: highlight ? '#C8A96E' : '#E8E8EC', fontSize: 13, fontWeight: 500 }}>{name}</div>
      <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{desc}</div>
    </div>
  );
}
