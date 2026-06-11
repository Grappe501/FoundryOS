/** Evidence — transformation claims require proof */
export type EvidenceItem = {
  slug: string;
  display_name: string;
  evidence_type: 'project' | 'event' | 'rating' | 'mentorship' | 'certification' | 'contribution';
  weight: number;
};

export type EvidenceProfile = {
  slug: string;
  display_name: string;
  domain_slug: string;
  role_slug?: string;
  evidence_items: EvidenceItem[];
  status: 'exemplar' | 'active' | 'planned';
};
