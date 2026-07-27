# 路桥资产地图

这是一个面向路桥 / 高速公路股票研究的地图网站原型。核心顺序是：先梳理上市路桥公司，再梳理这些公司的路产资产，最后把单条公路、桥梁和收费权资产标到地图上。

## 当前能力

- 地图页左侧 `2/3` 是地图，右侧 `1/3` 是选中路产信息。
- 地图页默认不选中路产，右侧为空态。
- 地图画布不放筛选卡片；按上市公司筛选和搜索入口在右侧默认空态里。
- 有高德地图 Web Key 时，地图页使用高德 JS API 作为国内地图底图。
- 没有地图 Key 或地图加载失败时，地图页仍保留本地兜底底图和路产线路。
- 点击地图线路或地图上的路产按钮后，只展示这条路本身的收费权、运营口径、归属股票和路产关系。
- 路产详情中的股票代码可进入股票资产清单页。
- 股票资产清单页不带地图，只展示该股票下面的路产资产；点击路产可回到地图并选中对应线路。
- 公开页面只展示路产事实；未确认字段留空，核验状态和研究备注不放到网页上。
- 楚天高速已按 2025 年报建立第一批完整路产样板，含权益比例、收费里程、收费期限、年度收入和披露口径。

## 数据原则

路桥公司本质上是收费权资产组合。公司层面的利润和现金流只能回答一部分问题，正式研究需要按单条路产建立台账：

- 建设费用或收购成本。
- 收费起止日、收费年限和剩余年限。
- 开通时间和改扩建节点。
- 历年单路收入、利润、车流、货车占比。
- 施工、分流、政策调整、收费权续期和政府回购安排。
- 年报合并披露时必须保留“合并披露”状态，不能强行拆分。
- 中国大陆路产地图几何统一维护为 GCJ-02 坐标系，点格式为 `[经度, 纬度]`。GPS/WGS84 原始点入库前要转换，不能直接叠到国内地图底图上。

## 地图配置

本地或托管环境配置高德地图 Key：

```bash
NEXT_PUBLIC_AMAP_KEY=你的高德Web端Key
```

如果高德控制台要求安全密钥，也同步配置：

```bash
NEXT_PUBLIC_AMAP_SECURITY_CODE=你的安全密钥
```

地图和数据策略见 `docs/map-provider.md`。

## 运行

```bash
npm install
npm run dev
```

构建校验：

```bash
npm run build
npm test
```

## GitHub Pages 发布

本项目发布到 GitHub Pages，仓库为 `myvyang/road-bridge` 时，线上路径是：

```text
https://myvyang.github.io/road-bridge/
```

发布方式：

1. GitHub 仓库 `Settings -> Pages -> Build and deployment -> Source` 选择 `GitHub Actions`。
2. 推送到 `main` 后，`.github/workflows/pages.yml` 会执行静态导出并部署 `out/`。
3. 如果需要真实高德底图，在仓库 `Settings -> Secrets and variables -> Actions` 中配置：

```text
NEXT_PUBLIC_AMAP_KEY
NEXT_PUBLIC_AMAP_SECURITY_CODE
```

本地验证 Pages 静态导出：

```bash
GITHUB_PAGES=true GITHUB_PAGES_BASE_PATH=/road-bridge npm run build:pages
```

## 项目结构

- `app/components/RoadAssetExplorer.tsx`：地图页和右侧路产详情。
- `app/stocks/[symbol]/page.tsx`：股票资产清单页。
- `app/data/companies.json`：公开展示用上市公司清单。
- `app/data/assets.json`：公开展示用路产资产数据。
- `app/data/roadAssets.ts`：字段类型、数据聚合和查询函数。
- `data/research-ledger.json`：内部研究台账，记录来源、字段状态和采集备注，不导入公开页面。
- `docs/data-model.md`：后续真实数据入库模型。
- `.github/workflows/pages.yml`：GitHub Pages 静态站发布流程。
- `project-memory/`：长期开发判断和当前状态。
