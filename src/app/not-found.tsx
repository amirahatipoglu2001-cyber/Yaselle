import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-24 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        404
      </p>
      <h1 className="font-display mt-4 text-5xl tracking-tight sm:text-6xl">
        This page is not in the index.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
        The study may have moved, or the address is a typo. The work is still
        on the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className={cn(buttonVariants({ size: "lg" }), "rounded-full px-4")}
        >
          Back home
        </Link>
        <Link
          href="/work"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-full px-4",
          )}
        >
          View work
        </Link>
      </div>
    </main>
  );
}
