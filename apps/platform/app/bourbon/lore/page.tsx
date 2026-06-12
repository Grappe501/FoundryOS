import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export const metadata = {
  title: 'Bourbon Lore | Mythology & Stories | Foundry',
  description: 'Heroes, rivalries, mysteries, pilgrimages — the mythology that makes bourbon alive.',
};

export default function BourbonLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <WorldLoreHub worldSlug="bourbon" accent="#C8A96E" backHref="/bourbon/level-1" backLabel="Level 1 HQ" />
    </section>
  );
}
