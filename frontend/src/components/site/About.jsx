import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CORE_VALUES } from "@/lib/site-data";

const ABOUT_IMAGE = "https://images.pexels.com/photos/7937367/pexels-photo-7937367.jpeg";

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-[#FAFAFA] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-[#D4AF37]" />
          <span className="overline text-[#D4AF37]">{`// About`}</span>
        </motion.div>

        {/* Top: headline + image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#0b1120] leading-[1.05] tracking-tight">
              A Nigerian practice built on{" "}
              <span className="italic font-light text-[#1E3A8A]">
                structural integrity
              </span>{" "}
              and quiet ambition.
            </h2>
            <p className="mt-8 text-base md:text-lg text-[#4b5563] max-w-2xl leading-relaxed">
              Barka Royal Homes and Consults Ltd is a real estate development,
              construction and consultancy firm working across residential,
              commercial and institutional projects. From single-family homes
              in Adamawa to mixed-use complexes in Abuja, our brief stays the
              same: deliver work that is safe, functional, beautiful — and
              delivered on time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={ABOUT_IMAGE}
                alt="BRHC architects reviewing project blueprints"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-px -left-px bg-[#D4AF37] text-[#0b1120] px-5 py-3">
                <div className="overline text-[10px]">Since 2014</div>
                <div className="font-heading text-2xl">10+ Years</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission band */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-24 border-t border-b border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="py-12 md:py-16 pr-0 md:pr-12 md:border-r border-gray-200"
            data-testid="about-vision"
          >
            <div className="overline text-[#1E3A8A] mb-4">Vision</div>
            <p className="font-heading text-2xl md:text-3xl text-[#0b1120] leading-snug">
              To become a trusted and leading construction and real estate
              development firm in Nigeria — recognised for structural
              integrity, professional excellence and timely delivery.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="py-12 md:py-16 md:pl-12"
            data-testid="about-mission"
          >
            <div className="overline text-[#1E3A8A] mb-4">Mission</div>
            <p className="font-heading text-2xl md:text-3xl text-[#0b1120] leading-snug">
              To deliver superior real estate and construction solutions
              through technical excellence, ethical practice and innovative
              execution — creating safe, functional and sustainable
              developments.
            </p>
          </motion.div>
        </div>

        {/* Core values */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="overline text-[#D4AF37] mb-4">{`// Core Values`}</div>
            <h3 className="font-heading text-3xl md:text-4xl text-[#0b1120] tracking-tight">
              Six principles guiding every project.
            </h3>
          </div>
          <span className="text-sm text-[#6B7280] max-w-sm">
            We measure success not just in handover dates, but in how a
            building holds up — structurally, financially and emotionally —
            over the years that follow.
          </span>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200"
          data-testid="core-values-grid"
        >
          {CORE_VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-r border-b border-gray-200 p-8 lg:p-10 bg-white group hover:bg-[#0b1120] transition-colors duration-500"
              data-testid={`value-card-${i}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 grid place-items-center border border-[#D4AF37] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0b1120] transition-colors">
                  <Check className="w-4 h-4" strokeWidth={2} />
                </span>
                <span className="overline text-[#6B7280] group-hover:text-white/60">
                  0{i + 1}
                </span>
              </div>
              <h4 className="font-heading text-2xl text-[#0b1120] group-hover:text-white mb-3">
                {value.title}
              </h4>
              <p className="text-sm text-[#6B7280] group-hover:text-white/70 leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
