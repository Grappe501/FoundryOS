/** PASS-034D — Bourbon depth writing standard */

export type RabbitHoleLink = {
  label: string;
  href: string;
  tease?: string;
};

export type BourbonPageDepth = {
  /** Route key — matches audit registry */
  id: string;
  path: string;
  title: string;
  /** Primary opening — must be ≥150 words */
  openingNarrative: string;
  whyItMatters: string;
  beginnerMisunderstanding: string;
  realWorldExample: string;
  howToUse: string;
  whatToNoticeNext: string;
  rabbitHoles: RabbitHoleLink[];
};

export type BourbonToolDepth = {
  slug: string;
  hook: string;
  /** Full paragraph — must be ≥40 words */
  explanation: string;
  practicalReason: string;
};

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
