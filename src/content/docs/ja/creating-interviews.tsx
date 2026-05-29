import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function creatingAnInterviewContentJa() {
  return (
    <>
      <h2>AI ジェネレーター</h2>
      <p>
        自然言語で評価したい内容（役割、スキル、時間、制約）を記述すると、AI が問題、形式、評価基準を含む完全な面接を生成します。
      </p>

      <DocImage src="/images/docs/interview-new-ai.webp" alt="AI ジェネレータータブ" />

      <h3>良いプロンプトの書き方</h3>
      <p>次を含めることを推奨します：</p>
      <ul>
        <li><strong>役割と背景</strong> — 誰向けの面接か？</li>
        <li><strong>評価するスキル</strong> — どのトピックをカバーするか？</li>
        <li><strong>時間と範囲</strong> — どのくらいの時間？何問？</li>
        <li><strong>形式の希望</strong> — コーディング、ホワイトボードなどが必要か？</li>
      </ul>
      <blockquote>
        例：「API 設計、DB 最適化、エラーハンドリングをカバーする 20 分のバックエンドエンジニア技術面接。コーディング問題を 1 問含める。」
      </blockquote>
      <p>
        生成後も自然言語で改善できます。難易度の調整、形式の変更、焦点のシフトなど。各ラウンドは前のバージョンを基に反復します。
      </p>

      <hr />

      <h2>手動作成</h2>
      <p>
        完全にコントロールしたい場合は <strong>手動</strong> タブに切り替え。タイトル、説明、目標、想定時間を設定し、コミュニケーションチャネルを選択します。
      </p>

      <DocImage src="/images/docs/interview-new-manual.webp" alt="手動作成タブ" />

      <DocFeatureGrid>
        <DocFeature title="音声">
          AI 面接官とのリアルタイム音声対音声会話。
        </DocFeature>
        <DocFeature title="チャット">
          テキスト Q&A。候補者がタイプして回答。
        </DocFeature>
        <DocFeature title="動画">
          音声インタラクションと同時にカメラと画面を録画。
        </DocFeature>
      </DocFeatureGrid>

      <p>
        面接作成後、エディタで問題を追加するか、ライブラリからインポートできます。
      </p>

      <DocImage src="/images/docs/interview-edit-content.webp" alt="問題エディタ" />
    </>
  );
}

export function interviewSettingsContentJa() {
  return (
    <>
      <p>
        <strong>設定</strong> タブで面接のアクセス方法、AI の挙動、有効なコミュニケーションチャネルを構成します。
      </p>

      <DocImage src="/images/docs/interview-edit-settings.webp" alt="設定タブ" />

      <h2>共有可能リンク</h2>
      <p>
        デフォルトでは面接は <strong>招待のみ</strong> モードです。「セッション」タブで追加した候補者のみが専用招待リンクでアクセスできます。
      </p>
      <p>
        公開アクセスが必要な場合は <strong>共有可能リンクを作成</strong>。公開 URL が生成され、誰でもセッションを開始できます。リンクをコピーして共有するか、リンクを取り消して招待のみに戻せます。
      </p>

      <hr />

      <h2>一般</h2>
      <ul>
        <li><strong>タイトル</strong> — 候補者とダッシュボードに表示される面接名</li>
        <li><strong>説明</strong> — チーム内で面接の目的を理解するためのメモ</li>
        <li><strong>目標</strong> — 候補者から知りたい内容（AI が会話を導く）</li>
        <li><strong>時間</strong> — 制限時間（分）。空欄は無制限。</li>
      </ul>

      <h3>コミュニケーションチャネル</h3>
      <p>候補者と AI の対話方法を選択。チャットと音声の少なくとも一方を有効にする必要があります。</p>
      <DocFeatureGrid>
        <DocFeature title="チャット">テキストメッセージ。候補者がタイプして回答。</DocFeature>
        <DocFeature title="音声">リアルタイム音声会話。動画を有効にするには先に音声が必要。</DocFeature>
        <DocFeature title="動画">音声に加えカメラと画面を録画。音声が有効である必要あり。</DocFeature>
      </DocFeatureGrid>

      <hr />

      <h2>AI 設定</h2>
      <ul>
        <li><strong>AI 名</strong> — AI 面接官が自己紹介する際の名前</li>
      </ul>

      <h3>トーン</h3>
      <DocFeatureGrid>
        <DocFeature title="カジュアル">リラックスした会話調。ユーザーリサーチや非公式セッション向け。</DocFeature>
        <DocFeature title="プロフェッショナル">バランスの取れたビジネス調。多くの面接の推奨デフォルト。</DocFeature>
        <DocFeature title="フォーマル">構造化され抑制的。エグゼクティブやコンプライアンス面接向け。</DocFeature>
        <DocFeature title="フレンドリー">温かく励ます。練習やオンボーディング向け。</DocFeature>
      </DocFeatureGrid>

      <h3>フォローアップの深さ</h3>
      <ul>
        <li><strong>浅い</strong> — フォローアップなし。短く焦点を絞ったセッション</li>
        <li><strong>中程度</strong> — 問題ごとに 1–2 回のフォローアップ。一般的なデフォルト</li>
        <li><strong>深い</strong> — 問題ごとに 3–5 回。各トピックを十分に展開</li>
      </ul>

      <h3>言語</h3>
      <p>
        AI は選択した言語でセッションを実施し回答を評価します。現在対応：<strong>English</strong>、<strong>中文</strong>、<strong>日本語</strong>、スペイン語、フランス語など。
      </p>
    </>
  );
}

export function antiCheatingContentJa() {
  return (
    <>
      <p>
        不正防止モードは面接に誠実性監視レイヤーを追加します。有効にすると、デバイス権限の強制、タブ切り替え追跡、外部ペーストのブロック、複数モニター環境の検出が行われます。
      </p>

      <hr />

      <h2>不正防止の有効化</h2>
      <p>
        任意の面接の <strong>設定</strong> タブで <strong>不正防止モード</strong> までスクロールし、<strong>不正防止を有効化</strong> をオンにします。
      </p>

      <DocImage
        src="/images/docs/anti-cheating-setting.webp"
        alt="不正防止設定"
      />

      <h3>強制項目</h3>
      <p>有効にすると、この面接で作成される各セッションで次が強制されます：</p>
      <ul>
        <li><strong>カメラ・マイク・画面共有の強制</strong> — 候補者はデバイス許可をスキップできません</li>
        <li><strong>タブ切り替えとフォーカス追跡</strong> — 面接タブを離れるたびに記録・タイムスタンプ</li>
        <li><strong>外部ペーストのブロック</strong> — 面接ページ外からの貼り付けを禁止</li>
        <li><strong>複数モニター検出</strong> — 複数画面検出時に候補者に警告</li>
      </ul>

      <DocCallout variant="info">
        セッション開始前に候補者へこれらの制限が説明され、不意の事態を防ぎます。
      </DocCallout>

      <hr />

      <h2>候補者に表示される内容</h2>
      <p>
        不正防止がオンで候補者が面接タブを離れると、戻った際に <strong>ページ離脱を検出</strong> ダイアログが表示されます。
      </p>

      <DocImage
        src="/images/docs/anti-cheating-violation.webp"
        alt="ページ離脱ダイアログ"
      />

      <DocSteps>
        <DocStep step={1} title="初回離脱">
          <p>候補者がページを離れたことを穏やかに通知し、離脱回数を記録します。</p>
        </DocStep>
        <DocStep step={2} title="複数回離脱">
          <p>その後の離脱ごとにカウントが増加。すべての離脱が記録されレビューされる可能性があると通知。</p>
        </DocStep>
        <DocStep step={3} title="上限到達">
          <p>制限に達すると警告：さらなる離脱はレビュー用にフラグされます。候補者は続行できますが、セッションレポートに強調表示されます。</p>
        </DocStep>
      </DocSteps>

      <hr />

      <h2>違反記録のレビュー</h2>
      <p>
        セッション終了後、記録された離脱とフラグイベントはセッションレポートに表示されます。レビュアーは離脱回数、閾値超過、全体評価への組み込みを確認できます。
      </p>

      <DocImage
        src="/images/docs/integrity-log.webp"
        alt="誠実性ログ"
        bordered={false}
      />

      <DocCallout variant="tip" title="ヒント">
        高リスク評価で誠実性が重要な場合に不正防止を有効化。カジュアルな練習やユーザーリサーチではオフにして候補者の負担を減らせます。
      </DocCallout>
    </>
  );
}

export function questionsAndLibraryContentJa() {
  return (
    <>
      <h2>問題形式</h2>
      <p>
        各形式は候補者に異なるインターフェースを表示します。同じ面接で複数の能力を評価するため混在可能です。
      </p>

      <h3>自由記述</h3>
      <p>
        自由な音声またはテキスト回答。行動面接、コミュニケーション評価、唯一の正解がないニュアンスのあるトピックに適しています。
      </p>

      <h3>単一選択と複数選択</h3>
      <p>
        選択肢を提示。単一選択は 1 つのみ、複数選択は該当するすべてを選択。いずれも AI は理由の説明を求めます。
      </p>

      <h3>コーディング</h3>
      <p>
        Monaco ベースのコードエディタ（VS Code と同系）が面接 UI に表示されます。言語を選択し、解答を書いて <strong>実行</strong>。AI はコードをリアルタイムで観察し、思路について追及できます。
      </p>
      <DocImage src="/images/docs/interview-coding.webp" alt="コーディング問題" />

      <h3>ホワイトボード</h3>
      <p>
        Excalidraw ベースのキャンバスでフローチャート、アーキテクチャ図、視覚的説明。AI はホワイトボードを視覚的にリアルタイム観察し、設計について状況に応じた追及を行います。
      </p>
      <DocImage src="/images/docs/interview-whiteboard.webp" alt="ホワイトボード問題" />

      <h3>リサーチ型</h3>
      <p>
        自由記述に似ていますが、AI は「なぜ」「どのように」「もっと詳しく」で深掘りします。ユーザーリサーチ面接向け。リサーチ型問題を含むセッションは標準評価に加え構造化された <strong>リサーチ所見</strong>（テーマとデータポイント）を生成します。
      </p>
      <DocImage src="/images/docs/research-findings.webp" alt="リサーチ所見" />

      <DocCallout variant="info">
        コーディングとホワイトボードでは、AI が候補者の作業をリアルタイムで観察し、思路について状況に応じた追及を行います。
      </DocCallout>

      <hr />

      <h2>問題ライブラリ</h2>
      <p>
        問題ライブラリは再利用可能な問題の中央リポジトリです。一度保存すれば任意の面接に追加でき、毎回作り直す必要はありません。
      </p>

      <DocImage src="/images/docs/question-library.webp" alt="問題ライブラリ" />

      <h3>保存と再利用</h3>
      <p>
        面接編集時に任意の問題をライブラリに保存できます。新規面接作成時にタイトル、説明、形式で検索し、ワンクリックで追加。同じ問題を複数面接で使用可能。
      </p>

      <DocCallout variant="tip" title="ヒント">
        ライブラリ問題を編集する際、その問題を使用するすべての面接を更新するか、現在の面接のみの独立コピーを作成するかを選択できます。
      </DocCallout>
    </>
  );
}
