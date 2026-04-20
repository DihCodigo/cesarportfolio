import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { Target, BarChart2, Mail, Code } from "lucide-react";

export function ActivitiesSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs = t("activities.text").split(". ").reduce<string[]>((acc, sentence, i, arr) => {
    if (i % 2 === 0) {
      acc.push(sentence + (arr[i + 1] ? ". " + arr[i + 1] + "." : "."));
    }
    return acc;
  }, []);

  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      label: lang === "pt" ? "Header Bidding & GPT" : "Header Bidding & GPT",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      label: lang === "pt" ? "Viewability & KPIs" : "Viewability & KPIs",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: lang === "pt" ? "Email Marketing" : "Email Marketing",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: lang === "pt" ? "GTM & Analytics" : "GTM & Analytics",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
  ];

  return (
    <section
      id="activities"
      className="relative py-28 overflow-hidden glass-panel"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Orbs */}
      <div className="absolute right-10 top-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {lang === "pt" ? "O que eu faço" : "What I do"}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
            {t("activities.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main text */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5">
              {paragraphs.slice(0, 4).map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-muted-foreground leading-relaxed text-base"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Sidebar highlights */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-white font-display font-bold text-lg mb-5">
                {lang === "pt" ? "Especialidades" : "Specialties"}
              </h3>
              <div className="space-y-3">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`flex items-center gap-3 ${item.bg} rounded-xl px-4 py-3`}
                  >
                    <span className={item.color}>{item.icon}</span>
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                {[
                  { value: "5+", label: lang === "pt" ? "Anos de Exp." : "Years Exp." },
                  { value: "20+", label: lang === "pt" ? "Projetos" : "Projects" },
                  { value: "100%", label: lang === "pt" ? "Dedicação" : "Dedication" },
                  { value: "∞", label: lang === "pt" ? "Paixão" : "Passion" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-3"
                  >
                    <div className="text-2xl font-display font-extrabold text-gradient mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
