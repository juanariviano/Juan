import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projectapps, projectFilters } from "../data/projectapps";
import { cn } from "../utils/utils";
import Reveal from "./motion/Reveal";
import ProjectReadmeModal from "./ProjectReadmeModal";
import EmptyState from "./ui/EmptyState";
import Section from "./ui/Section";

function ProjectLink({ children, onClick, href }) {
  const className =
    "cursor-pointer border-b border-ng-border2 pb-px text-[11px] text-ng-text3 transition-colors hover:text-ng-fg bg-transparent border-x-0 border-t-0 p-0 font-inherit";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function ProjectCard({ project, index, onView }) {
  const num = String(index + 1).padStart(3, "0");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="cursor-default rounded-[10px] border border-ng-border2 bg-ng-surface p-5 transition-colors duration-200 hover:border-ng-border2 hover:bg-ng-surface-hover"
    >
      <div className="mb-2.5 font-mono text-[10px] tracking-[0.15em] text-ng-text3">
        {"// "}
        {num}
      </div>
      <h3 className="mb-2 text-base font-semibold tracking-tight">{project.name}</h3>
      <p className="mb-3.5 text-xs font-light leading-[1.75] text-ng-text2">
        {project.description}
      </p>
      <div className="mb-3.5 flex flex-wrap gap-1">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="rounded border border-ng-border2 bg-ng-surface px-2 py-0.5 text-[10px] text-ng-muted-l"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3.5">
        <ProjectLink onClick={() => onView(project)}>View</ProjectLink>
        <ProjectLink href={project.github}>Repo ↗</ProjectLink>
        {project.deploy !== "none" && (
          <ProjectLink href={project.deploy}>Live ↗</ProjectLink>
        )}
      </div>
    </motion.article>
  );
}

export default function Project() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewProject, setViewProject] = useState(null);
  const reduce = useReducedMotion();

  const filtered =
    activeFilter === "all"
      ? projectapps
      : projectapps.filter((p) => p.tags.includes(activeFilter));

  return (
    <>
      <Section
        id="work"
        className="section-px border-b border-ng-border bg-ng-bg2 py-12 grid-bg-subtle"
      >
        <Reveal>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ng-muted">
            Selected work
          </p>
        </Reveal>

        <div className="my-5 flex flex-wrap gap-1.5">
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11px] tracking-wide transition-all duration-200",
                activeFilter === filter.id
                  ? "border-ng-border2 bg-ng-surface-hover text-ng-fg"
                  : "border-ng-border bg-transparent text-ng-text3 hover:border-ng-border2 hover:text-ng-text2"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
          {reduce ? (
            filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onView={setViewProject}
              />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onView={setViewProject}
                />
              ))}
            </AnimatePresence>
          )}
          {filtered.length === 0 && (
            <EmptyState>No projects found for this filter.</EmptyState>
          )}
        </div>
      </Section>

      <ProjectReadmeModal
        project={viewProject}
        onClose={() => setViewProject(null)}
      />
    </>
  );
}
