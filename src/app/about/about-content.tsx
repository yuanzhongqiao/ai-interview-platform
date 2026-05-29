"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AuralLogo } from "@/components/ui/aural-logo";
import { Button } from "@/components/ui/button";
import { OPEN_SOURCE_COMMUNITY_URL } from "@/lib/brand";
import Link from "next/link";

export function AboutContent() {
  const { t } = useAppLocale();

  const features = [
    { title: t("about.feature1Title"), desc: t("about.feature1Desc") },
    { title: t("about.feature2Title"), desc: t("about.feature2Desc") },
    { title: t("about.feature3Title"), desc: t("about.feature3Desc") },
    { title: t("about.feature4Title"), desc: t("about.feature4Desc") },
  ];

  const tech = [
    "Next.js 14",
    "TypeScript",
    "Supabase",
    "tRPC",
    "Tailwind CSS",
    "OpenAI / Gemini",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <AuralLogo size={32} />
            <span className="font-heading font-bold tracking-wide">
              {t("brand.name")}
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            <LanguageSwitcher compact />
            <Link href="/ai-chat" className="hover:text-primary">
              {t("sidebar.aiChat")}
            </Link>
            <Link href="/login" className="hover:text-primary">
              {t("auth.signIn")}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16">
        <section className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            {t("about.eyebrow")}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            {t("brand.fullName")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("brand.taglineLong")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/register">{t("about.getStarted")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={OPEN_SOURCE_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("about.joinCommunity")}
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-20 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur transition hover:border-primary/40 hover:shadow-md"
            >
              <h2 className="font-heading text-lg font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-20">
          <h2 className="text-center font-heading text-2xl font-semibold">
            {t("about.techStack")}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {tech.map((item) => (
              <span
                key={item}
                className="rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl border bg-primary/5 p-8 text-center">
          <h2 className="font-heading text-xl font-semibold">
            {t("about.workflowTitle")}
          </h2>
          <ol className="mx-auto mt-6 grid max-w-lg gap-4 text-left text-sm text-muted-foreground sm:grid-cols-3 sm:text-center">
            <li>
              <span className="font-semibold text-foreground">
                {t("about.workflow1Title")}
              </span>
              <br />
              {t("about.workflow1Desc")}
            </li>
            <li>
              <span className="font-semibold text-foreground">
                {t("about.workflow2Title")}
              </span>
              <br />
              {t("about.workflow2Desc")}
            </li>
            <li>
              <span className="font-semibold text-foreground">
                {t("about.workflow3Title")}
              </span>
              <br />
              {t("about.workflow3Desc")}
            </li>
          </ol>
        </section>

        <section className="mt-16 text-center">
          <p className="text-muted-foreground">{t("about.communityLead")}</p>
          <Button asChild className="mt-4" variant="secondary">
            <a
              href={OPEN_SOURCE_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.gitccLink")} →
            </a>
          </Button>
        </section>
      </main>
    </div>
  );
}
