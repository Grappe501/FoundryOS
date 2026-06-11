import Link from 'next/link';
import { AI_BUILDER_PLAYGROUND_LABS } from '../../../lib/ai-builder-world';

export const metadata = { title: 'Playground | AI Builder World' };

const LAB_PROMPTS: Record<string, string[]> = {
  'prompt-lab': [
    'Compare the same question in 3 different tones: formal, casual, expert',
    'Write a prompt that forces the AI to ask clarifying questions before answering',
    'Save your best prompt — you will reuse it in Mission 1',
  ],
  'automation-lab': [
    'When I get an email with "homework", create a summary draft',
    'Every Monday, generate a week plan from my calendar notes',
    'Chain: research topic → outline → first draft',
  ],
  'agent-lab': [
    'Give an agent a goal: "Plan my study schedule for finals"',
    'Add a critic agent that reviews the planner\'s output',
    'Run researcher → writer → editor as a pipeline',
  ],
  'workflow-lab': [
    'Map your morning routine — circle steps AI could help',
    'Redesign one club or family process with AI in the loop',
    'Time before vs after — estimate minutes saved',
  ],
  'business-lab': [
    'Draft 3 offers you could sell using AI skills',
    'Write outreach for one real person who might pay',
    'Price your time: what is 5 hours saved worth to someone?',
  ],
};

export default function PlaygroundPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Playground</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        People learn by experimenting. Pick a lab, try the prompts, save what works to your portfolio.
      </p>
      <div style={{ marginTop: 28 }}>
        {AI_BUILDER_PLAYGROUND_LABS.map((lab) => (
          <article key={lab.slug} style={{ padding: 24, marginBottom: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>{lab.title}</h2>
              <span style={{ fontSize: 11, color: '#6B6B70' }}>{lab.unlockLevel}+</span>
            </div>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>{lab.description}</p>
            <h3 style={{ fontSize: 12, color: '#6B9B6B', margin: '20px 0 8px', fontWeight: 400 }}>Try this</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#8A8A8E', fontSize: 13, lineHeight: 1.9 }}>
              {(LAB_PROMPTS[lab.slug] ?? []).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Link href="/ai-builder/portfolio" style={{ color: '#6B9B6B', fontSize: 14 }}>
        Save experiments to My AI Portfolio →
      </Link>
    </section>
  );
}
