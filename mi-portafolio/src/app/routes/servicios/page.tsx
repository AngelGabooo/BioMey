import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ServicesSection } from '@/components/sections/ServicesSection';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <ServicesSection />
      <Footer />
    </main>
  );
}