import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export const metadata = {
  title: 'Public Speaking Lore | Communicators & Debates | Foundry',
  description: 'Heroes, rivalries, pilgrimages — what great speakers overcame.',
};

export default function PublicSpeakingLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <WorldLoreHub worldSlug="public-speaking" accent="#7B8FD4" backHref="/public-speaking" backLabel="Public Speaking world" />
    </section>
  );
}
