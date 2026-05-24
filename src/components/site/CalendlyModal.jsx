import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ExternalLink } from "lucide-react";
import { CALENDLY_URL } from "@/lib/site-data";

export const SCHEDULE_EVENT = "brhc:schedule";

export const CalendlyModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(SCHEDULE_EVENT, onOpen);
    return () => window.removeEventListener(SCHEDULE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] bg-[#0b1120]/85 backdrop-blur-md p-3 md:p-8 flex items-center justify-center"
          onClick={() => setOpen(false)}
          data-testid="calendly-modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-4xl h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 grid place-items-center bg-[#1E3A8A] text-[#D4AF37]">
                  <Calendar className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="overline text-[#D4AF37] mb-1">
                    Book a meeting
                  </div>
                  <div className="font-heading text-lg text-[#0b1120] leading-tight">
                    Schedule your BRHC consultation
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                data-testid="calendly-close"
                className="w-10 h-10 grid place-items-center text-[#0b1120] hover:bg-[#0b1120] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendly embed */}
            <div className="flex-1 relative bg-[#FAFAFA] overflow-hidden">
              <iframe
                src={CALENDLY_URL}
                title="Schedule consultation"
                className="w-full h-full border-0"
                data-testid="calendly-iframe"
              />
              {/* Fallback link in case iframe is blocked */}
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="calendly-external"
                  className="inline-flex items-center gap-2 bg-[#0b1120] text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-[#1E3A8A] transition-colors"
                >
                  Open in new tab
                  <ExternalLink className="w-3 h-3" strokeWidth={2} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper for any component to trigger the modal
export const openScheduleModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SCHEDULE_EVENT));
  }
};
