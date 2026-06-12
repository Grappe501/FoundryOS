#!/usr/bin/env npx tsx
/**
 * PASS-033 — Audience language audit
 * Scans public copy for age-mismatched or restricted terms.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');

type Finding = {
  file: string;
  line: number;
  term: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  excerpt: string;
};

const SCAN_DIRS = [
  'apps/platform/app',
  'apps/platform/components',
  'apps/platform/lib',
  'marketing',
  'docs',
];

const SKIP_DIRS = new Set(['node_modules', '.next', '.cache', 'generated']);

const TERM_RULES: { category: string; terms: RegExp[]; severity: Finding['severity'] }[] = [
  { category: 'adult_substance_alcohol', terms: [/\bbourbon\b/i, /\bwhiskey\b/i, /\bwhisky\b/i, /\bdrunk\b/i, /\bintoxicat/i], severity: 'high' },
  { category: 'adult_substance_tobacco', terms: [/\bcigar/i, /\btobacco\b/i, /\bvape\b/i], severity: 'high' },
  { category: 'adult_substance_cannabis', terms: [/\bmarijuana\b/i, /\bcannabis\b/i, /\bweedmaster\b/i, /\bTHC\b/], severity: 'high' },
  { category: 'gambling', terms: [/\bcasino\b/i, /\bbet\s+money\b/i, /\bsportsbook\b/i, /\bonline\s+gambling\b/i], severity: 'high' },
  { category: 'medical_advice', terms: [/\bdiagnos(e|is)\b/i, /\bprescri(be|ption)\b/i, /\btake\s+this\s+medication\b/i], severity: 'medium' },
  { category: 'investment_guarantee', terms: [/\bguaranteed\s+returns\b/i, /\bget\s+rich\s+quick\b/i, /\brisk-free\s+profit\b/i], severity: 'medium' },
  { category: 'partisan_persuasion', terms: [/\bvote\s+for\s+\w+\s+party\b/i, /\brepublicans?\s+are\b/i, /\bdemocrats?\s+are\b/i], severity: 'medium' },
  { category: 'internal_language', terms: [/\bPASS-\d+/i, /\bErnie\b/, /\bBurt\b/], severity: 'low' },
];

const STUDENT_SAFE_WORLDS = new Set([
  'ai-builder',
  'financial-independence',
  'public-speaking',
  'civic-engagement',
  'entrepreneur',
  'world-religion-history',
  'government-systems',
  'chess',
]);

const EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.json', '.mdx']);

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(path.extname(name))) out.push(full);
  }
  return out;
}

function isStudentSafeContext(file: string): boolean {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  for (const slug of STUDENT_SAFE_WORLDS) {
    if (rel.includes(slug)) return true;
  }
  if (rel.includes('world-governance') || rel.includes('AUDIENCE')) return false;
  if (rel.includes('bourbon') || rel.includes('poker') || rel.includes('bbq')) return false;
  return rel.includes('parents') || rel.includes('future-proof') || rel.includes('student');
}

function auditFile(file: string): Finding[] {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const findings: Finding[] = [];
  const studentContext = isStudentSafeContext(file);

  lines.forEach((line, idx) => {
    for (const rule of TERM_RULES) {
      for (const re of rule.terms) {
        if (re.test(line)) {
          let severity = rule.severity;
          if (studentContext && ['adult_substance_alcohol', 'adult_substance_tobacco', 'adult_substance_cannabis', 'gambling'].includes(rule.category)) {
            severity = 'high';
          }
          findings.push({
            file: rel,
            line: idx + 1,
            term: re.source,
            category: rule.category,
            severity,
            excerpt: line.trim().slice(0, 120),
          });
        }
      }
    }
  });

  return findings;
}

function main() {
  const files: string[] = [];
  for (const d of SCAN_DIRS) {
    walk(path.join(ROOT, d), files);
  }

  const allFindings = files.flatMap(auditFile);
  const high = allFindings.filter((f) => f.severity === 'high');
  const medium = allFindings.filter((f) => f.severity === 'medium');
  const low = allFindings.filter((f) => f.severity === 'low');

  const report = {
    generated_at: new Date().toISOString(),
    pass: 'PASS-033',
    files_scanned: files.length,
    total_findings: allFindings.length,
    high_severity: high.length,
    medium_severity: medium.length,
    low_severity: low.length,
    student_safe_violations: high.filter((f) => isStudentSafeContext(f.file)).length,
    findings: allFindings,
  };

  const outDir = path.join(ROOT, 'data/audits');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'audience-language-audit.json'), JSON.stringify(report, null, 2));

  const md = `# Audience Language Audit (PASS-033)

Generated: ${report.generated_at}

| Metric | Count |
|--------|-------|
| Files scanned | ${report.files_scanned} |
| Total findings | ${report.total_findings} |
| High severity | ${report.high_severity} |
| Medium severity | ${report.medium_severity} |
| Low severity | ${report.low_severity} |
| Student-safe context violations | ${report.student_safe_violations} |

## Rules checked

- Adult substances (alcohol, tobacco, cannabis)
- Gambling-for-money framing
- Medical advice claims
- Investment guarantees
- Partisan persuasion
- Internal build language (PASS codes, team names)

## High severity (${high.length})

${high.slice(0, 50).map((f) => `- \`${f.file}:${f.line}\` **${f.category}** — ${f.excerpt}`).join('\n') || '_None_'}

${high.length > 50 ? `\n_…and ${high.length - 50} more (see JSON)._` : ''}

## Student-safe worlds must be free of

Alcohol · cigars · marijuana · gambling-for-money · adult substances · medical advice · investment guarantees · partisan persuasion.

## Machine output

\`data/audits/audience-language-audit.json\`
`;

  fs.writeFileSync(path.join(ROOT, 'docs/AUDIENCE_LANGUAGE_AUDIT.md'), md);

  console.log('\nAudience Language Audit (PASS-033)\n');
  console.log(`Files: ${report.files_scanned} · Findings: ${report.total_findings} · High: ${report.high_severity}`);
  console.log(`JSON → data/audits/audience-language-audit.json`);
  console.log(`MD   → docs/AUDIENCE_LANGUAGE_AUDIT.md\n`);

  process.exit(0);
}

main();
