import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code2, Database, Mail, BarChart2, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface Project {
  titleKey: string;
  descKey: string;
  categoryKey: string;
  link: string;
  icon: React.ReactNode;
  accent: string;
  bgAccent: string;
  tags: string[];
  number: string;
}

const projects: Project[] = [
  {
    titleKey: "proj.lp.title",
    descKey: "proj.lp.desc",
    categoryKey: "projects.frontend",
    link: "#",
    icon: <Code2 className="w-5 h-5" />,
    accent: "#00d4ff",
    bgAccent: "from-[#00d4ff]/10",
    tags: ["React", "CSS3", "JavaScript"],
    number: "",
  },
  {
    titleKey: "proj.api.title",
    descKey: "proj.api.desc",
    categoryKey: "projects.backend",
    link: "https://github.com/DihCodigo/Api_restful",
    icon: <Code2 className="w-5 h-5" />,
    accent: "#16a34a",
    bgAccent: "from-[#16a34a]/10",
    tags: ["Node.js", "Express", "MySQL", "REST API"],
    number: "",
  },
  {
    titleKey: "proj.saturno.title",
    descKey: "proj.saturno.desc",
    categoryKey: "projects.fullstack",
    link: "https://github.com/DihCodigo/SaturnoSaaS",
    icon: <BarChart2 className="w-5 h-5" />,
    accent: "#2563eb",
    bgAccent: "from-[#2563eb]/10",
    tags: ["Angular", "NestJS", "MySQL", "SaaS"],
    number: "",
  },
  {
    titleKey: "proj.crud.title",
    descKey: "proj.crud.desc",
    categoryKey: "projects.db",
    link: "#",
    icon: <Database className="w-5 h-5" />,
    accent: "#00d4ff",
    bgAccent: "from-[#00d4ff]/10",
    tags: ["MySQL", "CRUD", "SQL"],
    number: "",
  },
  {
    titleKey: "proj.email.title",
    descKey: "proj.email.desc",
    categoryKey: "projects.email",
    link: "#",
    icon: <Mail className="w-5 h-5" />,
    accent: "#7c3aed",
    bgAccent: "from-[#7c3aed]/10",
    tags: ["HTML Email", "Media Queries", "Gmail", "Outlook"],
    number: "",
  },
  {
    titleKey: "proj.gam.title",
    descKey: "proj.gam.desc",
    categoryKey: "projects.adtech",
    link: "https://github.com/DihCodigo/GTMContainer",
    icon: <BarChart2 className="w-5 h-5" />,
    accent: "#00d4ff",
    bgAccent: "from-[#00d4ff]/10",
    tags: ["Prebid.js", "GTM", "GAM", "Header Bidding"],
    number: "",
  },
];

function TiltCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const scale = useSpring(hovered ? 1.04 : 1, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normX);
    y.set(normY);
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 80 }}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-testid={`project-card-${index}`}
      className="relative overflow-hidden rounded-2xl cursor-default group"
    >
      {/* Base background */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
          border: `1px solid rgba(255,255,255,0.08)`,
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}25, inset 0 1px 0 rgba(255,255,255,0.12)`
            : `0 4px 20px rgba(0,0,0,0.3)`,
          transition: "box-shadow 0.4s ease",
        }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, ${project.accent}20 0%, transparent 65%)`,
        }}
      />

      {/* Animated border beam on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(135deg, ${project.accent}40, transparent 50%, ${project.accent}20)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "1px",
        }}
      />

      {/* 3D lift layer (translateZ) */}
      <div className="relative p-6 flex flex-col gap-4" style={{ transform: "translateZ(20px)" }}>
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `${project.accent}20`,
                border: `1px solid ${project.accent}35`,
                color: project.accent,
              }}
              animate={hovered ? { rotate: [0, -5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {project.icon}
            </motion.div>
            <span
              className="text-4xl font-display font-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              style={{ color: project.accent }}
            >
              {project.number}
            </span>
          </div>

          <motion.a
            href={project.link}
            data-testid={`project-link-${index}`}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? `${project.accent}20` : "rgba(255,255,255,0.05)",
              border: `1px solid ${hovered ? project.accent + "40" : "rgba(255,255,255,0.08)"}`,
              color: hovered ? project.accent : "rgba(255,255,255,0.4)",
            }}
            whileHover={{ scale: 1.15, rotate: 45 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Category badge */}
        <motion.span
          className="self-start text-xs font-bold px-3 py-1 rounded-full"
          style={{
            background: `${project.accent}12`,
            color: project.accent,
            border: `1px solid ${project.accent}30`,
          }}
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        >
          {t(project.categoryKey as any)}
        </motion.span>

        {/* Title */}
        <h3
          className="text-base font-display font-bold text-white leading-snug transition-colors duration-300"
          style={{ color: hovered ? "white" : "rgba(255,255,255,0.9)" }}
        >
          {t(project.titleKey as any)}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {t(project.descKey as any)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="text-[11px] font-medium rounded-lg px-2 py-0.5 transition-all duration-300"
              style={{
                background: hovered ? `${project.accent}12` : "rgba(255,255,255,0.04)",
                color: hovered ? project.accent : "rgba(255,255,255,0.45)",
                border: `1px solid ${hovered ? project.accent + "25" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { t, lang } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0e1a 0%, #0c1120 50%, #0a0e1a 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
      <div className="absolute left-1/4 top-1/4 w-80 h-80 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-secondary/4 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            {lang === "pt" ? "O que construí" : "What I built"}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
            {t("projects.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <TiltCard key={project.titleKey} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
