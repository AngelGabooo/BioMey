import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { PricingSection } from '@/components/sections/PricingSection';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <PricingSection />
      <Footer />
    </main>
  );
}