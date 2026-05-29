import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function creatingAnInterviewContentZh() {
  return (
    <>
      <h2>AI 生成器</h2>
      <p>
        用自然语言描述你想评估的内容——岗位、技能、时长及任何约束。AI 会生成包含题目、题型与评估标准的完整面试。
      </p>

      <DocImage src="/images/docs/interview-new-ai.webp" alt="AI 生成器标签页：目标描述、模板芯片与配置" />

      <h3>写好提示词</h3>
      <p>建议包含：</p>
      <ul>
        <li><strong>岗位与背景</strong> — 这场面试面向谁？</li>
        <li><strong>待评估技能</strong> — 题目应覆盖哪些主题？</li>
        <li><strong>时长与范围</strong> — 预计多久？多少道题？</li>
        <li><strong>形式偏好</strong> — 是否需要编程题、白板等？</li>
      </ul>
      <blockquote>
        示例：&quot;一场 20 分钟的后端工程师技术面试，涵盖 API 设计、数据库优化与错误处理，并包含一道编程题。&quot;
      </blockquote>
      <p>
        生成后仍可用自然语言继续优化——要求加深难度、更换题型或调整侧重点。每一轮都会在上一版基础上迭代。
      </p>

      <hr />

      <h2>手动创建</h2>
      <p>
        如需完全掌控，切换到 <strong>手动</strong> 标签页。设置标题、描述、目标与预期时长，然后选择沟通渠道。
      </p>

      <DocImage src="/images/docs/interview-new-manual.webp" alt="手动创建标签页：标题、描述、目标与渠道选项" />

      <DocFeatureGrid>
        <DocFeature title="语音">
          与 AI 面试官进行实时语音对语音对话。
        </DocFeature>
        <DocFeature title="聊天">
          文字问答，候选人输入回答。
        </DocFeature>
        <DocFeature title="视频">
          在语音互动的同时录制摄像头与屏幕。
        </DocFeature>
      </DocFeatureGrid>

      <p>
        创建面试后，在编辑器中添加题目，也可从题库导入。
      </p>

      <DocImage src="/images/docs/interview-edit-content.webp" alt="题目编辑器：开放式、编程、多选等题型" />
    </>
  );
}

export function interviewSettingsContentZh() {
  return (
    <>
      <p>
        在<strong>设置</strong>标签页中，可配置面试访问方式、AI 行为以及启用的沟通渠道。
      </p>

      <DocImage src="/images/docs/interview-edit-settings.webp" alt="设置标签页：可分享链接、常规与 AI 配置" />

      <h2>可分享链接</h2>
      <p>
        默认情况下，面试为<strong>仅邀请</strong>模式——只有你在「会话」标签页添加的候选人才能通过专属邀请链接访问。
      </p>
      <p>
        若需开放访问，点击 <strong>创建可分享链接</strong>。系统将生成公开 URL，任何人可据此开始会话。你可随时复制链接分享，或撤销链接以恢复仅邀请模式。
      </p>

      <hr />

      <h2>常规</h2>
      <ul>
        <li><strong>标题</strong> — 向候选人与工作台展示的面试名称</li>
        <li><strong>描述</strong> — 供团队内部了解面试用途的备注</li>
        <li><strong>目标</strong> — 希望从候选人处了解的内容（供 AI 引导对话）</li>
        <li><strong>时长</strong> — 时限（分钟）。留空表示不限时。</li>
      </ul>

      <h3>沟通渠道</h3>
      <p>
        选择候选人与 AI 的互动方式。聊天与语音至少需启用其一。
      </p>
      <DocFeatureGrid>
        <DocFeature title="聊天">
          文字消息，候选人打字作答。
        </DocFeature>
        <DocFeature title="语音">
          实时语音对话。启用视频时必须先启用语音。
        </DocFeature>
        <DocFeature title="视频">
          在语音基础上录制摄像头与屏幕，依赖语音已开启。
        </DocFeature>
      </DocFeatureGrid>

      <hr />

      <h2>AI 配置</h2>
      <ul>
        <li><strong>AI 名称</strong> — AI 面试官自我介绍时使用的名称</li>
      </ul>

      <h3>语气</h3>
      <DocFeatureGrid>
        <DocFeature title="轻松">
          放松、对话感强。适合用户研究与非正式会话。
        </DocFeature>
        <DocFeature title="专业">
          平衡、商务感。多数面试的推荐默认项。
        </DocFeature>
        <DocFeature title="正式">
          结构化、克制。适合高管或合规类面试。
        </DocFeature>
        <DocFeature title="友好">
          温暖、鼓励。适合练习与入职场景。
        </DocFeature>
      </DocFeatureGrid>

      <h3>追问深度</h3>
      <ul>
        <li><strong>浅</strong> — 不追问，会话更短、更聚焦</li>
        <li><strong>中等</strong> — 每题 1–2 次追问，常用默认</li>
        <li><strong>深</strong> — 每题 3–5 次追问，适合充分展开每个主题</li>
      </ul>

      <h3>语言</h3>
      <p>
        AI 将以所选语言进行会话并评估回答。当前支持：<strong>English</strong>、<strong>中文</strong>、<strong>日本語</strong> 等。
      </p>
    </>
  );
}

export function antiCheatingContentZh() {
  return (
    <>
      <p>
        防作弊模式为面试增加诚信监控层。启用后，系统将强制设备权限、跟踪标签页切换、阻止外部粘贴，并检测多显示器环境。
      </p>

      <hr />

      <h2>启用防作弊</h2>
      <p>
        打开任意面试的 <strong>设置</strong> 标签页，滚动至 <strong>防作弊模式</strong> 区域，开启 <strong>启用防作弊</strong>。
      </p>

      <DocImage
        src="/images/docs/anti-cheating-setting.webp"
        alt="面试设置中的防作弊开关及限制说明"
      />

      <h3>强制执行项</h3>
      <p>
        启用后，该面试下创建的每场会话都会强制执行以下限制：
      </p>
      <ul>
        <li>
          <strong>强制摄像头、麦克风与屏幕共享</strong> — 候选人无法跳过设备授权步骤。
        </li>
        <li>
          <strong>标签页切换与失焦跟踪</strong> — 每次离开面试标签页都会记录并打时间戳。
        </li>
        <li>
          <strong>阻止外部粘贴</strong> — 禁止粘贴面试页面外复制的内容。
        </li>
        <li>
          <strong>多显示器检测</strong> — 若检测到多屏，会向候选人发出警告。
        </li>
      </ul>

      <DocCallout variant="info">
        会话开始前会向候选人说明这些限制，避免临场意外。
      </DocCallout>

      <hr />

      <h2>候选人看到的内容</h2>
      <p>
        防作弊开启时，若候选人离开面试标签页（例如切换到其他应用或浏览器标签），返回后会看到 <strong>检测到离开页面</strong> 对话框。
      </p>

      <DocImage
        src="/images/docs/anti-cheating-violation.webp"
        alt="离开页面对话框：显示离开次数及达到上限的警告"
      />

      <DocSteps>
        <DocStep step={1} title="首次离开">
          <p>
            温和提示候选人已离开页面，并记录离开次数。
          </p>
        </DocStep>
        <DocStep step={2} title="多次离开">
          <p>
            每次后续离开都会累加计数。对话框提醒：所有离开行为均已记录，可能被审阅。
          </p>
        </DocStep>
        <DocStep step={3} title="达到上限">
          <p>
            达到限制后会出现警告：进一步离开将被标记供审阅。候选人仍可继续，但会话报告会突出这些事件。
          </p>
        </DocStep>
      </DocSteps>

      <hr />

      <h2>审阅违规记录</h2>
      <p>
        会话结束后，所有记录的离开与标记事件会出现在会话报告中。审阅者可查看候选人离开页面的次数、是否超过阈值，并纳入整体评估。
      </p>

      <DocImage
        src="/images/docs/integrity-log.webp"
        alt="诚信日志：25 条事件，含离开页面与阻止外部粘贴次数"
        bordered={false}
      />

      <DocCallout variant="tip" title="小贴士">
        高利害评估且诚信至关重要时，建议启用防作弊。轻松练习或用户研究类面试可关闭，以降低候选人摩擦。
      </DocCallout>
    </>
  );
}

export function questionsAndLibraryContentZh() {
  return (
    <>
      <h2>题型</h2>
      <p>
        每种题型向候选人呈现不同界面。可在同一场面试中混合使用，以评估多种能力。
      </p>

      <h3>开放式</h3>
      <p>
        自由语音或文字作答。适合行为题、沟通能力评估，以及没有唯一标准答案的 nuanced 主题。
      </p>

      <h3>单选与多选</h3>
      <p>
        提供若干选项。单选只能选一个；多选可选所有适用项。两种情况下，AI 都会要求候选人解释理由。
      </p>

      <h3>编程</h3>
      <p>
        面试界面会出现基于 Monaco 的代码编辑器（与 VS Code 同源）。候选人从下拉菜单选择语言，编写解法并点击 <strong>运行</strong> 执行。AI 实时观察代码，并可就思路追问。
      </p>
      <DocImage src="/images/docs/interview-coding.webp" alt="编程题：Monaco 编辑器、语言选择、运行按钮与 AI 聊天面板" />

      <h3>白板</h3>
      <p>
        基于 Excalidraw 的画布，用于流程图、架构图与可视化说明。AI 通过视觉实时观察白板，并就候选人的设计进行情境化追问。
      </p>
      <DocImage src="/images/docs/interview-whiteboard.webp" alt="白板题：Excalidraw 画布、绘图工具与 AI 聊天面板" />

      <h3>研究型</h3>
      <p>
        类似开放式，但 AI 会深入追问「为什么」「怎么做」「再多说说」以挖掘细节。面向用户研究面试。含研究型题目的会话除标准评估外，还会生成结构化 <strong>研究发现</strong>（主题与数据点）。
      </p>
      <DocImage src="/images/docs/research-findings.webp" alt="会话报告中的研究发现：提取的主题与数据点" />

      <DocCallout variant="info">
        编程与白板题中，AI 会实时观察候选人作答，并就其思路进行情境化追问。
      </DocCallout>

      <hr />

      <h2>题库</h2>
      <p>
        题库是可复用题目的中央仓库。保存一次即可加入任意面试，无需每次重新创建。
      </p>

      <DocImage src="/images/docs/question-library.webp" alt="题目页：搜索、类型筛选与题目列表" />

      <h3>保存与复用</h3>
      <p>
        编辑面试时，可将任意题目保存到题库。新建面试时，按标题、描述或类型搜索，一键添加。同一题目可出现在多场面试中。
      </p>

      <DocCallout variant="tip" title="小贴士">
        编辑题库题目时可选：更新所有使用该题的面试，或仅为当前面试创建独立副本。
      </DocCallout>
    </>
  );
}
