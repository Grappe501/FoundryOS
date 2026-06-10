export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 300, letterSpacing: '-0.02em' }}>
        FoundryOS
      </h1>
      <p style={{ color: '#8A8A8E', fontSize: '1.125rem', marginTop: '0.5rem' }}>
        AI Operating System for 1,000 Specialty Apps
      </p>
      <div
        style={{
          marginTop: '3rem',
          padding: '1.5rem 2rem',
          border: '1px solid #2A2A2E',
          borderRadius: '12px',
          backgroundColor: '#141416',
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#C8A96E', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Pass 0 Complete
        </p>
        <p style={{ marginTop: '0.75rem', lineHeight: 1.6 }}>
          Foundation established. Platform kernel, self-build module skeleton,
          250-app catalog, and database schema ready.
        </p>
        <p style={{ marginTop: '1rem', color: '#8A8A8E', fontSize: '0.875rem' }}>
          First app: Bourbon Connoisseur — coming in Pass 5
        </p>
      </div>
    </main>
  );
}
