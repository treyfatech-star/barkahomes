import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Calendar, ArrowUpRight, Check } from "lucide-react";
import { PROJECTS } from "@/lib/site-data";

const FILTERS = [
  "All",
  "Residential",
  "Commercial",
  "Completed",
  "Design Phase",
];

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Residential" || filter === "Commercial")
      return p.category === filter;
    return p.status === filter;
  });

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative bg-[#F6F1E7] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#1E3A8A]" />
              <span className="overline text-[#1E3A8A]">{`// Portfolio`}</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#0b1120] leading-[1.05] tracking-tight max-w-3xl">
              Selected work, across Nigerian{" "}
              <span className="italic font-light">terrains</span>.
            </h2>
          </div>
          <p className="text-base text-[#4b5563] max-w-md leading-relaxed">
            Six projects — three completed, three currently in design — showing
            the range of climates, briefs and ambitions BRHC has resolved.
          </p>
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap items-center gap-2 mb-12 border-t border-b border-[#0b1120]/10 py-4"
          data-testid="project-filters"
        >
          <span className="overline text-[#6B7280] text-[10px] mr-4">
            Filter
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-testid={`filter-${f.toLowerCase().replace(/\s/g, "-")}`}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-colors duration-300 ${
                filter === f
                  ? "bg-[#0b1120] text-white border-[#0b1120]"
                  : "bg-transparent text-[#0b1120] border-[#0b1120]/20 hover:border-[#0b1120]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          data-testid="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.button
                layout
                key={proj.id}
                onClick={() => setActive(proj)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative text-left bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                data-testid={`project-card-${proj.id}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/30 to-transparent opacity-90" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] bg-white/90 text-[#0b1120] backdrop-blur">
                      {proj.category}
                    </span>
                    <span
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] backdrop-blur ${
                        proj.status === "Completed"
                          ? "bg-[#D4AF37] text-[#0b1120]"
                          : "bg-[#1E3A8A]/90 text-white"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-white">
                    <div className="flex items-center gap-2 text-[11px] text-white/70 overline mb-3">
                      <MapPin className="w-3 h-3" strokeWidth={2} />
                      <span>{proj.location}</span>
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="font-heading text-xl md:text-2xl leading-tight">
                        {proj.title}
                      </h3>
                      <ArrowUpRight
                        className="w-5 h-5 flex-shrink-0 text-[#D4AF37] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6B7280]">
            No projects match this filter.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-[#0b1120]/80 backdrop-blur-md p-4 md:p-8 flex items-center justify-center overflow-y-auto"
            data-testid="project-modal"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
            >
              <button
                onClick={() => setActive(null)}
                data-testid="modal-close"
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-10 h-10 grid place-items-center bg-white/90 hover:bg-[#0b1120] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-[4/5] md:aspect-auto md:h-full">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] bg-[#0b1120] text-white">
                    {active.category}
                  </span>
                  <span
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] ${
                      active.status === "Completed"
                        ? "bg-[#D4AF37] text-[#0b1120]"
                        : "bg-[#1E3A8A] text-white"
                    }`}
                  >
                    {active.status}
                  </span>
                </div>
                <h3 className="font-heading text-3xl md:text-4xl text-[#0b1120] leading-tight mb-4">
                  {active.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    <span>{active.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    <span>{active.year}</span>
                  </div>
                </div>
                <p className="text-base text-[#4b5563] leading-relaxed mb-8">
                  {active.summary}
                </p>
                <div className="overline text-[#1E3A8A] mb-4">
                  Key Features
                </div>
                <ul className="space-y-3">
                  {active.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-[#0b1120]"
                    >
                      <Check
                        className="w-4 h-4 mt-1 text-[#D4AF37] flex-shrink-0"
                        strokeWidth={2}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="mt-10 inline-flex items-center gap-3 bg-[#1E3A8A] text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-[#0b1120] transition-colors"
                  data-testid="modal-cta"
                >
                  Discuss a similar project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
