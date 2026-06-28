import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { PortfolioSection } from '@/components/sections/PortfolioSection';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <PortfolioSection />
      <Footer />
    </main>
  );
}