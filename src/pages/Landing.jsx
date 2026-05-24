import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Toaster } from "sonner";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0b1120]" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "0",
            border: "1px solid #e5e7eb",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
    </div>
  );
}
