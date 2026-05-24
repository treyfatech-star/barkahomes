import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { openScheduleModal } from "@/components/site/CalendlyModal";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80";

export const CTA = () => {
  return (
    <section
      data-testid="cta-section"
      className="relative overflow-hidden bg-[#0b1120] py-24 md:py-32"
    >
      <div className="absolute inset-0">
        <img
          src={CTA_IMAGE}
          alt="Architectural blueprints"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/85 to-[#1E3A8A]/60" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-[#D4AF37]" />
          <span className="overline text-[#D4AF37]">{`// Let's Build`}</span>
          <span className="w-10 h-px bg-[#D4AF37]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          data-testid="cta-headline"
        >
          Ready to build your future
          <br />
          <span className="italic font-light text-[#D4AF37]">
            with us?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Whether it is a single-family home, a commercial block or a strategic
          land acquisition, let&apos;s turn your vision into something
          buildable, beautiful and built to last.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              openScheduleModal();
            }}
            data-testid="cta-primary"
            className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0b1120] px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white transition-colors"
          >
            Schedule Consultation
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
          <a
            href="#projects"
            data-testid="cta-secondary"
            className="inline-flex items-center gap-3 border border-white/40 text-white px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-white hover:text-[#0b1120] transition-colors"
          >
            View Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
};
