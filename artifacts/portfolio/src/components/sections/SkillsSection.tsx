import { useRef } from "react";
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
}

const frontendSkills: Skill[] = [
  { name: "HTML5", descKey: "skills.html.desc", icon: <SiHtml5 />, color: "#E34F26" },
  { name: "CSS3", descKey: "skills.css.desc", icon: <SiCss />, color: "#1572B6" },
  { name: "JavaScript", descKey: "skills.js.desc", icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "React", descKey: "skills.react.desc", icon: <SiReact />, color: "#61DAFB" },
  { name: "Bootstrap", descKey: "skills.bootstrap.desc", icon: <SiBootstrap />, color: "#7952B3" },
  { name: "Tailwind CSS", descKey: "skills.tailwind.desc", icon: <SiTailwindcss />, color: "#06B6D4" },
];

const backendSkills: Skill[] = [
  { name: "Node.js", descKey: "skills.node.desc", icon: <SiNodedotjs />, color: "#339933" },
  { name: ".NET", descKey: "skills.dotnet.desc", icon: <FaServer />, color: "#512BD4" },
  { name: "Java", descKey: "skills.java.desc", icon: <FaJava />, color: "#007396" },
  { name: "PHP", descKey: "skills.php.desc", icon: <SiPhp />, color: "#777BB4" },
];

const dbSkills: Skill[] = [
  { name: "MySQL", descKey: "skills.mysql.desc", icon: <SiMysql />, color: "#4479A1" },
  { name: "PostgreSQL", descKey: "skills.postgres.desc", icon: <SiPostgresql />, color: "#4169E1" },
];

const toolSkills: Skill[] = [
  { name: "GTM", descKey: "skills.gtm.desc", icon: <SiGoogletagmanager />, color: "#246FDB" },
  { name: "Google Ad Manager", descKey: "skills.gam.desc", icon: <FaChartLine />, color: "#4285F4" },
  { name: "GA4", descKey: "skills.ga4.desc", icon: <SiGoogleanalytics />, color: "#E37400" },
  { name: "Email Marketing", descKey: "skills.email.desc", icon: <FaEnvelope />, color: "#00D4FF" },
  { name: "Prebid.js", descKey: "skills.prebid.desc", icon: <FaChartLine />, color: "#7C3AED" },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass-card rounded-xl p-5 flex flex-col items-center text-center cursor-default transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{ background: `radial-gradient(circle at center, ${skill.color}22, transparent 70%)` }}
      />
      {/* Border gradient on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${skill.color}40, transparent 60%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "1px",
        }}
      />

      <div
        className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ color: skill.color }}
      >
        {skill.icon}
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">{skill.name}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{t(skill.descKey as any)}</p>
    </motion.div>
  );
}

function SkillGroup({ title, skills, accentColor }: { title: string; skills: Skill[]; accentColor: string }) {
  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-1 h-8 rounded-full" style={{ background: accentColor }} />
        <h3 className="text-xl font-display font-bold text-white">{title}</h3>
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
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #00d4ff 0, #00d4ff 1px, transparent 0, transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

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
