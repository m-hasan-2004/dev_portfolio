import { ExperiencePage } from "@/components/sections/experience-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional journey and experience",
};

export default function Experience() {
  return <ExperiencePage />;
}
