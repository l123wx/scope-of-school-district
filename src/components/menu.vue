<template>
  <div class="menu-container">
    <SchoolStage />
    <AdministrativeDistrict />
    <div class="split"></div>
    <SchoolList style="flex: 1; overflow: hidden" />
  </div>
</template>

<script setup lang="ts">
  import SchoolStage from './schoolStage.vue'
  import AdministrativeDistrict from './administrativeDistrict.vue'
  import SchoolList from './schoolList.vue'
</script>

<style scoped lang="scss">
  .menu-container {
    width: 320px;
    height: 98vh;
    position: absolute;
    top: 1%;
    left: 10px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 2px 15px 1px hsl(0deg 0% 59% / 20%);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    .split {
      width: 100%;
      height: 6px;
      background: #f8f8f8;
    }
  }
</style>
