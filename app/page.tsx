import type { Metadata } from "next";
import LearningApp from "./LearningApp";

export const metadata: Metadata = {
  title: "Frontend Atlas — Senior Engineering Field Guide",
  description: "An interactive, visual eight-week path through frontend internals, architecture, system design, and senior interview preparation.",
};

export default function Home() {
  return <LearningApp />;
}
