import { DocCallout } from "@/components/docs/doc-callout";
import { DocFeature, DocFeatureGrid } from "@/components/docs/doc-feature-grid";
import { DocImage } from "@/components/docs/doc-image";
import { DocStep, DocSteps } from "@/components/docs/doc-steps";

export function candidatesLinksAndTrackingContentZh() {
  return (
    <>
      <h2>添加候选人</h2>
      <p>
        打开面试，进入 <strong>会话</strong> 标签页，点击 <strong>+ 添加</strong>。下拉菜单提供三种方式：
      </p>

      <DocImage src="/images/docs/sessions-add-dropdown.webp" alt="会话标签页：添加下拉菜单，含单独创建、Excel 导入、简历导入" />

      <DocSteps>
        <DocStep step={1} title="单独创建">
          <p>填写候选人姓名、邮箱，以及电话、学校、工作经历等可选信息。也可上传简历自动填充字段。</p>
          <DocImage src="/images/docs/create-individually.webp" alt="单独创建对话框：姓名、邮箱、电话、学校与简历上传" />
        </DocStep>
        <DocStep step={2} title="Excel 导入">
          <p>下载模板，填写会话信息并上传文件。每行至少需填写姓名。</p>
          <DocImage src="/images/docs/import-excel.webp" alt="导入会话对话框：模板下载与文件上传区域" />
        </DocStep>
        <DocStep step={3} title="简历导入">
          <p>上传 PDF 简历，由 AI 根据你配置的 LLM 提供商自动提取候选人信息。</p>
          <DocImage src="/images/docs/import-resumes.webp" alt="简历导入对话框：已上传 PDF 与解析按钮" />
        </DocStep>
      </DocSteps>

      <hr />

      <h2>链接类型</h2>
      <DocFeatureGrid>
        <DocFeature title="公开链接">
          持有 URL 的任何人可开始会话。适用于招聘启事或大范围分发。在 <strong>设置</strong> 标签页的 <strong>可分享链接</strong> 中启用。
        </DocFeature>
        <DocFeature title="仅邀请链接">
          每位候选人获得与其邮箱绑定的专属链接。适合精确控制参与者。在会话标签页复制各候选人链接。
        </DocFeature>
      </DocFeatureGrid>

      <hr />

      <h2>会话状态</h2>
      <ul>
        <li><strong>未开始</strong> — 候选人尚未打开链接</li>
        <li><strong>进行中</strong> — 候选人正在参加面试</li>
        <li><strong>已完成</strong> — 会话结束，可查看 AI 分析</li>
      </ul>
      <p>
        在会话标签页按状态筛选，聚焦进行中或已完成的会话。
      </p>

      <h2>续考与重考</h2>
      <p>
        若候选人未完成即离开，可返回同一链接从中断处继续。若需全新会话（例如因技术问题），可使用 <strong>重考</strong>——原会话保留以便对比。
      </p>

      <DocCallout variant="info">
        每次重考都会创建独立会话，拥有各自的转录与评分。
      </DocCallout>
    </>
  );
}
