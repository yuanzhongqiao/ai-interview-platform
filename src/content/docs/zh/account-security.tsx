import { DocImage } from "@/components/docs/doc-image";

export function accountAndSecurityContentZh() {
  return (
    <>
      <h2>个人资料设置</h2>
      <p>从账户菜单进入资料设置，可更新：</p>
      <ul>
        <li><strong>显示名称</strong> — 在工作台与共享面试中展示</li>
        <li><strong>邮箱</strong> — 用于登录与通知</li>
        <li><strong>头像</strong> — 上传 JPEG 或 PNG 头像</li>
        <li><strong>偏好</strong> — 通知、语言与时区</li>
      </ul>

      <DocImage src="/images/docs/account-settings.webp" alt="账户设置页：邮箱、显示名称、密码与删除账户" />

      <hr />

      <h2>密码管理</h2>
      <p>
        进入账户设置，点击「修改密码」，然后两次输入新密码。请使用包含字母、数字与符号的强密码。
      </p>

      <hr />

      <h2>数据隐私与安全</h2>
      <ul>
        <li><strong>存储</strong> — 数据存储在 Supabase，并通过行级安全（RLS）确保用户只能访问授权数据</li>
        <li><strong>加密</strong> — 传输中（TLS）与静态数据均加密，密码经哈希处理</li>
        <li><strong>访问控制</strong> — 数据库访问受限并接受审计</li>
      </ul>
      <p>
        了解更多：<a href="/privacy">隐私政策</a> · <a href="/security">安全</a> · <a href="/cookies">Cookie 政策</a>
      </p>
    </>
  );
}
