import { DocImage } from "@/components/docs/doc-image";
import type { DocArticle } from "./types";
import { accountAndSecurityContentJa } from "./ja/account-security";
import { accountAndSecurityContentZh } from "./zh/account-security";

export const accountSecurityArticles: DocArticle[] = [
  {
    slug: "account-and-security",
    categorySlug: "account-security",
    title: "Account and Security",
    titleZh: "账户与安全",
    description: "Profile settings, password management, and data privacy",
    descriptionZh: "个人资料、密码管理与数据隐私",
    titleJa: "アカウントとセキュリティ",
    descriptionJa: "プロフィール、パスワード、データプライバシーの管理",
    audience: "both",
    order: 1,
    content: () => (
      <>
        <h2>Profile Settings</h2>
        <p>Access profile settings from the account menu to update:</p>
        <ul>
          <li><strong>Display name</strong> — shown in the dashboard and on shared interviews</li>
          <li><strong>Email</strong> — used for login and notifications</li>
          <li><strong>Avatar</strong> — upload a JPEG or PNG profile picture</li>
          <li><strong>Preferences</strong> — notification settings, language, and timezone</li>
        </ul>

        <DocImage src="/images/docs/account-settings.webp" alt="Account Settings page showing email, display name, password, and delete account sections" />

        <hr />

        <h2>Password Management</h2>
        <p>
          Go to account settings, click &quot;Change Password&quot;, then enter your new password twice. Use a strong password with a mix of letters, numbers, and symbols.
        </p>

        <hr />

        <h2>Data Privacy and Security</h2>
        <ul>
          <li><strong>Storage</strong> — data is stored in Supabase with Row Level Security (RLS), ensuring users can only access their authorized data</li>
          <li><strong>Encryption</strong> — all data is encrypted in transit (TLS) and at rest. Passwords are hashed.</li>
          <li><strong>Access control</strong> — database access is restricted and audited</li>
        </ul>
        <p>
          Learn more: <a href="/privacy">Privacy Policy</a> · <a href="/security">Security</a> · <a href="/cookies">Cookie Policy</a>
        </p>
      </>
    ),
    contentZh: accountAndSecurityContentZh,
    contentJa: accountAndSecurityContentJa,
  },
];
