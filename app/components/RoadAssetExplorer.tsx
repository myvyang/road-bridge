"use client";

import type { LatLngExpression, LayerGroup, Map as LeafletMap } from "leaflet";
import {
  Building2,
  CalendarClock,
  Database,
  GitBranch,
  Layers,
  Route,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  findRelatedAssets,
  roadAssets,
  sourceLabels,
  type DataQuality,
  type RoadAsset,
} from "../data/roadAssets";

type LeafletModule = typeof import("leaflet");
type FilterMode = "all" | "source";

const qualityClass: Record<DataQuality, string> = {
  sample: "sample",
  needs_source: "source",
  verified: "verified",
};

function qualityText(asset: RoadAsset) {
  return sourceLabels[asset.sourceStatus];
}

function matchesQuery(asset: RoadAsset, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  return [
    asset.name,
    asset.corridor,
    asset.province,
    asset.ownerCompany,
    asset.operator,
    ...asset.listedSymbols,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

function pathOf(asset: RoadAsset): LatLngExpression[] {
  return asset.coordinates.map(([lat, lng]) => [lat, lng]);
}

export function RoadAssetExplorer() {
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedId, setSelectedId] = useState(roadAssets[0]?.id ?? "");
  const mapRef = useRef<LeafletMap | null>(null);
  const layersRef = useRef<LayerGroup | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);

  const filteredAssets = useMemo(() => {
    return roadAssets.filter((asset) => {
      const passesQuery = matchesQuery(asset, query);
      const passesSource =
        filterMode === "all" || asset.sourceStatus !== "verified";
      return passesQuery && passesSource;
    });
  }, [filterMode, query]);

  const selectedAsset =
    roadAssets.find((asset) => asset.id === selectedId) ?? filteredAssets[0];
  const relatedAssets = selectedAsset ? findRelatedAssets(selectedAsset) : [];
  const listedCompanies = new Set(roadAssets.flatMap((asset) => asset.listedSymbols));
  const pendingSources = roadAssets.filter(
    (asset) => asset.sourceStatus !== "verified",
  ).length;

  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || mapRef.current) {
        return;
      }

      leafletRef.current = L;
      const map = L.map("asset-map", {
        center: [30.9, 119.3],
        zoom: 7,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      layersRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
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
    if (!L || !map || !layers) {
      return;
    }

    layers.clearLayers();
    const visible = filteredAssets.length ? filteredAssets : roadAssets;
    const bounds = L.latLngBounds([]);

    visible.forEach((asset) => {
      const active = selectedAsset?.id === asset.id;
      const polyline = L.polyline(pathOf(asset), {
        color: active ? "#e0523f" : "#547f75",
        opacity: active ? 0.95 : 0.7,
        weight: active ? 7 : 4,
      });
      polyline.on("click", () => setSelectedId(asset.id));
      polyline.bindTooltip(asset.name, {
        direction: "top",
        sticky: true,
      });
      polyline.addTo(layers);
      pathOf(asset).forEach((point) => bounds.extend(point));
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds.pad(0.18), { animate: true });
    }
  }, [filteredAssets, selectedAsset?.id]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map || !selectedAsset) {
      return;
    }
    const bounds = L.latLngBounds(pathOf(selectedAsset));
    if (bounds.isValid()) {
      map.flyToBounds(bounds.pad(0.45), { duration: 0.7, maxZoom: 9 });
    }
  }, [selectedAsset]);

  return (
    <main className="asset-shell">
      <aside className="asset-sidebar" aria-label="路产筛选和列表">
        <div className="panel-inner">
          <div className="brand-row">
            <div>
              <h1 className="brand-title">路桥资产地图</h1>
              <p className="brand-subtitle">
                用地图穿透高速公路、桥梁、上市公司归属和收费权资产关系。
              </p>
            </div>
            <div className="icon-chip" aria-hidden="true">
              <Route size={21} />
            </div>
          </div>

          <label className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索路段、公司、股票代码"
              aria-label="搜索路段、公司、股票代码"
            />
          </label>

          <div className="toolbar" aria-label="数据筛选">
            <button
              type="button"
              aria-pressed={filterMode === "all"}
              onClick={() => setFilterMode("all")}
            >
              全部资产
            </button>
            <button
              type="button"
              aria-pressed={filterMode === "source"}
              onClick={() => setFilterMode("source")}
            >
              待核验
            </button>
          </div>

          <div className="stats-grid" aria-label="资产统计">
            <div className="stat">
              <span className="stat-value">{roadAssets.length}</span>
              <span className="stat-label">路产</span>
            </div>
            <div className="stat">
              <span className="stat-value">{listedCompanies.size}</span>
              <span className="stat-label">证券代码</span>
            </div>
            <div className="stat">
              <span className="stat-value">{pendingSources}</span>
              <span className="stat-label">待核验</span>
            </div>
          </div>

          <div className="asset-list">
            {filteredAssets.length ? (
              filteredAssets.map((asset) => (
                <button
                  className="asset-card"
                  key={asset.id}
                  type="button"
                  aria-current={selectedAsset?.id === asset.id}
                  onClick={() => setSelectedId(asset.id)}
                >
                  <div className="asset-card-head">
                    <div>
                      <h2>{asset.name}</h2>
                      <p>{asset.ownerCompany}</p>
                    </div>
                    <span className={`status-pill ${qualityClass[asset.sourceStatus]}`}>
                      {qualityText(asset)}
                    </span>
                  </div>
                  <div className="tag-row">
                    <span className="tag">{asset.province}</span>
                    <span className="tag">{asset.assetType}</span>
                    <span className="tag">{asset.lengthKm} km</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="empty-state">没有匹配的路产。换一个公司、路段或股票代码试试。</div>
            )}
          </div>
        </div>
      </aside>

      <section className="map-stage" aria-label="路桥地图">
        <div id="asset-map" />
        <div className="map-topbar">
          <div className="map-caption">
            <strong>{selectedAsset?.name ?? "选择一条路产"}</strong>
            <span>
              {selectedAsset
                ? `${selectedAsset.corridor} / ${selectedAsset.ownerCompany}`
                : "点击地图上的线路查看收费权资产信息。"}
            </span>
          </div>
          <div className="map-legend" aria-label="图例">
            <span className="legend-line" />
            <span>当前选中路段</span>
          </div>
        </div>
      </section>

      <aside className="asset-detail" aria-label="路产详情">
        {selectedAsset ? (
          <AssetDetail asset={selectedAsset} relatedAssets={relatedAssets} />
        ) : (
          <div className="panel-inner">
            <div className="empty-state">请选择一条路产。</div>
          </div>
        )}
      </aside>
    </main>
  );
}

function AssetDetail({
  asset,
  relatedAssets,
}: {
  asset: RoadAsset;
  relatedAssets: RoadAsset[];
}) {
  return (
    <div className="panel-inner">
      <div>
        <span className={`status-pill ${qualityClass[asset.sourceStatus]}`}>
          <ShieldAlert size={13} />
          {qualityText(asset)}
        </span>
        <h2 className="detail-title">{asset.name}</h2>
        <p className="detail-summary">{asset.corridor}</p>
        <div className="tag-row">
          {asset.listedSymbols.map((symbol) => (
            <span className="tag" key={symbol}>
              {symbol}
            </span>
          ))}
        </div>
      </div>

      <section className="detail-section">
        <h3 className="section-title">
          <Building2 size={16} />
          归属公司
        </h3>
        <div className="company-box">
          <strong>{asset.ownerCompany}</strong>
          <span>运营主体：{asset.operator}</span>
        </div>
      </section>

      <section className="detail-section">
        <h3 className="section-title">
          <CalendarClock size={16} />
          收费权台账
        </h3>
        <div className="fact-grid">
          <Fact label="开通时间" value={asset.openedAt} />
          <Fact label="收费期限" value={asset.tollTerm} />
          <Fact label="剩余年限" value={asset.remainingTerm} />
          <Fact label="建设 / 收购成本" value={asset.buildOrAcquisitionCost} />
          <Fact label="里程" value={`${asset.lengthKm} km`} />
          <Fact label="年度收入" value={asset.annualRevenue} />
          <Fact label="通行量" value={asset.traffic} />
          <Fact label="货车占比" value={asset.freightShare} />
        </div>
      </section>

      <section className="detail-section">
        <h3 className="section-title">
          <GitBranch size={16} />
          相邻关系
        </h3>
        <div className="relation-list">
          {relatedAssets.map((related) => (
            <div className="relation-item" key={related.id}>
              <strong>{related.name}</strong>
              <span>
                {related.province} / {related.ownerCompany}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h3 className="section-title">
          <Layers size={16} />
          需要穿透的问题
        </h3>
        <div className="relation-list">
          {asset.riskNotes.map((note) => (
            <div className="relation-item" key={note}>
              <strong>{note}</strong>
            </div>
          ))}
        </div>
      </section>

      <div className="source-note">
        <Database size={14} /> 第一版内置的是结构样例。真实入库时，每条路产都应绑定年报页码、公告链接、收费权批复、开通日期、成本口径和运营指标来源。
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="fact">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
