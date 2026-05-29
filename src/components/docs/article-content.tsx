import type { ReactNode } from "react";

export function ArticleContent({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "docs-prose max-w-none text-foreground text-[15px] leading-relaxed",
        "[&>h2]:font-heading [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-10 [&>h2]:mb-4",
        "[&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-border/60",
        "[&>h3]:font-heading [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-3",
        "[&>p]:mb-4 [&>p]:text-muted-foreground",
        "[&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2",
        "[&>ul>li]:text-muted-foreground [&>ul>li]:leading-relaxed",
        "[&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2",
        "[&>ol>li]:text-muted-foreground [&>ol>li]:leading-relaxed",
        "[&_li>strong]:text-foreground [&_li>strong]:font-semibold",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&>hr]:my-8 [&>hr]:border-border",
        "[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono",
        "[&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4",
        "[&>blockquote]:text-muted-foreground [&>blockquote]:italic [&>blockquote]:bg-muted/50 [&>blockquote]:rounded-r-lg [&>blockquote]:pr-4",
        "[&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_table]:border-collapse [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:border [&_table]:border-border",
        "[&_thead]:bg-muted [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground [&_th]:border-b [&_th]:border-border",
        "[&_td]:px-4 [&_td]:py-2.5 [&_td]:text-muted-foreground [&_td]:border-b [&_td]:border-border/50",
        "[&_tbody_tr:last-child_td]:border-b-0",
        "[&_tbody_tr:hover]:bg-muted/30",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary/80",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
