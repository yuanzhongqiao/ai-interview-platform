import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function accessingYourInterviewContentZh() {
  return (
    <>
      <h2>开始前</h2>
      <p>
        你会收到邀请人发来的面试链接。建议在桌面电脑使用 <strong>Google Chrome</strong>，以获得最佳体验。
      </p>

      <DocCallout variant="warning" title="浏览器建议">
        Safari 与 Firefox 对语音、视频的支持可能有限。强烈建议使用 Chrome。
      </DocCallout>

      <h2>进入面试</h2>
      <DocSteps>
        <DocStep step={1} title="打开链接并填写信息">
          <p>点击面试链接打开聆悟面试页面。在欢迎页填写姓名与邮箱，然后点击 <strong>开始面试</strong>。</p>
          <DocImage src="/images/docs/interviewee-landing.webp" alt="候选人欢迎页：姓名与邮箱字段" />
        </DocStep>
        <DocStep step={2} title="完成检查清单">
          <p>根据面试配置，你可能需要授权摄像头、麦克风与屏幕捕获。逐项确认检查清单后，点击 <strong>开始</strong>。</p>
          <DocImage src="/images/docs/interviewee-checklist.webp" alt="面试前检查清单：照片、麦克风测试与屏幕捕获授权" />
        </DocStep>
        <DocStep step={3} title="开始面试">
          <p>点击 <strong>开始语音面试</strong>（或与你面试类型对应的按钮）。AI 面试官会自我介绍并开始提问。</p>
          <DocImage src="/images/docs/interview-start.webp" alt="面试开始页：开始语音面试按钮与空白转录面板" />
        </DocStep>
      </DocSteps>

      <DocCallout variant="tip" title="小贴士">
        开始前请关闭可能占用麦克风的其他应用（如 Zoom、Teams）。
      </DocCallout>
    </>
  );
}

export function duringYourInterviewContentZh() {
  return (
    <>
      <h2>面试如何进行</h2>
      <p>
        AI 面试官会逐题提问并回应你的回答。根据配置，你可能使用语音、文字聊天、视频或组合方式。
      </p>

      <DocImage src="/images/docs/interview-session.webp" alt="面试会话：语音、聊天与视频模式，右侧转录，左下角摄像头预览" />

      <h3>语音模式</h3>
      <p>
        自然开口作答。AI 实时倾听并以语音回应——类似电话交谈。请等 AI 说完再作答。
      </p>
      <ul>
        <li><strong>吐字清晰</strong>，语速适中，转录效果更好</li>
        <li><strong>稍作停顿</strong>再答，避免打断 AI</li>
        <li><strong>选择安静环境</strong>，减少背景噪音</li>
      </ul>

      <h3>聊天模式</h3>
      <p>
        在文本框输入回答并按 <strong>Enter</strong> 发送。嘈杂环境、需要斟酌的技术回答，或偏好打字时都很适用。
      </p>

      <DocCallout variant="info">
        可随时在语音与聊天之间切换。口述与打字内容都会记入转录。
      </DocCallout>

      <h3>视频模式</h3>
      <p>
        部分面试会录制摄像头和/或屏幕。请将摄像头对准面部，保证光线充足、面部清晰。
      </p>

      <hr />

      <h2>互动工具</h2>

      <h3>代码编辑器</h3>
      <p>
        编程题会显示基于 Monaco 的编辑器（与 VS Code 同源）。从下拉菜单选择语言，编写解法并点击 <strong>运行</strong> 测试。AI 能看到你的代码，并可能要求你解释思路。
      </p>

      <DocImage src="/images/docs/interview-coding.webp" alt="编程题界面：Monaco 编辑器、Java 代码、语言选择与转录面板" />

      <DocCallout variant="tip" title="小贴士">
        编码时请大声思考（或在聊天中打出推理过程）。AI 会同时评估代码与解题思路。
      </DocCallout>

      <h3>白板</h3>
      <p>
        设计类题目提供基于 Excalidraw 的白板，可绘制流程图、架构图与草图。AI 通过视觉实时观察白板，并就你的设计追问。请清晰标注各组件。
      </p>

      <DocImage src="/images/docs/interview-whiteboard.webp" alt="白板题界面：Excalidraw 画布、架构图与转录面板" />

      <hr />

      <h2>题目导航</h2>
      <p>
        通常在你回答后 AI 会自动进入下一题。你也可以主动控制流程：
      </p>
      <DocFeatureGrid>
        <DocFeature title="下一题">
          说「下一题」或点击「下一题」按钮前进。
        </DocFeature>
        <DocFeature title="跳过">
          说「跳过」或点击「跳过」若不想作答。
        </DocFeature>
        <DocFeature title="上一题">
          说「上一题」或点击「上一题」返回修改。
        </DocFeature>
      </DocFeatureGrid>

      <hr />

      <h2>结束面试</h2>
      <p>
        全部题目答完后，AI 会收尾。也可点击 <strong>结束面试</strong> 或说「结束面试」提前结束。确认提交后，会话不可再编辑。
      </p>
      <p>
        提交后会看到确认页。招聘方将审阅 AI 生成的分析并跟进后续步骤。
      </p>

      <h3>若连接中断</h3>
      <p>
        聆悟会自动保存进度。返回同一面试链接，若提示则验证身份，即可从中断处继续——先前回答会保留。
      </p>

      <DocCallout variant="tip" title="减少中断">
        使用稳定网络，保持浏览器标签页处于活动状态，开始前关闭不必要的应用。
      </DocCallout>
    </>
  );
}
