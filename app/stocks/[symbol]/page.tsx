import Link from "next/link";
import { ArrowLeft, ExternalLink, Route } from "lucide-react";
import {
  getAssetsByCompany,
  getCompanyBySymbol,
  isPublicAssetValue,
  listedRoadCompanies,
} from "../../data/roadAssets";

export function generateStaticParams() {
  return listedRoadCompanies.flatMap((company) =>
    company.symbols.map((symbol) => ({ symbol })),
  );
}

export default async function StockAssetPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const decodedSymbol = decodeURIComponent(symbol).toUpperCase();
  const company = getCompanyBySymbol(decodedSymbol);

  if (!company) {
    return (
      <main className="stock-page">
        <Link className="back-link" href="/">
          <ArrowLeft size={16} />
          回到地图
        </Link>
        <section className="stock-hero">
          <h1>未找到股票</h1>
          <p>{decodedSymbol} 还没有绑定路桥上市公司资产清单。</p>
        </section>
      </main>
    );
  }

  const assets = getAssetsByCompany(company.id);

  return (
    <main className="stock-page">
      <Link className="back-link" href="/">
        <ArrowLeft size={16} />
        回到地图
      </Link>

      <section className="stock-hero">
        <div>
          <p className="eyebrow">路桥股票资产清单</p>
          <h1>{company.name}</h1>
          <p>{company.note}</p>
        </div>
        <div className="stock-symbols" aria-label="证券代码">
          {company.symbols.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="stock-assets" aria-label="路产清单">
        {assets.map((asset) => {
          const ledgerItems = [
            ["路线编号", asset.routeCode],
            ["拥有权益", asset.ownership],
            ["收费期限", asset.tollTerm],
            ["年度收入", asset.annualRevenue],
            ["披露口径", asset.disclosureScope],
          ].filter(([, value]) => isPublicAssetValue(value));

          return (
            <article className="stock-asset-card" key={asset.id}>
              <div>
                <div className="asset-card-title">
                  <Route size={18} />
                  <h2>{asset.name}</h2>
                </div>
                <p>{asset.corridor}</p>
                <div className="tag-row">
                  <span className="tag">{asset.province}</span>
                  <span className="tag">{asset.assetType}</span>
                  <span className="tag">{asset.lengthKm} km</span>
                  {isPublicAssetValue(asset.endpoints) ? (
                    <span className="tag">{asset.endpoints}</span>
                  ) : null}
                </div>
              </div>
              {ledgerItems.length ? (
                <dl className="asset-mini-ledger">
                  {ledgerItems.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <Link className="map-link" href={`/?asset=${asset.id}`}>
                地图中查看
                <ExternalLink size={14} />
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
