"use client";

import Link from "next/link";
import {
  Building2,
  CalendarClock,
  ExternalLink,
  GitBranch,
  Layers,
  Route,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getCompany,
  getRelatedAssets,
  isPublicAssetValue,
  listedRoadCompanies,
  roadAssets,
  type RoadAsset,
} from "../data/roadAssets";

type AMapPolyline = {
  on: (eventName: "click", handler: () => void) => void;
};

type AMapMap = {
  add: (overlays: AMapPolyline[]) => void;
  remove: (overlays: AMapPolyline[]) => void;
  setFitView: (
    overlays?: AMapPolyline[],
    immediately?: boolean,
    avoid?: [number, number, number, number],
    maxZoom?: number,
  ) => void;
  destroy: () => void;
};

type AMapNamespace = {
  Map: new (
    container: string | HTMLElement,
    options: {
      center: [number, number];
      zoom: number;
      resizeEnable?: boolean;
      viewMode?: "2D" | "3D";
    },
  ) => AMapMap;
  Polyline: new (options: {
    path: [number, number][];
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    lineJoin: "round";
    lineCap: "round";
    zIndex: number;
    extData: { assetId: string };
  }) => AMapPolyline;
};

declare global {
  interface Window {
    AMap?: AMapNamespace;
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

let amapLoadPromise: Promise<AMapNamespace> | null = null;

function pathOf(asset: RoadAsset): [number, number][] {
  return asset.geometry.path;
}

function loadAmap(key: string, securityCode?: string) {
  if (window.AMap) {
    return Promise.resolve(window.AMap);
  }

  if (!amapLoadPromise) {
    amapLoadPromise = new Promise((resolve, reject) => {
      if (securityCode) {
        window._AMapSecurityConfig = { securityJsCode: securityCode };
      }

      const script = document.createElement("script");
      script.id = "amap-js-api";
      script.async = true;
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;
      script.onload = () => {
        if (window.AMap) {
          resolve(window.AMap);
          return;
        }
        reject(new Error("AMap JS API loaded without window.AMap"));
      };
      script.onerror = () => reject(new Error("Failed to load AMap JS API"));
      document.head.appendChild(script);
    });
  }

  return amapLoadPromise;
}

function assetsForMap(visibleAssets: RoadAsset[], selectedAsset: RoadAsset | null) {
  const baseAssets = visibleAssets.length ? visibleAssets : roadAssets;
  if (!selectedAsset || baseAssets.some((asset) => asset.id === selectedAsset.id)) {
    return baseAssets;
  }
  return [selectedAsset, ...baseAssets];
}

function boundsFor(assets: RoadAsset[]) {
  const points = assets.flatMap((asset) => pathOf(asset));
  const lngs = points.map(([lng]) => lng);
  const lats = points.map(([, lat]) => lat);

  return {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
  };
}

function projectPoint(
  [lng, lat]: [number, number],
  bounds: ReturnType<typeof boundsFor>,
) {
  const lngRange = bounds.maxLng - bounds.minLng || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;
  const x = 70 + ((lng - bounds.minLng) / lngRange) * 860;
  const y = 80 + (1 - (lat - bounds.minLat) / latRange) * 820;
  return [x, y] as const;
}

function fallbackPath(asset: RoadAsset, bounds: ReturnType<typeof boundsFor>) {
  return pathOf(asset)
    .map((point, index) => {
      const [x, y] = projectPoint(point, bounds);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function matchesAsset(asset: RoadAsset, query: string) {
  const company = getCompany(asset.ownerCompanyId);
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  return [
    asset.name,
    asset.corridor,
    asset.province,
    asset.assetType,
    company?.name ?? "",
    company?.shortName ?? "",
    ...(company?.symbols ?? []),
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

export function RoadAssetExplorer() {
  const [query, setQuery] = useState("");
  const [companyId, setCompanyId] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapProvider, setMapProvider] = useState<"fallback" | "amap" | "failed">("fallback");
  const mapRef = useRef<AMapMap | null>(null);
  const overlaysRef = useRef<AMapPolyline[]>([]);

  const visibleAssets = useMemo(() => {
    return roadAssets.filter((asset) => {
      const matchesCompany =
        companyId === "all" || asset.ownerCompanyId === companyId;
      return matchesCompany && matchesAsset(asset, query);
    });
  }, [companyId, query]);

  const selectedAsset = selectedId ? roadAssets.find((asset) => asset.id === selectedId) ?? null : null;
  const displayedAssets = useMemo(
    () => assetsForMap(visibleAssets, selectedAsset),
    [selectedAsset, visibleAssets],
  );
  const fallbackBounds = useMemo(() => boundsFor(displayedAssets), [displayedAssets]);

  const selectAsset = useCallback((assetId: string | null) => {
    setSelectedId(assetId);
    const url = new URL(window.location.href);
    if (assetId) {
      url.searchParams.set("asset", assetId);
    } else {
      url.searchParams.delete("asset");
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const assetId = params.get("asset");
    const asset = assetId ? roadAssets.find((candidate) => candidate.id === assetId) : null;
    if (asset) {
      queueMicrotask(() => {
        setSelectedId(asset.id);
        setCompanyId(getCompany(asset.ownerCompanyId)?.id ?? "all");
      });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY?.trim();
    const amapSecurityCode = process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE?.trim();

    if (!amapKey) {
      return;
    }

    loadAmap(amapKey, amapSecurityCode).then((AMap) => {
      if (cancelled || mapRef.current) {
        return;
      }

      const map = new AMap.Map("asset-map", {
        center: [119.3, 30.9],
        zoom: 6,
        resizeEnable: true,
        viewMode: "2D",
      });
      mapRef.current = map;
      setMapProvider("amap");
    }).catch(() => {
      if (!cancelled) {
        setMapProvider("failed");
      }
    });

    return () => {
      cancelled = true;
      overlaysRef.current = [];
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const AMap = window.AMap;
    if (mapProvider !== "amap" || !map || !AMap) {
      return;
    }

    if (overlaysRef.current.length) {
      map.remove(overlaysRef.current);
      overlaysRef.current = [];
    }

    const overlays = displayedAssets.map((asset) => {
      const active = selectedAsset?.id === asset.id;
      const polyline = new AMap.Polyline({
        path: pathOf(asset),
        strokeColor: active ? "#d64a3a" : "#287a70",
        strokeOpacity: active ? 0.98 : 0.74,
        strokeWeight: active ? 8 : 5,
        lineCap: "round",
        lineJoin: "round",
        zIndex: active ? 30 : 20,
        extData: { assetId: asset.id },
      });

      polyline.on("click", () => selectAsset(asset.id));
      return polyline;
    });

    map.add(overlays);
    overlaysRef.current = overlays;

    const focusOverlays = selectedAsset
      ? overlays.filter((_, index) => displayedAssets[index].id === selectedAsset.id)
      : overlays;

    if (focusOverlays.length) {
      map.setFitView(focusOverlays, false, [48, 48, 48, 48], selectedAsset ? 10 : 7);
    }
  }, [displayedAssets, mapProvider, selectAsset, selectedAsset]);

  return (
    <main className="map-shell">
      <section className="map-stage" aria-label="路产地图">
        <div className="map-fallback" aria-hidden="true">
          <span className="map-label jiangsu">江苏</span>
          <span className="map-label zhejiang">浙江</span>
          <span className="map-label anhui">安徽</span>
          <span className="map-label guangdong">广东</span>
        </div>
        <svg className="fallback-routes" viewBox="0 0 1000 1000" aria-label="路产线路兜底图">
          {displayedAssets.map((asset) => {
            const active = selectedAsset?.id === asset.id;
            const company = getCompany(asset.ownerCompanyId);
            return (
              <path
                className={active ? "fallback-route active" : "fallback-route"}
                d={fallbackPath(asset, fallbackBounds)}
                key={asset.id}
                role="button"
                tabIndex={0}
                onClick={() => selectAsset(asset.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectAsset(asset.id);
                  }
                }}
              >
                <title>{`${asset.name}${company ? ` / ${company.shortName}` : ""}`}</title>
              </path>
            );
          })}
        </svg>
        <div id="asset-map" />
        {mapProvider === "failed" ? (
          <div className="map-provider-status" role="status">高德地图加载失败，当前显示本地路线兜底。</div>
        ) : null}
      </section>

      <aside className="asset-detail" aria-label="选中路产信息">
        {selectedAsset ? (
          <AssetDetail asset={selectedAsset} />
        ) : (
          <EmptyDetail
            companyId={companyId}
            query={query}
            visibleAssets={visibleAssets}
            onCompanyChange={(nextCompanyId) => setCompanyId(nextCompanyId)}
            onQueryChange={(nextQuery) => setQuery(nextQuery)}
            onSelectAsset={selectAsset}
          />
        )}
      </aside>
    </main>
  );
}

function EmptyDetail({
  companyId,
  query,
  visibleAssets,
  onCompanyChange,
  onQueryChange,
  onSelectAsset,
}: {
  companyId: string;
  query: string;
  visibleAssets: RoadAsset[];
  onCompanyChange: (companyId: string) => void;
  onQueryChange: (query: string) => void;
  onSelectAsset: (assetId: string) => void;
}) {
  return (
    <div className="panel-inner">
      <section className="empty-detail">
        <div className="empty-icon" aria-hidden="true">
          <Route size={26} />
        </div>
        <h2>未选择路产</h2>
        <p>点击地图上的线路，右侧只显示这条路本身的收费权、运营和归属信息。</p>
      </section>

      <section className="detail-section">
        <h3 className="section-title">从上市公司开始</h3>
        <label className="select-box">
          <span>上市公司</span>
          <select
            value={companyId}
            onChange={(event) => onCompanyChange(event.target.value)}
          >
            <option value="all">全部路桥公司</option>
            {listedRoadCompanies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.shortName}
              </option>
            ))}
          </select>
        </label>
        <label className="panel-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="搜索路名、公司、股票代码"
            aria-label="搜索路名、公司、股票代码"
          />
        </label>
      </section>

      <section className="detail-section">
        <h3 className="section-title">路产资产</h3>
        <div className="relation-list">
          {visibleAssets.length ? (
            visibleAssets.map((asset) => {
              const company = getCompany(asset.ownerCompanyId);
              return (
                <button
                  className="relation-item"
                  key={asset.id}
                  type="button"
                  onClick={() => onSelectAsset(asset.id)}
                >
                  <strong>{asset.name}</strong>
                  <span>{company?.shortName ?? "未绑定公司"} / {asset.corridor}</span>
                </button>
              );
            })
          ) : (
            <div className="empty-state">没有匹配路产。</div>
          )}
        </div>
      </section>
    </div>
  );
}

function AssetDetail({ asset }: { asset: RoadAsset }) {
  const company = getCompany(asset.ownerCompanyId);
  const relatedAssets = getRelatedAssets(asset);

  return (
    <div className="panel-inner">
      <div>
        <h2 className="detail-title">{asset.name}</h2>
        <p className="detail-summary">{asset.corridor}</p>
      </div>

      <section className="detail-section">
        <h3 className="section-title">
          <CalendarClock size={16} />
          路产收费权
        </h3>
        <div className="fact-grid">
          <Fact label="资产类型" value={asset.assetType} />
          <Fact label="省份" value={asset.province} />
          <Fact label="收费里程" value={`${asset.lengthKm} km`} />
          <Fact label="开通时间" value={asset.openedAt} />
          <Fact label="收费期限" value={asset.tollTerm} />
          <Fact label="剩余年限" value={asset.remainingTerm} />
          <Fact label="建设 / 收购成本" value={asset.buildOrAcquisitionCost} wide />
        </div>
      </section>

      <section className="detail-section">
        <h3 className="section-title">
          <Layers size={16} />
          运营口径
        </h3>
        <div className="fact-grid">
          <Fact label="年度收入" value={asset.annualRevenue} />
          <Fact label="通行量" value={asset.traffic} />
          <Fact label="货车占比" value={asset.freightShare} />
          <Fact label="运营主体" value={asset.operator} />
        </div>
      </section>

      <section className="detail-section">
        <h3 className="section-title">
          <Building2 size={16} />
          归属股票
        </h3>
        {company ? (
          <div className="company-box">
            <strong>{company.name}</strong>
            <span>{company.note}</span>
            <div className="stock-links">
              {company.symbols.map((symbol) => (
                <Link key={symbol} href={`/stocks/${encodeURIComponent(symbol)}`}>
                  {symbol}
                  <ExternalLink size={13} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">这条路还没有绑定上市公司。</div>
        )}
      </section>

      <section className="detail-section">
        <h3 className="section-title">
          <GitBranch size={16} />
          路产关系
        </h3>
        <div className="relation-list">
          {relatedAssets.map((related) => (
            <button
              className="relation-item"
              key={related.id}
              type="button"
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("asset", related.id);
                window.location.href = `${url.pathname}${url.search}`;
              }}
            >
              <strong>{related.name}</strong>
              <span>{related.corridor}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Fact({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  if (!isPublicAssetValue(value)) {
    return null;
  }

  return (
    <div className={wide ? "fact wide" : "fact"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
