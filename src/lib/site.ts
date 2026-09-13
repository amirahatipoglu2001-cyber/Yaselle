import { profile } from "@/content/profile";

export const site = {
  name: profile.name,
  url: "http://127.0.0.1:43217",
  description: `${profile.title}. ${profile.headline}`,
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
