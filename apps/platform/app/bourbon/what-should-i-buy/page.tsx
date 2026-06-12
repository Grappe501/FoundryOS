import Link from 'next/link';
import { BuyEngine } from '../../../components/bourbon/level-1/BuyEngine';

export const metadata = { title: 'What Should I Buy? | Bourbon | Foundry' };

export default function WhatShouldIBuyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>What should I buy?</h1>
      <BuyEngine />
    </section>
  );
}
