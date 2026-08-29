export type InventoryKind = "software" | "platform" | "book" | "service" | "component";
export type InventoryDisposition = "accelerate" | "incubate" | "validate" | "hold" | "publish" | "prove" | "review";
export type EvidenceConfidence = "verified" | "grounded" | "estimate";

export type ProductInventoryRecord = {
  id: string;
  name: string;
  kind: InventoryKind;
  readiness: number;
  disposition: InventoryDisposition;
  dispositionLabel: string;
  sourceRepos: string[];
  customer: string;
  problem: string;
  productThesis: string;
  remainingBuild: string[];
  annualRevenueLow: number;
  annualRevenueHigh: number;
  replacementValueLow: number;
  replacementValueHigh: number;
  riskAdjustedIpValueLow: number;
  riskAdjustedIpValueHigh: number;
  commercialPotentialLow: number;
  commercialPotentialHigh: number;
  evidenceConfidence: EvidenceConfidence;
  evidenceNotes: string[];
  strategicNotes?: string;
};

const r = (
  id: string,
  name: string,
  kind: InventoryKind,
  readiness: number,
  disposition: InventoryDisposition,
  dispositionLabel: string,
  sourceRepos: string[],
  customer: string,
  problem: string,
  productThesis: string,
  annualRevenueLow: number,
  annualRevenueHigh: number,
  replacementValueLow: number,
  replacementValueHigh: number,
  riskAdjustedIpValueLow: number,
  riskAdjustedIpValueHigh: number,
  commercialPotentialLow: number,
  commercialPotentialHigh: number,
  remainingBuild: string[],
  evidenceConfidence: EvidenceConfidence,
  evidenceNotes: string[],
  strategicNotes?: string,
): ProductInventoryRecord => ({
  id,
  name,
  kind,
  readiness,
  disposition,
  dispositionLabel,
  sourceRepos,
  customer,
  problem,
  productThesis,
  annualRevenueLow,
  annualRevenueHigh,
  replacementValueLow,
  replacementValueHigh,
  riskAdjustedIpValueLow,
  riskAdjustedIpValueHigh,
  commercialPotentialLow,
  commercialPotentialHigh,
  remainingBuild,
  evidenceConfidence,
  evidenceNotes,
  strategicNotes,
});

export const companyInventory: ProductInventoryRecord[] = [
  r("souschef", "SousChef / HomeChef AI", "software", 90, "accelerate", "ACCELERATE · TRAINING PRODUCT", ["Grappe501/HomeChefAi"], "Households that want meal planning, pantry intelligence, and cooking assistance", "Food planning is fragmented across recipes, pantry memory, shopping, and household preferences", "A persistent household food brain that learns the kitchen instead of acting like a disposable recipe search", 150000, 600000, 180000, 350000, 150000, 300000, 600000, 1800000, ["Billing and entitlement hardening", "Paid onboarding", "AI cost telemetry", "Mobile polish", "Privacy controls", "Paid beta instrumentation"], "verified", ["Existing product registry marks readiness at 90%", "Large structured recipe corpus and persistent pantry/planning features already exist"], "Best near-term paid beta training product."),
  r("localbrain", "LocalBrain", "platform", 85, "accelerate", "ACCELERATE · NARROW ICP", ["Grappe501/LocalBrain"], "Small organizations and executives that need private operational memory", "Teams lose context across files, chats, decisions, and departmental workflows", "A private/local-first executive operating system with persistent institutional memory", 180000, 900000, 250000, 550000, 220000, 480000, 900000, 2700000, ["Narrow ideal customer profile", "Security hardening", "Deployment packaging", "Support model", "Paid validation"], "grounded", ["Existing registry marks readiness at 85%", "On-prem/GPU path and departmental memory are documented advantages"]),
  r("campaignos", "CampaignOS", "software", 80, "accelerate", "ACCELERATE · CLEAN EXTRACTION", ["Grappe501/CampaignOS", "Grappe501/reddirt"], "Political campaigns and civic organizations", "Campaign work is split across CRM, field, events, communications, calendar, compliance, and task systems", "One campaign operating system with shared people, project, communications, field, and intelligence rails", 240000, 1200000, 450000, 900000, 350000, 750000, 1200000, 4200000, ["Clean multi-tenant extraction", "Security and permissions hardening", "Compliance boundaries", "Pricing and packaging", "Deployment independence from campaign proving ground"], "verified", ["Real campaign proving ground exists", "Existing registry marks readiness at 80%"]),
  r("votematch", "VoteMatch", "software", 76, "accelerate", "ACCELERATE · HARDEN AUTH/PRIVACY", ["Grappe501/VoteMatch"], "Petition campaigns, election administrators, civic organizations, and verification teams", "Matching signatures and imported records to voter files is expensive, manual, and error-prone", "Confidence-aware record matching with OCR, automated candidate matches, and mandatory human review for ambiguity", 120000, 600000, 180000, 400000, 140000, 320000, 600000, 2000000, ["Authentication and RBAC", "Privacy controls", "Jurisdiction configuration", "Audit trail hardening", "Commercial packaging"], "verified", ["Confidence-aware matching and OCR workflows exist", "Human-review queue is a core product control"]),
  r("bidassembly", "Bid Assembly", "software", 65, "accelerate", "ACCELERATE · B2B VALIDATION", ["Grappe501/bidapp"], "Contractors, vendors, and proposal teams", "Complex bids require evidence, requirements, vendors, drafting, and compliance to stay synchronized", "Grounded proposal assembly that ties every drafted answer to requirements and evidence", 120000, 720000, 160000, 360000, 110000, 260000, 720000, 2400000, ["Customer interviews", "ICP validation", "Pricing", "Procurement workflow polish", "Enterprise security"], "grounded", ["Existing registry marks readiness at 65%", "High-value B2B workflow is clearly identified"]),
  r("canonforge", "CanonForge Knowledge OS", "platform", 70, "validate", "VALIDATE + EXTRACT", ["Grappe501/CanonForge"], "Writers, founders, research teams, and complex long-running projects", "Complex projects lose provenance, decisions, canon, contradictions, and continuity over time", "A knowledge operating system for canon, provenance, contradiction detection, decision history, and continuity", 120000, 600000, 220000, 500000, 150000, 360000, 600000, 2100000, ["Standalone extraction", "ICP testing", "Workflow simplification", "Commercial packaging", "Multi-user permissions"], "grounded", ["Canon/provenance/contradiction architecture is a documented differentiator"]),
  r("peoplebase", "PeopleBase / ContactList", "software", 70, "incubate", "INCUBATE", ["Grappe501/PeopleBaseII", "Grappe501/ContactList", "Grappe501/people"], "Organizations that need a durable people graph across imported data", "Contact data arrives fragmented, duplicated, and disconnected from relationship context", "A layered identity and relationship graph that ingests new files without destroying source provenance", 120000, 600000, 180000, 420000, 120000, 300000, 600000, 1900000, ["Canonical schema consolidation", "Matching confidence layer", "RBAC", "Import UX", "Commercial use-case focus"], "grounded", ["Multiple source repositories contain related people/contact systems"]),
  r("eventops", "Event Operations", "software", 58, "incubate", "INCUBATE", ["Grappe501/reddirt", "Grappe501/kelly-calendar"], "Campaigns, nonprofits, associations, and field organizations", "Events generate dozens of repeatable tasks, staffing needs, assets, communications, and follow-up steps", "Duplicate-ready event project management that turns every calendar event into an operational template", 90000, 450000, 120000, 280000, 75000, 190000, 450000, 1400000, ["Independent module extraction", "Reusable event templates", "Volunteer assignment flow", "Asset checklists", "Post-event reporting"], "grounded", ["Built from real campaign event operations and calendar data"]),
  r("fieldspark", "FieldSpark / Field Command", "software", 50, "incubate", "INCUBATE · CAMPAIGNOS MODULE FIRST", ["Grappe501/FieldSpark", "Grappe501/field-structure", "Grappe501/regnat-populus-field", "Grappe501/kelly-field-operations"], "Campaign field teams and grassroots organizations", "Field programs struggle to translate geographic goals into volunteer work, reporting, and accountability", "A field command layer that connects goals, turf, volunteers, events, voter universes, and measurable execution", 120000, 600000, 160000, 380000, 85000, 240000, 600000, 1800000, ["Unify overlapping repositories", "CampaignOS module boundary", "Mobile field UX", "Reporting", "Commercial validation"], "estimate", ["Several related field repositories exist; consolidation still required"]),
  r("bookfoundry", "Writers Dashboard / Book Foundry", "platform", 45, "incubate", "INCUBATE · PRODUCTIZE", ["Grappe501/writers_dashboard", "Grappe501/WRITERS_DASHBOARD_M2"], "Authors and research-heavy writers", "Long books lose narrative continuity, source grounding, chapter state, and editorial decision history", "A writing companion that remembers the whole book and manages research, canon, drafting, and revision as one system", 60000, 300000, 120000, 300000, 60000, 180000, 300000, 1000000, ["Product UX consolidation", "Standalone packaging", "Author onboarding", "Export workflows", "Paid validation"], "grounded", ["Multiple writing-system repositories exist"]),
  r("constitutional-capitalism", "Constitutional Capitalism", "book", 45, "publish", "BOOK PRODUCT", ["Grappe501/constitutional-capitalism"], "Readers, policy thinkers, civic leaders, and educational audiences", "Economic reform arguments are often fragmented and disconnected from long-run system modeling", "A public-facing economic framework paired with simulation and evidence so readers can test consequences rather than accept slogans", 10000, 75000, 80000, 180000, 30000, 90000, 75000, 350000, ["Narrative completion", "Evidence pass", "Simulator integration", "Editorial review", "Publishing and distribution"], "grounded", ["Active manuscript and modeling work exist"]),
  r("mercy-protocol", "The Mercy Protocol", "book", 85, "publish", "BOOK PRODUCT · PUBLICATION TRACK", ["Grappe501/Mercy_Protocol"], "General nonfiction/fiction readership depending on final positioning", "Publication-ready intellectual property needs editorial, production, and market packaging", "A near-publication manuscript treated as a real commercial asset rather than an unfinished side project", 5000, 50000, 50000, 120000, 30000, 80000, 50000, 250000, ["Final editorial pass", "Packaging", "Launch plan", "Distribution"], "grounded", ["Existing registry marks readiness at 85%"]),
  r("campti", "Campti / Grappe Historical Novel", "book", 30, "review", "BOOK PRODUCT · AUDIT", ["Grappe501/campti"], "Historical fiction readers and regional-history audiences", "Family and regional history can disappear unless converted into durable narrative IP", "A historically grounded multigenerational Louisiana/Arkansas story built from real lineage and documented regional history", 5000, 40000, 70000, 160000, 20000, 60000, 40000, 200000, ["Manuscript audit", "Historical verification", "Narrative architecture", "Completion plan", "Rights review"], "grounded", ["Existing registry marks readiness at 30%"]),
  r("arkansas-history", "Arkansas Political History", "book", 25, "review", "BOOK PRODUCT · AUDIT", ["Grappe501/arkansas-political-history"], "Arkansas readers, educators, journalists, and civic audiences", "State political history is difficult to access as a coherent public narrative", "A deeply sourced Arkansas political history that connects institutions, movements, and lived consequences", 5000, 30000, 70000, 180000, 15000, 55000, 30000, 180000, ["Corpus audit", "Source map", "Narrative structure", "Draft completion", "Legal/editorial review"], "estimate", ["Existing registry marks readiness at 25%"]),
  r("arkansas-galaxy", "Arkansas Galaxy", "book", 20, "review", "BOOK PRODUCT · IP REVIEW", ["Grappe501/Star_Wars"], "Experimental/fan-fiction audience", "Creative work based on protected universes has commercialization constraints", "A creative proving ground whose techniques may be reusable even where underlying IP limits direct commercialization", 0, 40000, 25000, 80000, 0, 20000, 0, 100000, ["IP/legal review", "Determine originalizable components", "Separate reusable craft from protected universe"], "estimate", ["Commercialization is contingent on IP review"]),
  r("elvestribal", "Elvestribal", "book", 15, "review", "BOOK PRODUCT · CONTENT AUDIT", ["Grappe501/Elvestribal", "Grappe501/elvestribal-monrepo"], "Fantasy readers", "Early creative IP needs consolidation before its commercial potential can be understood", "Original fantasy IP that may become a long-horizon book or world-building asset", 0, 0, 30000, 100000, 5000, 30000, 0, 120000, ["Content audit", "Repository consolidation", "Canon map", "Commercial decision"], "estimate", ["Existing registry marks readiness at 15%"]),
  r("county-intelligence", "County Intelligence / Workbench", "software", 60, "incubate", "INCUBATE", ["Grappe501/county-workbench"], "Campaigns, local leaders, economic developers, journalists, and civic organizations", "County-level data is scattered across public sources and rarely translated into operational local intelligence", "A county operating picture combining demographics, economy, elections, institutions, goals, and strategy", 60000, 300000, 160000, 380000, 90000, 240000, 300000, 1200000, ["Expand full county profiles", "Automated data refresh", "Regional rollups", "Packaging", "Customer validation"], "grounded", ["Working county profile architecture exists"]),
  r("civic-university", "Civic University Technology", "platform", 70, "hold", "HOLD · OWNERSHIP/PRIVACY REVIEW", ["Grappe501/arkansas-civic-university", "Grappe501/ARKANSAS_CIVICS"], "Students, schools, civic organizations, and lifelong learners", "Civics education is often passive, disconnected from action, and weak at building durable civic identity", "A mission-driven civic learning environment that converts education into practical participation and community capability", 60000, 300000, 220000, 520000, 90000, 260000, 300000, 1200000, ["Ownership review", "Student privacy/legal review", "Backend productionization", "School rollout controls", "Customer validation"], "grounded", ["Existing registry marks readiness at 70%", "Hold status is intentional pending ownership/privacy review"]),
  r("block-street", "Block Street", "platform", 30, "prove", "PROVING GROUND", ["Grappe501/Block-Street"], "Neighborhood and community participants", "Local social/civic participation lacks durable digital infrastructure owned around real communities", "A neighborhood-scale proving ground for local coordination, identity, exchange, and civic participation", 30000, 180000, 100000, 260000, 40000, 130000, 180000, 700000, ["Clarify core loop", "Prototype proof", "Trust/safety model", "Local pilot", "Monetization decision"], "estimate", ["Existing registry marks readiness at 30%"]),
  r("news-intelligence", "Signal / News Command Center", "software", 30, "incubate", "INCUBATE · CONTENT AUDIT", ["Grappe501/signal", "Grappe501/News-command-center"], "Campaigns, executives, advocates, and research teams", "Decision-makers drown in news but lack structured relevance, change detection, and operational follow-through", "A signal-detection command center that turns changing public information into prioritized decisions and tasks", 60000, 300000, 120000, 300000, 50000, 160000, 300000, 1000000, ["Repository/content audit", "Source architecture", "Alerting", "User-specific relevance", "Commercial validation"], "estimate", ["Existing registry marks readiness at 30%"]),
  r("campaign-compliance", "Campaign Compliance", "software", 35, "incubate", "INCUBATE · LEGAL ACCURACY GATE", ["Grappe501/campaign_compliance", "Grappe501/Compliance"], "Political campaigns and committees", "Compliance knowledge is fragmented, jurisdiction-specific, and high-risk when staff rely on memory", "A human-approved compliance intelligence layer that organizes rules, deadlines, evidence, and operational checks without pretending to replace counsel", 60000, 300000, 120000, 300000, 45000, 150000, 300000, 1100000, ["Legal accuracy gate", "Source citation system", "Jurisdiction versioning", "Human approval workflows", "Commercial validation"], "estimate", ["Existing registry flags legal accuracy as a gating condition"]),
];

export const inventorySummary = companyInventory.reduce(
  (acc, item) => {
    acc.productCount += 1;
    acc.annualRevenueLow += item.annualRevenueLow;
    acc.annualRevenueHigh += item.annualRevenueHigh;
    acc.replacementValueLow += item.replacementValueLow;
    acc.replacementValueHigh += item.replacementValueHigh;
    acc.riskAdjustedIpValueLow += item.riskAdjustedIpValueLow;
    acc.riskAdjustedIpValueHigh += item.riskAdjustedIpValueHigh;
    acc.commercialPotentialLow += item.commercialPotentialLow;
    acc.commercialPotentialHigh += item.commercialPotentialHigh;
    acc.weightedReadiness += item.readiness;
    return acc;
  },
  { productCount: 0, annualRevenueLow: 0, annualRevenueHigh: 0, replacementValueLow: 0, replacementValueHigh: 0, riskAdjustedIpValueLow: 0, riskAdjustedIpValueHigh: 0, commercialPotentialLow: 0, commercialPotentialHigh: 0, weightedReadiness: 0 },
);

inventorySummary.weightedReadiness = Math.round(inventorySummary.weightedReadiness / Math.max(inventorySummary.productCount, 1));

export const inventoryValuationDoctrine = {
  warning: "Projected revenue is not enterprise value. These are internal planning ranges, not an appraisal, financing opinion, or representation of market value.",
  layers: [
    { id: "replacement", label: "Replacement / build value", definition: "What it would plausibly cost to recreate the existing code, content, workflows, research, and accumulated product knowledge to its present state." },
    { id: "risk-adjusted-ip", label: "Risk-adjusted current IP value", definition: "A discounted internal planning view of the asset today after readiness, legal, concentration, security, market, and execution risk." },
    { id: "commercial", label: "Commercial revenue potential", definition: "A scenario range for what the asset could support if it reaches product-market fit; it is deliberately not labeled company valuation." },
  ],
};
