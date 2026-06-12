import Link from 'next/link';
import { BottleXRayTool } from '../../../components/bourbon/level-1/BottleXRayTool';

export const metadata = { title: 'Bottle X-Ray | Bourbon | Foundry' };

export default async function XRayPage({ searchParams }: { searchParams: Promise<{ bottle?: string }> }) {
  const { bottle } = await searchParams;
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bottle X-Ray</h1>
      <BottleXRayTool initialSlug={bottle} />
    </section>
  );
}
