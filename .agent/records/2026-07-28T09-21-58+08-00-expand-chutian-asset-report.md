# Session Record: Expand Chutian Asset Report

- Time: 2026-07-28T09:21:58+08:00 Asia/Shanghai
- Window: 2026-07-27T21:31:29+08:00 to 2026-07-28T09:21:58+08:00
- Previous Record: `.agent/records/absorbed/2026-07-27/2026-07-27T21-31-29+08-00-chutian-reconciliation-report.md`
- Commit: pending
- Branch: main
- Task: 用户确认楚天报告方向后，要求补全更全面的路产核心字段和单条路资产拆解。
- Source Sessions:
  - Harness: Codex
  - Evidence: 当前对话；楚天高速 2025 年年度报告；项目文档和项目记忆。
  - Checked: `README.md`, `AGENTS.md`, `project-memory/index.md`, `project-memory/status/current.md`, `docs/company-reconciliations/chutian-expressway-2025.md`
  - Used: 楚天高速 2025 年年报中的主要财务数据、业务分部、成本构成、收费权益表、路段收入成本表、经营分析、重大项目进展和会计估计变更。
  - Unavailable: 年报未披露各路段日均车流量、货车占比、完整车型收费标准、单路原始建设成本和单段收入成本拆分。

## Outcome

- 将 `docs/company-reconciliations/chutian-expressway-2025.md` 从财报勾稽样板扩展为完整资产研究底稿样板。
- 新增核心字段完整度表，区分已确认、部分确认和未确认字段。
- 新增路桥运营成本结构，明确折旧摊销和养护成本对毛利影响。
- 新增 8 条收费路产的单条资产卡片。
- 新增重大项目和事件表，包括汉宜改扩建、大广北 REITs、嘉鱼桥退出、交通流量模型调整和大广北减值。
- 更新项目当前状态，记录后续应把该报告结构沉淀成结构化数据模型。

## Engineering Context

- 路产核心字段应覆盖路名、路线编号、两端城市、权益比例、收费里程、营运期限、营收、成本、毛利、建设/收购成本、车流、货车占比、收费标准、折旧摊销、养护、债务和重大事件。
- 楚天 2025 年报不能支持把汉宜高速拆到汉荆段/江宜段，也不能支持把黄咸高速拆到咸宁段/黄石段；报告保留披露单元口径。
- 单路报告中允许列“仍缺”字段，但不能把缺字段伪装成已确认事实。

## Open Questions And Risks

- 下一步需要设计结构化数据模型，支持 `CompanyFinancials`、`BusinessSegment`、`DisclosureUnit`、`RoadAsset`、`RoadEvent` 和 `SourceCoverage`。
- 赣粤高速应按该报告模板做第二家公司样板，优先做财报和路产口径，不急着补地图。
