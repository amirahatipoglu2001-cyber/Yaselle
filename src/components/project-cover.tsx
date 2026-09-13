import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-md border border-border",
        className,
      )}
      aria-hidden="true"
    >
      {project.cover.motif === "books" && <BooksMotif />}
      {project.cover.motif === "shifts" && <ShiftsMotif />}
      {project.cover.motif === "coast" && <CoastMotif />}
      <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.18em] text-primary-foreground/80 uppercase">
        {project.title}
      </span>
    </div>
  );
}

function BooksMotif() {
  return (
    <div className="flex h-full min-h-44 items-end gap-2 bg-[oklch(0.36_0.06_38)] p-6 sm:min-h-56">
      <span className="h-24 w-7 rounded-sm bg-[oklch(0.72_0.12_70)]" />
      <span className="h-32 w-8 rounded-sm bg-[oklch(0.55_0.12_38)]" />
      <span className="h-20 w-6 rounded-sm bg-[oklch(0.88_0.04_85)]" />
      <span className="h-28 w-9 rounded-sm bg-[oklch(0.46_0.04_155)]" />
      <span className="h-16 w-5 rounded-sm bg-[oklch(0.64_0.08_50)]" />
      <span className="hidden h-24 w-7 rounded-sm bg-[oklch(0.8_0.06_80)] sm:block" />
    </div>
  );
}

function ShiftsMotif() {
  return (
    <div className="grid h-full min-h-44 grid-cols-7 grid-rows-3 gap-1.5 bg-[oklch(0.32_0.04_155)] p-5 sm:min-h-56">
      {Array.from({ length: 21 }, (_, index) => (
        <span
          key={index}
          className={cn(
            "rounded-sm",
            index === 9
              ? "bg-primary"
              : index % 5 === 0
                ? "bg-[oklch(0.55_0.05_155)]"
                : "bg-[oklch(0.88_0.03_85)]/80",
          )}
        />
      ))}
    </div>
  );
}

function CoastMotif() {
  return (
    <div className="relative h-full min-h-44 overflow-hidden bg-[oklch(0.55_0.04_230)] sm:min-h-56">
      <span className="absolute inset-x-0 top-0 h-1/2 bg-[oklch(0.86_0.03_85)]" />
      <span className="absolute inset-x-0 top-[42%] h-px bg-[oklch(0.23_0.02_55)]/40" />
      <span className="absolute bottom-8 left-[12%] h-px w-2/3 bg-[oklch(0.98_0.01_85)]/70" />
      <span className="absolute right-[18%] bottom-[28%] size-10 rounded-full bg-[oklch(0.78_0.08_75)]/80" />
    </div>
  );
}
