import type { Metadata } from "next";
import { RoadAssetExplorer } from "./components/RoadAssetExplorer";

export const metadata: Metadata = {
  title: "路桥资产地图",
  description: "按地图浏览高速公路、桥梁、上市公司归属和收费权资产台账。",
};

export default function Home() {
  return <RoadAssetExplorer />;
}
