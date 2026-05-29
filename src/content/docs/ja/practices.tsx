import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocLink } from "@/components/docs/doc-link";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function practicesOverviewContentJa() {
  return (
    <>
      <h2>練習でできること</h2>
      <p>
        練習では、実際の候補者セッションを作成せずに、既存面接の問題をリハーサルできます。各練習は集中型のコーチング体験を開きます：AI が質問し、回答を聞き、各提出にスコアを付け、次の問題に進む前に具体的なフィードバックを提供します。
      </p>

      <DocImage
        src="/images/docs/practices-session.webp"
        alt="練習セッション：AI コーチフィードバックと模範回答"
      />

      <DocFeatureGrid>
        <DocFeature title="面接と同じ問題">
          チームが作成した同じ面接問題を使用。実際の役割、評価基準、問題順序でリハーサルできます。
        </DocFeature>
        <DocFeature title="音声優先コーチング">
          集中練習はデフォルトで音声モード。回答を録音し、文字起こしを生成し、回答品質と表現シグナルを評価します。
        </DocFeature>
        <DocFeature title="回答ごとのフィードバック">
          各提出でスコア、結論、強み、改善点、欠けているシグナル、次のコーチング提案を取得。
        </DocFeature>
        <DocFeature title="模範回答">
          練習コンテキストが設定されている場合、サイドバーで役割に合った構造化された模範回答を生成できます。
        </DocFeature>
      </DocFeatureGrid>

      <h2>練習の場所</h2>
      <ul>
        <li>
          <strong>グローバル練習ページ</strong> — <DocLink href="/practices">/practices</DocLink> で現在プロジェクトの各面接の練習記録を表示。
        </li>
        <li>
          <strong>面接の練習タブ</strong> — 面接を開き <strong>練習</strong> タブでコンテキスト管理と当該面接の記録を表示。
        </li>
        <li>
          <strong>集中練習モード</strong> — <strong>面接を練習</strong> をクリックして新しいタブで独立した練習セッションを開く。
        </li>
      </ul>

      <DocCallout variant="info" title="練習は候補者セッションではありません">
        練習セッションは実際の面接セッションとは別に保存され、セッション時間を消費せず、候補者結果にも表示されず、完了した候補者面接の代替にはなりません。
      </DocCallout>

      <h2>保存される内容</h2>
      <p>
        Lingwu は練習セッションと回答記録を保存し、長期的な進歩を追跡できます。面接、練習モード、ステータス、開始・完了時刻、合計時間、提出回答、問題ごとのフィードバック、試行回数、平均・最高スコアなどが含まれます。
      </p>
    </>
  );
}

export function settingUpPracticeContextContentJa() {
  return (
    <>
      <h2>コンテキストが重要な理由</h2>
      <p>
        練習コンテキストは AI コーチに背景を提供し、回答が目標シグナルを示しているかを判断します。コンテキストがない場合でも明確さと構造は評価できますが、コンテキストがあると履歴書のどの証拠を引用すべきか、どの役割期待が欠けているか、機会にどう合わせるかを指摘できます。
      </p>

      <DocImage
        src="/images/docs/practices-context.webp"
        alt="練習コンテキスト設定"
      />

      <DocSteps>
        <DocStep step={1} title="面接の練習タブを開く">
          <p>
            面接エディタで <strong>練習</strong> を選択。このタブに履歴とコンテキスト設定があります。
          </p>
        </DocStep>
        <DocStep step={2} title="「コンテキスト」をクリック">
          <p>
            コンテキストドロワーを開き、会社名、職位名、職務記述、履歴書の要点、AI コーチが考慮すべき背景を入力。
          </p>
        </DocStep>
        <DocStep step={3} title="保存してから模範回答を生成">
          <p>
            コンテキストを保存してから模範回答を生成すると、目標役割と候補者の最も強い経験証拠を引用した回答が得られます。
          </p>
        </DocStep>
      </DocSteps>

      <h2>記入推奨内容</h2>
      <ul>
        <li><strong>職務記述</strong> — 責任、必須スキル、レベル、成功基準</li>
        <li><strong>履歴書の要点</strong> — 成果、プロジェクト、指標、ツール、リーダーシップ事例</li>
        <li><strong>会社名と職位名</strong> — トーン、具体性、ビジネスインパクトの調整に十分</li>
      </ul>

      <DocCallout variant="tip" title="コンテキストは簡潔に">
        最も重要な役割と履歴書情報を貼り付け、長いファイル全体は避けてください。良いコンテキストは少ないが明確なシグナル：範囲、指標、制約、ツール、インパクトです。
      </DocCallout>
    </>
  );
}

export function runningAPracticeSessionContentJa() {
  return (
    <>
      <h2>練習を開始</h2>
      <p>
        面接の <strong>練習</strong> タブを開き <strong>面接を練習</strong> をクリック。Lingwu は <code>/practice/[interviewId]</code> で集中練習モードを開き、ログインユーザー向けに新しい練習セッションを作成します。
      </p>

      <DocImage
        src="/images/docs/practices-session.webp"
        alt="集中練習モード"
      />

      <DocSteps>
        <DocStep step={1} title="問題を聞く">
          <p>AI コーチが音声モードで現在の問題を読み上げ、画面上部に固定表示します。</p>
        </DocStep>
        <DocStep step={2} title="音声で回答">
          <p>回答を録音。送信前にエディタで文字起こしを確認できます。</p>
        </DocStep>
        <DocStep step={3} title="提出してフィードバック">
          <p>Lingwu がスコアを付け、コーチフィードバックをストリーミングし、試行を保存し、問題のベストスコアを更新します。</p>
        </DocStep>
        <DocStep step={4} title="再試行または続行">
          <p>フィードバックに基づいて修正、同じ問題を再度練習、またはエディタで次の問題へ。</p>
        </DocStep>
      </DocSteps>

      <h2>フィードバックの理解</h2>
      <p>練習フィードバックは実行可能であることを目的としており、空泛なコメントではありません。</p>
      <ul>
        <li><strong>スコア</strong> — 0–10 の品質シグナル</li>
        <li><strong>結論と要約</strong> — 主要なコーチ解釈</li>
        <li><strong>強み</strong> — うまくいっている点、維持すべき内容</li>
        <li><strong>改善と欠けているシグナル</strong> — 次の試行で補うべき内容</li>
        <li><strong>音声配信</strong> — オーディオがある場合のペース、明確さ、自信、表現の提案</li>
      </ul>

      <h2>模範回答の使い方</h2>
      <p>
        模範回答パネルは問題、形式、職務記述、履歴書コンテキストから構造化回答を生成します。学習補助として使用し、読み上げ台本にはしないでください。構造と証拠パターンを身につけ、自分の言葉で答えることが目標です。
      </p>

      <DocCallout variant="info" title="セルフホストについて">
        練習スコアと模範回答は設定した LLM プロバイダーを使用します。音声練習には設定したリレーと TTS プロバイダーも必要です。オープンソース版は練習セッションを実際の候補者セッションと分離して保存し、商用版の利用量制御は含みません。
      </DocCallout>
    </>
  );
}

export function reviewingPracticeProgressContentJa() {
  return (
    <>
      <h2>練習ダッシュボード</h2>
      <p>
        練習ダッシュボードはプロジェクト全体の保存済み練習記録を表示します。学習者が複数回の試行で進歩しているか、古い練習データを整理するのに適しています。
      </p>

      <DocImage
        src="/images/docs/practices-dashboard.webp"
        alt="練習ダッシュボード"
      />

      <h3>指標</h3>
      <ul>
        <li><strong>練習合計</strong> — 現在の範囲に一致する練習セッション数</li>
        <li><strong>完了</strong> — 終了して保存されたセッション</li>
        <li><strong>平均スコア</strong> — スコア付き練習セッションの平均</li>
        <li><strong>平均時間</strong> — 典型的な練習所要時間</li>
      </ul>

      <h3>テーブル列</h3>
      <p>
        各行に面接タイトル、セッションステータス、平均スコア、提出回数、モード、時間、開始・完了時刻、再練習ショートカットが表示されます。
      </p>

      <h2>フィルターとエクスポート</h2>
      <DocFeatureGrid>
        <DocFeature title="検索">面接タイトルまたはステータスで検索。</DocFeature>
        <DocFeature title="期間">過去 1 日、1 週間、1 か月、3 か月などでフィルター。</DocFeature>
        <DocFeature title="ステータス">完了、進行中、放棄に絞り込み。</DocFeature>
        <DocFeature title="XLSX エクスポート">スコア、回数、時間、タイムスタンプ付きでダウンロード。</DocFeature>
      </DocFeatureGrid>

      <h2>練習セッションの削除</h2>
      <p>
        1 行以上を選択して <strong>削除</strong>。選択した練習セッションと保存された試行が完全に削除されます。実際の面接セッションと候補者結果には影響しません。
      </p>

      <DocCallout variant="tip" title="まず面接ごとに確認">
        最も明確なコーチングループは単一面接の <strong>練習</strong> タブから始めるのがおすすめです。プロジェクト全体の活動を比較する場合はグローバル練習ページを使用してください。
      </DocCallout>
    </>
  );
}
