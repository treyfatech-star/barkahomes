import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { STATS } from "@/lib/site-data";

const HERO_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/32029c9f-48de-40ce-85d0-c7f879655a6e/images/f818ae94b3dcd5dddbf673afdd8ef5dba7e856457ec1d85bdc385805a741c1b6.png";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-[#0b1120]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Premium modern Nigerian mansion at sunset"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120]/95 via-[#0b1120]/65 to-[#0b1120]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />
      </div>

      {/* Decorative side rail */}
      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-white/50 z-10">
        <span className="w-px h-16 bg-white/30" />
        <span className="overline text-[10px] rotate-180 [writing-mode:vertical-rl]">
          Est. 2014 · Nigeria
        </span>
        <span className="w-px h-16 bg-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-40 md:pt-48 pb-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-[#D4AF37]" />
          <span
            className="overline text-[#D4AF37]"
            data-testid="hero-overline"
          >
            {`// Barka Royal Homes & Consults Ltd`}
          </span>
        </motion.div>

        <motion.h1
          data-testid="hero-headline"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-white max-w-5xl text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight"
        >
          Building dreams,
          <br />
          <span className="italic font-light">crafting</span> lasting value.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 text-base md:text-lg text-white/75 max-w-xl leading-relaxed"
          data-testid="hero-subhead"
        >
          A Nigerian real estate, construction and consultancy practice
          delivering structurally sound, beautifully resolved homes across the
          country — so you can live as you are pleased.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0b1120] px-7 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white transition-colors duration-300"
          >
            Explore Projects
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
          <a
            href="#contact"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center gap-3 border border-white/40 text-white px-7 py-4 text-xs uppercase tracking-[0.22em] hover:bg-white hover:text-[#0b1120] transition-colors duration-300"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 flex items-center gap-2 text-white/60 text-xs"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
          <span className="tracking-[0.18em] uppercase">
            Scroll to discover
          </span>
        </motion.div>
      </div>

      {/* Floating stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 backdrop-blur-xl bg-[#0b1120]/40">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.1 }}
              className="px-4 md:px-8 py-6 md:py-8"
              data-testid={`hero-stat-${i}`}
            >
              <div className="font-heading text-white text-3xl md:text-5xl tracking-tight">
                {s.value}
              </div>
              <div className="overline text-white/60 text-[10px] mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
