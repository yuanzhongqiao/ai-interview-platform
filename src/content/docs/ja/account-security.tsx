import { DocImage } from "@/components/docs/doc-image";

export function accountAndSecurityContentJa() {
  return (
    <>
      <h2>プロフィール設定</h2>
      <p>アカウントメニューからプロフィール設定にアクセスし、次を更新できます：</p>
      <ul>
        <li><strong>表示名</strong> — ダッシュボードと共有面接に表示</li>
        <li><strong>メール</strong> — ログインと通知に使用</li>
        <li><strong>アバター</strong> — JPEG または PNG をアップロード</li>
        <li><strong>設定</strong> — 通知、言語、タイムゾーン</li>
      </ul>

      <DocImage src="/images/docs/account-settings.webp" alt="アカウント設定：メール、表示名、パスワード、削除" />

      <hr />

      <h2>パスワード管理</h2>
      <p>
        アカウント設定で「パスワードを変更」をクリックし、新しいパスワードを 2 回入力してください。文字・数字・記号を含む強力なパスワードを使用してください。
      </p>

      <hr />

      <h2>データプライバシーとセキュリティ</h2>
      <ul>
        <li><strong>保存</strong> — Supabase に保存。RLS により認可データのみアクセス可能</li>
        <li><strong>暗号化</strong> — 転送中（TLS）と保存時の暗号化、パスワードはハッシュ化</li>
        <li><strong>アクセス制御</strong> — データベースアクセスは制限され監査されます</li>
      </ul>
      <p>
        詳細：<a href="/privacy">プライバシーポリシー</a> · <a href="/security">セキュリティ</a> · <a href="/cookies">Cookie ポリシー</a>
      </p>
    </>
  );
}
