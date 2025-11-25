import { computed, reactive, ref } from 'vue'
import { SchoolStage, AdministrativeDistrict } from '/@/enum'
import { School } from '/@/type'
import _schoolList from '/@/assets/schoolList'

const useData = () => {
  const schoolStageActive = ref<SchoolStage>(SchoolStage.PRIMARY_SCHOOL)
  const administrativeDistrictActive = ref<AdministrativeDistrict>(AdministrativeDistrict.ALL)
  const schoolList: (School & { ifShow: boolean })[] = reactive(
    _schoolList.map(item => ({ ...item, ifShow: true }))
  )
  const isAllSchoolSelected = computed({
    get() {
      return schoolList.every(item => item.ifShow)
    },
    set(newVal) {
      schoolList.forEach(item => (item.ifShow = newVal))
    }
  })

  /**
   * 判断目标学校是否与所选条件匹配
   * @param { SchoolStage } schoolStage
   * @param { AdministrativeDistrict } administrativeDistrict
   * @returns { boolean }
   */
  const isSchoolMatching = (
    schoolStage: SchoolStage,
    administrativeDistrict: AdministrativeDistrict
  ) => {
    return (
      schoolStageActive.value === schoolStage &&
      (administrativeDistrictActive.value === AdministrativeDistrict.ALL ||
        administrativeDistrictActive.value === administrativeDistrict)
    )
  }

  return {
    schoolStageActive,
    administrativeDistrictActive,
    schoolList,
    /**
     * 是否全选学校
     */
    isAllSchoolSelected,
    isSchoolMatching
  }
}

let _data: ReturnType<typeof useData>
export default () => {
  if (!_data) {
    _data = useData()
  }
  return _data
}
