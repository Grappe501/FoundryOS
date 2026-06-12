import { BOURBON_BOTTLES, type BourbonBottle } from './bottles';

export type BuyQuizAnswers = {
  budget: 20 | 40 | 60 | 100;
  sweet: boolean;
  spicy: boolean;
  beginner: boolean;
  collector: boolean;
  hosting: boolean;
};

export function recommendBottles(answers: BuyQuizAnswers): { bottle: BourbonBottle; reason: string }[] {
  let pool = BOURBON_BOTTLES.filter((b) => b.priceUsd <= answers.budget);

  if (answers.beginner) {
    pool = pool.filter((b) => b.tags.includes('beginner') || b.tags.includes('value'));
  }
  if (answers.collector) {
    pool = [...pool, ...BOURBON_BOTTLES.filter((b) => b.tags.includes('collector') && b.priceUsd <= answers.budget * 1.5)];
  }
  if (answers.hosting) {
    pool = pool.filter((b) => b.tags.includes('host') || b.tags.includes('beginner') || b.mashbill === 'wheated');
  }
  if (answers.sweet && !answers.spicy) {
    pool = pool.filter((b) => b.tags.includes('sweet') || b.mashbill === 'wheated');
  }
  if (answers.spicy && !answers.sweet) {
    pool = pool.filter((b) => b.tags.includes('spicy') || b.mashbill === 'high-rye');
  }

  const unique = [...new Map(pool.map((b) => [b.slug, b])).values()];
  const scored = unique.map((bottle) => {
    let score = 0;
    if (bottle.priceUsd <= answers.budget) score += 20;
    if (answers.sweet && bottle.tags.includes('sweet')) score += 15;
    if (answers.spicy && bottle.tags.includes('spicy')) score += 15;
    if (answers.beginner && bottle.tags.includes('beginner')) score += 10;
    if (answers.hosting && bottle.tags.includes('host')) score += 12;
    if (answers.collector && bottle.tags.includes('collector')) score += 10;
    score += bottle.tags.includes('value') ? 5 : 0;
    return { bottle, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(({ bottle }) => ({
    bottle,
    reason: buildReason(bottle, answers),
  }));
}

function buildReason(bottle: BourbonBottle, answers: BuyQuizAnswers): string {
  const parts: string[] = [bottle.whyBuy];
  if (answers.hosting && bottle.tags.includes('host')) parts.push('Crowd-friendly pour for your next tasting.');
  if (answers.beginner && bottle.proof <= 92) parts.push(`At ${bottle.proof} proof, heat stays manageable.`);
  if (answers.collector && bottle.ageYears) parts.push(`${bottle.ageYears}-year age statement adds depth.`);
  return parts.join(' ');
}
