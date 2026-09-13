import type { Metadata } from "next";

const titles: Record<string, string> = {
  "size-guide": "Beden tablosu",
  shipping: "Shipping & delivery",
  payment: "Payment",
  returns: "Returns",
  contact: "Contact",
  satisfaction: "Client care",
  privacy: "Privacy",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = titles[slug] ?? "Help";
  const path = `/help/${slug}`;
  return {
    title,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title,
    },
  };
}

export default function HelpLayout({ children }: LayoutProps<"/help/[slug]">) {
  return children;
}
