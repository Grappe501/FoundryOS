/** Non-judging echo. Not a grade. Not “great eye.” */
export function echoNotice(text: string): string {
  const trimmed = text.replace(/\s+/g, ' ').trim();
  if (!trimmed) return 'You looked.';
  const first = trimmed.split(/(?<=[.!?])\s+/)[0] ?? trimmed;
  if (first.length <= 88) return first;
  return `${first.slice(0, 85).trimEnd()}…`;
}
