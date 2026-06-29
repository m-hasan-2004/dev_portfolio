import { ConnectPage } from "@/components/sections/connect-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
  description: "Get in touch or follow me on social media",
};

export default function Connect() {
  return <ConnectPage />;
}
