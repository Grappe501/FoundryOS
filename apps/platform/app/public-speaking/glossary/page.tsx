import { PS_GLOSSARY } from '../../../lib/public-speaking-world';

export default function PsGlossaryPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Glossary</h1>
      <dl style={{ marginTop: 24 }}>
        {PS_GLOSSARY.map((item) => (
          <div key={item.term} style={{ padding: '16px 0', borderBottom: '1px solid #1A1A1E' }}>
            <dt style={{ color: '#6B8BB8', fontSize: 14 }}>{item.term}</dt>
            <dd style={{ color: '#8A8A8E', fontSize: 13, margin: '8px 0 0' }}>{item.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
