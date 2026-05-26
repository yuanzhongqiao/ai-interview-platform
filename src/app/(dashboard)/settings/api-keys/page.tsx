"use client";

import { useAppLocale } from "@/components/app-locale-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import { Ban, Copy, ExternalLink, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function maskApiKey(key: string) {
  const prefix = "dlv_";
  if (!key.startsWith(prefix)) {
    return `${key.slice(0, 8)}...`;
  }
  const secret = key.slice(prefix.length);
  return `${prefix}${secret.slice(0, 8)}...`;
}

function formatDate(value: string | null, locale: string, neverLabel: string) {
  if (!value) return neverLabel;
  return new Date(value).toLocaleString(locale === "zh" ? "zh-CN" : undefined);
}

export default function ApiKeysSettingsPage() {
  const { toast } = useToast();
  const { locale } = useAppLocale();
  const isZh = locale === "zh";
  const utils = trpc.useUtils();

  const [name, setName] = useState("");
  const [expiresLocal, setExpiresLocal] = useState("");
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const listQuery = trpc.apiKey.list.useQuery();

  const createMutation = trpc.apiKey.create.useMutation({
    onSuccess: (data) => {
      setRevealedKey(data.key);
      setName("");
      setExpiresLocal("");
      utils.apiKey.list.invalidate();
      toast({
        title: isZh ? "API 密钥已创建" : "API key created",
      });
    },
    onError: (err) => {
      toast({
        title: isZh ? "错误" : "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const revokeMutation = trpc.apiKey.revoke.useMutation({
    onSuccess: () => {
      utils.apiKey.list.invalidate();
      toast({ title: isZh ? "密钥已撤销" : "API key revoked" });
    },
    onError: (err) => {
      toast({
        title: isZh ? "错误" : "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = trpc.apiKey.delete.useMutation({
    onSuccess: () => {
      utils.apiKey.list.invalidate();
      toast({ title: isZh ? "密钥已删除" : "API key deleted" });
    },
    onError: (err) => {
      toast({
        title: isZh ? "错误" : "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const copyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast({ title: isZh ? "已复制到剪贴板" : "Copied to clipboard" });
    } catch {
      toast({
        title: isZh ? "复制失败" : "Could not copy",
        variant: "destructive",
      });
    }
  };

  const keys = listQuery.data ?? [];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-semibold">{isZh ? "API 密钥" : "API Keys"}</h2>
        <p className="text-sm text-muted-foreground">
          {isZh
            ? "管理用于以编程方式访问 Aural API 的 API 密钥。"
            : "Manage API keys for programmatic access to the Aural API."}
          {" "}
          <Link
            href="/docs/developer-api"
            target="_blank"
            className="inline-flex items-center gap-1 text-primary font-medium underline-offset-4 hover:underline"
          >
            {isZh ? "查看 API 文档" : "View API docs"}
            <ExternalLink className="h-3 w-3" />
          </Link>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isZh ? "创建新密钥" : "Create a new key"}</CardTitle>
          <CardDescription>
            {isZh
              ? "为每个集成使用不同的名称，便于识别。"
              : "Use a distinct name per integration so you can tell them apart."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2 flex-1">
              <Label htmlFor="keyName">{isZh ? "名称" : "Name"}</Label>
              <Input
                id="keyName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isZh ? "例如：生产环境 CI" : "e.g. Production CI"}
              />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="keyExpires">{isZh ? "过期时间（可选）" : "Expires (optional)"}</Label>
              <Input
                id="keyExpires"
                type="datetime-local"
                value={expiresLocal}
                onChange={(e) => setExpiresLocal(e.target.value)}
              />
            </div>
            <Button
              className="shrink-0"
              disabled={createMutation.isPending || !name.trim()}
              onClick={() => {
                const expiresAt =
                  expiresLocal.trim() === ""
                    ? undefined
                    : new Date(expiresLocal).toISOString();
                createMutation.mutate({
                  name: name.trim(),
                  ...(expiresAt ? { expiresAt } : {}),
                });
              }}
            >
              {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isZh ? "创建密钥" : "Create Key"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={revealedKey !== null}
        onOpenChange={(open) => {
          if (!open) setRevealedKey(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isZh ? "保存你的 API 密钥" : "Save your API key"}</DialogTitle>
            <DialogDescription>
              {isZh
                ? "这是你唯一一次查看完整密钥的机会。请立即复制并保存在安全位置；关闭此对话框后将无法再次显示完整密钥。"
                : "This is the only time the full secret is shown. Copy it now and store it somewhere safe — you will not see it in full again after you close this dialog."}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border bg-muted/50 p-3 font-mono text-sm break-all">
            {revealedKey}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => revealedKey && copyKey(revealedKey)}>
              <Copy className="mr-2 h-4 w-4" />
              {isZh ? "复制" : "Copy"}
            </Button>
            <Button type="button" onClick={() => setRevealedKey(null)}>
              {isZh ? "完成" : "Done"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>{isZh ? "你的密钥" : "Your keys"}</CardTitle>
          <CardDescription>
            {isZh ? "撤销的密钥无法用于请求，但仍会显示在列表中直到删除。" : "Revoked keys cannot be used for requests but remain listed until deleted."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {listQuery.isLoading ? (
            <div className="flex justify-center py-12 text-muted-foreground text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : keys.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              <p className="mb-3">
                {isZh
                  ? "还没有 API 密钥。创建一个即可开始通过 API 集成。"
                  : "No API keys yet. Create one to start integrating with the API."}
              </p>
              <Link
                href="/docs/developer-api"
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                {isZh ? "阅读开发者 API 文档" : "Read the Developer API docs"}
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isZh ? "名称" : "Name"}</TableHead>
                  <TableHead>{isZh ? "密钥" : "Key"}</TableHead>
                  <TableHead>{isZh ? "状态" : "Status"}</TableHead>
                  <TableHead>{isZh ? "最后使用" : "Last used"}</TableHead>
                  <TableHead>{isZh ? "创建时间" : "Created"}</TableHead>
                  <TableHead className="w-[1%] text-right">{isZh ? "操作" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {maskApiKey(row.key)}
                    </TableCell>
                    <TableCell>
                      {row.isActive ? (
                        <Badge variant="default">{isZh ? "有效" : "Active"}</Badge>
                      ) : (
                        <Badge variant="secondary">{isZh ? "已撤销" : "Revoked"}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {formatDate(row.lastUsedAt, locale, isZh ? "从未" : "Never")}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {formatDate(row.createdAt, locale, "—")}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title={isZh ? "复制完整密钥" : "Copy full key"}
                          onClick={() => copyKey(row.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {row.isActive && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                title={isZh ? "撤销" : "Revoke"}
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {isZh ? "撤销此 API 密钥？" : "Revoke this API key?"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {isZh
                                    ? "撤销后，使用此密钥的请求将立即失败。你可以稍后再删除记录。"
                                    : "Requests using this key will fail immediately. You can delete the record later."}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{isZh ? "取消" : "Cancel"}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => revokeMutation.mutate({ id: row.id })}
                                  disabled={revokeMutation.isPending}
                                >
                                  {isZh ? "撤销" : "Revoke"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              title={isZh ? "删除" : "Delete"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {isZh ? "删除此 API 密钥？" : "Delete this API key?"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {isZh
                                  ? "此操作无法撤销。任何仍持有该密钥的人都将无法再使用它。"
                                  : "This cannot be undone. Anyone with the secret will no longer be able to use it."}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{isZh ? "取消" : "Cancel"}</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteMutation.mutate({ id: row.id })}
                                disabled={deleteMutation.isPending}
                              >
                                {isZh ? "删除" : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
