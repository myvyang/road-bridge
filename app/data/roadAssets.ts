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
  operator: string;
  openedAt: string;
  tollTerm: string;
  remainingTerm: string;
  buildOrAcquisitionCost: string;
  lengthKm: number;
  annualRevenue: string;
  traffic: string;
  freightShare: string;
  geometry: RoadGeometry;
  relatedAssetIds: string[];
};

export function isPublicAssetValue(value: string) {
  const trimmed = value.trim();
  return Boolean(trimmed) && trimmed !== "—";
}

export const listedRoadCompanies: ListedRoadCompany[] = [
  {
    id: "jiangsu-expressway",
    name: "江苏宁沪高速公路股份有限公司",
    shortName: "宁沪高速",
    symbols: ["600377.SH", "00177.HK"],
    market: "A+H",
    note: "长三角核心收费公路资产平台。",
  },
  {
    id: "zhejiang-expressway",
    name: "浙江沪杭甬高速公路股份有限公司",
    shortName: "浙江沪杭甬",
    symbols: ["00576.HK"],
    market: "H",
    note: "浙江省内高速公路和相关交通资产平台。",
  },
  {
    id: "anhui-expressway",
    name: "安徽皖通高速公路股份有限公司",
    shortName: "皖通高速",
    symbols: ["600012.SH", "00995.HK"],
    market: "A+H",
    note: "安徽省高速公路收费权资产平台。",
  },
  {
    id: "shenzhen-expressway",
    name: "深圳高速公路集团股份有限公司",
    shortName: "深圳高速",
    symbols: ["600548.SH", "00548.HK"],
    market: "A+H",
    note: "深圳及珠三角收费公路、环保和基建资产平台。",
  },
];

export const roadAssets: RoadAsset[] = [
  {
    id: "jiangsu-huning",
    ownerCompanyId: "jiangsu-expressway",
    name: "沪宁高速江苏段",
    corridor: "上海至南京主通道",
    province: "江苏",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 274,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [120.309, 31.586],
        [119.974, 31.651],
        [119.444, 31.78],
        [118.796, 31.988],
      ],
    },
    relatedAssetIds: ["jiangsu-ningchang", "anhui-hening", "zhejiang-huhangyong"],
  },
  {
    id: "jiangsu-ningchang",
    ownerCompanyId: "jiangsu-expressway",
    name: "南京至常州高速",
    corridor: "南京都市圈至苏南通道",
    province: "江苏",
    assetType: "高速公路",
    operator: "—",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 87,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [118.886, 31.902],
        [119.192, 31.812],
        [119.558, 31.742],
        [119.946, 31.704],
      ],
    },
    relatedAssetIds: ["jiangsu-huning"],
  },
  {
    id: "zhejiang-huhangyong",
    ownerCompanyId: "zhejiang-expressway",
    name: "沪杭甬高速",
    corridor: "上海至杭州、宁波核心通道",
    province: "浙江",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 248,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [120.155, 30.274],
        [120.758, 30.438],
        [120.75, 30.747],
        [121.474, 31.231],
      ],
    },
    relatedAssetIds: ["jiangsu-huning", "zhejiang-shangsan"],
  },
  {
    id: "zhejiang-shangsan",
    ownerCompanyId: "zhejiang-expressway",
    name: "上三高速",
    corridor: "浙江南北向补充通道",
    province: "浙江",
    assetType: "高速公路",
    operator: "—",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 142,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [120.871, 30.035],
        [120.911, 29.726],
        [121.006, 29.501],
        [121.031, 29.152],
      ],
    },
    relatedAssetIds: ["zhejiang-huhangyong"],
  },
  {
    id: "anhui-hening",
    ownerCompanyId: "anhui-expressway",
    name: "合宁高速",
    corridor: "合肥至南京、上海方向通道",
    province: "安徽",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 134,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [117.227, 31.82],
        [117.714, 31.736],
        [118.318, 31.69],
        [118.796, 31.988],
      ],
    },
    relatedAssetIds: ["jiangsu-huning"],
  },
  {
    id: "shenzhen-jihe",
    ownerCompanyId: "shenzhen-expressway",
    name: "机荷高速",
    corridor: "深圳机场至荷坳东西向通道",
    province: "广东",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 45,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [113.81, 22.639],
        [114.012, 22.62],
        [114.205, 22.628],
        [114.27, 22.668],
      ],
    },
    relatedAssetIds: ["shenzhen-meiguan"],
  },
  {
    id: "shenzhen-meiguan",
    ownerCompanyId: "shenzhen-expressway",
    name: "梅观高速",
    corridor: "深圳中轴北向通道",
    province: "广东",
    assetType: "高速公路",
    operator: "—",
    openedAt: "—",
    tollTerm: "—",
    remainingTerm: "—",
    buildOrAcquisitionCost: "—",
    lengthKm: 19,
    annualRevenue: "—",
    traffic: "—",
    freightShare: "—",
    geometry: {
      coordinateSystem: "gcj02",
      path: [
        [114.059, 22.543],
        [114.055, 22.61],
        [114.046, 22.69],
        [114.03, 22.748],
      ],
    },
    relatedAssetIds: ["shenzhen-jihe"],
  },
];

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
