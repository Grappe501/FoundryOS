import WhiskeyMapPageClient from './WhiskeyMapPageClient';

export const metadata = {
  title: 'American Whiskey Map | Bourbon World',
  description: 'Compare bourbon, rye, Tennessee whiskey, wheat whiskey, corn whiskey, and international cousins — label literacy before you buy.',
};

export default function WhiskeyMapPage() {
  return <WhiskeyMapPageClient />;
}
