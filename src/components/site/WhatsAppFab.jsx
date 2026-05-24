import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP } from "@/lib/site-data";

export const WhatsAppFab = () => {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(
    WHATSAPP.message
  )}`;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3"
          data-testid="whatsapp-fab"
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-gray-200 shadow-2xl p-5 max-w-[280px]"
                data-testid="whatsapp-card"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#25D366] grid place-items-center text-white">
                      <MessageCircle className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="font-heading text-sm text-[#0b1120]">
                        BRHC Team
                      </div>
                      <div className="text-[11px] text-[#10B981] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        Typically replies in minutes
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpanded(false)}
                    aria-label="Close"
                    data-testid="whatsapp-close"
                    className="text-gray-400 hover:text-[#0b1120] transition-colors -mt-1 -mr-1 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#4b5563] leading-relaxed mb-4">
                  Have a question about your project? Send us a WhatsApp and
                  our team will respond personally.
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-start-chat"
                  className="block w-full bg-[#25D366] text-white text-center px-4 py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#1ebe57] transition-colors"
                >
                  Start chat
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((v) => !v)}
            aria-label="WhatsApp chat"
            data-testid="whatsapp-fab-button"
            className="relative w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-2xl hover:bg-[#1ebe57] transition-colors group"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
            <MessageCircle className="w-6 h-6 relative" strokeWidth={2} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
