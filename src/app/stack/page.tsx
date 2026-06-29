import { StackPage } from "@/components/sections/stack-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack",
  description: "My technology stack and tools",
};

export default function Stack() {
  return <StackPage />;
}
