import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Write to ${profile.name} at ${profile.email}.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
          Contact
        </p>
        <h1 className="font-display mt-4 text-5xl tracking-tight sm:text-6xl">
          Write when you have a problem worth sitting with.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          {profile.availability} Direct email is always open if you would rather
          skip the form.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Email
            </dt>
            <dd className="mt-1">
              <a
                className="underline decoration-primary/40 underline-offset-4 hover:text-primary"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              GitHub
            </dt>
            <dd className="mt-1">
              <a
                className="underline decoration-primary/40 underline-offset-4 hover:text-primary"
                href={profile.github}
                rel="noreferrer"
                target="_blank"
              >
                {profile.githubHandle}
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </main>
  );
}
