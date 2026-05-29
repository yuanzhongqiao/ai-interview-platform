"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import { AuralLogo } from "@/components/ui/aural-logo";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useAppLocale();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: t("auth.errorTitle"),
          description: t("auth.invalidEmailOrPassword"),
          variant: "destructive",
        });
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 bg-background/95 shadow-xl backdrop-blur-sm lg:border lg:shadow-2xl">
      <CardHeader className="text-center">
        <AuralLogo size={64} className="mx-auto mb-2" />
        <CardTitle className="font-heading text-2xl">
          {t("auth.welcomeBack")}
        </CardTitle>
        <CardDescription>{t("auth.signInSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="w-full transition-transform hover:scale-[1.01]" type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("auth.signIn")}
          </Button>
        </form>
        <div
          className="mt-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-center text-xs text-muted-foreground"
          role="note"
        >
          <p className="font-medium text-foreground">{t("auth.demoHintTitle")}</p>
          <p className="mt-1 font-mono">
            {t("auth.demoEmail")} / {t("auth.demoPassword")}
          </p>
          <p className="mt-1">{t("auth.demoNote")}</p>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <Link href="/register" className="text-primary hover:underline">
            {t("auth.signUp")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
