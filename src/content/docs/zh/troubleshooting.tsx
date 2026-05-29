import { DocCallout } from "@/components/docs/doc-callout";

export function audioAndConnectionContentZh() {
  return (
    <>
      <h2>麦克风无法使用</h2>
      <ol>
        <li>确认浏览器已授权麦克风（查看地址栏麦克风图标）</li>
        <li>确认面试界面选择了正确的输入设备</li>
        <li>关闭可能占用麦克风的其他应用（Zoom、Teams 等）</li>
        <li>在操作系统声音设置中验证麦克风是否正常</li>
        <li>尝试更换麦克风或重启浏览器</li>
      </ol>

      <DocCallout variant="tip" title="小贴士">
        开始前请使用面试前设置页的麦克风测试。
      </DocCallout>

      <hr />

      <h2>网络与连接</h2>
      <h3>要求</h3>
      <ul>
        <li>稳定网络（建议 2 Mbps 及以上）</li>
        <li>支持 WebSocket（wss://）— 多数网络默认允许</li>
        <li>实时语音需要较低延迟</li>
      </ul>

      <h3>防火墙与 VPN</h3>
      <p>
        企业防火墙或 VPN 可能阻止 WebSocket。可尝试切换网络（如手机热点），或请 IT 团队放行 WebSocket 流量。
      </p>

      <h3>若连接中断</h3>
      <p>
        聆悟会自动保存进度。返回同一面试链接即可从中断处继续。若出现重连按钮，请点击；否则刷新页面。
      </p>
      <ul>
        <li>使用稳定网络 — 避免会话中途切换 Wi-Fi</li>
        <li>保持浏览器标签页处于活动状态（部分浏览器会节流后台标签）</li>
        <li>关闭不必要的应用以释放带宽</li>
      </ul>
    </>
  );
}

export function browserAndVideoContentZh() {
  return (
    <>
      <h2>浏览器兼容性</h2>
      <p>
        建议使用<strong>桌面版 Google Chrome</strong>，以获得完整的语音、视频、代码编辑器与白板支持。
      </p>
      <ul>
        <li><strong>Firefox</strong> — 一般可用，但部分音频设备选择行为可能不同</li>
        <li><strong>Safari</strong> — 对部分语音、视频功能支持有限</li>
        <li><strong>移动浏览器</strong> — 聆悟可在移动端运行，但屏幕尺寸与后台标签行为可能影响体验。重要面试建议使用桌面端。</li>
      </ul>

      <DocCallout variant="info">
        请保持浏览器为最新版本。旧版本可能缺少聆悟依赖的 WebRTC 与音频 API 修复。
      </DocCallout>

      <hr />

      <h2>摄像头与屏幕共享</h2>
      <h3>摄像头无法使用</h3>
      <ol>
        <li>确认浏览器已授权摄像头（地址栏图标或站点设置）</li>
        <li>确认没有其他应用独占摄像头</li>
        <li>若有多个摄像头，尝试切换设备</li>
      </ol>

      <h3>屏幕共享</h3>
      <p>
        提示时选择要共享的窗口、标签页或整个屏幕。若选择器未出现，请先点击页面任意处再重试。
      </p>

      <h3>常见错误</h3>
      <ul>
        <li><strong>权限被拒绝</strong> — 在浏览器设置中重置摄像头/屏幕权限</li>
        <li><strong>黑屏</strong> — 确认摄像头未被遮挡且选择了正确设备</li>
        <li><strong>屏幕共享无法开始</strong> — 关闭后重试；必要时刷新页面</li>
      </ul>
    </>
  );
}
