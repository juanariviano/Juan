/**
 * Project readmes live in: public/readmes/
 * Set readmeSlug to the filename without .md (e.g. "planwithus" → public/readmes/planwithus.md)
 * Leave readmeSlug empty ("") to show the default "no description" note in View.
 */
export const projectapps = [
  {
    id: 0,
    name: "PlanWithUs",
    readmeSlug: "planwithus",
    description:
      "Find donations and volunteers for environmental cleanup events.",
    github: "https://github.com/juanariviano/PlanWithUs",
    deploy: "none",
    tech: ["EJS", "CSS", "Node.js", "PostgreSQL"],
    tags: ["nodejs", "postgresql", "ejs", "css"],
  },
  {
    id: 1,
    name: "LuxBid",
    readmeSlug: "luxbid",
    description: "Auction platform for luxury goods with real-time bidding.",
    github: "https://github.com/ronyandrean/LuxBid",
    deploy: "none",
    tech: ["React", "TypeScript", "Tailwind", "Motoko"],
    tags: ["react", "typescript", "tailwind", "motoko"],
  },
  {
    id: 2,
    name: "Neuronesia",
    readmeSlug: "neuronesia",
    description: "Personalized AI Advisor & Analytic Chatbot",
    github: "https://github.com/JustKalvin/Neuronesia",
    deploy: "none",
    tech: ["React", "JavaScipt", "Tailwind", "N8N"],
    tags: ["react", "javascript", "tailwind", "n8n"],
  },
  {
    id: 3,
    name: "DiagnoAI",
    readmeSlug: "diagnoai",
    description:
      "Machine Learning-based application designed to assist in predicting heart disease based on user health data.",
    github: "https://github.com/juanariviano/DiagnoAI",
    deploy: "none",
    tech: ["HTML", "CSS", "Python", "Flask"],
    tags: ["python", "html", "css", "flask"],
  }, {
    id: 4,
    name: "Plotify",
    readmeSlug: "plotify",
    description:
      "A personal media journal for tracking where you left off across everything you watch and read.",
    github: "https://github.com/juanariviano/Plotify",
    deploy: "https://yourplotify.site",
    tech: ["Node.js", "TypeScript", "React", "Tailwind", "Clerk", "Supabase"],
    tags: ["tailwind", "typescript", "react", "nodejs", "clerk", "supabase"],
  }
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "nodejs", label: "Node.js" },
  { id: "javascript", label: "JavaScript" },
  { id: "tailwind", label: "Tailwind" },
  { id: "clerk", label: "Clerk" },
  { id: "supabase", label: "Supabase" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "ejs", label: "EJS" },
  { id: "motoko", label: "Motoko" },
  { id: "n8n", label: "N8N" },
  { id: "flask", label: "Flask" },
  { id: "express", label: "Express" },
  { id: "mongodb", label: "MongoDB" },
  { id: "mysql", label: "MySQL" },
  { id: "sqlite", label: "SQLite" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "css", label: "CSS" },
  { id: "html", label: "HTML" },
];
