import assets from "./assets.json";
import companies from "./companies.json";

export type ListedRoadCompany = {
  id: string;
  name: string;
  shortName: string;
  symbols: string[];
  market: string;
  note: string;
};

export type CoordinateSystem = "gcj02";

export type RoadGeometry = {
  coordinateSystem: CoordinateSystem;
  path: [number, number][];
};

export type RoadAsset = {
  id: string;
  ownerCompanyId: string;
  name: string;
  corridor: string;
  province: string;
  assetType: "高速公路" | "桥梁" | "城市快速路";
  routeCode?: string;
  endpoints?: string;
  ownership?: string;
  directHolder?: string;
  operator: string;
  openedAt: string;
  tollTerm: string;
  remainingTerm: string;
  buildOrAcquisitionCost: string;
  lengthKm: number;
  annualRevenue: string;
  operatingCost?: string;
  traffic: string;
  freightShare: string;
  disclosureScope?: string;
  geometry: RoadGeometry;
  relatedAssetIds: string[];
};

export function isPublicAssetValue(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  return Boolean(trimmed) && trimmed !== "—";
}

export const listedRoadCompanies = companies as ListedRoadCompany[];

export const roadAssets = assets as RoadAsset[];

export function getCompany(companyId: string) {
  return listedRoadCompanies.find((company) => company.id === companyId);
}

export function getCompanyBySymbol(symbol: string) {
  const decoded = decodeURIComponent(symbol).toUpperCase();
  return listedRoadCompanies.find((company) =>
    company.symbols.some((candidate) => candidate.toUpperCase() === decoded),
  );
}

export function getAssetsByCompany(companyId: string) {
  return roadAssets.filter((asset) => asset.ownerCompanyId === companyId);
}

export function getAsset(assetId: string) {
  return roadAssets.find((asset) => asset.id === assetId);
}

export function getRelatedAssets(asset: RoadAsset) {
  return asset.relatedAssetIds
    .map((id) => getAsset(id))
    .filter((candidate): candidate is RoadAsset => Boolean(candidate));
}
