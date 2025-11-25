<template>
  <Card>
    <template #title>行政区划分</template>
    <el-radio-group v-model="administrativeDistrictActive" class="radio-group">
      <div v-for="item in Object.keys(ADMINISTRATIVE_DISTRICT_TEXT)" :key="item">
        <el-radio-button :label="Number(item)">
          {{ ADMINISTRATIVE_DISTRICT_TEXT[item as unknown as AdministrativeDistrict] }}
        </el-radio-button>
      </div>
    </el-radio-group>
  </Card>
</template>

<script setup lang="ts">
  import Card from './card.vue'
  import useData from '/@/hooks/useData'
  import { ADMINISTRATIVE_DISTRICT_TEXT } from '/@/constant'
  import { AdministrativeDistrict } from '/@/enum'

  const { administrativeDistrictActive } = useData()
</script>

<style scoped lang="scss">
  .radio-group {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    &:deep(.el-radio-button__inner) {
      width: 75px;
      height: 32px;
      font-size: 14px;
      border-radius: 4px !important;
      border: 1px solid #eee;
      padding: 8px;
      margin: 5px 10px;
    }
  }
</style>
