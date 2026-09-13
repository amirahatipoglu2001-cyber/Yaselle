import type { ReactNode } from "react";
import { owner } from "@/content/profile";
import { ownerMailto } from "@/lib/mail";
import { cn } from "@/lib/utils";

export function OwnerMailLink({
  className,
  children,
  subject,
  body,
}: {
  className?: string;
  children?: ReactNode;
  subject?: string;
  body?: string;
}) {
  const href =
    subject !== undefined
      ? ownerMailto(subject, body ?? "")
      : `mailto:${owner.email}`;
  return (
    <a href={href} className={cn("underline underline-offset-4", className)}>
      {children ?? owner.email}
    </a>
  );
}
