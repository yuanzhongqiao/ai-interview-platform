import { getCandidateMetadata } from "@/lib/brand";
import type { Metadata } from "next";

export const metadata: Metadata = getCandidateMetadata();

export default function CandidateInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
