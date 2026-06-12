/** PASS-025 — Civic Engagement World depth bundle */

import { CIVIC_ENGAGEMENT_ACADEMY_LEVELS } from '../../civic-engagement-world';
import { buildAcademyLessons } from '../build-academy';
import { buildGlossary } from '../build-glossary';
import type { WorldDepthBundle } from '../types';

const MISSION_BY_LEVEL: Record<number, string | undefined> = {
  1: 'research-ballot',
  2: 'local-meeting',
  3: 'volunteer-cause',
  4: 'community-project',
  5: 'lead-discussion',
};

const GLOSSARY_SEEDS: Parameters<typeof buildGlossary>[0] = [
  ['Ballot', 'The list of candidates and measures you vote on in an election.', 'You cannot vote thoughtfully without knowing what is on the ballot before election day.', 'A sample ballot on your county website shows every race you will decide.', ['Voter registration', 'Referendum']],
  ['Precinct', 'Your local voting district — the smallest geographic unit for elections.', 'Precincts determine polling places, local turnout data, and who represents you.', 'Your voter registration card lists precinct 12 — you vote at the church on Oak Street.', ['Polling place', 'Redistricting']],
  ['Polling place', 'The location where voters in a precinct cast ballots on election day.', 'Knowing your polling place prevents missed votes and long lines on the wrong day.', 'Your county site says precinct 12 votes at Lincoln Elementary gym.', ['Precinct', 'Voter registration']],
  ['Voter registration', 'The official process of enrolling to vote in your state and locality.', 'Unregistered citizens cannot vote — registration deadlines vary by state.', 'You register online at 17 in some states so you are ready at 18.', ['Ballot', 'Primary election']],
  ['Primary election', 'An election where parties choose nominees before the general election.', 'Primaries often decide outcomes in one-party districts — skipping them means less voice.', 'A city council primary in March narrows four candidates to two for November.', ['General election', 'Campaign']],
  ['General election', 'The main election where winners take office — usually November in the U.S.', 'General elections decide who governs and which measures become law.', 'The November ballot includes president, senator, mayor, and local measures.', ['Primary election', 'Midterm election']],
  ['Midterm election', 'Federal elections held halfway through a presidential term — all House seats and many Senate seats.', 'Midterms shape Congress and state leadership even when the presidency is not on the ballot.', '2026 midterms may shift which party controls the House.', ['General election', 'Voter turnout']],
  ['Referendum', 'A vote where the public approves or rejects a policy question.', 'Referendums let citizens decide issues directly instead of only through representatives.', 'A school bond referendum asks voters to fund new buildings with a tax increase.', ['Initiative', 'Proposition']],
  ['Initiative', 'A process where citizens petition to put a law or constitutional change on the ballot.', 'Initiatives give grassroots groups a path to lawmaking outside the legislature.', 'A minimum-wage initiative gathered 50,000 signatures to qualify for the ballot.', ['Referendum', 'Grassroots']],
  ['Proposition', 'A ballot measure — often numbered (Prop 13) — proposing a specific policy change.', 'Propositions can reshape taxes, housing, education, and criminal justice for years.', 'Prop 47 changed certain felonies to misdemeanors in California.', ['Referendum', 'Ballot']],
  ['City council', 'The elected body that passes local ordinances, approves budgets, and oversees city services.', 'Most daily life — roads, police, zoning, parks — is shaped by city council decisions.', 'City council votes Tuesday on whether to add bike lanes on Main Street.', ['Town hall', 'Ordinance']],
  ['Town hall', 'A public forum where officials or candidates answer questions from constituents.', 'Town halls connect voters to decision-makers and surface issues not in headlines.', 'The mayor hosts a town hall on flood preparedness at the library.', ['Public hearing', 'Constituent']],
  ['School board', 'Elected or appointed leaders who set district policy, hire superintendents, and approve budgets.', 'School boards affect curriculum, facilities, safety, and taxes — yet few voters research them.', 'The school board debates phone policies and a new science wing.', ['City council', 'Local government']],
  ['Zoning', 'Local laws that define how land can be used — residential, commercial, industrial.', 'Zoning decides housing density, business location, and neighborhood character for decades.', 'Rezoning one block from single-family to mixed-use allows apartments above shops.', ['Ordinance', 'Public hearing']],
  ['Public comment', 'A designated time in public meetings when citizens may speak on agenda items.', 'Public comment is often the only direct voice residents have before a vote.', 'Three residents speak during public comment opposing a new warehouse.', ['Town hall', 'Civil discourse']],
  ['Ordinance', 'A local law enacted by a city council or county board.', 'Ordinances regulate noise, pets, parking, short-term rentals, and more.', 'An ordinance limits leaf blowers before 8 a.m.', ['Resolution', 'City council']],
  ['Resolution', 'A formal statement of position or intent — often non-binding unlike ordinances.', 'Resolutions signal priorities and can trigger further study or action.', 'Council passes a resolution declaring a climate emergency.', ['Ordinance', 'Advocacy']],
  ['Civic engagement', 'Active participation in community and government life — voting, volunteering, organizing, attending meetings.', 'Engaged citizens shape outcomes; disengagement cedes power to whoever shows up.', 'Researching your ballot, attending a council meeting, and volunteering are all civic engagement.', ['Civic duty', 'Community organizing']],
  ['Civil society', 'The network of nonprofits, clubs, churches, and voluntary groups outside government and business.', 'Civil society fills gaps governments cannot — food banks, mentorship, mutual aid.', 'A neighborhood association and youth soccer league are civil society institutions.', ['Nonprofit', 'Volunteer']],
  ['Nonprofit', 'An organization that serves a mission rather than distributing profits to owners.', 'Nonprofits deliver most community services volunteers and donors support.', 'The local food bank is a 501(c)(3) nonprofit serving 400 families weekly.', ['Volunteer', 'Civil society']],
  ['Volunteer', 'Unpaid work donated to a cause, organization, or community need.', 'Volunteers keep libraries, festivals, campaigns, and shelters running.', 'You volunteer four hours sorting donations at the thrift store.', ['Community organizing', 'Advocacy']],
  ['Community organizing', 'Bringing people together to identify problems and take collective action.', 'Organizing turns individual frustration into sustained power.', 'Parents organize to demand safer crosswalks near the middle school.', ['Grassroots', 'Coalition']],
  ['Grassroots', 'Movement or action that starts with ordinary people locally rather than top-down institutions.', 'Grassroots energy wins when it persists through elections and meetings.', 'A grassroots petition saves the community garden from development.', ['Community organizing', 'Canvassing']],
  ['Coalition', 'An alliance of groups or people united for a shared goal.', 'Coalitions combine skills, constituencies, and credibility.', 'Environmental and labor groups form a coalition for transit funding.', ['Advocacy', 'Grassroots']],
  ['Advocacy', 'Speaking or acting on behalf of a cause or community to influence decisions.', 'Advocacy turns research into pressure on decision-makers.', 'Students advocate for later start times by presenting sleep research to the school board.', ['Lobbying', 'Public comment']],
  ['Lobbying', 'Attempting to influence legislators or officials on behalf of an interest.', 'Understanding lobbying clarifies who has access and how policy gets shaped.', 'A housing coalition lobbies city council for inclusionary zoning.', ['Advocacy', 'Constituent']],
  ['Constituent', 'A resident represented by an elected official.', 'Officials respond to organized constituents — calls, letters, and meetings matter.', 'You email your state representative as a constituent asking about school funding.', ['Representative democracy', 'Town hall']],
  ['Representative democracy', 'A system where citizens elect officials to make decisions on their behalf.', 'Knowing how representation works helps you hold leaders accountable between elections.', 'You vote for a city council member who votes on your behalf at weekly meetings.', ['Constituent', 'Local government']],
  ['Local government', 'City, town, county, and special district bodies closest to daily life.', 'Local government touches schools, water, police, permits, and parks more than federal news suggests.', 'County government runs elections; city government fixes potholes.', ['Municipal', 'School board']],
  ['County government', 'The administrative layer between cities and states — often runs elections, jails, and public health.', 'County offices affect property records, voting, and regional services.', 'You register to vote through the county clerk office.', ['Local government', 'Polling place']],
  ['Municipal', 'Relating to a city or town government.', 'Municipal decisions shape density, transit, and quality of life block by block.', 'Municipal code sets maximum building height downtown.', ['Zoning', 'City council']],
  ['Campaign', 'An organized effort to elect a candidate or pass a ballot measure.', 'Understanding campaigns helps you evaluate messages and funding sources.', 'A city council campaign knocks 5,000 doors before election day.', ['Canvassing', 'Primary election']],
  ['Canvassing', 'Going door-to-door or place-to-place to talk with voters about a candidate or issue.', 'Canvassing is still one of the most effective ways to increase turnout.', 'You canvass Saturday morning with a script and a list of addresses.', ['Phone banking', 'Grassroots']],
  ['Phone banking', 'Calling voters to persuade, remind, or survey them during a campaign.', 'Phone banks mobilize volunteers who cannot walk neighborhoods.', 'Ten volunteers make 200 calls reminding people about election day.', ['Canvassing', 'Campaign']],
  ['Voter turnout', 'The percentage of eligible voters who cast ballots in an election.', 'Low turnout means fewer people choose leaders — local races are often decided by slim margins.', 'School board turnout of 18% means a few hundred votes can win.', ['Voter registration', 'Primary election']],
  ['Gerrymandering', 'Drawing district boundaries to favor one party or group.', 'Gerrymandering reduces competitive elections and constituent power.', 'A snaking congressional district splits a city to dilute one party vote.', ['Redistricting', 'Precinct']],
  ['Redistricting', 'Redrawing electoral district boundaries after the census.', 'Redistricting affects representation for a decade — public input matters.', 'Citizens testify at a redistricting commission hearing on fair maps.', ['Gerrymandering', 'Precinct']],
  ['Civic duty', 'The moral obligation to participate in community and democratic life.', 'Duty framing helps people act even when one vote feels small.', 'Serving jury duty and voting are classic civic duties.', ['Civic engagement', 'Jury duty']],
  ['Jury duty', 'Citizen service on a trial jury — a core obligation of self-government.', 'Juries embody community judgment in the legal system.', 'You are summoned to county court for jury duty next month.', ['Civic duty', 'Representative democracy']],
  ['Public hearing', 'A formal meeting to gather testimony before a government body decides.', 'Hearings create a record and can change votes when testimony is strong.', 'A zoning public hearing draws 80 speakers on a new apartment complex.', ['Public comment', 'Zoning']],
  ['FOIA', 'Freedom of Information Act — laws allowing public request of government records.', 'FOIA requests expose spending, emails, and decisions hidden from view.', 'A journalist FOIA request reveals contract bids for a new stadium.', ['Transparency', 'Accountability']],
  ['Transparency', 'Government openness about decisions, data, and spending.', 'Transparency enables accountability — you cannot fix what you cannot see.', 'The city publishes checkbook data online each quarter.', ['Accountability', 'FOIA']],
  ['Accountability', 'The expectation that officials answer for actions and outcomes.', 'Accountability requires attention — meetings, media, elections, and records.', 'Voters hold the mayor accountable after a failed snow response.', ['Transparency', 'Constituent']],
  ['Civic literacy', 'Understanding how government works and how to participate effectively.', 'Civic literacy is as practical as financial literacy — schools rarely teach enough.', 'Knowing the difference between city and county roles is civic literacy.', ['Media literacy', 'Ballot']],
  ['Media literacy', 'The ability to evaluate news sources, bias, and misinformation.', 'Civic choices depend on trustworthy information — media literacy protects democracy.', 'You check two sources before sharing a viral claim about a ballot measure.', ['Fact-checking', 'Civic literacy']],
  ['Fact-checking', 'Verifying claims against reliable evidence before believing or sharing.', 'False claims about elections and candidates spread faster than corrections.', 'You use a nonpartisan fact-check site to verify a debate quote.', ['Media literacy', 'Civil discourse']],
  ['Bipartisan', 'Involving cooperation across political parties.', 'Many local issues are bipartisan even when national news feels polarized.', 'A bipartisan coalition supports expanding the community college.', ['Civil discourse', 'Coalition']],
  ['Civil discourse', 'Respectful conversation about disagreements without personal attacks.', 'Democracy needs disagreement — civil discourse keeps disagreement productive.', 'Ground rules at your discussion ban insults and require listening.', ['Public comment', 'Fact-checking']],
  ['Civic portfolio', 'A documented record of civic missions — research, meetings, projects, reflections.', 'Portfolios prove growth to parents, colleges, and mentors better than a single volunteer hour count.', 'My Civic Portfolio holds your ballot research and meeting notes.', ['Civic engagement', 'Civic mentorship']],
  ['Civic mentorship', 'Guiding someone new through voting, meetings, volunteering, or organizing.', 'Mentorship multiplies participation — democracies need more first-time guides.', 'You walk a friend through sample ballot research before their first election.', ['Volunteer', 'Civic portfolio']],
];

export const CIVIC_DEPTH: WorldDepthBundle = {
  slug: 'civic-engagement',
  displayName: 'Civic Engagement World',
  accentColor: 'var(--foundry-success)',
  portfolioLabel: 'My Civic Portfolio',
  academyLessons: buildAcademyLessons(
    CIVIC_ENGAGEMENT_ACADEMY_LEVELS.map((level) => ({
      level: level.level,
      title: level.title,
      tagline: level.tagline,
      missionSlug: MISSION_BY_LEVEL[level.level],
    })),
    'civic engagement',
  ),
  glossary: buildGlossary(GLOSSARY_SEEDS),
  community: {
    name: 'Civic Circle',
    memberRoles: [
      { role: 'New participant', description: 'Completing Missions 1–2 — ballot research and first meeting attendance' },
      { role: 'Active volunteer', description: 'Regular shifts, project contributions, and meeting notes shared monthly' },
      { role: 'Project lead', description: 'Runs micro-projects, recruits helpers, documents outcomes for showcases' },
      { role: 'Facilitator', description: 'Hosts civic conversations and mentors first-time attendees' },
      { role: 'Circle mentor', description: 'Pairs with new members through one full election cycle or school year' },
    ],
    weeklyChallenge: 'Post one local civic action you took this week — a meeting attended, hours volunteered, or ballot item researched — with one sentence on what you learned.',
    showcaseFormat: 'Project card: goal · date · participants · evidence photo · one lesson for the next organizer.',
    peerFeedbackLoop: 'Members reply with one specific improvement and one resource link (official agenda, volunteer signup, voter guide).',
    mentorRole: 'Mentors review portfolio artifacts, co-attend a first meeting, and debrief within 48 hours.',
  },
  parent: {
    headline: 'Why Civic Engagement matters for your child',
    oneLiner:
      'Your child learns to research ballots, attend local meetings, volunteer, organize projects, and lead conversations — citizenship through action, not worksheets.',
    whyItMatters:
      'Schools rarely teach how local government works or how to participate before age 18. Foundry builds the habit early: informed voting, showing up, and leading without waiting for permission.',
    whatTheyBuild:
      'Five missions culminating in facilitated civic conversation — ballot research sheets, meeting notes, volunteer logs, project one-pagers, and discussion guides in My Civic Portfolio.',
    skillsDemonstrated: [
      'Ballot and measure research',
      'Local government observation',
      'Volunteer reliability',
      'Project planning and recruitment',
      'Neutral facilitation',
      'Mentoring first-time participants',
    ],
    howProgressMeasured:
      'Evidence documents · meeting and volunteer logs · reflections · portfolio artifacts — not test scores or essay grades.',
    successAfter30Days:
      'Your child has researched at least one ballot, attended one public meeting, and can explain one local issue to your family with sources.',
    sections: [
      {
        title: 'Why citizenship matters now',
        body: 'Teens hear national news daily but rarely practice local participation. Foundry connects research to action — sample ballots, city council agendas, volunteer shifts, and small projects they design.',
      },
      {
        title: 'Skills that transfer everywhere',
        body: 'Research before deciding · Showing up prepared · Organizing people · Facilitating hard conversations · Documenting outcomes. These skills appear in student government, jobs, college applications, and every community they join.',
      },
      {
        title: 'Careers and life paths',
        body: 'Community organizer, public policy analyst, lawyer, teacher, journalist, nonprofit director, city planner, campaign manager — all start with understanding how local decisions get made.',
      },
      {
        title: 'What your child is building',
        body: 'Mission 1: ballot research · Mission 2: first local meeting · Mission 3: volunteer shift · Mission 4: community project · Mission 5: lead a civic conversation. Each produces portfolio evidence you can review together.',
      },
      {
        title: 'How progress is measured',
        body: 'Foundry tracks missions completed, reflections written, and artifacts saved — not multiple-choice civics tests. Ask to see My Civic Portfolio after each mission.',
      },
      {
        title: 'Safety and supervision',
        body: 'Missions encourage telling a parent where they volunteer, using public meetings (in person or virtual), and keeping discussions respectful. You can co-attend any meeting or co-facilitate their first conversation.',
      },
    ],
  },
  seoGuides: [
    {
      slug: 'how-to-research-your-ballot',
      title: 'How to Research Your Ballot Before Election Day',
      summary: 'A step-by-step guide for students and first-time voters to understand every race and measure on a local ballot.',
      sections: [
        { heading: 'Start with your sample ballot', body: 'Enter your address on your county elections site or Ballotpedia. Save every race and measure — school board and city council often matter more than top-of-ticket names.' },
        { heading: 'Use two sources per item', body: 'Pair the official voter guide with an independent source: local news, candidate websites, or nonprofit scorecards. Write summaries in your own words to avoid copy-paste bias.' },
        { heading: 'Document your research', body: 'A simple table — item, summary, support/oppose/undecided — becomes portfolio evidence and helps family members vote thoughtfully too.' },
      ],
    },
    {
      slug: 'attending-your-first-town-hall',
      title: 'Attending Your First Town Hall or City Council Meeting',
      summary: 'What to expect, how to prepare, and how to turn one meeting into sustained local engagement.',
      sections: [
        { heading: 'Find the right meeting', body: 'City council, school board, and county supervisors post calendars online. Pick one with an agenda topic you care about — housing, budget, safety, or parks.' },
        { heading: 'Prepare three questions', body: 'What is being decided? Who benefits? Who is missing from the room? Optional: draft one sentence for public comment — speaking is not required for Mission 2.' },
        { heading: 'Take notes that matter', body: 'Record decisions, debates, and next steps. Bookmark the calendar and follow one agenda item forward — that is how observers become participants.' },
      ],
    },
    {
      slug: 'volunteer-locally-as-a-student',
      title: 'How Students Can Volunteer Locally',
      summary: 'Find age-appropriate volunteer shifts, show up reliably, and document hours that mean something on applications.',
      sections: [
        { heading: 'Match cause to capacity', body: 'Food banks, parks, animal shelters, literacy programs, and mutual aid groups often welcome teen volunteers. Start with one 2-hour shift before overcommitting.' },
        { heading: 'Confirm logistics', body: 'Waivers, dress code, and adult supervision vary. Tell a parent where you will be and ask staff what the biggest unmet need is before you leave.' },
        { heading: 'Log and reflect', body: 'Date, organization, hours, tasks, and whether you would return — that log is stronger than a generic "community service" line on a resume.' },
      ],
    },
    {
      slug: 'organize-a-community-project',
      title: 'Organize a Small Community Project',
      summary: 'Design a one-day project, recruit helpers, and document results — the bridge between volunteering and leadership.',
      sections: [
        { heading: 'Keep it completable in one day', body: 'Cleanup, donation drive, registration table, welcome packets, or letter-writing — small wins build organizing muscle.' },
        { heading: 'Recruit at least two helpers', body: 'Leadership is mobilizing others. A one-page plan with goal, date, supplies, and roles prevents chaos on project day.' },
        { heading: 'Capture evidence', body: 'Photos, participant count, and one lesson learned feed Civic Circle showcases and your portfolio capstone trail.' },
      ],
    },
    {
      slug: 'lead-a-civic-conversation',
      title: 'How to Lead a Civic Conversation Without Fighting',
      summary: 'Facilitation skills for teens hosting respectful discussions on local issues with family, classmates, or clubs.',
      sections: [
        { heading: 'Choose a neutral framing question', body: 'Ask what the community should prioritize — not "who is right." Ground rules: listen, no personal attacks, everyone speaks.' },
        { heading: 'Structure 45 minutes', body: 'Opening, round-robin thoughts, guided prompts, closing takeaways. Your job is timekeeping and inclusion, not winning the argument.' },
        { heading: 'End with one next step', body: 'Research a ballot item, attend a meeting, or volunteer — conversations that end in action beat debates that end in silence.' },
      ],
    },
    {
      slug: 'youth-civic-engagement-guide',
      title: 'Youth Civic Engagement: A Parent and Teacher Guide',
      summary: 'Why local participation beats worksheets and how adults can support teen citizenship safely.',
      sections: [
        { heading: 'Start local', body: 'School boards and city councils decide issues teens feel daily — start times, parks, safety, budgets. National news is context; local action is practice.' },
        { heading: 'Co-attend when helpful', body: 'First meetings and volunteer shifts go better with an adult ally. Let the teen take notes and lead debrief afterward.' },
        { heading: 'Measure real artifacts', body: 'Ballot research, meeting notes, and project photos prove growth better than civics quizzes.' },
      ],
    },
    {
      slug: 'become-an-informed-citizen',
      title: 'Become an Informed Citizen: The Foundry Path',
      summary: 'The five-mission arc from ballot research to civic leadership — and how each step compounds.',
      sections: [
        { heading: 'Mission 1 — Informed Voter', body: 'Research every item on your ballot. Democracy fails when voters guess.' },
        { heading: 'Missions 2–3 — Show up and serve', body: 'Attend a meeting, then volunteer. Observation becomes participation.' },
        { heading: 'Missions 4–5 — Organize and facilitate', body: 'Run a project, then host a conversation. Leadership is multiplying others participation — documented in My Civic Portfolio.' },
      ],
    },
  ],
};
