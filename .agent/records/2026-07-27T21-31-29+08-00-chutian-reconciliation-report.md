# Session Record: Chutian Expressway Reconciliation Report

- Time: 2026-07-27T21:31:29+08:00 Asia/Shanghai
- Window: 2026-07-27T21:10:24+08:00 to 2026-07-27T21:31:29+08:00
- Previous Record: `.agent/records/2026-07-27T21-10-24+08-00-chutian-asset-sample.md`
- Commit: pending
- Branch: main
- Task: 为楚天高速先做一份“公司财报到路产披露单元”的拆解报告，供用户校对后确定后续公司梳理模板。
- Source Sessions:
  - Harness: Codex
  - Evidence: 当前对话要求先拆解清楚一个公司；本地 git 状态；楚天高速 2025 年年度报告公开公告。
  - Checked: `README.md`, `AGENTS.md`, `project-memory/index.md`, `project-memory/status/current.md`, `docs/company-reconciliations/chutian-expressway-2025.md`
  - Used: 楚天高速 2025 年年度报告中的主要财务数据、业务分部、收费路产清单和路段收入成本披露。
  - Unavailable: 本地 `curl` 访问 `github.io` 仍超时，不能以当前环境直接回读线上页面。

## Outcome

- 新增 `docs/company-reconciliations/chutian-expressway-2025.md`。
- 报告按公司整体财报、业务分部、收费路产清单、路产披露单元、差额解释、在建/改扩建项目和不能硬拆字段组织。
- 明确楚天高速 2025 年路桥运营收入 23.80 亿元、成本 13.47 亿元可由 6 个披露单元完整勾稽。
- 明确汉宜高速、黄咸高速为多路段合并披露，不能强拆到单个路段。
- 更新 README 和当前状态，记录 `docs/company-reconciliations/` 为单家公司拆解报告目录。

## Engineering Context

- 这个报告验证了后续产品需要引入 `DisclosureUnit` 和 `FinancialReconciliation`，不能只靠 `RoadAsset` 存年度收入。
- 股票页后续应展示公司整体财报、路产披露单元、非路产业务和未拆差额，而不是只展示单条路卡片。
- 建造服务收入和成本应作为改扩建会计口径单独记录，不应混入通行费收入。
- 大广北高速减值影响公司利润，但不是路段通行运营成本。

## Open Questions And Risks

- 单路建设成本、开通时间、收费期限核准文件、车流量和货车占比仍需继续穿透来源。
- 楚天高速报告目前是 Markdown 样板，尚未结构化进前端数据模型。
