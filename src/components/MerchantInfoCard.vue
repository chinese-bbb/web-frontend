<template>
  <div class="merchant-info-card">
    <div class="media d-flex">
      <div class="thumb"></div>

      <div class="media-content">
        <div class="media-main-content">
          <h3 class="company-name">奔驰（中国）股份有限公司</h3>
          <p class="establishment-time mb-0">成立时间 ：2001.5</p>
          <p class="business-scope mb-0">经营范围 ：汽车及汽车相关服务</p>
          <p class="corporative-name mb-0">法人姓名 ：赵三例</p>
          <p class="ibn mb-0">工商号码 ：18758390283665</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MerchantInfoCard extends Vue {}
</script>

<style lang="scss" scoped>
@import '../styles/helper';
$card-height: 142px;

.media {
  background-color: #fafafa;
}

.thumb {
  width: $card-height;
  height: $card-height;
  background-color: #cccccc;
}

.title {
  //font-size: ;
}

.media-content {
  text-align: left;
  padding: $grid-gutter-width / 2;
}

.media-main-content p {
  line-height: 20px;
}

.company-name {
  font-size: 1.5rem;
  line-height: 1;
}
</style>
