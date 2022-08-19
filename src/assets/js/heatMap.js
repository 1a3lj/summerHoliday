// heatMap.js
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM.js";
import Point from "ol/geom/Point.js";
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature.js";
import { fromLonLat } from "ol/proj.js";
import { Heatmap as HeatmapLayer, Tile as TileLayer } from "ol/layer";

export default class Heat {
  constructor() {
    // 地图底图源使用OSM,当然也可以用其他风格的源
    const raster = new TileLayer({
      source: new OSM(),
    });
    this.map = new Map({
      layers: [raster], // 地图图层
      target: "map", // 地图挂载的页面元素id,即下文HeatMap.vue中id="map"的div元素
      view: new View({
        center: fromLonLat([120.32714457090765, 30.30569628128095]), // 地图可视区域中心点,fromLonLat函数用于将经纬度转化为ol可正常识别的坐标
        zoom: 11, // 地图缩放级别
      }),
    });
  }
  add(heatData) {
    let source = new VectorSource(); // 新生成图层源,用于存放热力图图层
    heatData.features.forEach((item) => { // 遍历热力图数据,生成热力图feature
      const feature = new Feature({
        geometry: new Point(fromLonLat(item.coordinates)),
        weight: item.weight,
      });
      source.addFeature(feature);
    });
    this.heatLayer = new HeatmapLayer({ //新生成热力图图层,存放热力图feature
      // 矢量数据源
      source,
      blur: 10, // 模糊尺寸
      radius: 10, // 热点半径
      weight(feature) {
        const weight = feature.get("weight"); //获取feature的weight参数值,此处weight不可变更为其他参数,否则失效(暂时不明原因);
        const magnitude = weight / 1;
        return magnitude;
      },
    });
    this.map.addLayer(this.heatLayer); // 将热力图添加在地图上
  }
  clear() {
    this.map.removeLayer(this.heatLayer); // 将热力图从地图上移除
  }
}
