import { SchoolStage, AdministrativeDistrict } from '../enum'

export const SCHOOL_STAGE_TEXT = {
  [SchoolStage.PRIMARY_SCHOOL]: '小学',
  [SchoolStage.JUNIOR_HIGH_SCHOOL]: '初中'
}

export const ADMINISTRATIVE_DISTRICT_TEXT = {
  [AdministrativeDistrict.ALL]: '全部',
  [AdministrativeDistrict.EXAMPLE_A]: '荷城街道',
  [AdministrativeDistrict.EXAMPLE_B]: '更合镇',
  [AdministrativeDistrict.EXAMPLE_C]: '明城镇',
  [AdministrativeDistrict.EXAMPLE_D]: '杨和镇'
}

export const ADMINISTRATIVE_DISTRICT_COLOR = {
  [AdministrativeDistrict.ALL]: '',
  [AdministrativeDistrict.EXAMPLE_A]: '#0391FF',
  [AdministrativeDistrict.EXAMPLE_B]: '#FF3F56',
  [AdministrativeDistrict.EXAMPLE_C]: '#00F964',
  [AdministrativeDistrict.EXAMPLE_D]: '#FFA73F'
}
