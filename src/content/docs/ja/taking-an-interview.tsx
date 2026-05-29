import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function accessingYourInterviewContentJa() {
  return (
    <>
      <h2>開始前</h2>
      <p>
        招待者から面接リンクが届きます。最良の体験のため、デスクトップで <strong>Google Chrome</strong> の使用を推奨します。
      </p>

      <DocCallout variant="warning" title="ブラウザ推奨">
        Safari と Firefox は音声・動画のサポートが限定的な場合があります。Chrome の使用を強く推奨します。
      </DocCallout>

      <h2>面接にアクセス</h2>
      <DocSteps>
        <DocStep step={1} title="リンクを開き情報を入力">
          <p>面接リンクをクリックして Lingwu の面接ページを開きます。ウェルカムページで氏名とメールを入力し、<strong>面接を開始</strong> をクリックします。</p>
          <DocImage src="/images/docs/interviewee-landing.webp" alt="候補者ウェルカムページ" />
        </DocStep>
        <DocStep step={2} title="チェックリストを完了">
          <p>面接設定に応じて、カメラ、マイク、画面キャプチャの許可が必要な場合があります。チェックリストを確認して <strong>開始</strong> をクリックします。</p>
          <DocImage src="/images/docs/interviewee-checklist.webp" alt="面接前チェックリスト" />
        </DocStep>
        <DocStep step={3} title="面接を開始">
          <p><strong>音声面接を開始</strong>（または面接タイプに応じたボタン）をクリック。AI 面接官が自己紹介し、質問を始めます。</p>
          <DocImage src="/images/docs/interview-start.webp" alt="面接開始ページ" />
        </DocStep>
      </DocSteps>

      <DocCallout variant="tip" title="ヒント">
        開始前にマイクを占有する他のアプリ（Zoom、Teams など）を閉じてください。
      </DocCallout>
    </>
  );
}

export function duringYourInterviewContentJa() {
  return (
    <>
      <h2>面接の進め方</h2>
      <p>
        AI 面接官が問題ごとに質問し、回答に応答します。設定に応じて音声、チャット、動画、または組み合わせを使用します。
      </p>

      <DocImage src="/images/docs/interview-session.webp" alt="面接セッション：音声・チャット・動画モード" />

      <h3>音声モード</h3>
      <p>
        自然に話して回答してください。AI はリアルタイムで聞き取り音声で応答します。電話のような会話です。AI の発話が終わってから答えてください。
      </p>
      <ul>
        <li><strong>はっきり話す</strong> — 適度なペースで、文字起こしの精度が向上</li>
        <li><strong>少し間を置く</strong> — AI を遮らないように</li>
        <li><strong>静かな環境</strong> — 背景ノイズを減らす</li>
      </ul>

      <h3>チャットモード</h3>
      <p>
        テキストボックスに回答を入力し <strong>Enter</strong> で送信。騒がしい環境、技術的回答の推敲、タイピング派に適しています。
      </p>

      <DocCallout variant="info">
        音声とチャットはいつでも切り替え可能。口述とタイピングの両方が文字起こしに記録されます。
      </DocCallout>

      <h3>動画モード</h3>
      <p>
        一部の面接ではカメラや画面を録画します。カメラを顔に向け、十分な照明で顔がはっきり見えるようにしてください。
      </p>

      <hr />

      <h2>インタラクティブツール</h2>

      <h3>コードエディタ</h3>
      <p>
        コーディング問題では Monaco ベースのエディタ（VS Code と同系）が表示されます。言語を選択し、解答を書いて <strong>実行</strong> でテスト。AI はコードを見て思路の説明を求めることがあります。
      </p>

      <DocImage src="/images/docs/interview-coding.webp" alt="コーディング問題インターフェース" />

      <DocCallout variant="tip" title="ヒント">
        コーディング中は思考を声に出す（またはチャットで推論を入力）。コードと解题アプローチの両方が評価されます。
      </DocCallout>

      <h3>ホワイトボード</h3>
      <p>
        設計問題では Excalidraw ベースのホワイトボードでフローチャートやアーキテクチャ図を描けます。AI はリアルタイムで視覚的に観察し、設計について追及します。コンポーネントに明確なラベルを付けてください。
      </p>

      <DocImage src="/images/docs/interview-whiteboard.webp" alt="ホワイトボード問題インターフェース" />

      <hr />

      <h2>問題ナビゲーション</h2>
      <p>通常は回答後に AI が次の問題へ進みます。次の操作も可能です：</p>
      <DocFeatureGrid>
        <DocFeature title="次へ">
          「次の問題」と言うか「次へ」ボタンをクリック。
        </DocFeature>
        <DocFeature title="スキップ">
          答えたくない場合は「スキップ」と言うかボタンをクリック。
        </DocFeature>
        <DocFeature title="前へ">
          「前の問題」と言うか「前へ」ボタンで戻って修正。
        </DocFeature>
      </DocFeatureGrid>

      <hr />

      <h2>面接の終了</h2>
      <p>
        すべての問題に答えると AI が締めくくります。<strong>面接を終了</strong> をクリックするか「面接を終了」と言って早期終了も可能。送信後はセッションを編集できません。
      </p>
      <p>
        送信後に確認ページが表示されます。採用担当者が AI 分析をレビューし、次のステップに進みます。
      </p>

      <h3>接続が切れた場合</h3>
      <p>
        Lingwu は進捗を自動保存します。同じ面接リンクに戻り、必要なら本人確認を行えば中断箇所から再開でき、以前の回答は保持されます。
      </p>

      <DocCallout variant="tip" title="中断を減らす">
        安定したネットワークを使用し、ブラウザタブをアクティブに保ち、開始前に不要なアプリを閉じてください。
      </DocCallout>
    </>
  );
}
