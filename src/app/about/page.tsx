import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — ${profile.title}.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        About
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-5xl tracking-tight sm:text-6xl">
        Interfaces with consequences, written like a person was in the room.
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <aside className="space-y-6">
          <div className="flex size-28 items-end justify-start rounded-md border border-border bg-primary p-3">
            <span className="font-display text-4xl text-primary-foreground">
              {profile.monogram}
            </span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {profile.name}
            <br />
            {profile.title}
            <br />
            {profile.location}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="block text-sm underline decoration-primary/40 underline-offset-4 hover:text-primary"
          >
            {profile.email}
          </a>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-4")}
          >
            Start a conversation
          </Link>
        </aside>

        <div className="space-y-6 text-base leading-8">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl">How I work</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {profile.approach.map((item) => (
            <li key={item.title} className="border-t border-border pt-5">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl">Toolbox</h2>
        <dl className="mt-8 grid gap-8 sm:grid-cols-3">
          {profile.tools.map((group) => (
            <div key={group.group}>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
                {group.group}
              </dt>
              <dd className="mt-3 text-base leading-8">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 border-t border-border pt-10">
        <h2 className="font-display text-3xl">Now</h2>
        <ul className="mt-6 space-y-5">
          {profile.now.map((item) => (
            <li key={item.label}>
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-base leading-7">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
