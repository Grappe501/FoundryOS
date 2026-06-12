import { redirect } from 'next/navigation';

/** Academy index → Level 1 Hobby HQ (curriculum lives inside the experience) */
export default function AcademyPage() {
  redirect('/bourbon/level-1');
}
