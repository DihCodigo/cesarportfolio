import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Code2, Database, Mail, BarChart2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface Project {
  titleKey: string;
  descKey: string;
  categoryKey: string;
  link: string;
  icon: React.ReactNode;
  accent: string;
  tags: string[];
}

const projects: Project[] = [
  {
    titleKey: "proj.lp.title",
    descKey: "proj.lp.desc",
    categoryKey: "projects.frontend",
    link: "#",
    icon: <Code2 className="w-5 h-5" />,
    accent: "#00d4ff",
    tags: ["React", "CSS3", "JavaScript"],
  },
  {
    titleKey: "proj.soon.title",
    descKey: "proj.soon.desc",
    categoryKey: "projects.frontend",
    link: "#",
    icon: <Code2 className="w-5 h-5" />,
    accent: "#00d4ff",
    tags: ["React", "Dark Mode", "Animation"],
  },
  {
    titleKey: "proj.insync.title",
    descKey: "proj.insync.desc",
    categoryKey: "projects.backend",
    link: "#",
    icon: <BarChart2 className="w-5 h-5" />,
    accent: "#7c3aed",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JS"],
  },
  {
    titleKey: "proj.crud.title",
    descKey: "proj.crud.desc",
    categoryKey: "projects.db",
    link: "#",
    icon: <Database className="w-5 h-5" />,
    accent: "#00d4ff",
    tags: ["MySQL", "CRUD", "SQL"],
  },
  {
    titleKey: "proj.email.title",
    descKey: "proj.email.desc",
    categoryKey: "projects.email",
    link: "#",
    icon: <Mail className="w-5 h-5" />,
    accent: "#7c3aed",
    tags: ["HTML Email", "Media Queries", "Gmail", "Outlook"],
  },
  {
    titleKey: "proj.gam.title",
    descKey: "proj.gam.desc",
    categoryKey: "projects.adtech",
    link: "#",
    icon: <BarChart2 className="w-5 h-5" />,
    accent: "#00d4ff",
    tags: ["Prebid.js", "GTM", "GAM", "Header Bidding"],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      data-testid={`project-card-${index}`}
      className="group relative glass-card rounded-2xl p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:border-white/20 cursor-default"
      style={{ perspective: "1000px" }}
    >
      {/* Shimmer border effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.accent}30 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${project.accent}25`, color: project.accent }}
        >
          {project.icon}
        </div>
        <a
          href={project.link}
          data-testid={`project-link-${index}`}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Category badge */}
      <span
        className="self-start text-xs font-semibold px-3 py-1 rounded-full"
        style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
      >
        {t(project.categoryKey as any)}
      </span>

      {/* Title & desc */}
      <div>
        <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {t(project.titleKey as any)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(project.descKey as any)}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground/80 bg-white/5 rounded-md px-2 py-0.5">
            {tag}
          </span>
        ))}
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
      style={{ background: "linear-gradient(180deg, #0a0e1a 0%, #0d1226 50%, #0a0e1a 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="absolute left-1/4 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

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
            <ProjectCard key={project.titleKey} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
