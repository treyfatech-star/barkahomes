import { motion } from "framer-motion";
import {
  HardHat,
  Building2,
  KeyRound,
  Compass,
  ClipboardList,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/lib/site-data";

const ICONS = {
  HardHat,
  Building2,
  KeyRound,
  Compass,
  ClipboardList,
  TrendingUp,
};

export const Services = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-white py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#D4AF37]" />
              <span className="overline text-[#D4AF37]">{`// Services`}</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#0b1120] leading-[1.05] tracking-tight">
              Comprehensive solutions,{" "}
              <span className="italic font-light text-[#1E3A8A]">
                tailored
              </span>{" "}
              to your build.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 text-base text-[#4b5563] leading-relaxed"
          >
            From site acquisition to handover ribbon, every BRHC service is
            staffed by registered professionals and bound by a single
            principle — do the work properly, the first time.
          </motion.p>
        </div>

        {/* Technical grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200"
          data-testid="services-grid"
        >
          {SERVICES.map((svc, i) => {
            const Icon = ICONS[svc.icon] || Building2;
            return (
              <motion.article
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative border-r border-b border-gray-200 p-8 lg:p-10 group bg-white hover:bg-[#FAFAFA] transition-colors duration-500 overflow-hidden"
                data-testid={`service-card-${i}`}
              >
                {/* Watermark number */}
                <span className="absolute -bottom-6 -right-2 font-heading text-[140px] leading-none text-gray-100 select-none pointer-events-none group-hover:text-[#1E3A8A]/5 transition-colors">
                  {svc.number}
                </span>

                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 grid place-items-center border border-[#1E3A8A] text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="overline text-[#D4AF37] mb-3">
                    {svc.number}
                  </div>
                  <h3 className="font-heading text-2xl md:text-[28px] text-[#0b1120] leading-tight mb-4">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <ul className="space-y-2 border-t border-gray-200 pt-5">
                    {svc.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[#374151]"
                      >
                        <span className="mt-[7px] w-1.5 h-1.5 bg-[#D4AF37] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
