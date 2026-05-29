import { DocCallout } from "@/components/docs/doc-callout";
import { DocImage } from "@/components/docs/doc-image";

export function resultsAnalysisAndExportContentJa() {
  return (
    <>
      <h2>結果概要</h2>
      <p>
        結果ページには面接のすべてのセッションが表示され、ステータスバッジ、スコア、メッセージ数、時間が含まれます。ステータスや日付範囲でフィルターし、参加者名で検索できます。
      </p>

      <DocImage src="/images/docs/interview-results.webp" alt="結果ページ：完了セッションとスコア" />

      <h3>セッションレポート</h3>
      <p>
        任意のセッション行をクリックすると、候補者情報、平均スコア、要約、問題ごとの詳細評価を含む完全なレポートが開きます。
      </p>

      <DocImage src="/images/docs/session-report.webp" alt="セッションレポート：候補者情報と AI 要約" />

      <hr />

      <h2>AI 分析</h2>
      <p>候補者がセッションを完了すると、Lingwu は自動的に次を生成します：</p>
      <ul>
        <li><strong>セッション要約</strong> — パフォーマンス、コミュニケーションスタイル、主要テーマの概要</li>
        <li><strong>問題ごとの評価</strong> — 品質、関連性、深さで各回答を評価（10 点満点）</li>
        <li><strong>ハイライト</strong> — 最も際立った回答部分</li>
        <li><strong>改善の余地</strong> — フォローアップが必要なギャップや弱点</li>
      </ul>

      <DocImage src="/images/docs/question-evaluation.webp" alt="問題ごとの評価：スコアと改善提案" />

      <h3>次元スコア</h3>
      <p>
        単一問題のスコアに加え、ドメイン専門性、コミュニケーションの明確さ、戦略的思考など複数次元で評価スコアを生成します。
      </p>

      <DocImage src="/images/docs/assessment-scores.webp" alt="次元スコア：専門性、戦略、コミュニケーションなど" />

      <DocCallout variant="tip" title="ヒント">
        まずセッション要約を読み、候補者を素早く絞り込み、その後完全な文字起こしを深掘りしましょう。
      </DocCallout>

      <h3>リサーチ所見</h3>
      <p>
        リサーチ型問題を含む面接では、構造化された所見も抽出します：<strong>テーマ</strong>（トピック、ペイン、嗜好）と <strong>データポイント</strong>（具体的な事実、数値、発言）。テーマはセッション横断のパターン発見に、データポイントはレポートの引用根拠になります。
      </p>

      <DocImage src="/images/docs/research-findings.webp" alt="リサーチ所見：テーマとデータポイント" />

      <DocCallout variant="info">
        リサーチ所見はリサーチ型問題を含むセッションでのみ生成されます。標準の自由記述問題では評価とスコアが生成されます。
      </DocCallout>

      <h3>トーンとコミュニケーション</h3>
      <p>
        Lingwu は各回答のコミュニケーションスタイルを分析し、自信度、トーンの一貫性、明確さを検出します。問題ごとにトーン（自信、中立など）と影響（高、低）が付与されます。
      </p>

      <DocImage src="/images/docs/tone-communication.webp" alt="トーン分析：問題ごとの自信度" />

      <hr />

      <h2>エクスポート</h2>
      <p>
        セッション結果を <strong>XLSX</strong>（Excel / Google スプレッドシート向け）または <strong>PDF</strong>（整形レポート）でエクスポートできます。結果ページと個別レポートページの両方にエクスポートボタンがあります。
      </p>
      <p>エクスポート内容：</p>
      <ul>
        <li>セッションメタデータ（候補者、面接、日付）</li>
        <li>タイムスタンプ付き完全な文字起こし</li>
        <li>問題ごとの評価とスコア</li>
        <li>AI 要約とハイライト</li>
        <li>リサーチ所見（該当する場合）</li>
      </ul>
    </>
  );
}
