import type { AtlasContext, AtlasAskPrompt, ComparisonExplanationInput, MentorAnswer, MentorCitation, UserIdentityContext } from './types';
import { UNKNOWN_SOURCE_MESSAGE } from './types';
import { summarizeConfidenceForAnswer } from './confidence';
import { guardClaim } from './safety';

/** Canonical proof-path hops when value + BiB + wheated signals align */
const PROOF_RABBIT_HOLE = [
  { title: 'Bottled-in-Bond', href: '/bourbon/graph/bottled-in-bond', confidence: 'verified' as const },
  { title: 'Heaven Hill', href: '/bourbon/graph/heaven-hill', confidence: 'commonly_reported' as const },
  { title: 'Old Grand-Dad Bonded', href: '/bourbon/graph/evan-williams-white', confidence: 'commonly_reported' as const },
  { title: 'Store pick economics', href: '/bourbon/atlas/store-pick', confidence: 'editorial' as const },
];

function citationsFromHops(hops: typeof PROOF_RABBIT_HOLE): MentorCitation[] {
  return hops.map((h) => ({ label: h.title, href: h.href, confidence: h.confidence }));
}

function hasProofSignals(user: UserIdentityContext): boolean {
  const hasWt101 =
    user.artifacts.some((a) => a.title.toLowerCase().includes('wild turkey 101')) ||
    user.graph_views.some((g) => g.slug.includes('wild-turkey-101'));
  const hasBib = user.graph_views.some((g) => g.slug.includes('bottled-in-bond') || g.slug.includes('bib'));
  const hasWheated =
    user.collections.some((c) => c.id === 'wheated-explorer' && c.unlocked > 0) ||
    user.saved_rabbit_holes.some((h) => h.slug.includes('weller') || h.title.toLowerCase().includes('wheated'));
  return hasWt101 && hasBib && hasWheated;
}

function reviewForAnchor(user: UserIdentityContext, anchorSlug: string) {
  return user.reviews.find((r) => r.entity_slug === anchorSlug || anchorSlug.includes(r.entity_slug));
}

function recommendationForAnchor(user: UserIdentityContext, anchorSlug: string) {
  return user.recommendations.find((r) => r.entity_slug === anchorSlug || anchorSlug.includes(r.entity_slug));
}

export function generateNextBestRabbitHole(
  atlas: AtlasContext,
  user: UserIdentityContext,
): { path_label: string; hops: MentorCitation[]; reason: string } {
  if (hasProofSignals(user)) {
    const label = PROOF_RABBIT_HOLE.map((h) => h.title).join(' → ');
    return {
      path_label: label,
      hops: citationsFromHops(PROOF_RABBIT_HOLE),
      reason: 'Your artifacts, graph walks, and collections align on value, BiB trust, and wheated allocation.',
    };
  }

  const hops: MentorCitation[] = [
    { label: atlas.anchor.title, href: `/bourbon/graph/${atlas.anchor.slug}`, confidence: 'verified' },
    ...atlas.suggested_hops.slice(0, 3).map((h) => ({
      label: h.title,
      href: h.href,
      confidence: h.confidence,
    })),
  ];

  const topCuriosity = user.curiosity_topics[0];
  const reason = topCuriosity
    ? `Weighted toward ${topCuriosity.label} from your recent graph and compare activity.`
    : 'Based on this graph node and your recent walks.';

  return {
    path_label: hops.map((h) => h.label).join(' → '),
    hops,
    reason,
  };
}

export function generateComparisonExplanation(
  input: ComparisonExplanationInput,
  atlas?: AtlasContext,
): MentorAnswer {
  const answer = `In Foundry's graph, ${input.label_a} and ${input.label_b} sit in different comparison lanes — start from each bottle node, then follow rival and value edges rather than generic ratings. ${
    atlas ? atlas.why_should_i_care : ''
  }`.trim();

  return {
    prompt: 'connect_shelf',
    answer,
    citations: [
      { label: input.label_a, href: `/bourbon/graph/${input.slug_a}`, confidence: 'commonly_reported' },
      { label: input.label_b, href: `/bourbon/graph/${input.slug_b}`, confidence: 'commonly_reported' },
    ],
    confidence_notice: atlas ? summarizeConfidenceForAnswer(atlas) : null,
    unknowns_acknowledged: atlas?.unknown_fields ?? [],
    personalized: false,
    grounded_in_foundry: true,
  };
}

export function generateMentorAnswer(
  prompt: AtlasAskPrompt,
  atlas: AtlasContext,
  user: UserIdentityContext,
): MentorAnswer {
  const confidence_notice = summarizeConfidenceForAnswer(atlas);
  const personalized = user.artifacts.length > 0 || user.graph_views.length > 0 || user.collections.some((c) => c.unlocked > 0);

  switch (prompt) {
    case 'why_care': {
      const citations: MentorCitation[] = [
        { label: atlas.anchor.title, href: `/bourbon/graph/${atlas.anchor.slug}`, confidence: 'verified' },
        ...atlas.edges.slice(0, 3).map((e) => ({ label: e.title, href: e.href, confidence: e.confidence })),
      ];
      let answer = atlas.why_should_i_care;
      if (personalized && user.narrative?.recent_pattern) {
        answer = `${user.narrative.recent_pattern} Here, on ${atlas.anchor.title}: ${atlas.why_should_i_care}`;
      }
      return {
        prompt,
        answer,
        citations,
        confidence_notice,
        unknowns_acknowledged: atlas.unknown_fields.slice(0, 5),
        personalized,
        grounded_in_foundry: true,
      };
    }

    case 'explore_next': {
      const rabbit = generateNextBestRabbitHole(atlas, user);
      const anchorReview = reviewForAnchor(user, atlas.anchor.slug);
      const anchorRec = recommendationForAnchor(user, atlas.anchor.slug);
      let answer = `${user.curiosity_summary} A good next path is ${rabbit.path_label}. ${rabbit.reason}`;
      if (anchorRec) {
        answer = `You recommended ${anchorRec.title} for ${anchorRec.who_this_is_for.toLowerCase()}. That suggests your bourbon judgment is forming around ${anchorRec.recommendation_reason.toLowerCase()}. ${answer}`;
      } else if (anchorReview) {
        answer = `You reviewed ${anchorReview.title} and said what surprised you was ${anchorReview.what_surprised_me.toLowerCase()}. That suggests you may enjoy comparing it with ${anchorReview.what_to_try_next} next. ${answer}`;
      }
      return {
        prompt,
        answer,
        citations: rabbit.hops,
        confidence_notice,
        unknowns_acknowledged: [],
        personalized,
        grounded_in_foundry: true,
      };
    }

    case 'connect_shelf': {
      const anchorReview = reviewForAnchor(user, atlas.anchor.slug);
      const anchorRec = recommendationForAnchor(user, atlas.anchor.slug);
      const collectionBits = user.collections
        .filter((c) => c.unlocked > 0)
        .map((c) => `${c.title} (${c.unlocked}/${c.total})`)
        .join(', ');
      const artifactBits = user.artifacts.slice(-2).map((a) => a.title).join(', ');
      const answer = [
        user.curiosity_summary,
        anchorRec
          ? `You recommended this for ${anchorRec.who_this_is_for}: ${anchorRec.recommendation_reason}`
          : anchorReview
            ? `Your review notes: best for ${anchorReview.who_this_is_for}; surprised by ${anchorReview.what_surprised_me}.`
            : '',
        collectionBits ? `Collection progress: ${collectionBits}.` : '',
        artifactBits ? `Recent evidence: ${artifactBits}.` : '',
        `${atlas.anchor.title} connects through the graph — follow ${atlas.edges.slice(0, 2).map((e) => e.title).join(' and ') || 'its hallway edges'} to extend your shelf story with Foundry nodes, not hype.`,
      ]
        .filter(Boolean)
        .join(' ');

      return {
        prompt,
        answer,
        citations: [
          { label: atlas.anchor.title, href: `/bourbon/graph/${atlas.anchor.slug}`, confidence: 'verified' },
          ...user.collections.slice(0, 2).map((c) => ({
            label: c.title,
            href: '/bourbon/portfolio',
            confidence: 'verified' as const,
          })),
        ],
        confidence_notice,
        unknowns_acknowledged: atlas.unknown_fields.slice(0, 3),
        personalized,
        grounded_in_foundry: true,
      };
    }

    case 'what_unknown': {
      const unknownEdges = atlas.edges.filter((e) => e.confidence === 'unknown');
      const unknownFacts = atlas.inventory_facts.filter((f) => f.confidence === 'unknown');
      const lines: string[] = [];

      if (unknownEdges.length === 0 && unknownFacts.length === 0 && atlas.unknown_fields.length === 0) {
        lines.push(`On ${atlas.anchor.title}, Foundry marks most hallway edges at commonly reported or higher — still check each badge before treating a teaser as fact.`);
      } else {
        lines.push(`On ${atlas.anchor.title}, Foundry flags these as unknown or undisclosed:`);
        for (const u of atlas.unknown_fields.slice(0, 6)) {
          lines.push(`• ${u}`);
        }
        for (const f of unknownFacts.slice(0, 4)) {
          lines.push(`• ${guardClaim(f.field, f.confidence, f.value)}`);
        }
      }

      lines.push(UNKNOWN_SOURCE_MESSAGE);

      return {
        prompt,
        answer: lines.join(' '),
        citations: [{ label: atlas.anchor.title, href: `/bourbon/graph/${atlas.anchor.slug}`, confidence: 'verified' }],
        confidence_notice: confidence_notice ?? 'Several fields on this node are not producer-verified.',
        unknowns_acknowledged: atlas.unknown_fields,
        personalized: false,
        grounded_in_foundry: true,
      };
    }
  }
}
