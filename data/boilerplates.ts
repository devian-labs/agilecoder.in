export interface Boilerplate {
  title: string
  description: string
  stack: string[]
  url: string
  published: boolean
}

export const boilerplates: Boilerplate[] = [
  {
    title: "ReactJS Boilerplate: Batteries Included",
    description: "Production-ready React scaffold built so AI agents can extend it without breaking it.",
    stack: ["React", "TypeScript", "TanStack Query", "Tailwind", "ShadCN UI"],
    url: "https://devianlabs.gumroad.com/l/reactjs-boilerplate-with-batteries-included",
    published: true,
  },
  {
    title: "Next.js Boilerplate: AI-Ready Architecture",
    description: "Full Next.js scaffold with opinionated folder structure and AI-agent-friendly patterns.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Zod"],
    url: "https://devianlabs.gumroad.com/l/nextjs-boilerplate",
    published: false,
  },
  {
    title: "Express Boilerplate: AI-Ready Backend Scaffold",
    description: "Node + Express backend starter with TypeScript, structured logging, and auth scaffolding.",
    stack: ["Express", "TypeScript", "Node.js"],
    url: "https://devianlabs.gumroad.com/l/node-express",
    published: false,
  },
  {
    title: "NestJS Boilerplate: AI-Ready Backend Scaffold",
    description: "Enterprise-grade NestJS starter with modules, guards, and DI wired up out of the box.",
    stack: ["NestJS", "TypeScript", "Node.js"],
    url: "https://devianlabs.gumroad.com/l/nestjs-ai-ready-boilerplate",
    published: false,
  },
  {
    title: "Full-Stack MERN Boilerplate",
    description: "AI-ready full-stack architecture for React + Express + MongoDB.",
    stack: ["React", "Express", "MongoDB", "TypeScript"],
    url: "https://devianlabs.gumroad.com/l/dwnen",
    published: false,
  },
  {
    title: "Full-Stack MySQL Boilerplate",
    description: "AI-ready full-stack architecture for React + Express + Prisma + MySQL.",
    stack: ["React", "Express", "Prisma", "MySQL"],
    url: "https://devianlabs.gumroad.com/l/jeoub",
    published: false,
  },
]

export const publishedBoilerplates = boilerplates.filter((b) => b.published)
export const upcomingBoilerplates = boilerplates.filter((b) => !b.published)
