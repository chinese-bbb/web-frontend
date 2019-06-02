<template>
  <div class="merchant-info-card">
    <div class="media d-flex">
      <div class="thumb">
        <el-image :src="fisrtChar | charToImage" fluid alt="firm-logo"></el-image>
      </div>

      <div class="media-content">
        <div class="media-main-content">
          <h3 class="company-name">{{ data.Name }}</h3>
          <p class="establishment-time mb-0">成立时间 ：{{ data.StartDate | date }}</p>
          <p class="corporative-name mb-0">法人姓名 ：{{ data.OperName || '未知' }}</p>
          <p class="ibn mb-0">工商号码 ：{{ data.CreditCode || '未知' }}</p>
          <p class="business-scope mb-0">经营状态 ：{{ data.Status || '未知' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SearchItem } from '@/models';
import { generateBase64ImageFromText } from '@/utils';

@Component({
  filters: {
    charToImage(val: string) {
      return generateBase64ImageFromText(val, 300, 300);
    },
  },
})
export default class MerchantInfoCard extends Vue {
  @Prop(Object) data: SearchItem;

  get fisrtChar() {
    if (this.data && this.data.Name) {
      return this.data.Name[0];
    } else {
      return '@';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/helper';

$card-height: 142px;

.merchant-info-card:hover {
  box-shadow: $--box-shadow-dark;
}

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
