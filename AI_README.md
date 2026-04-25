# AI_README

## 目的
- 帮助 AI（及协助开发者的自动化工具）快速理解此代码库的结构、关键文档与编辑约定。
- 规定当 AI 或开发者修改仓库中文件时，必须更新的记录和流程，以保持文档同步。

## 概览（快速导航）
- 根目录：包含项目入口与顶层配置（index.html, package.json, vite.config.js）。
- 文档：docs/（API、架构、开发流程、安全等）。
- 公共资源：public/（静态资源说明）。
- 服务端：server/（Express 路由与配置）。
- 前端源码：src/（入口 main.js、组件 components/、页面 pages/、样式 styles/、工具 utils/）。
- 配置：config/（app、database 等）。
- 测试：tests/（集成与单元测试目录）。

主要文档或参考文件：
- [README.md](README.md)
- [docs/README.md](docs/README.md)
- [docs/API.md](docs/API.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- [docs/SECURITY.md](docs/SECURITY.md)
- [server/README.md](server/README.md)
- [src/README.md](src/README.md)
- [public/README.md](public/README.md)
- [tests/README.md](tests/README.md)

（若新增重要文档，请在此列表追加链接。）

## 文档更新政策（必须遵守）
每次对代码库中任一文件进行修改后，AI 或开发者必须：
1. 在该次提交/变更中，更新 AI_README.md 中的对应条目（若结构/说明受影响）。
2. 在被修改的相关 .md 文件中添加一条变更记录（Change note），格式如下：

```
### 变更记录 - YYYY-MM-DD
- 文件：path/to/changed.file
- 作者：<自动化/用户名>
- 概要：一句话描述变更内容与原因
- 影响：简要说明对文档、API、行为的影响及需要回归验证的点
```

3. 在 PR 描述或提交信息中引用这条变更记录（方便审查）。

注：如果变更较小（仅注释或拼写），也应至少在 AI_README.md 中记录一次"微更改"条目。

## AI 操作指南（给自动化和模型）
- 在对仓库做出任何写操作前，先读取并遵守本文件中的更新政策。
- 执行修改后，自动把变更摘要加入到被修改的 .md 文件并更新 AI_README.md 的"最近变更"区域。
- 当生成文档或代码时，优先使用上面列出的主要文档作为引用来源。

## 变更模板（建议在 AI_README.md 保持"最近变更"短表）
- YYYY-MM-DD | 文件路径 | 作者 | 简要说明

示例：
- 2026-03-22 | README.md | AI-agent | 添加项目概览与文档更新规则

## 最近变更
- 2026-04-25 | src/pages/Home.js | AI-agent | 首页中间白色背景添加美食滚动展示区（从英雄区域移至热销与特色之间）
- 2026-04-25 | src/styles/main.css | AI-agent | 更新滚动展示区 CSS 样式（白色背景布局）
- 2026-04-25 | docs/CHANGELOG.md | AI-agent | 记录 v1.1.0 变更

## 审核与责任
- 所有自动化更新应在 Pull Request 中由人类审阅者批准（若仓库使用 PR 流程）。
- 自动化仅负责生成初稿与变更记录；最终文案与设计决策由项目维护者确认。

## 其他备注
- 若需自动化脚本（如 pre-commit 或 CI 步骤）来强制检查并提醒未更新 AI_README.md，请在 docs/DEVELOPMENT.md 中记录实现细节并在 CI 中加入检查项。

----
本文件由 AI 协助生成。后续修改请遵循"文档更新政策"并在此文件中记录。
