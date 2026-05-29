import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocLink } from "@/components/docs/doc-link";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function whatIsLingwuContentZh() {
  return (
    <>
      <h2>产品概览</h2>
      <p>
        聆悟是一款 AI 驱动的面试平台，可自主开展结构化面试。你设计面试、分享链接，聆悟的 AI 负责整场对话——提问、智能追问，并在会话结束后生成详细分析。
      </p>

      <h3>核心能力</h3>
      <DocFeatureGrid>
        <DocFeature title="AI 面试官">
          AI 代理实时主持面试——提问、倾听回答，并根据候选人所说内容进行智能追问。
        </DocFeature>
        <DocFeature title="多种沟通渠道">
          支持语音（语音对语音）、文字聊天或视频。候选人甚至可以在会话中途在语音与聊天之间切换。
        </DocFeature>
        <DocFeature title="丰富题型">
          除开放式问题外，还支持单选/多选、实时代码（Monaco 编辑器）、白板绘图（Excalidraw）以及研究型深度追问。
        </DocFeature>
        <DocFeature title="自动分析">
          每次完成的会话都会生成 AI 摘要、逐题评分、亮点与改进建议——无需人工逐条审阅。
        </DocFeature>
        <DocFeature title="AI 面试生成器">
          用自然语言描述目标，AI 即可生成包含题目、评估标准与推荐设置的完整面试。
        </DocFeature>
        <DocFeature title="团队协作">
          在组织内共享面试与结果。多名成员可创建面试、审阅会话并导出报告。
        </DocFeature>
      </DocFeatureGrid>

      <h3>常见场景</h3>
      <ul>
        <li><strong>技术招聘</strong> — 内置编辑器与白板的编程与系统设计面试</li>
        <li><strong>用户研究</strong> — AI 深度追问，挖掘更深层洞察</li>
        <li><strong>行为面试</strong> — 自然流畅的语音对话，可规模化覆盖大量候选人</li>
        <li><strong>面试练习</strong> — 候选人在正式面试前可用 AI 反馈进行演练</li>
      </ul>

      <h3>工作流程</h3>
      <ol>
        <li><strong>设计</strong> — 使用 AI 生成器创建，或手动搭建面试</li>
        <li><strong>分享</strong> — 将链接发给候选人或公开发布</li>
        <li><strong>面试</strong> — AI 自主主持整场会话</li>
        <li><strong>复盘</strong> — 阅读 AI 生成的分析、评分与转录</li>
      </ol>
    </>
  );
}

export function accountAndDashboardContentZh() {
  return (
    <>
      <h2>注册账号</h2>
      <p>
        访问 <DocLink href="/register">/register</DocLink>，填写姓名、邮箱和密码即可完成注册。
      </p>

      <DocImage src="/images/docs/register.webp" alt="注册页面，包含姓名、邮箱和密码字段" />

      <DocSteps>
        <DocStep step={1} title="创建或加入组织">
          <p>组织用于聚合项目与团队成员。你可以新建组织，或通过邀请链接加入已有组织。</p>
        </DocStep>
        <DocStep step={2} title="创建第一个项目">
          <p>项目承载你的面试、会话与题库。</p>
        </DocStep>
      </DocSteps>

      <hr />

      <h2>工作台</h2>
      <p>
        工作台是首页——展示活动指标、近期会话与快捷操作。
      </p>

      <DocImage src="/images/docs/dashboard.webp" alt="工作台：侧边栏导航、统计卡片与活动图表" />

      <h3>侧边栏导航</h3>
      <ul>
        <li><strong>工作台</strong> — 活动概览、近期会话与快捷操作</li>
        <li><strong>面试</strong> — 创建与管理面试模板</li>
        <li><strong>会话</strong> — 查看与跟踪各场面试会话</li>
        <li><strong>题目</strong> — 浏览与复用题库</li>
      </ul>

      <h3>组织级页面</h3>
      <p>
        以下页面可从侧边栏进入：
      </p>
      <ul>
        <li><strong>项目设置</strong> — 管理项目默认值与工作区配置</li>
        <li><strong>支持</strong> — 帮助资源与故障排查指引</li>
      </ul>

      <h3>切换项目</h3>
      <p>
        使用侧边栏顶部的项目选择器切换项目。每个项目拥有独立的面试、会话与设置。
      </p>
    </>
  );
}

export function quickStartFirstAiInterviewContentZh() {
  return (
    <>
      <h2>创建你的第一场面试</h2>
      <p>
        本 walkthrough 将带你从零开始，在几分钟内得到可分享的 AI 面试。
      </p>

      <DocSteps>
        <DocStep step={1} title='点击「新建面试」'>
          <p>在 <strong>面试</strong> 页面，点击右上角的 <strong>+ 新建面试</strong>。</p>
          <DocImage src="/images/docs/interviews-list.webp" alt="面试列表页，高亮「新建面试」按钮" />
        </DocStep>

        <DocStep step={2} title="描述你的目标">
          <p>
            在 <strong>AI 生成器</strong> 标签页中，描述你想评估的内容。例如：&quot;一场 30 分钟的前端开发技术面试，涵盖 React、TypeScript 与系统设计。&quot;
          </p>
          <DocImage src="/images/docs/interview-new-ai.webp" alt="AI 生成器标签页：目标描述与配置选项" />
        </DocStep>

        <DocStep step={3} title="审阅并编辑题目">
          <p>AI 会根据你的描述生成题目。在 <strong>内容</strong> 标签页中审阅、编辑、排序或新增题目。</p>
          <DocImage src="/images/docs/interview-edit-content.webp" alt="题目编辑器：已生成题目与题型标签" />
        </DocStep>

        <DocStep step={4} title="配置设置">
          <p>在 <strong>设置</strong> 标签页中设置 AI 语气、追问深度、语言与沟通渠道。</p>
          <DocImage src="/images/docs/interview-edit-settings.webp" alt="设置标签页：AI 配置、语言与渠道选项" />
        </DocStep>

        <DocStep step={5} title="添加候选人并分享">
          <p>进入 <strong>会话</strong> 标签页，按姓名和邮箱添加候选人，并复制邀请链接进行分享。</p>
          <DocImage src="/images/docs/interview-edit-sessions.webp" alt="会话标签页：候选人列表与邀请链接" />
        </DocStep>
      </DocSteps>

      <DocCallout variant="tip" title="小贴士">
        描述越具体越好——写明岗位、技能、时长与题目数量，AI 生成效果越佳。
      </DocCallout>
    </>
  );
}
