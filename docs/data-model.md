# 路桥资产数据模型

目标读者：后续为路桥公司做真实数据入库、公告核验和地图展示的开发者。

## 核心实体

### 路产

单条高速、公路、桥梁或城市快速路。正式字段至少包括：

- `id`：稳定内部标识。
- `name`：路产名称。
- `asset_type`：高速公路、桥梁、城市快速路等。
- `geometry`：地图线路坐标。
- `province`、`corridor`：区域和交通走廊。
- `owner_company`：归属上市公司或控股主体。
- `listed_symbols`：证券代码。
- `operator`：运营主体。
- `opened_at`：开通日期。
- `toll_start`、`toll_end`：收费起止日。
- `build_or_acquisition_cost`：建设费用或收购成本，并保留口径。
- `length_km`：收费里程。
- `data_quality`：`sample`、`needs_source`、`verified`。

### 年度运营记录

同一路产每年一条记录：

- `year`
- `revenue`
- `profit`
- `traffic_volume`
- `freight_share`
- `capex`
- `construction_or_diversion_note`
- `source_links`
- `disclosure_scope`：单路披露、分组披露、公司合并披露。

## 关系

路产之间至少需要支持：

- 同一上市公司。
- 同一交通走廊。
- 上下游或相邻通道。
- 竞争 / 分流关系。
- 改扩建或收费权续期影响关系。

## 入库原则

- 关键字段必须能追溯到年报、招股书、公告、收费权批复、交易所披露或政府公开文件。
- 没有官方拆分时，不为表格完整而强拆收入和利润。
- 地图可以先展示样例，但样例必须显式标记，不能和已核验事实混用。
- 所有时间字段写入时带日期或明确报告期；项目状态记录使用 `Asia/Shanghai`。
