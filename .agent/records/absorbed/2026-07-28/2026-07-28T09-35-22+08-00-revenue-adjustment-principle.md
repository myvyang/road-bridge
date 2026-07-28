# Session Record: Revenue Adjustment Principle

- Time: 2026-07-28T09:35:22+08:00 Asia/Shanghai
- Window: 2026-07-28T09:21:58+08:00 to 2026-07-28T09:35:22+08:00
- Previous Record: `.agent/records/2026-07-28T09-21-58+08-00-expand-chutian-asset-report.md`
- Commit: pending
- Branch: main
- Task: 记录建造服务收入剔除原则，并初步筛选通行费占比更高、更适合优先分析的路桥公司。
- Source Sessions:
  - Harness: Codex
  - Evidence: 当前对话；公开年报页面；项目文档和项目记忆。
  - Checked: `docs/data-model.md`, `docs/company-asset-research-plan.md`, `project-memory/experience/lessons.md`, `project-memory/status/current.md`
  - Used: 吉林高速、宁沪高速、赣粤高速、四川成渝、山东高速、楚天高速、龙江交通等 2025 年年报披露或摘要。
  - Unavailable: 福建高速 2025 年报通行费占比还未完成逐项核验。

## Outcome

- 在 `docs/data-model.md` 中新增财报调整口径，明确自身特许经营资产建设或改扩建相关建造服务收入和成本应从路产经营纯度中剔除。
- 在 `docs/data-model.md` 中新增经营事件重要性门槛：低于 20% 的短期扰动默认不进入主报告。
- 在 `docs/company-asset-research-plan.md` 中新增优先级口径和初步优先级观察表。
- 在项目记忆中记录建造服务调整原则、事件重要性门槛和下一步公司优先级。

## Engineering Context

- 后续公司页和研究报告需要同时保留 `reported_revenue`、`construction_service_revenue`、`adjusted_operating_revenue`、`toll_revenue`、`toll_revenue_share_reported` 和 `toll_revenue_share_adjusted`。
- 对外承接第三方工程、机电施工或运营服务不能自动剔除；只有与自身特许经营资产建设/改扩建相关、收入成本基本对等的建造服务应剔除。
- 当前初步优先级：吉林高速、宁沪高速、赣粤高速，然后核福建高速。

## Open Questions And Risks

- 需要进一步核验福建高速、粤高速、皖通高速等公司的剔除建造服务后通行费纯度。
- 下一步结构化模型需要支持调整后经营收入、通行费纯度和建造服务现金流桥表。
