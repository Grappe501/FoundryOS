import { KENTUCKY_REGIONS, BOURBON_TRAIL_PLANNER } from '../regions';

export type TripProfile = {
  days: number;
  budget: 'budget' | 'moderate' | 'splurge';
  traveler: 'first-timer' | 'history-buff' | 'collector' | 'host';
};

export type TrailDay = {
  day: number;
  region: string;
  stops: { name: string; why: string; hours: string }[];
  tip: string;
};

export function buildTrailPlan(profile: TripProfile): TrailDay[] {
  const base = BOURBON_TRAIL_PLANNER.slice(0, profile.days);
  const tips: Record<TripProfile['traveler'], string> = {
    'first-timer': 'Start Buffalo Trace — free, iconic, teaches house scale before hype.',
    'history-buff': 'Add Old Forester Louisville stop — America\'s first bottled bourbon context.',
    'collector': 'Book single-barrel experiences early — picks sell out seasons ahead.',
    host: 'End at Maker\'s Mark — wheated crowd-pleaser story for your home pours.',
  };

  return base.map((day, i) => ({
    day: day.day,
    region: day.region,
    stops: day.stops,
    tip: i === 0 ? tips[profile.traveler] : `Day ${day.day}: pace yourself — 2 stops max for tasting clarity.`,
  }));
}

export function regionsForMap() {
  return KENTUCKY_REGIONS;
}

export const TRAVELER_OPTIONS: { id: TripProfile['traveler']; label: string }[] = [
  { id: 'first-timer', label: 'First timer' },
  { id: 'history-buff', label: 'History buff' },
  { id: 'collector', label: 'Collector' },
  { id: 'host', label: 'Host / group trip' },
];
