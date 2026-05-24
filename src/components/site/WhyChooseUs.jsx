import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Leaf,
  ShieldCheck,
  Sparkles,
  Heart,
} from "lucide-react";
import { WHY_CHOOSE } from "@/lib/site-data";

const ICONS = { Award, Clock, Leaf, ShieldCheck, Sparkles, Heart };

export const WhyChooseUs = () => {
  return (
    <section
      id="why"
      data-testid="why-section"
      className="relative bg-[#0b1120] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gold glow accent */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#D4AF37]" />
              <span className="overline text-[#D4AF37]">{`// Why BRHC`}</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
              Six reasons clients trust us to{" "}
              <span className="italic font-light text-[#D4AF37]">
                steward
              </span>{" "}
              their build.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 self-end text-base text-white/70 leading-relaxed"
          >
            Construction is a long, intimate process. The team you partner
            with matters as much as the brick you lay. Here is what we bring
            to the table.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10"
          data-testid="why-grid"
        >
          {WHY_CHOOSE.map((item, i) => {
            const Icon = ICONS[item.icon] || Award;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group bg-[#0b1120] p-8 lg:p-10 relative hover:bg-[#111c33] transition-colors duration-500"
                data-testid={`why-card-${i}`}
              >
                <div className="flex items-start justify-between mb-12">
                  <div className="w-14 h-14 grid place-items-center border border-[#D4AF37]/40 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0b1120] transition-colors duration-500">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="overline text-white/30 text-[10px]">
                    0{i + 1} / 06
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-[26px] text-white mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
