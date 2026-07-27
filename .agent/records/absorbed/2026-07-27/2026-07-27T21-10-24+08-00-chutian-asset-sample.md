# 2026-07-27T21:10:24+08:00 Chutian Asset Sample

## 背景

- 用户确认按“先找上市公司，再找公司路产，再把路产标到地图”的逻辑继续落地。
- 本轮选择楚天高速作为第一家公司样板，把公开页面改成路产事实展示，不显示研究过程、核验状态或内部备注。

## 变更

- 新增 `app/data/companies.json` 和 `app/data/assets.json`，将公司和路产事实数据从 TypeScript 中拆出。
- 新增 `data/research-ledger.json`，记录楚天高速 2025 年年报来源、字段来源和披露口径，内部使用，不进入前端页面。
- 录入楚天高速 `600035.SH` 8 条收费路产：汉宜高速汉荆段、汉宜高速江宜段、大随高速、黄咸高速咸宁段、黄咸高速黄石段、大广北高速、新县高速、光山高速。
- 路产详情增加路线编号、起点/终点、拥有权益、年度成本、披露口径等字段；股票页资产清单同步展示这些字段。
- 更新 README、数据模型文档、公司资产采集计划和项目当前状态。
- 增加静态导出 HTML 测试，覆盖楚天高速股票页、路产字段展示和内部研究文本不泄漏。

## 验证

- `PATH="$HOME/.volta/tools/image/node/22.13.0/bin:$PATH" npm run lint`
- `PATH="$HOME/.volta/tools/image/node/22.13.0/bin:$PATH" npm test`
- `rg -n "research-ledger|Route geometry is|fieldStatus|sourceTitle" out .next/static --glob '!*.map'`
- `rg -n "待核验|样例|数据来源状态|需要穿透|sourceStatus|sourceNote|watchItems|status-pill|source-note" app out .next/static --glob '!*.map'`
- 本地浏览器截图验证因 Chrome 扩展拦截 `localhost` / `127.0.0.1` 未完成；静态导出内容已通过文件级检查。

## 后续

- 继续按同一模板处理下一家第一层收费公路平台，建议先做赣粤高速或福建高速。
- 对建设成本、开通时间和精确路线几何继续做来源穿透；公开页只展示已确认字段。
