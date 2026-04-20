import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Code2, Zap, Globe2, Mail, MapPin, Briefcase } from "lucide-react";

export function AboutSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: <Code2 className="w-4 h-4" />, label: "Full-Stack", color: "#00d4ff" },
    { icon: <Zap className="w-4 h-4" />, label: "AdTech", color: "#7c3aed" },
    { icon: <Globe2 className="w-4 h-4" />, label: "Performance Web", color: "#00d4ff" },
    { icon: <Mail className="w-4 h-4" />, label: "Email Marketing", color: "#7c3aed" },
  ];

  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0e1a 0%, #0d1226 50%, #0a0e1a 100%)",
      }}
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-xs">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/25 to-secondary/25 blur-2xl scale-105 pointer-events-none" />

              {/* Card */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                }}
              >
                {/* Photo area */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#0d1226] to-[#080b14]">
                  {/* Replace the img src below with your actual photo path, e.g. src="/photo.jpg" */}
                  <img
                    src="/photo.jpg"
                    alt="César Diego Anovich"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  {/* Fallback placeholder (shown when no photo) */}
                  <div
                    className="absolute inset-0 flex-col items-center justify-center gap-3"
                    style={{ display: "none" }}
                  >
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-display font-black"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                        border: "2px solid rgba(0,212,255,0.25)",
                        color: "#00d4ff",
                      }}
                    >
                      CA
                    </div>
                    <p className="text-xs text-white/30 text-center px-4">
                      {lang === "pt"
                        ? "Adicione sua foto em /public/photo.jpg"
                        : "Add your photo at /public/photo.jpg"}
                    </p>
                  </div>

                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080b14] to-transparent pointer-events-none" />
                </div>

                {/* Info strip at bottom */}
                <div className="px-6 py-5">
                  <h3 className="text-lg font-display font-bold text-white leading-tight">César Diego Anovich</h3>
                  <p className="text-sm font-medium mt-0.5 mb-4" style={{ color: "#00d4ff" }}>Full-Stack Developer</p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground/50" />
                    Brasil 🇧🇷
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground/50" />
                    {lang === "pt" ? "Disponível para projetos" : "Available for projects"}
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  </div>

                  {/* Skill tags */}
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    {highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex items-center gap-2 rounded-xl px-3 py-2"
                        style={{
                          background: `${h.color}0f`,
                          border: `1px solid ${h.color}20`,
                          color: h.color,
                        }}
                      >
                        {h.icon}
                        <span className="text-xs font-semibold text-white/80">{h.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-2.5 text-xs font-bold shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  color: "#fff",
                  boxShadow: "0 8px 30px rgba(0,212,255,0.35)",
                }}
              >
                {lang === "pt" ? "5+ anos" : "5+ years"}
              </motion.div>
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
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 text-xs font-semibold rounded-full cursor-default"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    color: "#00d4ff",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
