import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocLink } from "@/components/docs/doc-link";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function practicesOverviewContentZh() {
  return (
    <>
      <h2>练习能做什么</h2>
      <p>
        练习让你针对已有面试中的题目进行演练，而无需创建真实候选人会话。每次练习都会打开专注的教练体验：AI 提问、倾听你的回答、为本次作答打分，并在进入下一题前给出具体反馈。
      </p>

      <DocImage
        src="/images/docs/practices-session.webp"
        alt="练习会话：AI 教练反馈、分数与建议答案面板"
      />

      <DocFeatureGrid>
        <DocFeature title="与面试同源">
          练习使用团队已编写的同一套面试题目，演练与真实岗位、评分标准与题目顺序保持一致。
        </DocFeature>
        <DocFeature title="语音优先教练">
          专注练习默认以语音模式开始，录制回答、生成转录，并评估回答质量与表达信号。
        </DocFeature>
        <DocFeature title="每答必有反馈">
          每次提交都会得到分数、结论、优势、改进点、缺失信号与下一步教练建议。
        </DocFeature>
        <DocFeature title="建议答案">
          在已配置练习上下文时，侧边栏可生成贴合岗位的结构化参考答案。
        </DocFeature>
      </DocFeatureGrid>

      <h2>在哪里找到练习</h2>
      <ul>
        <li>
          <strong>全局练习页</strong> — 打开 <DocLink href="/practices">/practices</DocLink>，查看当前项目下各场面试的练习记录。
        </li>
        <li>
          <strong>面试准备标签</strong> — 打开某场面试，进入 <strong>练习</strong> 标签管理上下文并查看该面试的练习记录。
        </li>
        <li>
          <strong>专注练习模式</strong> — 点击 <strong>练习面试</strong>，在新标签页打开独立练习会话。
        </li>
      </ul>

      <DocCallout variant="info" title="练习不是候选人会话">
        练习会话与真实面试会话分开保存，不占用会话时长、不出现在候选人结果中，也不会替代已完成的候选人面试。
      </DocCallout>

      <h2>会保存什么</h2>
      <p>
        聆悟会保存练习会话与作答记录，便于跟踪长期进步。保存内容包括面试、练习模式、状态、开始与完成时间、总时长、已提交回答、逐题反馈、尝试次数、平均分与最高分。
      </p>
    </>
  );
}

export function settingUpPracticeContextContentZh() {
  return (
    <>
      <h2>为什么上下文很重要</h2>
      <p>
        练习上下文为 AI 教练提供背景，用于判断回答是否体现了目标信号。没有上下文时，聆悟仍可评估清晰度与结构；有了上下文，还能指出应引用哪些简历证据、缺少哪些岗位期望，以及如何让回答更贴合机会本身。
      </p>

      <DocImage
        src="/images/docs/practices-context.webp"
        alt="练习上下文设置：公司、职位、职位描述与简历备注"
      />

      <DocSteps>
        <DocStep step={1} title="打开面试的练习标签">
          <p>
            在面试编辑器中选择 <strong>练习</strong>。该标签展示历史练习记录，并包含上下文设置入口。
          </p>
        </DocStep>
        <DocStep step={2} title="点击「上下文」">
          <p>
            打开上下文抽屉，填写公司名称、职位名称、职位描述、简历要点，或任何 AI 教练应考虑的岗位背景。
          </p>
        </DocStep>
        <DocStep step={3} title="生成示例前先保存">
          <p>
            保存上下文后再生成建议答案最有价值，答案可引用目标岗位与候选人最有力的经历证据。
          </p>
        </DocStep>
      </DocSteps>

      <h2>建议填写内容</h2>
      <ul>
        <li>
          <strong>职位描述</strong> — 职责、必备技能、职级与成功标准。
        </li>
        <li>
          <strong>简历要点</strong> — 成就、项目、指标、工具与领导力案例，便于在回答中复用。
        </li>
        <li>
          <strong>公司与职位名称</strong> — 足够让 AI 校准语气、具体程度与业务影响。
        </li>
      </ul>

      <DocCallout variant="tip" title="保持上下文简洁">
        粘贴最关键的岗位与简历信息，而非冗长档案。更好的上下文通常意味着更少但更清晰的信号：范围、指标、约束、工具与影响。
      </DocCallout>
    </>
  );
}

export function runningAPracticeSessionContentZh() {
  return (
    <>
      <h2>开始练习</h2>
      <p>
        打开某场面试的 <strong>练习</strong> 标签，点击 <strong>练习面试</strong>。聆悟会在 <code>/practice/[interviewId]</code> 打开专注练习模式，并为当前登录用户新建一场练习会话。
      </p>

      <DocImage
        src="/images/docs/practices-session.webp"
        alt="专注练习模式：语音作答编辑器、AI 反馈与建议答案面板"
      />

      <DocSteps>
        <DocStep step={1} title="听题">
          <p>
            AI 教练以语音模式朗读当前题目，并将活跃题目固定在会话顶部。
          </p>
        </DocStep>
        <DocStep step={2} title="语音作答">
          <p>
            录制你的回答。转录会显示在编辑器中，提交前可先审阅。
          </p>
        </DocStep>
        <DocStep step={3} title="提交获取反馈">
          <p>
            聆悟为回答打分、流式输出教练反馈、保存本次尝试，并更新该题的最佳分数。
          </p>
        </DocStep>
        <DocStep step={4} title="重试或继续">
          <p>
            根据反馈修改回答、对同一题再次练习，或通过编辑器导航进入下一题。
          </p>
        </DocStep>
      </DocSteps>

      <h2>理解反馈</h2>
      <p>练习反馈旨在可执行，而非空泛评语。</p>
      <ul>
        <li>
          <strong>分数</strong> — 0–10 的质量信号。
        </li>
        <li>
          <strong>结论与摘要</strong> — 主要教练解读。
        </li>
        <li>
          <strong>优势</strong> — 已做得好的部分，应保留。
        </li>
        <li>
          <strong>改进与缺失信号</strong> — 下次尝试应补充的内容。
        </li>
        <li>
          <strong>语音表达</strong> — 在有音频时提供语速、清晰度、自信度与表达建议。
        </li>
      </ul>

      <h2>如何使用建议答案</h2>
      <p>
        建议答案面板可根据题目、题型、职位描述与简历上下文生成结构化回答。请将其作为学习辅助，而非照读脚本。目标是掌握结构与证据模式，再用自己的话作答。
      </p>

      <DocCallout variant="info" title="自托管说明">
        练习评分与建议答案使用你配置的 LLM 提供商。语音练习还需使用你配置的中继与 TTS 提供商。开源版本将练习会话与真实候选人会话分开存储，且不包含商业版用量控制。
      </DocCallout>
    </>
  );
}

export function reviewingPracticeProgressContentZh() {
  return (
    <>
      <h2>练习仪表板</h2>
      <p>
        练习仪表板提供项目级视图，查看已保存的练习记录。适合判断学习者在多次尝试中是否进步，以及清理旧练习数据。
      </p>

      <DocImage
        src="/images/docs/practices-dashboard.webp"
        alt="练习仪表板：指标、筛选、分数、次数、模式与导出"
      />

      <h3>指标</h3>
      <ul>
        <li>
          <strong>练习总数</strong> — 当前范围内匹配的练习会话数量。
        </li>
        <li>
          <strong>已完成</strong> — 已结束并保存的会话。
        </li>
        <li>
          <strong>平均分</strong> — 已评分练习会话的平均分。
        </li>
        <li>
          <strong>平均时长</strong> — 典型练习耗时。
        </li>
      </ul>

      <h3>表格列</h3>
      <p>
        每行显示面试标题、会话状态、平均分、已提交次数、模式、时长、开始时间、完成时间，以及再次练习该面试的快捷操作。
      </p>

      <h2>筛选与导出</h2>
      <DocFeatureGrid>
        <DocFeature title="搜索">
          按面试标题或状态查找会话。
        </DocFeature>
        <DocFeature title="时间范围">
          按近期活动筛选，如过去一天、一周、一月或一季度。
        </DocFeature>
        <DocFeature title="状态">
          缩小至已完成、进行中或已放弃的练习。
        </DocFeature>
        <DocFeature title="XLSX 导出">
          下载筛选后的练习行，含分数、次数、时长与时间戳。
        </DocFeature>
      </DocFeatureGrid>

      <h2>删除练习会话</h2>
      <p>
        选中一行或多行，点击 <strong>删除</strong>。将永久删除所选练习会话及其保存的尝试记录。真实面试会话与候选人结果不受影响。
      </p>

      <DocCallout variant="tip" title="建议先按面试查看">
        最清晰的教练闭环是先从单场面试的 <strong>练习</strong> 标签入手。需要对比整个项目活动时，再使用全局练习页。
      </DocCallout>
    </>
  );
}
