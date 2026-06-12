import { ProducerAtlas } from '../../../components/bourbon/ProducerAtlas';
import { listBourbonProducers } from '../../../lib/world-depth/bourbon-producers';

export const metadata = {
  title: 'Producer Atlas | Bourbon World',
  description: 'Deep dives on Kentucky bourbon houses — history, sweet spots, crown jewels, and questions you did not know to ask.',
};

export default function BourbonProducersPage() {
  const count = listBourbonProducers().length;

  return (
    <section style={{ marginTop: 8 }}>
      <p style={{ color: '#6B6B70', fontSize: 12 }}>{count} major houses · Level 1 curriculum</p>
      <ProducerAtlas />
    </section>
  );
}
