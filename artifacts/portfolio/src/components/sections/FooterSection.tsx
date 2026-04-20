import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { FaWhatsapp, FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";
import { SiReact, SiTypescript, SiTailwindcss, SiVite } from "react-icons/si";
import { Terminal, Clock, MapPin, Coffee } from "lucide-react";

const TERMINAL_LINES_PT = [
  { text: "$ whoami", delay: 0 },
  { text: "→ César Diego Anovich", delay: 600 },
  { text: "$ cat skills.txt", delay: 1200 },
  { text: "→ React · Node.js · AdTech · PHP · Java · .NET", delay: 1800 },
  { text: "$ echo $STATUS", delay: 2600 },
  { text: "→ Disponível para novos projetos ✓", delay: 3200 },
  { text: "$ git log --oneline | head -1", delay: 4000 },
  { text: "→ feat: criando soluções incríveis...", delay: 4600 },
  { text: "▋", delay: 5200 },
];

const TERMINAL_LINES_EN = [
  { text: "$ whoami", delay: 0 },
  { text: "→ César Diego Anovich", delay: 600 },
  { text: "$ cat skills.txt", delay: 1200 },
  { text: "→ React · Node.js · AdTech · PHP · Java · .NET", delay: 1800 },
  { text: "$ echo $STATUS", delay: 2600 },
  { text: "→ Available for new projects ✓", delay: 3200 },
  { text: "$ git log --oneline | head -1", delay: 4000 },
  { text: "→ feat: building incredible solutions...", delay: 4600 },
  { text: "▋", delay: 5200 },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");
  return (
    <span className="font-mono tabular-nums text-primary text-sm">
      {h}<span className="animate-pulse text-primary/60">:</span>{m}<span className="animate-pulse text-primary/60">:</span>{s}
    </span>
  );
}

function TerminalWindow() {
  const { lang } = useTranslation();
  const lines = lang === "pt" ? TERMINAL_LINES_PT : TERMINAL_LINES_EN;
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const termRef = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setVisibleLines([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (termRef.current) {
          termRef.current.scrollTop = termRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(t);
    });

    const restart = setTimeout(() => {
      setCycle((c) => c + 1);
    }, 7500);
    timers.push(restart);

    return () => timers.forEach(clearTimeout);
  }, [cycle, lang]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0e1a]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-white/30 font-mono">terminal — bash</span>
        </div>
        <Terminal className="w-3.5 h-3.5 text-white/20" />
      </div>

      {/* Terminal body */}
      <div ref={termRef} className="p-4 h-44 overflow-hidden font-mono text-xs leading-7 space-y-0.5">
        <AnimatePresence mode="sync">
          {visibleLines.map((lineIdx) => {
            const line = lines[lineIdx];
            const isCmd = line.text.startsWith("$");
            const isCursor = line.text === "▋";
            return (
              <motion.p
                key={`${cycle}-${lineIdx}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  isCursor
                    ? "text-primary animate-pulse"
                    : isCmd
                    ? "text-green-400"
                    : "text-white/60"
                }
              >
                {line.text}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

const techStack = [
  { icon: <SiReact className="w-4 h-4" />, label: "React", color: "#61DAFB" },
  { icon: <SiTypescript className="w-4 h-4" />, label: "TypeScript", color: "#3178C6" },
  { icon: <SiTailwindcss className="w-4 h-4" />, label: "Tailwind", color: "#06B6D4" },
  { icon: <SiVite className="w-4 h-4" />, label: "Vite", color: "#646CFF" },
];

const socialLinks = [
  { icon: <FaWhatsapp className="w-5 h-5" />, label: "WhatsApp", href: "https://wa.me/5500000000000", color: "#25D366" },
  { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", href: "#", color: "#0A66C2" },
  { icon: <FaGithub className="w-5 h-5" />, label: "GitHub", href: "#", color: "#ffffff" },
];

const navLinks = [
  { labelPt: "Sobre", labelEn: "About", href: "#about" },
  { labelPt: "Tecnologias", labelEn: "Technologies", href: "#skills" },
  { labelPt: "Atividades", labelEn: "Activities", href: "#activities" },
  { labelPt: "Projetos", labelEn: "Projects", href: "#projects" },
  { labelPt: "Contato", labelEn: "Contact", href: "#contact" },
];

function CoffeeCounter() {
  const [coffees, setCoffees] = useState(0);
  const { lang } = useTranslation();

  useEffect(() => {
    const start = Date.now();
    const startYear = new Date(new Date().getFullYear(), 0, 1).getTime();
    const msPerCoffee = 1000 * 60 * 90;
    const approx = Math.floor((start - startYear) / msPerCoffee);
    setCoffees(approx);
    const interval = setInterval(() => {
      setCoffees((c) => c + 1);
    }, msPerCoffee);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Coffee className="w-3.5 h-3.5 text-amber-400" />
      <span>
        {coffees.toLocaleString()}{" "}
        {lang === "pt" ? "cafés esse ano" : "coffees this year"}
      </span>
    </div>
  );
}

export function FooterSection() {
  const { lang } = useTranslation();
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative overflow-hidden border-t border-white/5"
      style={{ background: "linear-gradient(180deg, #080b14 0%, #060810 100%)" }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background orbs */}
      <div className="absolute bottom-0 left-1/4 w-80 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-black text-sm text-white shadow-lg shadow-primary/30">
                CA
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-30 blur-md -z-10 scale-125" />
              </div>
              <div>
                <p className="text-white font-display font-bold text-sm leading-tight">César Diego</p>
                <p className="text-muted-foreground text-xs">Anovich</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "pt"
                ? "Full-Stack Developer especializado em AdTech, Performance Web e Email Marketing."
                : "Full-Stack Developer specialized in AdTech, Web Performance and Email Marketing."}
            </p>

            {/* Live status */}
            <div className="flex items-center gap-2">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-green-400 font-medium">
                {lang === "pt" ? "Disponível para projetos" : "Available for projects"}
              </span>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  whileHover={{
                    scale: 1.15,
                    background: `${s.color}18`,
                    borderColor: `${s.color}40`,
                    color: s.color,
                    y: -2,
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
              {lang === "pt" ? "Navegação" : "Navigation"}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                  >
                    <span
                      className="w-4 h-px bg-muted-foreground group-hover:bg-primary group-hover:w-6 transition-all duration-300"
                    />
                    {lang === "pt" ? link.labelPt : link.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info column */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
              {lang === "pt" ? "Info" : "Info"}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-0.5">
                    {lang === "pt" ? "Horário local" : "Local time"}
                  </p>
                  <LiveClock />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground/60 mb-0.5">
                    {lang === "pt" ? "Localização" : "Location"}
                  </p>
                  <span className="text-sm text-white/70 font-medium">Brasil 🇧🇷</span>
                </div>
              </div>

              <CoffeeCounter />

              {/* Built with */}
              <div>
                <p className="text-xs text-muted-foreground/50 mb-2">
                  {lang === "pt" ? "Feito com" : "Built with"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <motion.span
                      key={tech.label}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                      style={{
                        background: `${tech.color}10`,
                        border: `1px solid ${tech.color}25`,
                        color: tech.color,
                      }}
                      whileHover={{ scale: 1.08, y: -2 }}
                    >
                      {tech.icon}
                      {tech.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
              {lang === "pt" ? "Console" : "Console"}
            </h4>
            <TerminalWindow />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50 text-center md:text-left">
            © {year} César Diego Anovich.{" "}
            {lang === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
            {lang === "pt" ? "Desenvolvido com" : "Developed with"}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaHeart className="w-3 h-3 text-red-400" />
            </motion.span>
            {lang === "pt" ? "e muito" : "and a lot of"}
            <Coffee className="w-3 h-3 text-amber-400" />
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="footer-back-to-top"
            className="group flex items-center gap-2 text-xs text-muted-foreground/50 hover:text-primary transition-colors duration-300"
          >
            {lang === "pt" ? "Voltar ao topo" : "Back to top"}
            <motion.div
              className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors"
              whileHover={{ y: -3 }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
    </footer>
  );
}
