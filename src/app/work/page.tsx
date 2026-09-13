import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Independent product studies by Amira Hatipoğlu — Sahaf, Vardiya, and Kıyı.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        Selected studies
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-5xl tracking-tight sm:text-6xl">
        Work that starts from a real inconvenience.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
        Three independent product studies. Each one is written as a case: the
        problem, the people, the constraints, and the decisions I would defend
        in a room.
      </p>
      <div className="mt-10">
        <WorkIndex projects={projects} />
      </div>
    </main>
  );
}
