export type DataQuality = "sample" | "needs_source" | "verified";

export type RoadAsset = {
  id: string;
  name: string;
  corridor: string;
  province: string;
  assetType: "高速公路" | "桥梁" | "城市快速路";
  ownerCompany: string;
  listedSymbols: string[];
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
  relations: string[];
  riskNotes: string[];
  sourceStatus: DataQuality;
};

export const sourceLabels: Record<DataQuality, string> = {
  sample: "样例",
  needs_source: "待核验",
  verified: "已核验",
};

export const roadAssets: RoadAsset[] = [
  {
    id: "jiangsu-huning",
    name: "沪宁高速江苏段",
    corridor: "长三角东西向主干线",
    province: "江苏",
    assetType: "高速公路",
    ownerCompany: "江苏宁沪高速公路股份有限公司",
    listedSymbols: ["600377.SH", "00177.HK"],
    operator: "上市公司及附属运营主体",
    openedAt: "样例字段：需回到年报和收费批复核验",
    tollTerm: "样例字段：收费起止日待核验",
    remainingTerm: "待计算",
    buildOrAcquisitionCost: "待从招股书、年报和资产评估披露入库",
    lengthKm: 274,
    annualRevenue: "待按单路年报披露入库",
    traffic: "待补日均车流、客货结构",
    freightShare: "待补货车占比",
    coordinates: [
      [31.586, 120.309],
      [31.651, 119.974],
      [31.78, 119.444],
      [31.988, 118.796],
    ],
    relations: ["jiangsu-ningchang", "anhui-hening", "zhejiang-huhangyong"],
    riskNotes: ["平行线路分流", "养护施工扰动", "收费权到期与续期口径"],
    sourceStatus: "sample",
  },
  {
    id: "jiangsu-ningchang",
    name: "南京至常州高速",
    corridor: "南京都市圈至苏南通道",
    province: "江苏",
    assetType: "高速公路",
    ownerCompany: "江苏宁沪高速公路股份有限公司",
    listedSymbols: ["600377.SH", "00177.HK"],
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
    relations: ["jiangsu-huning", "zhejiang-huhangyong"],
    riskNotes: ["和沪宁通道存在客流、货流联动", "需区分控股路产与参股路产"],
    sourceStatus: "needs_source",
  },
  {
    id: "zhejiang-huhangyong",
    name: "沪杭甬高速",
    corridor: "上海至杭州、宁波核心通道",
    province: "浙江",
    assetType: "高速公路",
    ownerCompany: "浙江沪杭甬高速公路股份有限公司",
    listedSymbols: ["00576.HK"],
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
    relations: ["jiangsu-huning", "zhejiang-shangsan"],
    riskNotes: ["杭州湾、沪杭交通结构变化", "改扩建资本开支"],
    sourceStatus: "sample",
  },
  {
    id: "zhejiang-shangsan",
    name: "上三高速",
    corridor: "浙江南北向补充通道",
    province: "浙江",
    assetType: "高速公路",
    ownerCompany: "浙江沪杭甬高速公路股份有限公司",
    listedSymbols: ["00576.HK"],
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
    relations: ["zhejiang-huhangyong"],
    riskNotes: ["旅游与区域产业流量波动", "单路收入披露粒度待确认"],
    sourceStatus: "needs_source",
  },
  {
    id: "anhui-hening",
    name: "合宁高速",
    corridor: "安徽至江苏、上海方向通道",
    province: "安徽",
    assetType: "高速公路",
    ownerCompany: "安徽皖通高速公路股份有限公司",
    listedSymbols: ["600012.SH", "00995.HK"],
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
    relations: ["jiangsu-huning"],
    riskNotes: ["长三角跨省通道联动", "货车收费政策变化"],
    sourceStatus: "sample",
  },
  {
    id: "shenzhen-jihe",
    name: "机荷高速",
    corridor: "深圳机场至荷坳东西向通道",
    province: "广东",
    assetType: "高速公路",
    ownerCompany: "深圳高速公路集团股份有限公司",
    listedSymbols: ["600548.SH", "00548.HK"],
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
    relations: ["shenzhen-meiguan"],
    riskNotes: ["城市路网分流", "改扩建和政府回购安排需穿透"],
    sourceStatus: "needs_source",
  },
  {
    id: "shenzhen-meiguan",
    name: "梅观高速",
    corridor: "深圳中轴北向通道",
    province: "广东",
    assetType: "高速公路",
    ownerCompany: "深圳高速公路集团股份有限公司",
    listedSymbols: ["600548.SH", "00548.HK"],
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
    relations: ["shenzhen-jihe"],
    riskNotes: ["部分路段收费安排复杂", "政府补偿和回购口径需单列"],
    sourceStatus: "needs_source",
  },
];

export function findRelatedAssets(asset: RoadAsset) {
  return asset.relations
    .map((id) => roadAssets.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is RoadAsset => Boolean(candidate));
}
