"use client";

import type { LatLngExpression, LayerGroup, Map as LeafletMap } from "leaflet";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  Database,
  ExternalLink,
  GitBranch,
  Layers,
  MapPinned,
  Route,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getCompany,
  getRelatedAssets,
  listedRoadCompanies,
  roadAssets,
  sourceLabels,
  type DataQuality,
  type RoadAsset,
} from "../data/roadAssets";

type LeafletModule = typeof import("leaflet");

const qualityClass: Record<DataQuality, string> = {
  sample: "sample",
  needs_source: "source",
  verified: "verified",
};

function pathOf(asset: RoadAsset): LatLngExpression[] {
  return asset.coordinates.map(([lat, lng]) => [lat, lng]);
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
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const layersRef = useRef<LayerGroup | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);

  const visibleAssets = useMemo(() => {
    return roadAssets.filter((asset) => {
      const matchesCompany =
        companyId === "all" || asset.ownerCompanyId === companyId;
      return matchesCompany && matchesAsset(asset, query);
    });
  }, [companyId, query]);

  const selectedAsset = selectedId ? roadAssets.find((asset) => asset.id === selectedId) : null;

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

    import("leaflet").then((L) => {
      if (cancelled || mapRef.current) {
        return;
      }

      leafletRef.current = L;
      const map = L.map("asset-map", {
        center: [30.9, 119.3],
        zoom: 6,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      layersRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);

      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layersRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!mapReady || !L || !map || !layers) {
      return;
    }

    layers.clearLayers();
    const assetsToDraw = visibleAssets.length ? visibleAssets : roadAssets;
    const bounds = L.latLngBounds([]);

    assetsToDraw.forEach((asset) => {
      const active = selectedAsset?.id === asset.id;
      const company = getCompany(asset.ownerCompanyId);
      const polyline = L.polyline(pathOf(asset), {
        color: active ? "#d64a3a" : "#287a70",
        opacity: active ? 0.98 : 0.74,
        weight: active ? 8 : 5,
        lineCap: "round",
        lineJoin: "round",
      });

      polyline.on("click", () => selectAsset(asset.id));
      polyline.bindTooltip(`${asset.name}${company ? ` / ${company.shortName}` : ""}`, {
        direction: "top",
        sticky: true,
      });
      polyline.addTo(layers);
      pathOf(asset).forEach((point) => bounds.extend(point));
    });

    if (selectedAsset) {
      const selectedBounds = L.latLngBounds(pathOf(selectedAsset));
      map.fitBounds(selectedBounds.pad(0.55), { animate: true, maxZoom: 9 });
      return;
    }

    if (bounds.isValid()) {
      map.fitBounds(bounds.pad(0.18), { animate: true });
    }
  }, [mapReady, selectAsset, selectedAsset, visibleAssets]);

  return (
    <main className="map-shell">
      <section className="map-stage" aria-label="路产地图">
        <div id="asset-map" />
        <div className="map-controls">
          <div className="map-brand">
            <div className="icon-chip" aria-hidden="true">
              <MapPinned size={21} />
            </div>
            <div>
              <h1>路桥资产地图</h1>
              <p>先从上市公司梳理路产，再把单条路标到地图上。</p>
            </div>
          </div>

          <div className="filter-row">
            <label className="select-box">
              <span>上市公司</span>
              <select
                value={companyId}
                onChange={(event) => {
                  setCompanyId(event.target.value);
                  selectAsset(null);
                }}
              >
                <option value="all">全部路桥公司</option>
                {listedRoadCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.shortName}
                  </option>
                ))}
              </select>
            </label>
            <label className="map-search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  selectAsset(null);
                }}
                placeholder="搜索路名、公司、股票代码"
                aria-label="搜索路名、公司、股票代码"
              />
            </label>
          </div>

          <div className="asset-strip" aria-label="当前筛选出的路产">
            {visibleAssets.length ? (
              visibleAssets.map((asset) => (
                <button
                  className="asset-token"
                  key={asset.id}
                  type="button"
                  aria-pressed={selectedId === asset.id}
                  onClick={() => selectAsset(asset.id)}
                >
                  <Route size={14} />
                  <span>{asset.name}</span>
                </button>
              ))
            ) : (
              <span className="strip-empty">没有匹配路产</span>
            )}
          </div>
        </div>
      </section>

      <aside className="asset-detail" aria-label="选中路产信息">
        {selectedAsset ? (
          <AssetDetail asset={selectedAsset} />
        ) : (
          <EmptyDetail />
        )}
      </aside>
    </main>
  );
}

function EmptyDetail() {
  return (
    <div className="panel-inner empty-detail">
      <div className="empty-icon" aria-hidden="true">
        <Route size={26} />
      </div>
      <h2>未选择路产</h2>
      <p>点击地图上的线路，右侧只显示这条路本身的收费权、运营和归属信息。</p>
    </div>
  );
}

function AssetDetail({ asset }: { asset: RoadAsset }) {
  const company = getCompany(asset.ownerCompanyId);
  const relatedAssets = getRelatedAssets(asset);

  return (
    <div className="panel-inner">
      <div>
        <span className={`status-pill ${qualityClass[asset.sourceStatus]}`}>
          <ShieldAlert size={13} />
          {sourceLabels[asset.sourceStatus]}
        </span>
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

      <section className="detail-section">
        <h3 className="section-title">
          <Database size={16} />
          数据来源状态
        </h3>
        <div className="source-note">{asset.sourceNote}</div>
      </section>

      <section className="detail-section">
        <h3 className="section-title">需要穿透</h3>
        <div className="relation-list">
          {asset.watchItems.map((item) => (
            <div className="relation-item readonly" key={item}>
              <strong>{item}</strong>
            </div>
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
  return (
    <div className={wide ? "fact wide" : "fact"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
