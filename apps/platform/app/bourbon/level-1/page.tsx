import Link from 'next/link';
import { Level1Hub } from '../../../components/bourbon/level-1/Level1Hub';

export const metadata = {
  title: 'Bourbon Level 1 | Hobby HQ | Foundry',
  description: 'Tools, games, and decisions — the best bourbon website, not the best bourbon curriculum.',
};

export default function BourbonLevel1Page() {
  return (
    <>
      <Level1Hub />
      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/bourbon" style={{ color: '#6B6B70' }}>← Bourbon world</Link>
      </p>
    </>
  );
}
