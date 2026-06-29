import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { ContactForm } from '@/components/ui/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Contacto" 
            subtitle="¿Tienes un proyecto en mente? Hablemos"
          />
          <div className="mt-12 glassmorphism-dark rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}