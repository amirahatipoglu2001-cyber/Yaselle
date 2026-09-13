import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl italic">{profile.name}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {profile.title}. {profile.location}.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-primary"
          >
            Email
          </a>
          <a
            href={profile.github}
            className="hover:text-primary"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Link href="/work" className="hover:text-primary">
            Work
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
