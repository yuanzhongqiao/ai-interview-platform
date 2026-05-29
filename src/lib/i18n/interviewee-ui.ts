import {
  getLanguageKey,
  pickBiText,
  pickLangFn,
  type BiText,
  type LangKey,
} from "@/lib/i18n";
import type { IntervieweeTourStep } from "@/components/session/interviewee-tour-steps";

const TOUR_PLACEMENTS: Record<
  string,
  IntervieweeTourStep["placement"]
> = {
  "voice-status": "right",
  "voice-mic": "top",
  "voice-chat": "top",
  "voice-tools": "top",
  "voice-transcript": "left",
  "voice-progress": "top",
  "chat-question": "bottom",
  "chat-input": "top",
  "chat-tools": "bottom",
  "chat-progress": "bottom",
  "chat-timer": "bottom",
};

const TOUR_SELECTORS: Record<string, string> = {
  "voice-status": '[data-tour="voice-status"]',
  "voice-mic": '[data-tour="voice-mic"]',
  "voice-chat": '[data-tour="voice-chat"]',
  "voice-tools": '[data-tour="voice-tools"]',
  "voice-transcript": '[data-tour="voice-transcript"]',
  "voice-progress": '[data-tour="voice-progress"]',
  "chat-question": '[data-tour="chat-question"]',
  "chat-input": '[data-tour="chat-input"]',
  "chat-tools": '[data-tour="chat-tools"]',
  "chat-progress": '[data-tour="chat-progress"]',
  "chat-timer": '[data-tour="chat-timer"]',
};

const copy = {
  steps: {
    info: { en: "Interview Info", zh: "面试信息", ja: "面接情報" } satisfies BiText,
    checklist: { en: "Checklist", zh: "设备检查", ja: "チェックリスト" } satisfies BiText,
    start: { en: "Start", zh: "开始", ja: "開始" } satisfies BiText,
  },
  description: { en: "Description", zh: "描述", ja: "説明" } satisfies BiText,
  noDescription: {
    en: "No additional description.",
    zh: "暂无补充说明。",
  } satisfies BiText,
  questionsMeta: {
    en: (n: number, min: string) => `${n} questions · ${min}`,
    zh: (n: number, min: string) => `${n} 道题 · ${min}`,
    ja: (n: number, min: string) => `${n} 問 · ${min}`,
  },
  noTimeLimit: { en: "No time limit", zh: "不限时", ja: "制限時間なし" } satisfies BiText,
  minUnit: { en: "min", zh: "分钟", ja: "分" } satisfies BiText,
  integrityTitle: { en: "Integrity Notices", zh: "诚信须知", ja: "誠実性に関する注意" } satisfies BiText,
  integrityAntiCheatBanner: {
    en: "To ensure fairness, the following integrity measures will be actively enforced throughout this session.",
    zh: "为保证公平，以下诚信措施将在整场面试中严格执行。",
  } satisfies BiText,
  integrityItems: {
    standard: [
      {
        en: "To ensure that the interview runs properly, please use the latest version of Chrome.",
        zh: "为保证面试顺利进行，请使用最新版 Chrome 浏览器。",
      },
      {
        en: "After completing your answers, please make sure that you have submitted them to all questions. Otherwise it will affect your results.",
        zh: "完成作答后，请确认所有题目均已提交，否则可能影响评估结果。",
      },
      {
        en: "Before the interview starts, please shut down any software or web page with ads or pop-ups. Please do not leave the interview page during the whole process.",
        zh: "面试开始前，请关闭含广告或弹窗的软件或网页；全程请勿离开面试页面。",
      },
      {
        en: "This interview requires a camera to collect your registration photo and capture your behavior. All photos are privacy protected.",
        zh: "本场面试需要开启摄像头采集注册照并记录行为，所有影像均受隐私保护。",
      },
      {
        en: "The interview will screen capture throughout. Screen capture requires authorization.",
        zh: "面试全程将进行屏幕录制，需授权屏幕共享。",
      },
    ] as BiText[],
    antiCheat: [
      {
        en: "To ensure that the interview runs properly, please use the latest version of Chrome.",
        zh: "为保证面试顺利进行，请使用最新版 Chrome 浏览器。",
      },
      {
        en: "After completing your answers, please make sure that you have submitted them to all questions. Otherwise it will affect your results.",
        zh: "完成作答后，请确认所有题目均已提交，否则可能影响评估结果。",
      },
      {
        en: "Tab switching and focus tracking: Leaving the interview page or switching to another window will be automatically detected and recorded. If you leave more than 3 times, your session will be flagged for review.",
        zh: "切屏与焦点监测：离开面试页或切换窗口将被自动记录；离开超过 3 次将标记为需复核。",
      },
      {
        en: "External paste blocked: Pasting content from outside the interview page is not allowed. You can copy and paste freely within the page.",
        zh: "禁止外部粘贴：不允许从页面外粘贴内容，页面内可自由复制粘贴。",
      },
      {
        en: "Multiple screen detection: The system will detect if you have multiple monitors connected. Please unplug or turn off additional screens before starting.",
        zh: "多屏检测：系统将检测是否连接多个显示器，开始前请关闭或拔掉额外屏幕。",
      },
      {
        en: "This interview requires a camera to collect your registration photo and capture your behavior. All photos are privacy protected.",
        zh: "本场面试需要开启摄像头采集注册照并记录行为，所有影像均受隐私保护。",
      },
      {
        en: "The interview will screen capture throughout. Screen capture requires authorization.",
        zh: "面试全程将进行屏幕录制，需授权屏幕共享。",
      },
    ] as BiText[],
  },
  agreeNotice: {
    en: "I agree to the above notice and interview guidelines",
    zh: "我已阅读并同意上述须知与面试规范",
  } satisfies BiText,
  next: { en: "Next", zh: "下一步", ja: "次へ" } satisfies BiText,
  back: { en: "Back", zh: "上一步", ja: "戻る" } satisfies BiText,
  chromeTip: {
    en: "Chrome is recommended for a better experience.",
    zh: "建议使用 Chrome 浏览器以获得更好体验。",
  } satisfies BiText,
  preparingTitle: {
    en: "Preparing your interview...",
    zh: "正在准备面试…",
  } satisfies BiText,
  preparingDesc: {
    en: "This will only take a moment.",
    zh: "请稍候片刻。",
  } satisfies BiText,
  welcomeTitle: {
    en: "Welcome to your interview!",
    zh: "欢迎参加本次面试！",
  } satisfies BiText,
  welcomeLead: {
    en: "Take a quick tour of the interview interface.",
    zh: "快速了解面试界面。",
  } satisfies BiText,
  welcomeBody: {
    en: "We'll walk you through the key features — voice controls, transcript, whiteboard, and more — so you know exactly where everything is.",
    zh: "我们将介绍语音控制、转录、白板等关键功能，帮助你熟悉界面。",
  } satisfies BiText,
  skipForNow: { en: "Skip for now", zh: "暂时跳过", ja: "今はスキップ" } satisfies BiText,
  takeTour: { en: "Take a quick tour", zh: "开始导览", ja: "クイックツアー" } satisfies BiText,
  tourDoneTitle: { en: "You're all set!", zh: "准备完成！", ja: "準備完了！" } satisfies BiText,
  tourDoneBody: {
    en: "You can start the interview now, or restart the tour if you'd like another look.",
    zh: "你可以现在开始面试，也可重新查看导览。",
  } satisfies BiText,
  restartTour: { en: "Restart tour", zh: "重新导览", ja: "ツアーを再開" } satisfies BiText,
  startInterview: { en: "Start Interview", zh: "开始面试", ja: "面接を開始" } satisfies BiText,
  thankYou: { en: "Thank you!", zh: "感谢参与！", ja: "ありがとうございました！" } satisfies BiText,
  timeLimitEnded: {
    en: "The session time limit has been reached and the interview was ended automatically.",
    zh: "已达到面试时长上限，系统已自动结束本次面试。",
  } satisfies BiText,
  completedBody: {
    en: "Your interview has been completed successfully. We appreciate your time and thoughtful responses.",
    zh: "你已成功完成本次面试，感谢你的时间与认真作答。",
  } satisfies BiText,
  common: {
    retry: { en: "Retry", zh: "重试", ja: "再試行" } satisfies BiText,
    skip: { en: "Skip", zh: "跳过", ja: "スキップ" } satisfies BiText,
    goBack: { en: "Go back", zh: "返回", ja: "戻る" } satisfies BiText,
    skipAnyway: { en: "Skip anyway", zh: "仍要跳过", ja: "スキップする" } satisfies BiText,
  },
  camera: {
    label: { en: "Collect photo", zh: "采集照片", ja: "写真を撮影" } satisfies BiText,
    eyesOnCamera: { en: "Keep your eyes on the camera", zh: "请注视摄像头", ja: "カメラを見てください" } satisfies BiText,
    startCollecting: { en: "Start Collecting", zh: "开始采集", ja: "撮影を開始" } satisfies BiText,
    capture: { en: "Capture", zh: "拍照", ja: "撮影" } satisfies BiText,
    retake: { en: "Retake", zh: "重拍", ja: "撮り直し" } satisfies BiText,
    compareHint: {
      en: "The photo will be compared with snapshots during the interview, so please keep your face visible.",
      zh: "该照片将与面试过程中的快照比对，请保持面部清晰可见。",
    } satisfies BiText,
    authHint: {
      en: "Photo collection requires authorization, please operate according to browser prompts.",
      zh: "采集照片需浏览器授权，请按提示操作。",
    } satisfies BiText,
    error: {
      en: "Unable to access camera. Please check permissions.",
      zh: "无法访问摄像头，请检查权限设置。",
    } satisfies BiText,
    noCamera: { en: "No camera?", zh: "没有摄像头？", ja: "カメラがありませんか？" } satisfies BiText,
    required: {
      en: "Camera is required for this interview.",
      zh: "本场面试必须开启摄像头。",
    } satisfies BiText,
    skipTitle: { en: "Skip photo collection?", zh: "跳过照片采集？", ja: "写真撮影をスキップしますか？" } satisfies BiText,
    skipDesc: {
      en: "Skipping photo collection is not recommended. The photo is used to verify your identity during the interview. Skipping may affect your interview results.",
      zh: "不建议跳过照片采集。照片用于面试期间身份核验，跳过可能影响结果。",
    } satisfies BiText,
  },
  mic: {
    label: { en: "Microphone", zh: "麦克风", ja: "マイク" } satisfies BiText,
    speakerMic: { en: "Speaker & Microphone", zh: "扬声器与麦克风", ja: "スピーカーとマイク" } satisfies BiText,
    audioConfirmed: { en: "Audio confirmed", zh: "音频已确认", ja: "音声を確認しました" } satisfies BiText,
    testTitle: { en: "Test Microphone", zh: "测试麦克风", ja: "マイクをテスト" } satisfies BiText,
    testBtn: { en: "Test Microphone", zh: "测试麦克风", ja: "マイクをテスト" } satisfies BiText,
    title: {
      en: "Test your speaker and microphone to ensure audio is working properly.",
      zh: "请测试扬声器与麦克风，确保音频正常。",
    } satisfies BiText,
    phaseIdle: {
      en: 'Click "Test Microphone" to hear a message from the voice agent. Then speak your response to confirm the audio works — just like in the actual interview.',
      zh: "点击「测试麦克风」听取语音助手播报，然后说出回应以确认设备正常——与正式面试相同。",
    } satisfies BiText,
    phaseRequesting: {
      en: "Granting microphone access...",
      zh: "正在请求麦克风权限…",
    } satisfies BiText,
    phasePlaying: {
      en: "The voice agent is speaking — listen carefully...",
      zh: "语音助手正在播报，请仔细聆听…",
    } satisfies BiText,
    phaseListening: {
      en: 'Please say "yes" or "I can hear you" to confirm.',
      zh: "请说「是」或「能听到」以确认。",
    } satisfies BiText,
    phaseAnalyzing: {
      en: "Checking your response...",
      zh: "正在识别你的回应…",
    } satisfies BiText,
    phaseConfirmRetry: {
      en: "We couldn't detect your voice. Try again, or ",
      zh: "未检测到你的声音，请重试，或",
    } satisfies BiText,
    skipThisStep: { en: "skip this step", zh: "跳过此步骤", ja: "この手順をスキップ" } satisfies BiText,
    phaseConfirmNoSkip: {
      en: "We couldn't detect your voice. Please try again.",
      zh: "未检测到你的声音，请重试。",
    } satisfies BiText,
    passed: {
      en: "Audio test passed. Your speaker and microphone are working.",
      zh: "音频测试通过，扬声器与麦克风工作正常。",
    } satisfies BiText,
    requesting: { en: "Requesting access...", zh: "正在请求权限…", ja: "アクセスを要求中..." } satisfies BiText,
    stop: { en: "Stop", zh: "停止", ja: "停止" } satisfies BiText,
    listening: { en: "Listening...", zh: "正在聆听…", ja: "聞き取り中..." } satisfies BiText,
    analyzing: { en: "Analyzing...", zh: "分析中…", ja: "分析中..." } satisfies BiText,
    playAgain: { en: "Play again", zh: "再播一次", ja: "もう一度再生" } satisfies BiText,
    error: {
      en: "Unable to access microphone. Please check permissions.",
      zh: "无法访问麦克风，请检查权限设置。",
    } satisfies BiText,
    noMic: { en: "No microphone?", zh: "没有麦克风？", ja: "マイクがありませんか？" } satisfies BiText,
    required: {
      en: "Microphone is required for this interview.",
      zh: "本场面试必须开启麦克风。",
    } satisfies BiText,
    skipTitle: { en: "Skip microphone test?", zh: "跳过麦克风测试？", ja: "マイクテストをスキップしますか？" } satisfies BiText,
    skipDesc: {
      en: "Skipping the microphone test is not recommended. If your speaker or microphone is not working properly, it may affect your interview experience and results.",
      zh: "不建议跳过麦克风测试。若音频设备异常，可能影响面试体验与结果。",
    } satisfies BiText,
  },
  screen: {
    label: { en: "Screen Capture", zh: "屏幕录制", ja: "画面キャプチャ" } satisfies BiText,
    entireScreen: { en: "Entire screen", zh: "整个屏幕", ja: "画面全体" } satisfies BiText,
    shareScreen: { en: "Share Screen", zh: "共享屏幕", ja: "画面を共有" } satisfies BiText,
    authTitle: {
      en: "Screen capture requires authorization.",
      zh: "屏幕录制需要授权。",
    } satisfies BiText,
    authHint: {
      en: 'After clicking "Share Screen", please select "Entire Screen" in the pop-up window and click "Share".',
      zh: "点击「共享屏幕」后，请在弹窗中选择「整个屏幕」并点击「共享」。",
    } satisfies BiText,
    wrongSurface: {
      en: 'Please share your entire screen, not a window or tab. Click "Share Screen" and select "Entire Screen".',
      zh: "请共享整个屏幕，而非窗口或标签页；点击「共享屏幕」并选择「整个屏幕」。",
    } satisfies BiText,
    denied: {
      en: "Screen capture was denied or cancelled.",
      zh: "屏幕共享被拒绝或已取消。",
    } satisfies BiText,
    cantShare: { en: "Can't share screen?", zh: "无法共享屏幕？", ja: "画面を共有できませんか？" } satisfies BiText,
    required: {
      en: "Screen sharing is required for this interview.",
      zh: "本场面试必须开启屏幕共享。",
    } satisfies BiText,
    unavailableTitle: {
      en: "Screen sharing unavailable",
      zh: "无法使用屏幕共享",
    } satisfies BiText,
    unavailableDesc: {
      en: "Screen sharing requires a desktop browser (Chrome recommended). This step has been automatically skipped on your device.",
      zh: "屏幕共享需使用桌面浏览器（建议 Chrome）。你的设备已自动跳过此步骤。",
    } satisfies BiText,
    skipped: { en: "Skipped", zh: "已跳过", ja: "スキップ済み" } satisfies BiText,
    skipTitle: { en: "Skip screen sharing?", zh: "跳过屏幕共享？", ja: "画面共有をスキップしますか？" } satisfies BiText,
    skipDesc: {
      en: "Skipping screen sharing is not recommended. Screen capture is used to monitor your interview environment. Skipping may affect your interview results.",
      zh: "不建议跳过屏幕共享。屏幕录制用于监测面试环境，跳过可能影响结果。",
    } satisfies BiText,
  },
  tour: {
    skipTour: { en: "Skip tour", zh: "跳过导览", ja: "ツアーをスキップ" } satisfies BiText,
    back: { en: "Back", zh: "上一步", ja: "戻る" } satisfies BiText,
    next: { en: "Next", zh: "下一步", ja: "次へ" } satisfies BiText,
    done: { en: "Done", zh: "完成", ja: "完了" } satisfies BiText,
    stepOf: {
      en: (i: number, total: number) => `${i} of ${total}`,
      zh: (i: number, total: number) => `${i} / ${total}`,
      ja: (i: number, total: number) => `ステップ ${i} / ${total}`,
    },
    voice: [
      {
        id: "voice-status",
        title: { en: "Your AI Interviewer", zh: "AI 面试官", ja: "AI 面接官" } satisfies BiText,
        description: {
          en: "This is your AI interviewer. It will speak to you and listen to your responses in real time.",
          zh: "这是你的 AI 面试官，会实时与你对话并听取你的回答。",
        } satisfies BiText,
      },
      {
        id: "voice-mic",
        title: { en: "Microphone Control", zh: "麦克风控制", ja: "マイク操作" } satisfies BiText,
        description: {
          en: "Click to mute or unmute your microphone. Speak naturally when unmuted — the AI will respond automatically.",
          zh: "点击可静音或取消静音。取消静音后请自然说话，AI 会自动回应。",
        } satisfies BiText,
      },
      {
        id: "voice-chat",
        title: { en: "Text Chat Channel", zh: "文字聊天", ja: "テキストチャット" } satisfies BiText,
        description: {
          en: "Prefer typing? Open the chat panel to send text messages alongside the voice conversation.",
          zh: "更喜欢打字？可打开聊天面板，在语音对话的同时发送文字消息。",
        } satisfies BiText,
        optional: true,
      },
      {
        id: "voice-tools",
        title: { en: "Whiteboard & Code Editor", zh: "白板与代码编辑器", ja: "ホワイトボードとコードエディタ" } satisfies BiText,
        description: {
          en: "Use the Whiteboard for diagrams or the Code Editor for coding questions. They open as side panels.",
          zh: "可使用白板绘图，或使用代码编辑器作答编程题，均以侧栏形式打开。",
        } satisfies BiText,
      },
      {
        id: "voice-transcript",
        title: { en: "Conversation Transcript", zh: "对话记录", ja: "会話の文字起こし" } satisfies BiText,
        description: {
          en: "Your full conversation transcript appears here. Use it to review what was said.",
          zh: "完整对话记录显示在此处，便于回顾已说内容。",
        } satisfies BiText,
      },
      {
        id: "voice-progress",
        title: { en: "Question Progress", zh: "题目进度", ja: "問題の進捗" } satisfies BiText,
        description: {
          en: "Track your progress here. Use Previous/Next to navigate between questions, or click End when finished.",
          zh: "在此查看进度。使用上/下一题切换题目，完成后点击结束。",
        } satisfies BiText,
      },
    ],
    chat: [
      {
        id: "chat-question",
        title: { en: "Current Question", zh: "当前题目", ja: "現在の問題" } satisfies BiText,
        description: {
          en: "The current question appears here. The AI interviewer will guide you through each one and may ask follow-ups.",
          zh: "当前题目显示在此处。AI 面试官会引导你逐题作答，并可能追问。",
        } satisfies BiText,
      },
      {
        id: "chat-input",
        title: { en: "Type Your Response", zh: "输入回答", ja: "回答を入力" } satisfies BiText,
        description: {
          en: "Type your answer here and press Enter or click Send. Take your time to compose thoughtful responses.",
          zh: "在此输入回答，按 Enter 或点击发送。请认真组织你的回答。",
        } satisfies BiText,
      },
      {
        id: "chat-tools",
        title: { en: "Whiteboard & Code Editor", zh: "白板与代码编辑器", ja: "ホワイトボードとコードエディタ" } satisfies BiText,
        description: {
          en: "Open the Whiteboard for diagrams or the Code Editor for coding questions. They appear above the chat.",
          zh: "可打开白板或代码编辑器；它们会显示在聊天区域上方。",
        } satisfies BiText,
      },
      {
        id: "chat-progress",
        title: { en: "Question Progress", zh: "题目进度", ja: "問題の進捗" } satisfies BiText,
        description: {
          en: "Track your progress with the progress bar. The question counter shows how far along you are.",
          zh: "通过进度条查看进度，题号显示当前进行到第几题。",
        } satisfies BiText,
      },
      {
        id: "chat-timer",
        title: { en: "Timer & Navigation", zh: "计时与导航", ja: "タイマーとナビゲーション" } satisfies BiText,
        description: {
          en: "Keep an eye on the timer if one is set. Use the back arrow to revisit previous questions.",
          zh: "若设置了计时请关注剩余时间；可用返回箭头查看上一题。",
        } satisfies BiText,
      },
    ],
  },
  voice: {
    headerSubtitle: {
      en: (name: string) => `Voice interview with ${name}`,
      zh: (name: string) => `与 ${name} 的语音面试`,
      ja: (name: string) => `${name} との音声面接`,
    },
    preview: { en: "Preview", zh: "预览", ja: "プレビュー" } satisfies BiText,
    connected: { en: "Connected", zh: "已连接", ja: "接続済み" } satisfies BiText,
    disconnected: { en: "Disconnected", zh: "未连接", ja: "未接続" } satisfies BiText,
    rec: { en: "REC", zh: "录制", ja: "録音中" } satisfies BiText,
    timeLeft: {
      en: (t: string) => `${t} left`,
      zh: (t: string) => `剩余 ${t}`,
      ja: (t: string) => `残り ${t}`,
    },
    transcript: { en: "Transcript", zh: "对话记录", ja: "文字起こし" } satisfies BiText,
    transcriptEmpty: {
      en: "Transcript will appear here once the conversation starts.",
      zh: "对话开始后将在此显示记录。",
    },
    you: { en: "You", zh: "你", ja: "あなた" } satisfies BiText,
    aiSpeaking: { en: "AI is speaking...", zh: "AI 正在说话…", ja: "AI が話しています..." } satisfies BiText,
    aiSpeakingNamed: {
      en: (name: string) => `${name} speaking`,
      zh: (name: string) => `${name} 正在说话`,
      ja: (name: string) => `${name} が話しています`,
    },
    listening: { en: "Listening...", zh: "正在聆听…", ja: "聞き取り中..." } satisfies BiText,
    placeholder: {
      en: "This is where the voice conversation happens",
      zh: "语音对话将在此处进行",
    },
    mute: { en: "Mute", zh: "静音", ja: "ミュート" } satisfies BiText,
    unmute: { en: "Unmute", zh: "取消静音", ja: "ミュート解除" } satisfies BiText,
    chat: { en: "Chat", zh: "聊天", ja: "チャット" } satisfies BiText,
    whiteboard: { en: "Whiteboard", zh: "白板", ja: "ホワイトボード" } satisfies BiText,
    code: { en: "Code", zh: "代码", ja: "コード" } satisfies BiText,
    previous: { en: "Previous", zh: "上一题", ja: "前へ" } satisfies BiText,
    next: { en: "Next", zh: "下一题", ja: "次へ" } satisfies BiText,
    end: { en: "End", zh: "结束", ja: "終了" } satisfies BiText,
    startVoice: { en: "Start Voice Interview", zh: "开始语音面试", ja: "音声面接を開始" } satisfies BiText,
    connecting: { en: "Connecting...", zh: "正在连接…", ja: "接続中..." } satisfies BiText,
    savingTitle: { en: "Saving interview data...", zh: "正在保存面试数据…", ja: "面接データを保存中..." } satisfies BiText,
    savingDesc: {
      en: "This will only take a moment.",
      zh: "请稍候片刻。",
    } satisfies BiText,
    relayError: {
      en: "Voice connection failed. Check that the voice relay is running and NEXT_PUBLIC_VOICE_RELAY_URL matches your deployment, then hard-refresh the page.",
      zh: "语音连接失败。请确认语音中继已启动，且 NEXT_PUBLIC_VOICE_RELAY_URL 与线上一致，然后强制刷新页面（Ctrl+Shift+R）。",
    } satisfies BiText,
    helpTitle: { en: "How It Works", zh: "使用说明", ja: "使い方" } satisfies BiText,
    guideTitle: { en: "Interface Guide", zh: "界面指南", ja: "画面ガイド" } satisfies BiText,
    unmuted: { en: "Unmuted", zh: "未静音", ja: "ミュート解除" } satisfies BiText,
    muted: { en: "Muted", zh: "已静音", ja: "ミュート中" } satisfies BiText,
    micHint: {
      en: "Click the mic to start speaking",
      zh: "点击麦克风开始说话",
    } satisfies BiText,
    aiSpeakingEllipsis: {
      en: (name: string) => `${name} is speaking...`,
      zh: (name: string) => `${name} 正在说话…`,
      ja: (name: string) => `${name} が話しています…`,
    },
  },
} as const;

export type IntervieweeUi = ReturnType<typeof getIntervieweeUi>;

function htmlLangFor(lang: LangKey): string {
  if (lang === "zh") return "zh-CN";
  if (lang === "ja") return "ja-JP";
  return "en";
}

export function getIntervieweeUi(language?: string) {
  const lang = getLanguageKey(language);
  const isZh = lang === "zh";
  const pick = (b: BiText) => pickBiText(lang, b);

  return {
    isZh,
    lang,
    htmlLang: htmlLangFor(lang),
    steps: {
      info: pick(copy.steps.info),
      checklist: pick(copy.steps.checklist),
      start: pick(copy.steps.start),
    },
    description: pick(copy.description),
    noDescription: pick(copy.noDescription),
    formatQuestionsMeta: (count: number, timeLimitMinutes?: number | null) => {
      const min = timeLimitMinutes
        ? `${timeLimitMinutes} ${pick(copy.minUnit)}`
        : pick(copy.noTimeLimit);
      if (lang === "zh") return copy.questionsMeta.zh(count, min);
      if (lang === "ja") {
        return copy.questionsMeta.ja
          ? copy.questionsMeta.ja(count, min)
          : `${count} 問 · ${min}`;
      }
      return copy.questionsMeta.en(count, min);
    },
    integrityTitle: pick(copy.integrityTitle),
    integrityAntiCheatBanner: pick(copy.integrityAntiCheatBanner),
    integrityItemsStandard: copy.integrityItems.standard.map(pick),
    integrityItemsAntiCheat: copy.integrityItems.antiCheat.map(pick),
    agreeNotice: pick(copy.agreeNotice),
    next: pick(copy.next),
    back: pick(copy.back),
    chromeTip: pick(copy.chromeTip),
    preparingTitle: pick(copy.preparingTitle),
    preparingDesc: pick(copy.preparingDesc),
    welcomeTitle: pick(copy.welcomeTitle),
    welcomeLead: pick(copy.welcomeLead),
    welcomeBody: pick(copy.welcomeBody),
    skipForNow: pick(copy.skipForNow),
    takeTour: pick(copy.takeTour),
    tourDoneTitle: pick(copy.tourDoneTitle),
    tourDoneBody: pick(copy.tourDoneBody),
    restartTour: pick(copy.restartTour),
    startInterview: pick(copy.startInterview),
    thankYou: pick(copy.thankYou),
    timeLimitEnded: pick(copy.timeLimitEnded),
    completedBody: pick(copy.completedBody),
    common: {
      retry: pick(copy.common.retry),
      skip: pick(copy.common.skip),
      goBack: pick(copy.common.goBack),
      skipAnyway: pick(copy.common.skipAnyway),
    },
    camera: {
      label: pick(copy.camera.label),
      eyesOnCamera: pick(copy.camera.eyesOnCamera),
      startCollecting: pick(copy.camera.startCollecting),
      capture: pick(copy.camera.capture),
      retake: pick(copy.camera.retake),
      compareHint: pick(copy.camera.compareHint),
      authHint: pick(copy.camera.authHint),
      error: pick(copy.camera.error),
      noCamera: pick(copy.camera.noCamera),
      required: pick(copy.camera.required),
      skipTitle: pick(copy.camera.skipTitle),
      skipDesc: pick(copy.camera.skipDesc),
    },
    mic: {
      label: pick(copy.mic.label),
      speakerMic: pick(copy.mic.speakerMic),
      audioConfirmed: pick(copy.mic.audioConfirmed),
      testTitle: pick(copy.mic.testTitle),
      testBtn: pick(copy.mic.testBtn),
      title: pick(copy.mic.title),
      phaseIdle: pick(copy.mic.phaseIdle),
      phaseRequesting: pick(copy.mic.phaseRequesting),
      phasePlaying: pick(copy.mic.phasePlaying),
      phaseListening: pick(copy.mic.phaseListening),
      phaseAnalyzing: pick(copy.mic.phaseAnalyzing),
      phaseConfirmRetry: pick(copy.mic.phaseConfirmRetry),
      skipThisStep: pick(copy.mic.skipThisStep),
      phaseConfirmNoSkip: pick(copy.mic.phaseConfirmNoSkip),
      passed: pick(copy.mic.passed),
      requesting: pick(copy.mic.requesting),
      stop: pick(copy.mic.stop),
      listening: pick(copy.mic.listening),
      analyzing: pick(copy.mic.analyzing),
      playAgain: pick(copy.mic.playAgain),
      error: pick(copy.mic.error),
      noMic: pick(copy.mic.noMic),
      required: pick(copy.mic.required),
      skipTitle: pick(copy.mic.skipTitle),
      skipDesc: pick(copy.mic.skipDesc),
    },
    screen: {
      label: pick(copy.screen.label),
      entireScreen: pick(copy.screen.entireScreen),
      shareScreen: pick(copy.screen.shareScreen),
      authTitle: pick(copy.screen.authTitle),
      authHint: pick(copy.screen.authHint),
      wrongSurface: pick(copy.screen.wrongSurface),
      denied: pick(copy.screen.denied),
      cantShare: pick(copy.screen.cantShare),
      required: pick(copy.screen.required),
      unavailableTitle: pick(copy.screen.unavailableTitle),
      unavailableDesc: pick(copy.screen.unavailableDesc),
      skipped: pick(copy.screen.skipped),
      skipTitle: pick(copy.screen.skipTitle),
      skipDesc: pick(copy.screen.skipDesc),
    },
    tour: {
      skipTour: pick(copy.tour.skipTour),
      back: pick(copy.tour.back),
      next: pick(copy.tour.next),
      done: pick(copy.tour.done),
      formatStepOf: (i: number, total: number) => formatTourStepOf(lang, i, total),
    },
    voice: {
      headerSubtitle: (name: string) =>
        pickLangFn(lang, copy.voice.headerSubtitle, name),
      preview: pick(copy.voice.preview),
      connected: pick(copy.voice.connected),
      disconnected: pick(copy.voice.disconnected),
      rec: pick(copy.voice.rec),
      formatTimeLeft: (t: string) => pickLangFn(lang, copy.voice.timeLeft, t),
      transcript: pick(copy.voice.transcript),
      transcriptEmpty: pick(copy.voice.transcriptEmpty),
      you: pick(copy.voice.you),
      aiSpeaking: pick(copy.voice.aiSpeaking),
      aiSpeakingNamed: (name: string) =>
        pickLangFn(lang, copy.voice.aiSpeakingNamed, name),
      listening: pick(copy.voice.listening),
      placeholder: pick(copy.voice.placeholder),
      mute: pick(copy.voice.mute),
      unmute: pick(copy.voice.unmute),
      chat: pick(copy.voice.chat),
      whiteboard: pick(copy.voice.whiteboard),
      code: pick(copy.voice.code),
      previous: pick(copy.voice.previous),
      next: pick(copy.voice.next),
      end: pick(copy.voice.end),
      startVoice: pick(copy.voice.startVoice),
      connecting: pick(copy.voice.connecting),
      savingTitle: pick(copy.voice.savingTitle),
      savingDesc: pick(copy.voice.savingDesc),
      relayError: pick(copy.voice.relayError),
      helpTitle: pick(copy.voice.helpTitle),
      guideTitle: pick(copy.voice.guideTitle),
      unmuted: pick(copy.voice.unmuted),
      muted: pick(copy.voice.muted),
      micHint: pick(copy.voice.micHint),
      aiSpeakingEllipsis: (name: string) =>
        pickLangFn(lang, copy.voice.aiSpeakingEllipsis, name),
    },
  };
}

function formatTourStepOf(lang: LangKey, i: number, total: number): string {
  return pickLangFn(lang, copy.tour.stepOf, i, total);
}

function buildTourSteps(
  language: string | undefined,
  mode: "voice" | "chat",
): IntervieweeTourStep[] {
  const lang = getLanguageKey(language);
  const pick = (b: BiText) => pickBiText(lang, b);
  const defs = mode === "voice" ? copy.tour.voice : copy.tour.chat;

  return defs.map((step) => ({
    id: step.id,
    selector: TOUR_SELECTORS[step.id] ?? `[data-tour="${step.id}"]`,
    title: pick(step.title),
    description: pick(step.description),
    placement: TOUR_PLACEMENTS[step.id] ?? "bottom",
    ...("optional" in step && step.optional ? { optional: true } : {}),
  }));
}

export function getVoiceTourSteps(language?: string): IntervieweeTourStep[] {
  return buildTourSteps(language, "voice");
}

export function getChatTourSteps(language?: string): IntervieweeTourStep[] {
  return buildTourSteps(language, "chat");
}
