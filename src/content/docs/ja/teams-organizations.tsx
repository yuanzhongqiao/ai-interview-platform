import { DocCallout } from "@/components/docs/doc-callout";
import { DocImage } from "@/components/docs/doc-image";

export function organizationsMembersAndRolesContentJa() {
  return (
    <>
      <h2>組織</h2>
      <p>
        組織はすべての面接、問題、セッションを保持する最上位アカウントです。登録時に Lingwu は自動的に <strong>個人</strong> 組織を作成します。
      </p>
      <p>
        追加の組織（例：会社ごと）を作成でき、サイドバーのパンくずリストで組織を切り替えられます。
      </p>

      <h3>プロジェクト</h3>
      <p>
        各組織には複数の <strong>プロジェクト</strong> があります。プロジェクトは面接と問題をまとめます（部門、職種群、採用バッチなど）。同じパンくずリストでプロジェクトを切り替えます。
      </p>

      <DocCallout variant="tip" title="例">
        組織「Acme Corp」にプロジェクト「Engineering Q1」と「Product Internships」がある場合。
      </DocCallout>

      <hr />

      <h2>メンバー</h2>
      <p>
        <strong>組織 &gt; 設定 &gt; メンバー</strong> でアクセス権を持つユーザーを確認します。
      </p>
      <DocImage src="/images/docs/org-members.webp" alt="組織メンバー：メンバーテーブルと追加ボタン" />
      <p>
        <strong>+ メンバーを追加</strong> をクリックし、メールとロールを選択します。Lingwu アカウントがない場合は招待が送られます。
      </p>

      <h3>ロール</h3>
      <ul>
        <li><strong>オーナー</strong> — 完全権限（メンバー管理・削除を含む）</li>
        <li><strong>管理者</strong> — 面接、問題、メンバー、設定の管理</li>
        <li><strong>メンバー</strong> — 面接の作成・編集、結果の閲覧、問題の管理</li>
      </ul>
      <p>
        メンバーテーブルでいつでもロールを変更またはメンバーを削除できます。
      </p>

      <DocCallout variant="info">
        組織に無制限のチームメンバーを招待できます。
      </DocCallout>
    </>
  );
}
