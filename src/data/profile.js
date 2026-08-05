import { AVAILABILITY } from "./availability";
import { publicUrl } from "../utils/utils";

export const profile = {
  name: "Juan",
  domain: "juan.",
  tagline: "I build things.",
  role: "computer science student",
  greeting: "Hey there - I'm",
  bio: "Enjoys designing scalable backend systems, building reliable APIs, and writing clean, maintainable code",
  /** @type {import('./availability').AvailabilityStatus} */
  availability: AVAILABILITY.OPEN,
  location: "Jakarta, Indonesia",
  university: "Binus University",
  cvUrl: publicUrl("/cv.pdf"),
  cvDownloadName: "Juan-CV.pdf",
  links: {
    github: "https://github.com/juanariviano",
    linkedin: "https://www.linkedin.com/in/juan-ariviano-chandra",
    email: "mailto:juanariviano@gmail.com",
  },
  stats: [
    { value: "5", suffix: "", label: "Projects shipped" },
    { value: "10", suffix: "+", label: "Tech stacks mastered" },
    { value: "2", suffix: "+", label: "Years coding" },
  ],
  about: {
    headline: "Curious by nature.\nBuilder by habit.",
    paragraphs: [
      "CS student at Binus University who got hooked on building real things, not just passing exams. I find the intersection of design and engineering genuinely exciting, and I think the best software feels inevitable once you use it.",
      "Nights and weekends: side projects, open source exploration, and occasionally breaking things to understand how they work.",
    ],
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Tailwind",
      "Flask",
      "Clerk",
      "Supabase",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    facts: [
      {
        label: "Currently",
        value: "Studying Computer Science at Binus · Building side projects",
      },
      {
        label: "Location",
        value: "Jakarta, Indonesia · Remote-friendly",
      },
      {
        label: "Availability",
        valueKey: "availability",
      },
      {
        label: "Strengths",
        value:
          "Full-stack development · Team leadership · Fast learner · Problem solving",
      },
      {
        label: "Currently learning",
        value: "-",
        accent: true,
      },
    ],
  },
  terminal: {
    commits: [
      { hash: "a3f2c1e", msg: "feat: PlanWithUs donation platform", type: "out" },
      { hash: "b91d4a0", msg: "feat: LuxBid real-time auction bidding", type: "out" },
      { hash: "c4e8f12", msg: "feat: Neuronesia personalized AI advisor & analytic chatbot", type: "out" },
      { hash: "d23b9e7", msg: "feat: Plotify personal media journal", type: "out2" },
    ],
  },
};
