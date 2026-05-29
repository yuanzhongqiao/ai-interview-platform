import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocLink } from "@/components/docs/doc-link";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function whatIsLingwuContentJa() {
  return (
    <>
      <h2>製品概要</h2>
      <p>
        Lingwu は AI 駆動の面接プラットフォームで、構造化面接を自律的に実施します。面接を設計しリンクを共有すると、Lingwu の AI が会話全体を担当し、質問・インテリジェントなフォローアップを行い、セッション終了後に詳細な分析を生成します。
      </p>

      <h3>主な機能</h3>
      <DocFeatureGrid>
        <DocFeature title="AI 面接官">
          AI エージェントがリアルタイムで面接を進行し、質問・回答の傾聴、候補者の発言に基づくインテリジェントなフォローアップを行います。
        </DocFeature>
        <DocFeature title="複数チャネル">
          音声（音声対音声）、テキストチャット、動画に対応。候補者はセッション中に音声とチャットを切り替えることもできます。
        </DocFeature>
        <DocFeature title="豊富な問題形式">
          自由記述に加え、単一/複数選択、ライブコーディング（Monaco エディタ）、ホワイトボード（Excalidraw）、リサーチ型の深い追及に対応。
        </DocFeature>
        <DocFeature title="自動分析">
          完了した各セッションで AI 要約、問題ごとのスコア、ハイライト、改善点を生成。手動での逐条レビューは不要です。
        </DocFeature>
        <DocFeature title="AI 面接ジェネレーター">
          自然言語で目標を記述すると、問題・評価基準・推奨設定を含む完全な面接を生成します。
        </DocFeature>
        <DocFeature title="チームコラボレーション">
          組織内で面接と結果を共有。複数メンバーが面接作成、セッションレビュー、レポートエクスポートが可能です。
        </DocFeature>
      </DocFeatureGrid>

      <h3>一般的なユースケース</h3>
      <ul>
        <li><strong>技術採用</strong> — 組み込みエディタとホワイトボードによるコーディング・システム設計面接</li>
        <li><strong>ユーザーリサーチ</strong> — より深いインサイトを引き出す AI フォローアップ</li>
        <li><strong>行動面接</strong> — 自然な音声会話で大量の候補者にスケール</li>
        <li><strong>面接練習</strong> — 本番前に AI フィードバックでリハーサル</li>
      </ul>

      <h3>ワークフロー</h3>
      <ol>
        <li><strong>設計</strong> — AI ジェネレーターで作成、または手動で構築</li>
        <li><strong>共有</strong> — 候補者にリンクを送るか公開</li>
        <li><strong>面接</strong> — AI がセッションを自律的に進行</li>
        <li><strong>レビュー</strong> — AI 分析、スコア、文字起こしを確認</li>
      </ol>
    </>
  );
}

export function accountAndDashboardContentJa() {
  return (
    <>
      <h2>アカウント登録</h2>
      <p>
        <DocLink href="/register">/register</DocLink> にアクセスし、氏名、メール、パスワードを入力して登録します。
      </p>

      <DocImage src="/images/docs/register.webp" alt="登録ページ：氏名、メール、パスワード欄" />

      <DocSteps>
        <DocStep step={1} title="組織の作成または参加">
          <p>組織はプロジェクトとチームメンバーをまとめます。新規作成するか、招待リンクで既存組織に参加できます。</p>
        </DocStep>
        <DocStep step={2} title="最初のプロジェクトを作成">
          <p>プロジェクトには面接、セッション、問題ライブラリが含まれます。</p>
        </DocStep>
      </DocSteps>

      <hr />

      <h2>ダッシュボード</h2>
      <p>
        ダッシュボードはホーム画面で、アクティビティ指標、最近のセッション、ショートカットを表示します。
      </p>

      <DocImage src="/images/docs/dashboard.webp" alt="ダッシュボード：サイドバー、統計カード、アクティビティチャート" />

      <h3>サイドバーナビゲーション</h3>
      <ul>
        <li><strong>ダッシュボード</strong> — アクティビティ概要、最近のセッション、ショートカット</li>
        <li><strong>面接</strong> — 面接テンプレートの作成と管理</li>
        <li><strong>セッション</strong> — 各面接セッションの表示と追跡</li>
        <li><strong>問題</strong> — 問題ライブラリの閲覧と再利用</li>
      </ul>

      <h3>組織レベルのページ</h3>
      <p>サイドバーから次のページにアクセスできます：</p>
      <ul>
        <li><strong>プロジェクト設定</strong> — プロジェクトのデフォルトとワークスペース設定</li>
        <li><strong>サポート</strong> — ヘルプリソースとトラブルシューティング</li>
      </ul>

      <h3>プロジェクトの切り替え</h3>
      <p>
        サイドバー上部のプロジェクトセレクターで切り替えます。各プロジェクトは独立した面接、セッション、設定を持ちます。
      </p>
    </>
  );
}

export function quickStartFirstAiInterviewContentJa() {
  return (
    <>
      <h2>最初の面接を作成</h2>
      <p>
        このウォークスルーでは、数分で共有可能な AI 面接をゼロから作成する手順を説明します。
      </p>

      <DocSteps>
        <DocStep step={1} title="「面接を作成」をクリック">
          <p><strong>面接</strong> ページで、右上の <strong>+ 面接を作成</strong> をクリックします。</p>
          <DocImage src="/images/docs/interviews-list.webp" alt="面接一覧：「面接を作成」ボタンをハイライト" />
        </DocStep>

        <DocStep step={2} title="目標を記述">
          <p>
            <strong>AI ジェネレーター</strong> タブで評価したい内容を記述します。例：「React、TypeScript、システム設計をカバーする 30 分のフロントエンド技術面接。」
          </p>
          <DocImage src="/images/docs/interview-new-ai.webp" alt="AI ジェネレーター：目標記述と設定オプション" />
        </DocStep>

        <DocStep step={3} title="問題を確認・編集">
          <p>AI が説明に基づいて問題を生成します。<strong>コンテンツ</strong> タブで確認、編集、並べ替え、追加ができます。</p>
          <DocImage src="/images/docs/interview-edit-content.webp" alt="問題エディタ：生成された問題と形式タグ" />
        </DocStep>

        <DocStep step={4} title="設定を構成">
          <p><strong>設定</strong> タブで AI のトーン、フォローアップの深さ、言語、コミュニケーションチャネルを設定します。</p>
          <DocImage src="/images/docs/interview-edit-settings.webp" alt="設定タブ：AI 設定、言語、チャネル" />
        </DocStep>

        <DocStep step={5} title="候補者を追加して共有">
          <p><strong>セッション</strong> タブで氏名とメールを追加し、招待リンクをコピーして共有します。</p>
          <DocImage src="/images/docs/interview-edit-sessions.webp" alt="セッションタブ：候補者一覧と招待リンク" />
        </DocStep>
      </DocSteps>

      <DocCallout variant="tip" title="ヒント">
        説明が具体的であるほど効果的です。役割、スキル、時間、問題数を明記しましょう。
      </DocCallout>
    </>
  );
}
