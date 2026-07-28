# Session Record: Add Ninghu Single Road Asset Master

- Time: 2026-07-28T09:56:18+08:00 Asia/Shanghai
- Window: 2026-07-28T09:48:14+08:00 to 2026-07-28T09:56:18+08:00
- Previous Record: `.agent/records/2026-07-28T09-48-14+08-00-deepen-ninghu-road-assets.md`
- Commit: pending
- Branch: main
- Task: Continue Ninghu Expressway research by moving from disclosure units to single road asset fields.
- Source Sessions:
  - Harness: Codex
  - Evidence: current conversation and local repository state
  - Checked: `README.md`, `AGENTS.md`, `project-memory/index.md`, `project-memory/status/current.md`, `project-memory/experience/lessons.md`, Ninghu 2025 annual report PDF text, 2025 tracking rating report PDF text
  - Used: Ninghu 2025 annual report, 中诚信国际 2025 年度跟踪评级报告
  - Unavailable: formal toll approval documents for Ningyang Yangtze River Bridge and post-expansion Xiyi toll term

## Outcome

Added a single road asset master table to `docs/company-reconciliations/jiangsu-expressway-2025.md`.

The table now records route direction, mileage, toll period, control or operating path, 2025 revenue disclosure basis, and ingestion judgment for the 12 controlled operating assets. The 11 assets disclosed in the 2024 year-end rating report have mileage and toll period. Ningyang Yangtze River Bridge remains partially blank because the formal toll approval source has not yet been captured.

Updated `project-memory/status/current.md` with the completed Ninghu asset master step and narrowed next tasks.

## Engineering Context

- Keep combined annual-report disclosure units combined. Guangjing/Xicheng, Xiyi/Huantaihu, and Ningchang/Zhenli are represented as separate assets but their revenue remains at the official combined disclosure unit.
- Do not manually calculate final economic ownership from layered subsidiaries. Record the disclosed direct or indirect project company holding first.
- Toll standards should become structured records with base rate, preferential policy, and effective period; they should not be stored as a single static amount.

## Open Questions And Risks

- Ningyang Yangtze River Bridge needs formal approval evidence for mileage, toll period, and toll standard before public-page ingestion.
- Xiyi Expressway needs follow-up evidence on whether the completed south-section expansion extends the toll term and when amortization changes.
- Wuxi Huantaihu, Ningchang, and Zhenli still need operating subject confirmation.
