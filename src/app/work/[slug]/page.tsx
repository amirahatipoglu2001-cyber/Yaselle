import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProject, getProjectSlugs, projects } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Study not found" };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase hover:text-primary"
      >
        <ArrowLeft className="size-3.5" />
        All studies
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            {String(index + 1).padStart(2, "0")} — {project.year} · {project.kind}
          </p>
          <h1 className="font-display mt-4 text-5xl tracking-tight sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {project.lede}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">{project.role}</Badge>
            {project.stack.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <ProjectCover project={project} className="min-h-56 lg:min-h-72" />
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            On this study
          </h2>
          <p className="font-display text-2xl leading-snug italic">
            {project.summary}
          </p>
        </aside>
        <article className="space-y-10">
          {project.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl">{section.heading}</h2>
              <p className="mt-3 text-base leading-8 text-foreground/85">
                {section.body}
              </p>
            </section>
          ))}

          <Separator />

          <section>
            <h2 className="font-display text-3xl">Decisions I would defend</h2>
            <ol className="mt-6 space-y-6">
              {project.decisions.map((decision, decisionIndex) => (
                <li key={decision.title} className="grid gap-2 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-primary">
                    {String(decisionIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{decision.title}</h3>
                    <p className="mt-2 text-base leading-7 text-muted-foreground">
                      {decision.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-md border border-border bg-card p-6">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
              What I would build next
            </h2>
            <p className="mt-3 text-base leading-7">{project.next}</p>
          </section>
        </article>
      </div>

      <nav
        aria-label="Adjacent studies"
        className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link href={`/work/${previous.slug}`} className="group">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Previous
            </p>
            <p className="font-display mt-1 text-2xl group-hover:text-primary">
              {previous.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="group sm:text-right">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Next
            </p>
            <p className="font-display mt-1 text-2xl group-hover:text-primary">
              {next.title}
            </p>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
