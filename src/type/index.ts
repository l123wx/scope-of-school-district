import { AdministrativeDistrict, SchoolStage } from '/@/enum'

/**
 * 地图坐标点
 */
type PointList = {
  /**
   * 经度
   */
  longitude: number
  /**
   * 纬度
   */
  latitude: number
}

/**
 * 学校信息
 */
export type School = {
  /**
   * 名字
   */
  name: string
  /**
   * 描述
   */
  description: string
  /**
   * 学校阶段
   */
  schoolStage: SchoolStage
  /**
   * 行政区
   */
  administrativeDistrict: AdministrativeDistrict
  /**
   * 区域坐标列表
   */
  areaPointList: PointList[]
}
