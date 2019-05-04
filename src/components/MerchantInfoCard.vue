<template>
  <div class="merchant-info-card">
    <div class="media d-flex">
      <div class="thumb"></div>

      <div class="media-content">
        <div class="media-main-content">
          <h3 class="title">商户名称</h3>
          <p class="industry-type mb-1">行业：xxx</p>
          <p class="brief-summary mb-0">简介：xxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>

        <span class="score">评分：<span class="score-num">7.9</span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class MerchantInfoCard extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "../styles/helper";

  .media {
    background-color: #fafafa;
  }

  .thumb {
    width: 120px;
    height: 120px;
    background-color: #CCCCCC;
  }

  .title {
    //font-size: ;
  }

  .media-content {
    text-align: left;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    padding: $grid-gutter-width / 2;
  }
</style>
