# FreightCalcHub

FreightCalcHub 是一个免费的英文物流计算器网站，面向电商卖家、发货团队、货运协调人员、仓库规划人员和物流运营人员。

网站提供基于浏览器本地计算的工具，用于估算包裹计费重量、LTL 货运密度与 freight class、托盘装载、集装箱装载和仓库存储空间。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest
- 前端本地计算逻辑，不依赖后端接口

## 主要功能

- 10 个独立计算器页面
- 每个计算器页面包含独立 SEO metadata、说明内容、示例和 FAQ
- 计算器优先的页面布局
- 响应式 B2B 工具站 UI
- 顶部导航支持 calculator 分类下拉
- 自动生成 `sitemap.xml`
- 自动生成 `robots.txt`
- About / Contact / Privacy Policy / Terms of Use 页面
- 预留 Google AdSense 集成
- 未配置 AdSense client id 时，广告位不会渲染

## 计算器页面

- Dimensional Weight Calculator
- Freight Class Calculator
- Freight Density Calculator
- Actual vs Dimensional Weight Calculator
- Pallet Calculator
- Cases per Pallet Calculator
- Container Loading Calculator
- Cartons per Container Calculator
- Warehouse Space Calculator
- Pallet Storage Calculator

## 项目目录

```text
app/                     Next.js 路由和页面
components/              共享 UI 与计算器组件
lib/                     站点配置、内容数据、SEO 工具、计算逻辑
tests/                   Vitest 测试
docs/                    内部规划和设计文档
```

## 本地开发

安装依赖：

```bash
pnpm install
```

启动开发服务：

```bash
pnpm dev
```

打开：

```text
http://localhost:3000
```

## 环境变量

需要时创建 `.env.local`：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

说明：

- `NEXT_PUBLIC_SITE_URL` 用于 canonical URL、sitemap 和 robots。
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 用于启用 AdSense 脚本和广告位。
- 如果没有设置 AdSense client id，广告位不会渲染。

## 验证命令

部署前建议运行：

```bash
pnpm test
pnpm typecheck
pnpm build
```

测试会检查：

- 计算逻辑
- 内容质量
- Privacy Policy 必备章节
- 首页结构
- 计算器优先的页面布局
- 顶部导航一致性

## 部署

推荐部署到 Vercel。

Vercel 常用配置：

```text
Framework: Next.js
Install Command: pnpm install
Build Command: pnpm build
Output: Next.js default
```

部署后建议：

- 设置 `NEXT_PUBLIC_SITE_URL` 为正式域名。
- 确认 `/sitemap.xml` 可访问。
- 确认 `/robots.txt` 可访问。
- 在 Google Search Console 提交 sitemap。
- 站点准备好申请广告后，再配置 `NEXT_PUBLIC_ADSENSE_CLIENT_ID`。

## AdSense 准备情况

当前项目包含：

- 原创计算器说明内容
- Worked example
- FAQ
- 估算结果免责声明
- Privacy Policy
- Terms of Use
- Contact 页面
- 未配置广告时不显示假广告位

注意：所有计算结果都是规划估算。用户在做实际发货、报价、仓储或装载决策前，应确认 carrier、NMFC、warehouse 或 loading requirements。
