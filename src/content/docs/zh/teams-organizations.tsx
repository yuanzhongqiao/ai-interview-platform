import { DocCallout } from "@/components/docs/doc-callout";
import { DocImage } from "@/components/docs/doc-image";

export function organizationsMembersAndRolesContentZh() {
  return (
    <>
      <h2>组织</h2>
      <p>
        组织是拥有所有面试、题目与会话的顶层账户。注册时，聆悟会自动为你创建 <strong>个人</strong> 组织。
      </p>
      <p>
        你可创建更多组织（例如每家公司一个），并通过侧边栏面包屑在组织间切换。
      </p>

      <h3>项目</h3>
      <p>
        每个组织可有多个 <strong>项目</strong>。项目将面试与题目归入同一范围——例如部门、岗位族或招聘批次。在同一面包屑中切换项目。
      </p>

      <DocCallout variant="tip" title="示例">
        组织「Acme Corp」可有项目「Engineering Q1」与「Product Internships」。
      </DocCallout>

      <hr />

      <h2>成员</h2>
      <p>
        前往 <strong>组织 &gt; 设置 &gt; 成员</strong> 查看谁有访问权限。
      </p>
      <DocImage src="/images/docs/org-members.webp" alt="组织成员页：成员表格与添加成员按钮" />
      <p>
        点击 <strong>+ 添加成员</strong>，输入对方邮箱并选择角色。若对方尚无聆悟账号，将收到邀请。
      </p>

      <h3>角色</h3>
      <ul>
        <li><strong>所有者</strong> — 完全权限，含成员管理与删除</li>
        <li><strong>管理员</strong> — 可管理面试、题目、成员与设置</li>
        <li><strong>成员</strong> — 可创建与编辑面试、查看结果、管理题目</li>
      </ul>
      <p>
        可随时在成员表中修改角色或移除成员。
      </p>

      <DocCallout variant="info">
        可向组织邀请不限数量的团队成员。
      </DocCallout>
    </>
  );
}
