import { companyInventory, type ProductInventoryRecord } from "./company-inventory";

export type PortfolioBand = "sell-now" | "finish-and-sell" | "incubate" | "publish" | "hold";

export type PortfolioOperatingRecord = ProductInventoryRecord & {
  priorityScore: number;
  priorityBand: PortfolioBand;
  priorityLabel: string;
  cashVelocity: "high" | "medium" | "low";
  buildLeverage: "high" | "medium" | "low";
  nextCommercialProof: string;
  executiveAction: string;
};

const evidenceWeight = { verified: 15, grounded: 10, estimate: 4 } as const;
const dispositionWeight = {
  accelerate: 20,
  validate: 15,
  prove: 13,
  publish: 12,
  incubate: 9,
  review: 5,
  hold: 0,
} as const;

function revenueScore(item: ProductInventoryRecord) {
  const midpoint = (item.annualRevenueLow + item.annualRevenueHigh) / 2;
  if (midpoint >= 500_000) return 15;
  if (midpoint >= 250_000) return 12;
  if (midpoint >= 100_000) return 9;
  if (midpoint > 0) return 5;
  return 0;
}

function commercialScore(item: ProductInventoryRecord) {
  const midpoint = (item.commercialPotentialLow + item.commercialPotentialHigh) / 2;
  if (midpoint >= 1_500_000) return 15;
  if (midpoint >= 750_000) return 12;
  if (midpoint >= 300_000) return 8;
  if (midpoint > 0) return 4;
  return 0;
}

function priorityBand(item: ProductInventoryRecord, score: number): PortfolioBand {
  if (item.disposition === "hold") return "hold";
  if (item.kind === "book" || item.disposition === "publish") return "publish";
  if (item.readiness >= 75 && item.disposition === "accelerate") return "sell-now";
  if (score >= 65 && ["accelerate", "validate", "prove"].includes(item.disposition)) return "finish-and-sell";
  return "incubate";
}

function cashVelocity(item: ProductInventoryRecord): PortfolioOperatingRecord["cashVelocity"] {
  if (item.disposition === "hold" || item.annualRevenueHigh === 0) return "low";
  if (item.readiness >= 75 && item.annualRevenueLow >= 100_000) return "high";
  if (item.readiness >= 55 || item.annualRevenueLow >= 60_000) return "medium";
  return "low";
}

function buildLeverage(item: ProductInventoryRecord): PortfolioOperatingRecord["buildLeverage"] {
  const repoCount = item.sourceRepos.length;
  if (item.kind === "platform" || repoCount >= 3) return "high";
  if (item.kind === "software" || repoCount === 2) return "medium";
  return "low";
}

function proofFor(item: ProductInventoryRecord, band: PortfolioBand) {
  if (item.disposition === "hold") return "Resolve the explicit ownership, legal, privacy, or governance blocker before commercialization.";
  if (band === "sell-now") return "Secure a paid pilot, paid beta cohort, or signed implementation customer and record actual conversion economics.";
  if (band === "finish-and-sell") return "Complete the smallest remaining commercial blocker, then test willingness to pay with a named customer segment.";
  if (band === "publish") return "Complete editorial/rights review and prove demand with a launch list, preorder, sponsor, or distribution commitment.";
  return "Run focused customer discovery and require external evidence before materially increasing build spend.";
}

function actionFor(item: ProductInventoryRecord, band: PortfolioBand) {
  const next = item.remainingBuild[0] ?? "Define the next bounded phase";
  if (band === "sell-now") return `Commercialize now. ${next}. Do not broaden scope until a customer pays.`;
  if (band === "finish-and-sell") return `Fund the minimum path to revenue. Start with: ${next}.`;
  if (band === "publish") return `Move through a publication track, beginning with: ${next}.`;
  if (band === "hold") return `Do not add material build spend. First resolve: ${next}.`;
  return `Keep in the option portfolio. Validate before acceleration. First question: ${next}.`;
}

export function buildOperatingRecord(item: ProductInventoryRecord): PortfolioOperatingRecord {
  const score = Math.min(
    100,
    Math.round(item.readiness * 0.35 + evidenceWeight[item.evidenceConfidence] + dispositionWeight[item.disposition] + revenueScore(item) + commercialScore(item)),
  );
  const band = priorityBand(item, score);
  const labels: Record<PortfolioBand, string> = {
    "sell-now": "SELL / PILOT NOW",
    "finish-and-sell": "FINISH → SELL",
    incubate: "INCUBATE / VALIDATE",
    publish: "PUBLISHING TRACK",
    hold: "HOLD / RESOLVE BLOCKER",
  };
  return {
    ...item,
    priorityScore: score,
    priorityBand: band,
    priorityLabel: labels[band],
    cashVelocity: cashVelocity(item),
    buildLeverage: buildLeverage(item),
    nextCommercialProof: proofFor(item, band),
    executiveAction: actionFor(item, band),
  };
}

export const operatingInventory = companyInventory.map(buildOperatingRecord);

export const portfolioQueues = {
  sellNow: operatingInventory.filter((x) => x.priorityBand === "sell-now").sort((a, b) => b.priorityScore - a.priorityScore),
  finishAndSell: operatingInventory.filter((x) => x.priorityBand === "finish-and-sell").sort((a, b) => b.priorityScore - a.priorityScore),
  incubate: operatingInventory.filter((x) => x.priorityBand === "incubate").sort((a, b) => b.priorityScore - a.priorityScore),
  publish: operatingInventory.filter((x) => x.priorityBand === "publish").sort((a, b) => b.priorityScore - a.priorityScore),
  hold: operatingInventory.filter((x) => x.priorityBand === "hold").sort((a, b) => b.priorityScore - a.priorityScore),
};

export const portfolioOperatingSummary = {
  sellNow: portfolioQueues.sellNow.length,
  finishAndSell: portfolioQueues.finishAndSell.length,
  incubate: portfolioQueues.incubate.length,
  publish: portfolioQueues.publish.length,
  hold: portfolioQueues.hold.length,
  topPriority: [...operatingInventory].sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 5),
};

export function getInventoryAsset(id: string) {
  return operatingInventory.find((item) => item.id === id) ?? null;
}
