import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsFooter } from "@/components/docs/docs-footer";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocsHeader />
      <div className="flex-1 flex">
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border/60">
          <div className="sticky top-[49px] h-[calc(100vh-49px)] overflow-y-auto py-8 pl-8 pr-6 code-scrollbar">
            <DocsSidebar />
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 max-w-3xl w-full px-8 lg:px-16 py-10">
            {children}
          </div>
          <DocsFooter className="px-8 lg:px-16" />
        </div>
      </div>
    </>
  );
}
