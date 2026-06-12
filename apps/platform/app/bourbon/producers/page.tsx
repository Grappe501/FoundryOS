import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { ProducerAtlas } from '../../../components/bourbon/ProducerAtlas';

export const metadata = {
  title: 'Producer Atlas | Bourbon World',
  description: 'Deep dives on Kentucky bourbon houses — history, sweet spots, crown jewels, and questions you did not know to ask.',
};

export default function BourbonProducersPage() {
  const content = getBourbonPageDepth('producers')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <ProducerAtlas />
    </BourbonDeepPageShell>
  );
}
