import type { BenchFragment } from '../../../../lib/talent-foundry/implementations/company/soul/fragments';

export function FragmentTrail({ fragments }: { fragments: BenchFragment[] }) {
  if (fragments.length === 0) return null;
  return (
    <ol className="ws-object ws-trail" data-place="trail" data-presence="focus" aria-label="What they found and tried">
      {fragments.map((bit) => (
        <li key={bit.id} className="ws-bit" data-kind={bit.kind}>
          {bit.label}
        </li>
      ))}
    </ol>
  );
}
