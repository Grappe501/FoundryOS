import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPerson } from '@foundry/bourbon-intelligence';
import { PersonProfileView } from '../../../../components/bourbon/PeopleProfiles';
import { getBourbonPerson } from '../../../../lib/bourbon-depth/people';
import { listAllPeopleSlugs } from '../../../../lib/bourbon-people/unified';
import { inferGraphRef, resolveBourbonGraph } from '../../../../lib/bourbon-graph';
import { BourbonGraphHallway } from '../../../../components/bourbon/BourbonGraphHallway';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listAllPeopleSlugs().map((slug) => ({ slug }));
}

export default async function BourbonPeopleSlugPage({ params }: Props) {
  const { slug } = await params;
  const depthPerson = getBourbonPerson(slug);
  if (depthPerson) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
        <PersonProfileView person={depthPerson} />
      </main>
    );
  }

  const intel = getPerson(slug);
  if (!intel) notFound();

  const ref = inferGraphRef(slug);
  const graph = ref ? resolveBourbonGraph(ref) : null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <Link href="/bourbon/people" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Masters & Makers</Link>
      <Link href={`/bourbon/graph/${slug}`} style={{ color: 'var(--foundry-primary)', fontSize: 13, marginLeft: 16 }}>Graph map →</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 16 }}>{intel.name.value}</h1>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 8 }}>
        {intel.roles.map((r) => r.role.replace(/_/g, ' ')).join(' · ')}
      </p>
      {intel.facts.slice(0, 4).map((f) => (
        <p key={f.claim} style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>
          {f.claim}
        </p>
      ))}
      {graph && <BourbonGraphHallway graph={graph} linkifyTeasers />}
    </main>
  );
}
