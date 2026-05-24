import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES, SOCIAL_LINKS } from "@/lib/site-data";

const SOCIAL_ICONS = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Twitter,
  X: Twitter,
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }
    setBusy(true);
    try {
      const subject = encodeURIComponent("Newsletter signup");
      const body = encodeURIComponent(
        `Please add this email to the BRHC newsletter list:\n\n${email}`
      );
      window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
      toast.success("Your email app is opening for newsletter signup.");
      setEmail("");
    } catch {
      toast.error("Could not open your email app. Please email us directly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#0b1120] text-white pt-20 pb-8 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 grid place-items-center overflow-hidden border border-white bg-white">
                <img
                  src="/icon/apple-icon.png"
                  alt="Royal Homes & Consults ltd logo"
                  className="w-full h-full object-cover"
                />
              </span>
              <div>
                <div className="font-heading text-lg">BRHC</div>
                <div className="overline text-[9px] text-white/50">
                  Royal Homes & Consults
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-6">
              {COMPANY.full} — a Nigerian real estate, construction and
              consultancy practice committed to structural integrity and
              client-centred delivery.
            </p>
            <p className="font-heading text-2xl italic text-[#D4AF37]">
              Living as you are pleased.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <div className="overline text-[#D4AF37] mb-5">Navigate</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white link-underline"
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <div className="overline text-[#D4AF37] mb-5">Services</div>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm text-white/70 hover:text-white link-underline"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className="overline text-[#D4AF37] mb-5">Newsletter</div>
            <p className="text-sm text-white/60 mb-5 leading-relaxed">
              Quarterly updates on projects, market thinking and design notes
              from the BRHC studio.
            </p>
            <form
              onSubmit={subscribe}
              className="flex items-center border-b border-white/30 focus-within:border-[#D4AF37] transition-colors"
              data-testid="newsletter-form"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-0 outline-none py-3 text-sm text-white placeholder:text-white/40"
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Subscribe"
                data-testid="newsletter-submit"
                className="w-10 h-10 grid place-items-center text-white hover:text-[#D4AF37] transition-colors disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </form>

            <div className="flex items-center gap-4 mt-8">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.platform];
                if (!Icon) return null;

                return (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="w-9 h-9 grid place-items-center border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="relative border-t border-white/10 pt-10 pb-6 overflow-hidden">
          <div className="absolute -bottom-12 left-0 right-0 text-center font-heading text-[18vw] md:text-[14vw] leading-none text-white/[0.04] select-none pointer-events-none whitespace-nowrap">
            BARKA ROYAL
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div data-testid="footer-copyright">
              © {new Date().getFullYear()} Royal Homes & Consults ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>RC 1234567</span>
              <a href="#" className="link-underline">
                Privacy
              </a>
              <a href="#" className="link-underline">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
