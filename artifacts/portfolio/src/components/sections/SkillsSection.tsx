import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiBootstrap, SiTailwindcss,
  SiNodedotjs, SiMysql, SiPostgresql, SiPhp,
  SiGoogletagmanager, SiGoogleanalytics,
} from "react-icons/si";
import { FaServer, FaEnvelope, FaChartLine, FaJava } from "react-icons/fa";

interface Skill {
  name: string;
  descKey: string;
  icon: React.ReactNode;
  color: string;
  level: number;
}

const frontendSkills: Skill[] = [
  { name: "HTML5", descKey: "skills.html.desc", icon: <SiHtml5 />, color: "#E34F26", level: 95 },
  { name: "CSS3", descKey: "skills.css.desc", icon: <SiCss />, color: "#1572B6", level: 92 },
  { name: "JavaScript", descKey: "skills.js.desc", icon: <SiJavascript />, color: "#F7DF1E", level: 90 },
  { name: "React", descKey: "skills.react.desc", icon: <SiReact />, color: "#61DAFB", level: 88 },
  { name: "Bootstrap", descKey: "skills.bootstrap.desc", icon: <SiBootstrap />, color: "#7952B3", level: 85 },
  { name: "Tailwind CSS", descKey: "skills.tailwind.desc", icon: <SiTailwindcss />, color: "#06B6D4", level: 80 },
];

const backendSkills: Skill[] = [
  { name: "Node.js", descKey: "skills.node.desc", icon: <SiNodedotjs />, color: "#339933", level: 80 },
  { name: ".NET", descKey: "skills.dotnet.desc", icon: <FaServer />, color: "#512BD4", level: 75 },
  { name: "Java", descKey: "skills.java.desc", icon: <FaJava />, color: "#007396", level: 72 },
  { name: "PHP", descKey: "skills.php.desc", icon: <SiPhp />, color: "#777BB4", level: 85 },
];

const dbSkills: Skill[] = [
  { name: "MySQL", descKey: "skills.mysql.desc", icon: <SiMysql />, color: "#4479A1", level: 88 },
  { name: "PostgreSQL", descKey: "skills.postgres.desc", icon: <SiPostgresql />, color: "#4169E1", level: 82 },
];

const toolSkills: Skill[] = [
  { name: "GTM", descKey: "skills.gtm.desc", icon: <SiGoogletagmanager />, color: "#246FDB", level: 95 },
  { name: "Ad Manager", descKey: "skills.gam.desc", icon: <FaChartLine />, color: "#4285F4", level: 90 },
  { name: "GA4", descKey: "skills.ga4.desc", icon: <SiGoogleanalytics />, color: "#E37400", level: 88 },
  { name: "Email Marketing", descKey: "skills.email.desc", icon: <FaEnvelope />, color: "#00D4FF", level: 92 },
  { name: "Prebid.js", descKey: "skills.prebid.desc", icon: <FaChartLine />, color: "#7C3AED", level: 85 },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.04 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
      data-testid={`skill-card-${skill.name.toLowerCase().replace(/\s/g, "-")}`}
      className="group relative overflow-hidden rounded-2xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: spotlight.active
          ? `0 0 30px ${skill.color}20, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(200px circle at ${spotlight.x}% ${spotlight.y}%, ${skill.color}18 0%, transparent 70%)`,
        }}
      />

      {/* Animated top border beam */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${skill.color}80, transparent)`,
          opacity: spotlight.active ? 1 : 0,
        }}
      />

      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
        style={{ background: `${skill.color}15` }}
      />

      <div className="relative z-10 p-5 flex flex-col items-center text-center gap-3">
        {/* Animated icon ring */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-80 transition-all duration-500 scale-150"
            style={{ background: skill.color }}
          />
          <motion.div
            className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: `${skill.color}18`,
              border: `1px solid ${skill.color}35`,
              color: skill.color,
            }}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            {skill.icon}
          </motion.div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-white transition-colors">{skill.name}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t(skill.descKey as any)}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground/60">proficiency</span>
            <span className="text-[10px] font-bold" style={{ color: skill.color }}>{skill.level}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 + 0.4, duration: 1, ease: "easeOut" }}
              style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillGroup({ title, skills, accentColor }: { title: string; skills: Skill[]; accentColor: string }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-7"
      >
        <div className="relative">
          <div className="w-1.5 h-10 rounded-full" style={{ background: accentColor }} />
          <div className="absolute inset-0 w-1.5 h-10 rounded-full blur-sm opacity-60" style={{ background: accentColor }} />
        </div>
        <h3 className="text-xl font-display font-bold text-white tracking-tight">{title}</h3>
        <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${accentColor}30, transparent)` }} />
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="relative py-28 overflow-hidden"
      style={{ background: "#0a0e1a" }}
    >
      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #00d4ff 0, #00d4ff 1px, transparent 0, transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {lang === "pt" ? "Meu Arsenal" : "My Arsenal"}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
            {t("skills.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <SkillGroup title={t("skills.frontend")} skills={frontendSkills} accentColor="#00d4ff" />
        <SkillGroup title={t("skills.backend")} skills={backendSkills} accentColor="#7c3aed" />
        <SkillGroup title={t("skills.db")} skills={dbSkills} accentColor="#00d4ff" />
        <SkillGroup title={t("skills.tools")} skills={toolSkills} accentColor="#7c3aed" />
      </div>
    </section>
  );
}
