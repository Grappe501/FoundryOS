import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { MythsQuiz } from '../../../components/bourbon/level-1/MythsQuiz';

export const metadata = { title: 'Bourbon Myths | Foundry' };

export default function BourbonMythsPage() {
  const content = getBourbonPageDepth('myths')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <MythsQuiz />
    </BourbonDeepPageShell>
  );
}
