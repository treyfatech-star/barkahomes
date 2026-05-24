import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";

export const Testimonials = () => {
  return (
    <section
      data-testid="testimonials-section"
      className="relative bg-white py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#D4AF37]" />
              <span className="overline text-[#D4AF37]">{`// Testimonials`}</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#0b1120] leading-[1.05] tracking-tight">
              What our clients{" "}
              <span className="italic font-light text-[#1E3A8A]">say</span>.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#4b5563]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span>100% satisfaction · 50+ projects</span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200"
          data-testid="testimonials-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-8 lg:p-10 relative flex flex-col"
              data-testid={`testimonial-${i}`}
            >
              <Quote
                className="absolute top-8 right-8 w-10 h-10 text-[#D4AF37]/30"
                strokeWidth={1}
              />
              <div className="flex gap-0.5 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <blockquote className="font-heading text-xl md:text-[22px] text-[#0b1120] leading-snug flex-1 italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white grid place-items-center font-heading text-base">
                  {t.initials}
                </span>
                <div>
                  <div className="font-medium text-[#0b1120] text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
