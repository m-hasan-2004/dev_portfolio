import { LabPageClient } from "@/components/sections/lab-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
  description: "Explore my projects and experiments",
};

export default function LabPage() {
  return <LabPageClient />;
}
