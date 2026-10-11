import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects } from "../content";
import { cn, publicUrl, tagId } from "../utils/utils";
import Reveal from "./motion/Reveal";
import ProjectReadmeModal from "./ProjectReadmeModal";
import EmptyState from "./ui/EmptyState";
import SectionHeading from "./ui/SectionHeading";

const TILTS = [-1.2, 0.8, -0.6, 1.1, -1];
const TAPE_TILTS = [-3, 2, -1, 3, -2];

const linkClass =
  "border-b border-dashed border-nb-rule pb-px text-nb-ink2 transition-colors hover:border-nb-ink hover:text-nb-ink";

function ProjectCard({ project, onReadme }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.95, rotate: project.tilt }}
      animate={{ opacity: 1, scale: 1, rotate: project.tilt }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative rounded-md border border-nb-rule bg-nb-card px-3 pb-5 pt-3 shadow-card transition-shadow duration-300 hover:shadow-lift"
    >
      <span
        className="tape -top-[11px] left-1/2 h-[22px] w-20"
        style={{ transform: `translateX(-50%) rotate(${project.tapeTilt}deg)` }}
      />

      <div className="relative overflow-hidden rounded-[3px] border border-nb-rule">
        {project.image ? (
          <img
            src={publicUrl(project.image)}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className="aspect-[2/1] w-full object-cover object-top grayscale transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="hatch flex aspect-[2/1] w-full items-center justify-center">
            <span className="font-hand text-sm text-nb-ink3">
              {project.live ? project.live.replace(/^https?:\/\//, "") : "screenshot soon"}
            </span>
          </div>
        )}
        {project.live && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-nb-ink px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-nb-paper">
            <span className="h-1.5 w-1.5 rounded-full bg-nb-paper" aria-hidden="true" />
            LIVE
          </span>
        )}
      </div>

      <div className="px-1.5">
        <p className="mt-4 font-mono text-[11px] text-nb-ink3">{`// ${project.number}`}</p>
        <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.01em]">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-nb-ink2">{project.description}</p>
        <div className="mt-3.5 flex flex-wrap gap-1.5 font-mono text-[10.5px] text-nb-ink2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded border border-dashed border-nb-rule px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
          {project.readme && (
            <button type="button" onClick={() => onReadme(project)} className={linkClass}>
              readme
            </button>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              repo ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-nb-ink pb-px text-nb-ink"
            >
              live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [readmeProject, setReadmeProject] = useState(null);

  const items = useMemo(
    () =>
      projects.items.map((project, i) => ({
        ...project,
        number: String(i + 1).padStart(3, "0"),
        tags: project.tech.map(tagId),
        tilt: TILTS[i % TILTS.length],
        tapeTilt: TAPE_TILTS[i % TAPE_TILTS.length],
      })),
    []
  );

  const filters = useMemo(
    () =>
      projects.filters.map((label) => {
        const id = tagId(label);
        const count =
          id === "all" ? items.length : items.filter((p) => p.tags.includes(id)).length;
        return { id, label: label.toLowerCase(), count };
      }),
    [items]
  );

  const visible =
    filter === "all" ? items : items.filter((p) => p.tags.includes(filter));
  const activeLabel = filters.find((f) => f.id === filter)?.label ?? filter;
  const hint =
    filter === "all"
      ? `all ${items.length} projects ↓`
      : `${visible.length} of ${items.length} with ${activeLabel}`;

  return (
    <>
      <section
        id="projects"
        aria-labelledby="proj-h"
        className="mx-auto max-w-[920px] px-6 pb-24 pt-6"
      >
        <SectionHeading id="proj-h" section={projects.section} hint={hint} hintTilt={1.5} />

        <Reveal delay={0.05}>
          <div
            role="group"
            aria-label="Filter projects by stack"
            className="mb-10 flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative inline-flex min-h-[36px] items-center rounded-full border border-dashed px-3.5 font-mono text-xs transition-colors",
                    active
                      ? "border-transparent text-nb-paper"
                      : "border-nb-rule text-nb-ink2 hover:border-solid hover:text-nb-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-[-1px] rounded-full bg-nb-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className="opacity-60">{f.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode={reduce ? "sync" : "popLayout"}>
              {visible.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  onReadme={setReadmeProject}
                />
              ))}
            </AnimatePresence>
            {visible.length === 0 && (
              <EmptyState>nothing here yet for this filter.</EmptyState>
            )}
          </div>
        </Reveal>
      </section>

      <ProjectReadmeModal project={readmeProject} onClose={() => setReadmeProject(null)} />
    </>
  );
}
