<template>
  <div class="card-item">
    <p class="card-p">
      <span class="blue"></span>
      <slot name="title"></slot>
    </p>
    <slot name="default"></slot>
  </div>
</template>

<style scoped lang="scss">
  .card-item {
    padding-bottom: 10px;
    .card-p {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      color: #2189ff;
      margin: 10px 0;
      .blue {
        display: inline-block;
        width: 8px;
        height: 14px;
        background: #2189ff;
        margin-right: 12px;
      }
    }
  }
</style>
