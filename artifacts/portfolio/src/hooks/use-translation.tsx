import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "en";

interface TranslationContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.pt) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  pt: {
    "nav.about": "Sobre",
    "nav.skills": "Tecnologias",
    "nav.activities": "Atividades",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    
    "hero.title": "Full-Stack Desenvolvedor",
    "hero.subtitle": "Gosto de criar soluções fullstack escaláveis, com foco em performance, automação e experiências de usuário incríveis — especialmente no ecossistema AdTech e Email Marketing.",
    
    "about.title": "Sobre Mim",
    "about.text": "Programador produtivo, sociável e de mente aberta, especializado em AdTech e Performance Web. Experiente no desenvolvimento de sistemas web, otimização de anúncios digitais e implementação de Header Bidding, GPT e GTM. No front-end, utilizo React, HTML, CSS e JavaScript, com frameworks como Bootstrap para interfaces otimizadas.",
    
    "skills.title": "Tecnologias",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.db": "Banco de Dados",
    "skills.tools": "Ferramentas",
    
    "skills.html.desc": "Estrutura páginas web",
    "skills.css.desc": "Estiliza páginas web",
    "skills.js.desc": "Interatividade no navegador",
    "skills.react.desc": "Biblioteca moderna do JS",
    "skills.bootstrap.desc": "Framework CSS popular",
    "skills.tailwind.desc": "Utilitário CSS moderno",
    
    "skills.node.desc": "JavaScript no servidor",
    "skills.dotnet.desc": "Plataforma da Microsoft",
    "skills.java.desc": "Robusto e multiplataforma",
    "skills.php.desc": "Popular na web",
    
    "skills.mysql.desc": "Banco de dados relacional",
    "skills.postgres.desc": "Avançado e confiável",
    
    "skills.gtm.desc": "Gerenciador de tags do Google",
    "skills.gam.desc": "Gestor de inventário de anúncios",
    "skills.ga4.desc": "Medição de dados de usuários",
    "skills.email.desc": "Campanhas de Email MKT",
    "skills.prebid.desc": "Header Bidding com Prebid.js",

    "activities.title": "Atividades Diárias",
    "activities.text": "No meu cotidiano profissional, sou responsável por integrar tecnologia, performance e estratégia de forma harmônica. Estou à frente da criação de soluções escaláveis com foco em automação, conversão e resultados, garantindo experiências digitais ágeis e otimizadas. Atuo com AdTech, implementando estratégias como Header Bidding com Prebid.js, Google Publisher Tag, Google Tag Manager e configurações avançadas de ad refresh, lazy loading, tracking por S2S e eventos de conversão personalizados. Também analiso e melhoro métricas de visibilidade, viewability, CTR e outras KPIs importantes para otimizar a performance de campanhas. Paralelamente, desenvolvo e-mails marketing responsivos e compatíveis com plataformas como Gmail e Outlook, utilizando técnicas avançadas para melhorar entregabilidade, leitura e performance visual. Aplico conceitos de estratégia de VA e testes A/B para potencializar resultados. No front-end, back-end ou nos bastidores da performance, sou aquele profissional que faz acontecer — com precisão técnica, visão estratégica e paixão por inovação.",
    
    "projects.title": "Projetos em Destaque",
    "projects.frontend": "Frontend",
    "projects.backend": "Backend",
    "projects.fullstack" : "FullStack",
    "projects.db": "Database",
    "projects.email": "Email Marketing",
    "projects.adtech": "GTM & AdManager",

    "proj.api.title": "API RESTful de Usuários",
    "proj.api.desc": "API backend desenvolvida em Node.js para cadastro de usuários com MySQL. Possui endpoints para criação, listagem, busca por ID e exclusão de registros.",

    "proj.saturno.title": "Saturno SaaS",
    "proj.saturno.desc": "Sistema SaaS completo de controle de ponto eletrônico com multiempresa, geolocalização, relatórios avançados e arquitetura escalável.",

    "proj.db.title": "Modelagem e Scripts SQL",
    "proj.db.desc": "Coleção de scripts SQL com comandos DDL e DML para criação, alteração e manipulação de dados em banco relacional MySQL.",
    
    "proj.lp.title": "Landing Page React",
    "proj.lp.desc": "Landing page pessoal do tipo moderno mobile first",
    "proj.soon.title": "Em Breve",
    "proj.soon.desc": "Site responsivo com dark mode, animações e layout moderno",
    "proj.insync.title": "Insync – Controle de Ponto Web",
    "proj.insync.desc": "Sistema de controle de ponto desenvolvido com PHP, MySQL, HTML, CSS e JavaScript. Permite o registro de horários, autenticação de usuários e geração de relatórios mensais e gerenciais",
    "proj.crud.title": "CRUD com MySQL",
    "proj.crud.desc": "Sistema de gerenciamento de usuários com interface simples",
    "proj.email.title": "Templates Responsivos",
    "proj.email.desc": "Criação de e-mails compatíveis com Gmail e Outlook usando tabelas e media queries",
    "proj.gam.title": "Setup GAM + Header Bidding",
    "proj.gam.desc": "Estruturação de anúncios com Prebid.js e Google Tag Manager",
    
    "contact.title": "Entre em Contato",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar",
    "contact.sending": "Enviando...",
    "contact.success": "Mensagem enviada com sucesso!",
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Technologies",
    "nav.activities": "Activities",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    
    "hero.title": "Full-Stack Developer",
    "hero.subtitle": "I love building scalable fullstack solutions, focused on performance, automation, and incredible user experiences — especially in the AdTech and Email Marketing ecosystem.",
    
    "about.title": "About Me",
    "about.text": "Productive, sociable, and open-minded programmer, specialized in AdTech and Web Performance. Experienced in web systems development, digital ad optimization, and implementation of Header Bidding, GPT and GTM. On the front-end, I use React, HTML, CSS and JavaScript, with frameworks like Bootstrap for optimized interfaces.",
    
    "skills.title": "Technologies",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "projects.fullstack" : "FullStack",
    "skills.db": "Database",
    "skills.tools": "Tools",
    
    "skills.html.desc": "Structures web pages",
    "skills.css.desc": "Styles web pages",
    "skills.js.desc": "Browser interactivity",
    "skills.react.desc": "Modern JS library",
    "skills.bootstrap.desc": "Popular CSS framework",
    "skills.tailwind.desc": "Modern CSS utility",

    "proj.api.title": "User RESTful API",
    "proj.api.desc": "Backend API built with Node.js for user management using MySQL. Includes endpoints for create, list, find by ID and delete operations.",

    "proj.saturno.title": "Saturno SaaS",
    "proj.saturno.desc": "Complete SaaS time tracking system with multi-tenant architecture, geolocation, advanced reports and scalable infrastructure.",

    "proj.db.title": "SQL Modeling & Scripts",
    "proj.db.desc": "Collection of SQL scripts using DDL and DML commands for database structure creation and data manipulation in MySQL.",
    
    "skills.node.desc": "JavaScript on the server",
    "skills.dotnet.desc": "Microsoft Platform",
    "skills.java.desc": "Robust and cross-platform",
    "skills.php.desc": "Popular on the web",
    
    "skills.mysql.desc": "Relational database",
    "skills.postgres.desc": "Advanced and reliable",
    
    "skills.gtm.desc": "Google Tag Manager",
    "skills.gam.desc": "Ad inventory manager",
    "skills.ga4.desc": "User data measurement",
    "skills.email.desc": "Email MKT Campaigns",
    "skills.prebid.desc": "Header Bidding with Prebid.js",

    "activities.title": "Daily Activities",
    "activities.text": "In my daily professional work, I am responsible for integrating technology, performance and strategy harmoniously. I lead the creation of scalable solutions focused on automation, conversion and results, ensuring agile and optimized digital experiences. I work with AdTech, implementing strategies such as Header Bidding with Prebid.js, Google Publisher Tag, Google Tag Manager and advanced configurations for ad refresh, lazy loading, S2S tracking and custom conversion events. I also analyze and improve visibility metrics, viewability, CTR and other important KPIs to optimize campaign performance. In parallel, I develop responsive email marketing campaigns compatible with platforms like Gmail and Outlook, using advanced techniques to improve deliverability, readability and visual performance. I apply VA strategy concepts and A/B testing to maximize results. In the front-end, back-end or behind the scenes of performance, I am the professional who makes things happen — with technical precision, strategic vision and passion for innovation.",
    
    "projects.title": "Featured Projects",
    "projects.frontend": "Frontend",
    "projects.backend": "Backend",
    "projects.db": "Database",
    "projects.email": "Email Marketing",
    "projects.adtech": "GTM & AdManager",
    
    "proj.lp.title": "Modern Landing Page",
    "proj.lp.desc": "Modern personal landing page with mobile first",
    "proj.soon.title": "Coming Soon",
    "proj.soon.desc": "Responsive site with dark mode, animations and modern layout",
    "proj.insync.title": "Insync – Web Time Tracking",
    "proj.insync.desc": "Time tracking system built with PHP, MySQL, HTML, CSS and JavaScript. Allows time registration, user authentication and monthly/management report generation",
    "proj.crud.title": "MySQL CRUD",
    "proj.crud.desc": "User management system with simple interface",
    "proj.email.title": "Responsive Templates",
    "proj.email.desc": "Creating emails compatible with Gmail and Outlook using tables and media queries",
    "proj.gam.title": "GAM + Header Bidding Setup",
    "proj.gam.desc": "Ad structuring with Prebid.js and Google Tag Manager",
    
    "contact.title": "Get in Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Language;
    if (saved && (saved === "pt" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio-lang", newLang);
  };

  const t = (key: keyof typeof translations.pt) => {
    return translations[lang][key] || translations.pt[key];
  };

  return (
    <TranslationContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
