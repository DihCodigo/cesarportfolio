import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import heroBg from "@/assets/hero-bg.png";

const TYPEWRITER_STRINGS_PT = [
  "Full-Stack Developer",
  "AdTech Specialist",
  "Performance Expert",
  "Email Marketing Pro",
];
const TYPEWRITER_STRINGS_EN = [
  "Full-Stack Developer",
  "AdTech Specialist",
  "Performance Expert",
  "Email Marketing Pro",
];

export function HeroSection() {
  const { lang, t } = useTranslation();
  const strings = lang === "pt" ? TYPEWRITER_STRINGS_PT : TYPEWRITER_STRINGS_EN;

  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentStr = strings[currentStringIndex];
    const timeout = isDeleting
      ? setTimeout(() => {
          setDisplayText(currentStr.substring(0, charIndex - 1));
          setCharIndex((p) => p - 1);
        }, 60)
      : setTimeout(() => {
          setDisplayText(currentStr.substring(0, charIndex + 1));
          setCharIndex((p) => p + 1);
        }, 90);

    if (!isDeleting && charIndex === currentStr.length) {
      setTimeout(() => setIsDeleting(true), 1800);
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentStringIndex((p) => (p + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentStringIndex, strings]);

  const scrollToAbout = () => {
    const el = document.querySelector("#about");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0a0e1a]/90 to-[#0a0e1a]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-primary text-sm font-semibold uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {lang === "pt" ? "Olá, eu sou" : "Hi, I am"}
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="text-gradient">César Diego</span>
            <br />
            <span className="text-white">Anovich</span>
          </motion.h1>

          <motion.div
            className="h-12 md:h-14 mb-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl font-display font-semibold text-primary">
              {displayText}
              <span className="inline-block w-0.5 h-7 bg-primary ml-1 animate-pulse" />
            </p>
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={scrollToAbout}
              data-testid="hero-cta-about"
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              {lang === "pt" ? "Conheça meu trabalho" : "See my work"}
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              data-testid="hero-cta-contact"
              className="px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
            >
              {lang === "pt" ? "Entre em contato" : "Get in touch"}
            </a>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
}
