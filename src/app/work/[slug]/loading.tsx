export default function ProjectLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="h-3 w-28 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-14 w-2/3 max-w-md animate-pulse rounded bg-muted" />
      <div className="mt-8 h-56 animate-pulse rounded-md bg-muted" />
      <p className="sr-only">Loading study</p>
    </main>
  );
}
