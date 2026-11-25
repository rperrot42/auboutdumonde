import type { Metadata } from "next";
import { Coquille } from "@/components/Coquille";

export const metadata: Metadata = {
  title: {
    default: "Au bout du monde — massage, treatments and hammam in Lyon",
    template: "%s — Au bout du monde, Lyon",
  },
  description:
    "Independent spa in Lyon’s 1st arrondissement since 2012: eleven massages from around the world, organic face and body treatments, private hammam. Solo or duo.",
  alternates: { languages: { fr: "/" } },
};

export default function LayoutEn({ children }: { children: React.ReactNode }) {
  return <Coquille langue="en">{children}</Coquille>;
}
