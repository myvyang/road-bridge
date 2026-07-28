# Alignment Log

## 2026-07-27T21:31:29+08:00

- Reflected commit: `ad21d97`
- Range: project start through `ad21d97`
- Changed pages: `project-memory/project/overview.md`, `project-memory/experience/lessons.md`, `project-memory/status/current.md`
- Absorbed records: `.agent/records/*.md` from 2026-07-27 project bootstrap through楚天高速财报勾稽报告。
- Pending records: none.
- Resolved context:
  - 项目方向从单纯地图原型升级为“公司整体财报 -> 业务分部 -> 路产披露单元 -> 单条路产”的研究和展示链路。
  - 地图是展示层，后续优先做上市公司、路产清单和财报口径勾稽。
  - GitHub Pages 是发布目标，页面需要保持静态导出能力。

## 2026-07-28T14:11:42+08:00

- Reflected commit: `39c59b7`
- Range: `ad21d97..39c59b7`
- Changed pages: `project-memory/project/overview.md`, `project-memory/experience/lessons.md`, `project-memory/status/current.md`
- Absorbed records:
  - `.agent/records/2026-07-28T09-21-58+08-00-expand-chutian-asset-report.md`
  - `.agent/records/2026-07-28T09-35-22+08-00-revenue-adjustment-principle.md`
  - `.agent/records/2026-07-28T09-38-57+08-00-ninghu-reconciliation-draft.md`
  - `.agent/records/2026-07-28T09-48-14+08-00-deepen-ninghu-road-assets.md`
  - `.agent/records/2026-07-28T09-56-18+08-00-add-ninghu-asset-master.md`
  - `.agent/records/2026-07-28T10-07-43+08-00-close-ninghu-research-loop.md`
  - `.agent/records/2026-07-28T10-34-46+08-00-close-jilin-research-loop.md`
  - `.agent/records/absorbed/2026-07-28/2026-07-28T14-11-42+08-00-post-jilin-product-and-report-cleanup.md`
- Pending records: none.
- Resolved context:
  - 楚天高速和宁沪高速已进入公开资产数据；吉林高速已完成研究报告但尚未进入公开资产和地图。
  - 宁沪高速收费期限补充核验已写入公开数据：宁扬长江大桥使用过渡期 5 年口径，锡宜高速使用苏交财〔2025〕27号暂不核定收费年限口径。
  - 宁沪报告应作为完成态研究稿维护，报告正文不写工作过程、后续追踪或入库过程。
  - 在建路产通行量预测公开页只展示一个基准预测值，内部台账保留预测来源、年份和口径。
  - 本地和 CI 构建不依赖 `next/font/google` 远程字体请求。
