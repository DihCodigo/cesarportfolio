import { useTranslation } from "@/hooks/use-translation";

export function FooterSection() {
  const { lang } = useTranslation();

  return (
    <footer className="relative py-10 border-t border-white/5" style={{ background: "#06080f" }}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-display font-bold text-white">
            CA
          </span>
          <span className="text-sm text-muted-foreground">César Diego Anovich</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {lang === "pt"
            ? `© ${new Date().getFullYear()} César Diego Anovich. Todos os direitos reservados.`
            : `© ${new Date().getFullYear()} César Diego Anovich. All rights reserved.`}
        </p>
        <p className="text-xs text-muted-foreground">
          {lang === "pt" ? "Feito com" : "Made with"}{" "}
          <span className="text-primary">React</span>
          {" & "}
          <span className="text-secondary">Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
