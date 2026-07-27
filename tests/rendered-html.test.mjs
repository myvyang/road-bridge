import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function readExportedHtml(path = "index.html") {
  return readFile(new URL(`../out/${path}`, import.meta.url), "utf8");
}

test("exports the road asset map shell", async () => {
  const html = await readExportedHtml();
  assert.match(html, /<title>路桥资产地图<\/title>/i);
  assert.match(html, /路桥资产地图/);
  assert.match(html, /上市公司/);
  assert.match(html, /搜索路名、公司、股票代码/);
  assert.match(html, /未选择路产/);
  assert.match(html, /右侧只显示这条路本身的收费权、运营和归属信息/);
  assert.match(html, /fallback-routes/);
  assert.doesNotMatch(html, /(?:href|src)="\/(?!road-bridge\/)/);
  assert.doesNotMatch(html, /待核验|样例|数据来源状态|需要穿透/);
  assert.doesNotMatch(html, /map-controls|map-brand|asset-strip/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("exports a stock asset list without the map workspace", async () => {
  const html = await readExportedHtml("stocks/600377.SH/index.html");
  assert.match(html, /路桥股票资产清单/);
  assert.match(html, /江苏宁沪高速公路股份有限公司/);
  assert.match(html, /沪宁高速江苏段/);
  assert.match(html, /地图中查看/);
  assert.doesNotMatch(html, /待核验|样例|数据来源状态|需要穿透/);
  assert.doesNotMatch(html, /id="asset-map"/);
});

test("starter preview is removed from the finished site", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /RoadAssetExplorer/);
  assert.match(layout, /lang="zh-CN"/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /leaflet|vinext|wrangler/);

  await assert.rejects(readFile(new URL("../app/_sites-preview/SkeletonPreview.tsx", templateRoot)));
});
