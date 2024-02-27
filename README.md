# 热带农业农村大数据看板

## 项目简介
- 对中国及世界热带区域农业农村资源数据可视化，目前包含：
  - 屯昌
    - 农业农村经济
    - 新型农业经营主体
    - 热带争作物产业数据
  - 海南
    - 天然橡胶产业
    - todo：更多作物
  - 中国（todo）

## 框架环境
- java：1.8
- maven：3.9.5
- 后端：springboot
- 前端可视化：echarts
- 存储中间件：无（目前数据量比较少，都是直接通过磁盘io读取，后面数据量大了后考虑使用**mysql+redis**）

## 使用说明
- 配置好环境后，直接clone下来运行即可
- 海南大数据看板访问：http://localhost/hainan-agriculture-bigdata/crops/rubber
- 屯昌大数据看板访问：http://localhost/tunchang-agriculture-bigdata/index

## 效果预览
### 屯昌大数据看板
![tunchang_ecom.png](images%2Ftunchang_ecom.png)
![tunchang_enterprise.png](images%2Ftunchang_enterprise.png)
![tunchang_crops.png](images%2Ftunchang_crops.png)
### 海南大数据看板
![hainan_crops_rubber.png](images%2Fhainan_crops_rubber.png)