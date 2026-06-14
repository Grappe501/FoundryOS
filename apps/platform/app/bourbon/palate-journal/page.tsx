import Link from 'next/link';
import { PalateJournalTool } from '../../../components/bourbon/level-2/PalateJournalTool';

export const metadata = {
  title: 'Palate Journal | Bourbon Level 2 | Foundry',
  description: 'Structured tasting journal — five flavor families, checkpoint evidence.',
};

export default function PalateJournalPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Palate Journal</h1>
      <PalateJournalTool />
    </section>
  );
}
