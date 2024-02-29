# 热带农业农村大数据看板

## 项目简介
- 对中国及世界热带区域农业农村资源数据可视化，目前包含：
  - 屯昌农业农村经济一张图
  - 海南17大产业链分布图
  - 中国热区十大产业分布图（todo）

## 框架环境
- java：1.8
- maven：3.9.5
- 后端：springboot
- 前端可视化：echarts
- 存储中间件：无（目前数据量比较少，都是直接通过磁盘io读取，后面数据量大了后考虑使用**mysql+redis**）

## 使用说明
- 配置好环境后，直接clone下来运行即可
- 屯昌农业农村经济一张图：http://localhost/tunchang-agriculture-bigdata/index
- 海南17大产业链分布图：http://localhost/hainan-agriculture-bigdata/index

## 效果预览
### 屯昌农业农村经济一张图
![tunchang_ecom.png](images%2Ftunchang_ecom.png)
### 海南17大产业链分布图
![hainan_17_chains.png](images%2Fhainan_17_chains.png)