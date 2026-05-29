import { DocsHeader } from "@/components/docs/docs-header";
import { DocsHomeContent } from "@/components/docs/docs-home-content";
export const metadata = {
  title: "Docs",
  description:
    "Learn how to use Lingwu — guides for interview creators and interviewees.",
};

export default function DocsHomePage() {
  return (
    <>
      <DocsHeader />
      <DocsHomeContent />
    </>
  );
}
