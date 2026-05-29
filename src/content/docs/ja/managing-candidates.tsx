import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function candidatesLinksAndTrackingContentJa() {
  return (
    <>
      <h2>候補者の追加</h2>
      <p>
        面接を開き、<strong>セッション</strong> タブで <strong>+ 追加</strong> をクリックします。ドロップダウンに 3 つの方法があります：
      </p>

      <DocImage src="/images/docs/sessions-add-dropdown.webp" alt="セッションタブ：追加メニュー（個別、Excel、履歴書）" />

      <DocSteps>
        <DocStep step={1} title="個別に作成">
          <p>氏名、メール、電話、学校、職歴などの任意情報を入力。履歴書をアップロードして自動入力も可能です。</p>
          <DocImage src="/images/docs/create-individually.webp" alt="個別作成ダイアログ" />
        </DocStep>
        <DocStep step={2} title="Excel インポート">
          <p>テンプレートをダウンロードし、セッション情報を記入してアップロード。各行に氏名が必要です。</p>
          <DocImage src="/images/docs/import-excel.webp" alt="Excel インポートダイアログ" />
        </DocStep>
        <DocStep step={3} title="履歴書インポート">
          <p>PDF 履歴書をアップロードすると、設定した LLM プロバイダーが候補者情報を抽出します。</p>
          <DocImage src="/images/docs/import-resumes.webp" alt="履歴書インポートダイアログ" />
        </DocStep>
      </DocSteps>

      <hr />

      <h2>リンクの種類</h2>
      <DocFeatureGrid>
        <DocFeature title="公開リンク">
          URL を知っている人が誰でもセッションを開始できます。求人広告や広範な配布向け。<strong>設定</strong> タブの <strong>共有可能リンク</strong> で有効化。
        </DocFeature>
        <DocFeature title="招待のみ">
          各候補者にメールに紐づく専用リンク。参加者を厳密に管理。セッションタブで各候補者のリンクをコピー。
        </DocFeature>
      </DocFeatureGrid>

      <hr />

      <h2>セッションステータス</h2>
      <ul>
        <li><strong>未開始</strong> — 候補者がまだリンクを開いていない</li>
        <li><strong>進行中</strong> — 面接実施中</li>
        <li><strong>完了</strong> — セッション終了、AI 分析を閲覧可能</li>
      </ul>
      <p>セッションタブでステータスでフィルターし、進行中または完了に絞り込めます。</p>

      <h2>再開と再受験</h2>
      <p>
        候補者が途中で離れた場合、同じリンクから再開できます。新しいセッションが必要な場合（技術的問題など）は <strong>再受験</strong> を使用。元のセッションは比較用に保持されます。
      </p>

      <DocCallout variant="info">
        再受験ごとに独立したセッションが作成され、それぞれ独自の文字起こしとスコアを持ちます。
      </DocCallout>
    </>
  );
}
