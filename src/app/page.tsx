import Link from "next/link";
import { WorkIndex } from "@/components/work-index";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto w-full max-w-6xl px-5 pt-12 pb-8 sm:px-8 sm:pt-20 sm:pb-12">
        <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
          {profile.title} · {profile.location}
        </p>
        <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          {profile.name}
        </h1>
        <p className="font-display mt-6 max-w-2xl text-2xl leading-snug text-foreground/80 italic sm:text-3xl">
          {profile.headline}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/work"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-4")}
          >
            Selected work
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-4",
            )}
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            Index
          </h2>
          <Link
            href="/work"
            className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase hover:underline"
          >
            All studies
          </Link>
        </div>
        <WorkIndex projects={projects} />
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:grid-cols-[0.9fr_1.1fr] sm:px-8">
        <div>
          <h2 className="font-display text-3xl">Now</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {profile.availability}
          </p>
        </div>
        <dl className="space-y-6">
          {profile.now.map((item) => (
            <div
              key={item.label}
              className="border-t border-border pt-4 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-4"
            >
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                {item.label}
              </dt>
              <dd className="mt-2 text-base leading-7">{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
