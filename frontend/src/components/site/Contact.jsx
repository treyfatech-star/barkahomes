import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Globe, Clock, MapPin, Send } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and a message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thank you! Our team will reach out shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#FAFAFA] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: contact info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#D4AF37]" />
              <span className="overline text-[#D4AF37]">{`// Contact`}</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#0b1120] leading-[1.05] tracking-tight mb-8">
              Let&apos;s talk about your{" "}
              <span className="italic font-light text-[#1E3A8A]">project</span>.
            </h2>
            <p className="text-base text-[#4b5563] leading-relaxed mb-12 max-w-md">
              Tell us what you are dreaming of — a single home, a commercial
              block, a land acquisition. We&apos;ll respond within one
              business day with practical next steps.
            </p>

            <div className="space-y-6" data-testid="contact-info">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-5 group"
                data-testid="contact-phone"
              >
                <span className="w-12 h-12 grid place-items-center border border-[#1E3A8A] text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="overline text-[#6B7280] mb-1">Call us</div>
                  <div className="font-heading text-xl text-[#0b1120]">
                    {COMPANY.phone}
                  </div>
                </div>
              </a>

              <a
                href={`https://${COMPANY.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 group"
                data-testid="contact-website"
              >
                <span className="w-12 h-12 grid place-items-center border border-[#1E3A8A] text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors flex-shrink-0">
                  <Globe className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="overline text-[#6B7280] mb-1">Visit</div>
                  <div className="font-heading text-xl text-[#0b1120]">
                    {COMPANY.website}
                  </div>
                </div>
              </a>

              <div
                className="flex items-start gap-5"
                data-testid="contact-coverage"
              >
                <span className="w-12 h-12 grid place-items-center border border-[#1E3A8A] text-[#1E3A8A] flex-shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="overline text-[#6B7280] mb-1">
                    Coverage
                  </div>
                  <div className="font-heading text-xl text-[#0b1120]">
                    5 Nigerian States · HQ Abuja
                  </div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="mt-12 bg-[#0b1120] text-white p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#D4AF37]/20 blur-2xl" />
              <div className="flex items-center gap-3 mb-5 relative">
                <Clock
                  className="w-5 h-5 text-[#D4AF37]"
                  strokeWidth={1.5}
                />
                <span className="overline text-[#D4AF37]">Office Hours</span>
              </div>
              <ul className="relative space-y-3">
                {COMPANY.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between text-sm border-b border-white/10 pb-3 last:border-0"
                  >
                    <span className="text-white/70">{h.day}</span>
                    <span className="text-white">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={onSubmit}
            className="lg:col-span-7 bg-white p-8 lg:p-12 border border-gray-200"
            data-testid="contact-form"
          >
            <div className="overline text-[#1E3A8A] mb-2">
              Project enquiry
            </div>
            <h3 className="font-heading text-3xl text-[#0b1120] mb-10">
              Tell us a little about it.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="overline text-[#6B7280] block mb-2">
                  Full name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="input-line"
                  placeholder="Your name"
                  data-testid="form-name"
                />
              </div>
              <div>
                <label className="overline text-[#6B7280] block mb-2">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="input-line"
                  placeholder="you@email.com"
                  data-testid="form-email"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="overline text-[#6B7280] block mb-2">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="input-line"
                placeholder="+234 ..."
                data-testid="form-phone"
              />
            </div>

            <div className="mb-10">
              <label className="overline text-[#6B7280] block mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                className="input-line resize-none"
                placeholder="Briefly describe your project, location and timeline"
                data-testid="form-message"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              data-testid="form-submit"
              className="group inline-flex items-center gap-3 bg-[#1E3A8A] text-white px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#0b1120] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send enquiry"}
              <Send
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2}
              />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
