import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/ui/Hero';
import { InfiniteTechBar } from '@/components/ui/InfiniteTechBar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* El Navbar es fixed, así que el Hero necesita padding-top */}
      <Navbar />
      <Hero />
      <InfiniteTechBar />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}