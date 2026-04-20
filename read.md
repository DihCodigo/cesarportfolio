# César Diego Anovich - Portfólio

## Visão Geral

Este é o meu portfólio pessoal de classe mundial, onde apresento meu trabalho como Desenvolvedor Full-Stack e especialista em AdTech. Ele foi construído com React + Vite e conta com suporte bilíngue (PT/EN), animações com Framer Motion, cartões com efeito glassmorphism, botão flutuante do WhatsApp e um design em azul marinho/ciano/violeta.

## Artefatos

- **portfolio** — Meu site principal de portfólio em `/` (React + Vite)

## Funcionalidades do Portfólio

- Suporte bilíngue (PT/EN) com persistência via localStorage
- Hero animado com efeito de máquina de escrever
- Seção de habilidades com cartões glassmorphism e efeitos de brilho ao passar o mouse
- Seção de projetos com cartões 3D com efeito de inclinação ao passar o mouse
- Seção de atividades com estatísticas
- Formulário de contato com animação de envio
- Botão flutuante do WhatsApp com animação de pulso
- Navegação com rolagem suave e animações de scroll com Framer Motion
- Totalmente responsivo (menu hambúrguer para mobile)

---

# Workspace

## Stack

- **Ferramenta de Monorepo**: pnpm workspaces
- **Versão do Node.js**: 24
- **Gerenciador de pacotes**: pnpm
- **Versão do TypeScript**: 5.9
- **Framework de API**: Express 5
- **Banco de dados**: PostgreSQL + Drizzle ORM
- **Validação**: Zod (`zod/v4`), `drizzle-zod`
- **Geração de código da API**: Orval (a partir de especificação OpenAPI)
- **Build**: esbuild (bundle CJS)

## Comandos Principais

- `pnpm run typecheck` — Executo a verificação de tipos completa em todos os pacotes
- `pnpm run build` — Executo a verificação de tipos e o build de todos os pacotes
- `pnpm --filter @workspace/api-spec run codegen` — Regenero hooks da API e schemas Zod a partir da especificação OpenAPI
- `pnpm --filter @workspace/db run push` — Aplico alterações do schema no banco de dados (apenas desenvolvimento)
- `pnpm --filter @workspace/api-server run dev` — Rodo o servidor da API localmente

Consulte a skill `pnpm-workspace` para entender melhor a estrutura do workspace, a configuração do TypeScript e os detalhes dos pacotes.