import { DocCallout } from "@/components/docs/doc-callout";
import { DocImage } from "@/components/docs/doc-image";

export function resultsAnalysisAndExportContentZh() {
  return (
    <>
      <h2>结果概览</h2>
      <p>
        结果页展示某场面试下的所有会话，含状态徽章、分数、消息数与时长。可按状态或日期范围筛选，并按参与者姓名搜索。
      </p>

      <DocImage src="/images/docs/interview-results.webp" alt="结果页：已完成会话及分数与状态徽章" />

      <h3>会话报告</h3>
      <p>
        点击任意会话行打开完整报告，包含候选人信息、平均分、摘要以及逐题详细评估。
      </p>

      <DocImage src="/images/docs/session-report.webp" alt="会话报告页眉：候选人信息、完成状态、平均分与 AI 摘要" />

      <hr />

      <h2>AI 分析</h2>
      <p>
        候选人完成会话后，聆悟会自动生成：
      </p>
      <ul>
        <li><strong>会话摘要</strong> — 表现、沟通风格与关键主题的简明概览</li>
        <li><strong>逐题评估</strong> — 从质量、相关性与深度评估每道回答，满分 10 分</li>
        <li><strong>亮点</strong> — 候选人回答中最突出的部分</li>
        <li><strong>改进空间</strong> — 可能需要跟进的缺口或薄弱点</li>
      </ul>

      <DocImage src="/images/docs/question-evaluation.webp" alt="逐题评估：分数、优势与改进建议" />

      <h3>维度评分</h3>
      <p>
        除单题分数外，AI 还会在多个维度生成评估分，例如领域专长、沟通清晰度与战略思维。每个维度包含分数与详细说明。
      </p>

      <DocImage src="/images/docs/assessment-scores.webp" alt="维度评分：领域专长、趋势意识、战略思维与沟通等" />

      <DocCallout variant="tip" title="小贴士">
        可先阅读会话摘要，快速筛选候选人，再深入完整转录。
      </DocCallout>

      <h3>研究发现</h3>
      <p>
        对于含研究型题目的面试，聆悟还会提取结构化发现：<strong>主题</strong>（主题、痛点、偏好）与<strong>数据点</strong>（具体事实、数字或陈述）。主题帮助发现跨会话模式；数据点为报告提供可引用证据。
      </p>

      <DocImage src="/images/docs/research-findings.webp" alt="研究发现：从研究型面试提取的主题与详细数据点" />

      <DocCallout variant="info">
        研究发现仅针对包含研究型题目的会话生成。标准开放式题目会生成评估与分数。
      </DocCallout>

      <h3>语气与沟通</h3>
      <p>
        聆悟会分析候选人在各回答中的沟通风格——检测自信程度、语气一致性与清晰度。每题会标注语气（如自信、中性）与影响（高、低），便于快速了解面试情境下的表达表现。
      </p>

      <DocImage src="/images/docs/tone-communication.webp" alt="语气与沟通分析：逐题自信度与影响评级" />

      <hr />

      <h2>导出</h2>
      <p>
        可将会话结果导出为 <strong>XLSX</strong>（便于在 Excel 或 Google 表格中分析）或 <strong>PDF</strong>（格式化报告）。结果页与单份报告页均提供导出按钮。
      </p>
      <p>导出内容包括：</p>
      <ul>
        <li>会话元数据（候选人、面试、日期）</li>
        <li>带时间戳的完整转录</li>
        <li>逐题评估与分数</li>
        <li>AI 摘要与亮点</li>
        <li>研究发现（如有）</li>
      </ul>
    </>
  );
}
