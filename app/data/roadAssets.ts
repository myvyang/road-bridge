export type DataQuality = "sample" | "needs_source" | "verified";

export type ListedRoadCompany = {
  id: string;
  name: string;
  shortName: string;
  symbols: string[];
  market: string;
  note: string;
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
  coordinates: [number, number][];
  relatedAssetIds: string[];
  sourceStatus: DataQuality;
  sourceNote: string;
  watchItems: string[];
};

export const sourceLabels: Record<DataQuality, string> = {
  sample: "样例",
  needs_source: "待核验",
  verified: "已核验",
};

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
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待从招股书、年报和资产评估披露入库",
    lengthKm: 274,
    annualRevenue: "待按单路披露口径入库",
    traffic: "待补日均车流、客货结构",
    freightShare: "待补货车占比",
    coordinates: [
      [31.586, 120.309],
      [31.651, 119.974],
      [31.78, 119.444],
      [31.988, 118.796],
    ],
    relatedAssetIds: ["jiangsu-ningchang", "anhui-hening", "zhejiang-huhangyong"],
    sourceStatus: "sample",
    sourceNote: "线路用于验证页面结构，收费权字段未做公告级核验。",
    watchItems: ["平行线路分流", "养护施工扰动", "收费权到期与续期口径"],
  },
  {
    id: "jiangsu-ningchang",
    ownerCompanyId: "jiangsu-expressway",
    name: "南京至常州高速",
    corridor: "南京都市圈至苏南通道",
    province: "江苏",
    assetType: "高速公路",
    operator: "待核验",
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待核验",
    lengthKm: 87,
    annualRevenue: "待核验",
    traffic: "待核验",
    freightShare: "待核验",
    coordinates: [
      [31.902, 118.886],
      [31.812, 119.192],
      [31.742, 119.558],
      [31.704, 119.946],
    ],
    relatedAssetIds: ["jiangsu-huning"],
    sourceStatus: "needs_source",
    sourceNote: "需要先确认上市公司披露中的资产名称、范围和权益比例。",
    watchItems: ["与沪宁通道的客货流联动", "控股路产和参股路产区分"],
  },
  {
    id: "zhejiang-huhangyong",
    ownerCompanyId: "zhejiang-expressway",
    name: "沪杭甬高速",
    corridor: "上海至杭州、宁波核心通道",
    province: "浙江",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待核验",
    lengthKm: 248,
    annualRevenue: "待核验",
    traffic: "待核验",
    freightShare: "待核验",
    coordinates: [
      [30.274, 120.155],
      [30.438, 120.758],
      [30.747, 120.75],
      [31.231, 121.474],
    ],
    relatedAssetIds: ["jiangsu-huning", "zhejiang-shangsan"],
    sourceStatus: "sample",
    sourceNote: "线路用于验证跨公司、跨省通道关系，运营数据待核验。",
    watchItems: ["杭州湾和沪杭交通结构变化", "改扩建资本开支"],
  },
  {
    id: "zhejiang-shangsan",
    ownerCompanyId: "zhejiang-expressway",
    name: "上三高速",
    corridor: "浙江南北向补充通道",
    province: "浙江",
    assetType: "高速公路",
    operator: "待核验",
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待核验",
    lengthKm: 142,
    annualRevenue: "待核验",
    traffic: "待核验",
    freightShare: "待核验",
    coordinates: [
      [30.035, 120.871],
      [29.726, 120.911],
      [29.501, 121.006],
      [29.152, 121.031],
    ],
    relatedAssetIds: ["zhejiang-huhangyong"],
    sourceStatus: "needs_source",
    sourceNote: "需要从公司披露中确认收费里程、权益比例和收入披露粒度。",
    watchItems: ["旅游和区域产业流量波动", "单路收入披露粒度"],
  },
  {
    id: "anhui-hening",
    ownerCompanyId: "anhui-expressway",
    name: "合宁高速",
    corridor: "合肥至南京、上海方向通道",
    province: "安徽",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待核验",
    lengthKm: 134,
    annualRevenue: "待核验",
    traffic: "待核验",
    freightShare: "待核验",
    coordinates: [
      [31.82, 117.227],
      [31.736, 117.714],
      [31.69, 118.318],
      [31.988, 118.796],
    ],
    relatedAssetIds: ["jiangsu-huning"],
    sourceStatus: "sample",
    sourceNote: "作为安徽至长三角走廊样例，收费权字段待核验。",
    watchItems: ["长三角跨省通道联动", "货车收费政策变化"],
  },
  {
    id: "shenzhen-jihe",
    ownerCompanyId: "shenzhen-expressway",
    name: "机荷高速",
    corridor: "深圳机场至荷坳东西向通道",
    province: "广东",
    assetType: "高速公路",
    operator: "上市公司及附属运营主体",
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待核验",
    lengthKm: 45,
    annualRevenue: "待核验",
    traffic: "待核验",
    freightShare: "待核验",
    coordinates: [
      [22.639, 113.81],
      [22.62, 114.012],
      [22.628, 114.205],
      [22.668, 114.27],
    ],
    relatedAssetIds: ["shenzhen-meiguan"],
    sourceStatus: "needs_source",
    sourceNote: "需要穿透上市公司、附属公司和政府安排中的资产边界。",
    watchItems: ["城市路网分流", "改扩建和政府回购安排"],
  },
  {
    id: "shenzhen-meiguan",
    ownerCompanyId: "shenzhen-expressway",
    name: "梅观高速",
    corridor: "深圳中轴北向通道",
    province: "广东",
    assetType: "高速公路",
    operator: "待核验",
    openedAt: "待核验",
    tollTerm: "待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待核验",
    lengthKm: 19,
    annualRevenue: "待核验",
    traffic: "待核验",
    freightShare: "待核验",
    coordinates: [
      [22.543, 114.059],
      [22.61, 114.055],
      [22.69, 114.046],
      [22.748, 114.03],
    ],
    relatedAssetIds: ["shenzhen-jihe"],
    sourceStatus: "needs_source",
    sourceNote: "收费安排和政府补偿口径复杂，不能只按公司层面利润判断。",
    watchItems: ["部分路段收费安排", "政府补偿和回购口径"],
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
