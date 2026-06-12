import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { BourbonDetectiveHub } from '../../../components/bourbon/level-1/BourbonDetectiveHub';

export const metadata = { title: 'Bourbon Detective | Foundry', description: 'Investigate pricing, allocation, DSP numbers — close the case.' };

export default function DetectivePage() {
  const content = getBourbonPageDepth('detective')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/investigate" backLabel="← Investigate HQ">
      <BourbonDetectiveHub />
    </BourbonDeepPageShell>
  );
}
