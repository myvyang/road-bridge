# Session Record: Ninghu Reconciliation Draft

- Time: 2026-07-28T09:38:57+08:00 Asia/Shanghai
- Window: 2026-07-28T09:35:22+08:00 to 2026-07-28T09:38:57+08:00
- Previous Record: `.agent/records/2026-07-28T09-35-22+08-00-revenue-adjustment-principle.md`
- Commit: pending
- Branch: main
- Task: 用户决定先研究宁沪高速，因其处于发达地区且剔除建造收入后通行费纯度较高。
- Source Sessions:
  - Harness: Codex
  - Evidence: 当前对话；宁沪高速 2025 年年度报告公开披露；本地项目文档。
  - Checked: `docs/company-reconciliations/jiangsu-expressway-2025.md`, `project-memory/status/current.md`
  - Used: 宁沪高速 2025 年年度报告中的营业收入、剔除建造收入后的经营收入、通行费收入、业务分部收入成本、控股路桥运营数据和项目范围披露。
  - Unavailable: 尚未完成每条路的收费期限、收费里程、权益比例、运营主体和在建项目对应关系穿透。

## Outcome

- 新增 `docs/company-reconciliations/jiangsu-expressway-2025.md`。
- 报告明确宁沪高速 2025 年法定营业收入 202.89 亿元，剔除建造收入后经营收入 121.34 亿元，通行费收入 95.55 亿元。
- 按剔除建造后的口径，通行费纯度为 78.75%。
- 建立收费披露单元表，覆盖沪宁高速、广靖/锡澄、宁常/镇溧、锡宜/无锡环太湖、镇丹、常宜、宜长、五峰山、宁扬长江大桥。
- 初步列出沪宁高速、五峰山大桥、宁常/镇溧三个优先单路穿透方向。

## Engineering Context

- 宁沪高速适合作为第二家公司样板：发达地区、路产多、车流/货车/日均收入披露细、剔除建造收入后通行费纯度高。
- 年报对部分路产按组合披露，不能把广靖/锡澄、宁常/镇溧、锡宜/无锡环太湖收入成本强拆到单路。
- 宁沪后续要先补收费期限、收费里程、权益比例和在建项目，不急着更新地图。

## Open Questions And Risks

- 需要进一步核验控股新建路桥项目 3 个和直接参股路桥项目 4 个的具体名称、权益和财报影响。
- 清障业务收入很小但成本高，需要核费用归集口径。
