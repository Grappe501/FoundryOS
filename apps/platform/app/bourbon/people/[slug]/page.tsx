import Link from 'next/link';
import { redirect } from 'next/navigation';

/** Individual people profiles are not published until verified editorial content exists. */
export default function BourbonPeopleSlugPage() {
  redirect('/bourbon/people');
}
