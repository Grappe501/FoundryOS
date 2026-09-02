import { ResumeReturn } from '../../../../components/talent-foundry/ResumeReturn';

export default async function TalentFoundryResumePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ResumeReturn token={token} />;
}
