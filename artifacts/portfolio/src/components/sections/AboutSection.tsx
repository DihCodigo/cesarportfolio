import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Code2, Zap, Globe2, Mail } from "lucide-react";

export function AboutSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: <Code2 className="w-5 h-5 text-primary" />,
      label: lang === "pt" ? "Full-Stack" : "Full-Stack",
    },
    {
      icon: <Zap className="w-5 h-5 text-secondary" />,
      label: "AdTech",
    },
    {
      icon: <Globe2 className="w-5 h-5 text-primary" />,
      label: "Performance Web",
    },
    {
      icon: <Mail className="w-5 h-5 text-secondary" />,
      label: "Email Marketing",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0e1a 0%, #0d1226 50%, #0a0e1a 100%)",
      }}
    >
      {/* Accent glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl scale-110" />
              {/* Card */}
              <div className="relative glass-card rounded-2xl p-8 text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 mx-auto mb-6 flex items-center justify-center text-4xl font-display font-bold text-gradient">
                  CA
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-1">César Diego Anovich</h3>
                <p className="text-primary text-sm font-medium mb-6">Full-Stack Developer</p>
                <div className="grid grid-cols-2 gap-3">
                  {highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2"
                    >
                      {h.icon}
                      <span className="text-xs text-white/80 font-medium">{h.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === "pt" ? "Quem sou eu" : "Who I am"}
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">
              {t("about.title")}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
            <p className="text-muted-foreground text-base leading-relaxed">
              {t("about.text")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["React", "Node.js", "PHP", "Java", ".NET", "AdTech", "Prebid.js", "GTM"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
