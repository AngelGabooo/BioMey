import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { AboutSection } from '@/components/sections/AboutSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <AboutSection />
      <Footer />
    </main>
  );
}