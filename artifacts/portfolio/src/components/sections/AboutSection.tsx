import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Code2, Zap, Globe2, Mail, MapPin } from "lucide-react";

function PhotoCard({ lang, isInView }: { lang: string; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });
  const scaleS = useSpring(hovered ? 1.03 : 1, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const highlights = [
    { icon: <Code2 className="w-4 h-4" />, label: "Full-Stack", color: "#00d4ff" },
    { icon: <Zap className="w-4 h-4" />, label: "AdTech", color: "#7c3aed" },
    { icon: <Globe2 className="w-4 h-4" />, label: "Performance Web", color: "#00d4ff" },
    { icon: <Mail className="w-4 h-4" />, label: "Email Marketing", color: "#7c3aed" },
  ];

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: rotX, rotateY: rotY, scale: scaleS, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      className="relative w-full max-w-xs mx-auto cursor-default"
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl scale-105 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
          opacity: hovered ? 1 : 0.5,
        }}
      />

      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: hovered
            ? "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.12)"
            : "0 20px 60px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Photo area — square proportion */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
          <img
            src="/photo.png"
            alt="César Diego Anovich"
            className="w-full h-full object-cover object-top transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement;
              if (fb) fb.style.display = "flex";
            }}
          />
          {/* Fallback */}
          <div
            className="absolute inset-0 flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0d1226] to-[#080b14]"
            style={{ display: "none" }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-display font-black"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                border: "2px solid rgba(0,212,255,0.25)",
                color: "#00d4ff",
              }}
            >
              CA
            </div>
            <p className="text-xs text-white/25 text-center px-6 leading-relaxed">
              {lang === "pt" ? "/photo.png" : "/photo.png"}
            </p>
          </div>

          {/* Glare overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hovered ? 0.18 : 0,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.9) 0%, transparent 60%)`,
            }}
          />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080b14] to-transparent pointer-events-none" />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 8 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.7, type: "spring", stiffness: 220 }}
            className="absolute top-3 right-3 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xl"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              color: "#fff",
              boxShadow: "0 6px 24px rgba(0,212,255,0.4)",
              transform: "translateZ(30px)",
            }}
          >
            {lang === "pt" ? "5+ anos" : "5+ years"}
          </motion.div>
        </div>

        {/* Info strip */}
        <div className="px-5 py-4" style={{ transform: "translateZ(15px)" }}>
          <h3 className="text-base font-display font-bold text-white leading-tight">César Diego Anovich</h3>
          <p className="text-sm font-medium mt-0.5 mb-3" style={{ color: "#00d4ff" }}>Full-Stack Developer</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 opacity-50" /> Brasil 🇧🇷
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {lang === "pt" ? "Disponível" : "Available"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5"
                style={{
                  background: `${h.color}0f`,
                  border: `1px solid ${h.color}20`,
                }}
              >
                <span style={{ color: h.color }}>{h.icon}</span>
                <span className="text-[11px] font-semibold text-white/75">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            className="flex justify-center"
          >
            <PhotoCard lang={lang} isInView={isInView} />
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
              {["React", "Node.js", "PHP", "Java", "Angular", ".NET", "AdTech", "Prebid.js", "GTM"].map((tag) => (
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
