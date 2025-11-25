<template>
  <Card style="display: flex; flex-direction: column">
    <template #title>
      <div class="box">
        <div>学校</div>
        <div style="font-size: 14px">
          全选/全不选
          <el-switch v-model="isAllSchoolSelected" />
        </div>
      </div>
    </template>
    <div style="flex: 1; overflow-y: auto">
      <el-scrollbar>
        <el-collapse>
          <template v-for="item in schoolList" :key="item.name">
            <el-collapse-item
              v-show="isSchoolMatching(item.schoolStage, item.administrativeDistrict)"
              class="description"
            >
              <template #title>
                <div
                  style="
                    width: 100%;
                    padding-left: 15px;
                    padding-right: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                  "
                >
                  <div>{{ item.name }}</div>
                  <el-switch v-model="item.ifShow" @click.stop />
                </div>
              </template>
              <div style="padding: 15px; background-color: #f5f9ff">{{ item.description }}</div>
            </el-collapse-item>
          </template>
        </el-collapse>
      </el-scrollbar>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import useData from '/@/hooks/useData'

  const { schoolList, isAllSchoolSelected, isSchoolMatching } = useData()
</script>

<style scoped lang="scss">
  .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
  }
  .description:deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
</style>
