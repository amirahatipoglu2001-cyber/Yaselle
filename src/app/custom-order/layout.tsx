import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom order",
  description: "Design and measuring guidance for a Yaselle custom order.",
  alternates: { canonical: "/custom-order" },
  openGraph: {
    url: "/custom-order",
    title: "Custom order",
  },
};

export default function CustomOrderLayout({
  children,
}: LayoutProps<"/custom-order">) {
  return children;
}
