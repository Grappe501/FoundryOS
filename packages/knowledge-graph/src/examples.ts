import { createEntity, createRelationship } from './factory';
import type { KGEntity, KGRelationship } from './types';

/**
 * Example chain from Ernie:
 * Buffalo Trace → Pairs With → Brisket → Featured In → Tailgate Guide → Arkansas Razorbacks
 */
const buffaloTrace = createEntity('buffalo-trace', 'Buffalo Trace', 'product', { topic_slug: 'bourbon-connoisseur' });
const brisket = createEntity('brisket', 'Brisket', 'concept', { topic_slug: 'bbq-smokehouse' });
const tailgate = createEntity('tailgate-guide', 'Tailgate Guide', 'topic', { topic_slug: 'tailgate-culture' });
const razorbacks = createEntity('arkansas-razorbacks', 'Arkansas Razorbacks', 'concept', { topic_slug: 'college-football' });

export const EXAMPLE_BOURBON_CHAIN: { entities: KGEntity[]; relationships: KGRelationship[] } = {
  entities: [buffaloTrace, brisket, tailgate, razorbacks],
  relationships: [
    createRelationship(buffaloTrace.id, brisket.id, 'pairs_with', 0.9),
    createRelationship(brisket.id, tailgate.id, 'featured_in', 0.8),
    createRelationship(tailgate.id, razorbacks.id, 'related_to', 0.7),
  ],
};
