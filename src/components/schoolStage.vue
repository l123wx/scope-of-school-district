<template>
  <Card>
    <template #title>学校阶段</template>
    <el-radio-group v-model="schoolStageActive" class="radio-group">
      <div v-for="item in Object.keys(SCHOOL_STAGE_TEXT)" :key="item">
        <el-radio-button :label="Number(item)">
          {{ SCHOOL_STAGE_TEXT[item as unknown as SchoolStage] }}
        </el-radio-button>
      </div>
    </el-radio-group>
  </Card>
</template>

<script setup lang="ts">
  import Card from './card.vue'
  import useData from '/@/hooks/useData'
  import { SCHOOL_STAGE_TEXT } from '/@/constant'
  import { SchoolStage } from '/@/enum'

  const { schoolStageActive } = useData()
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
