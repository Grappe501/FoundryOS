export function SoulVoice({ line }: { line: string | null }) {
  if (!line) return null;
  return <p className="ws-soul">{line}</p>;
}
