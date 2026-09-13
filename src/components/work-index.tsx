import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/content/projects";

export function WorkIndex({
  projects,
  numbered = true,
}: {
  projects: Project[];
  numbered?: boolean;
}) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Link
            href={`/work/${project.slug}`}
            className="group grid gap-5 py-8 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:items-center"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                {numbered
                  ? `${String(index + 1).padStart(2, "0")} — ${project.year}`
                  : project.year}
              </p>
              <h2 className="font-display mt-2 text-4xl tracking-tight sm:text-5xl">
                {project.title}
                <ArrowUpRight className="ml-2 inline size-6 -translate-y-1 opacity-0 transition group-hover:opacity-100" />
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">{project.kind}</Badge>
                <Badge variant="secondary">{project.role}</Badge>
              </div>
            </div>
            <ProjectCover
              project={project}
              className="transition duration-300 group-hover:-translate-y-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
