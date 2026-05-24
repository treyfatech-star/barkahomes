import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, COMPANY } from "@/lib/site-data";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-navbar"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          data-testid="navbar-logo"
          className={`flex items-center gap-3 ${
            scrolled ? "text-[#0b1120]" : "text-white"
          }`}
        >
          <span className="relative grid place-items-center w-10 h-10 border border-current">
            <span className="font-heading text-xl leading-none">B</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg tracking-tight">BRHC</span>
            <span className="overline text-[9px] opacity-70">
              Royal Homes & Consults
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`link-underline text-sm tracking-wide ${
                scrolled ? "text-[#111827]" : "text-white/90"
              } hover:opacity-100`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            data-testid="navbar-phone"
            className={`flex items-center gap-2 text-sm ${
              scrolled ? "text-[#111827]" : "text-white"
            }`}
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            <span>{COMPANY.phone}</span>
          </a>
          <a
            href="#contact"
            data-testid="navbar-cta"
            className={`px-5 py-3 text-xs uppercase tracking-[0.2em] border transition-colors duration-300 ${
              scrolled
                ? "bg-[#1E3A8A] border-[#1E3A8A] text-white hover:bg-[#0b1120]"
                : "border-white text-white hover:bg-white hover:text-[#0b1120]"
            }`}
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 ${scrolled ? "text-[#0b1120]" : "text-white"}`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  className="text-base text-[#111827] font-heading"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                data-testid="mobile-nav-cta"
                className="px-5 py-3 text-xs uppercase tracking-[0.2em] bg-[#1E3A8A] text-white text-center"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
