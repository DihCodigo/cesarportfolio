import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { Send, CheckCircle } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

export function ContactSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden glass-panel"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Orbs */}
      <div className="absolute left-1/4 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {lang === "pt" ? "Vamos conversar" : "Let's talk"}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto items-start">
          {/* Left info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-bold text-white text-lg mb-4">
                {lang === "pt" ? "Redes Sociais" : "Social Media"}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-link"
                  className="flex items-center gap-3 text-muted-foreground hover:text-[#25D366] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
                <a
                  href="#"
                  data-testid="contact-linkedin-link"
                  className="flex items-center gap-3 text-muted-foreground hover:text-[#0A66C2] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                    <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="#"
                  data-testid="contact-github-link"
                  className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <FaGithub className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {lang === "pt"
                  ? "Estou disponível para projetos freelance, oportunidades de emprego e colaborações. Entre em contato!"
                  : "I'm available for freelance projects, job opportunities and collaborations. Get in touch!"}
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
              data-testid="contact-form"
            >
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="input-contact-name"
                  placeholder={lang === "pt" ? "Seu nome" : "Your name"}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-contact-email"
                  placeholder={lang === "pt" ? "seu@email.com" : "your@email.com"}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  data-testid="input-contact-message"
                  placeholder={lang === "pt" ? "Sua mensagem..." : "Your message..."}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                data-testid="button-contact-send"
                className="w-full py-3 px-6 rounded-xl font-semibold text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-80"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "linear-gradient(135deg, #00d4ff, #7c3aed)",
                }}
              >
                {sent ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {t("contact.success")}
                  </>
                ) : sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("contact.send")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
