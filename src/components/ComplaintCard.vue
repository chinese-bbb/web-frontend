<template>
  <div class="user-complaint-card">
    <div class="media d-flex">
      <div class="thumb"></div>
      <div class="content">
        <div class="title-box">
          <h3 class="title">{{complaint.complain_type}}</h3>
          <el-tag class="tag" size="small" :type="(complaint.if_negotiated_by_merchant ? 'success' : 'danger')">{{ complaint.if_negotiated_by_merchant ? '已解决' : '未解决' }}</el-tag>
        </div>
        <p class="issue-time">投诉时间：{{ new Date(complaint.complain_timestamp).toLocaleDateString('zh-CN') }}</p>
        <p class="brief-summary">简要内容：{{ complaint.complaint_body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    complaint: Object,
  },
})
export default class ComplaintCard extends Vue {}
</script>

<style lang="scss" scoped>
.media {
  background-color: #fafafa;
  align-items: center;
}

.thumb {
  width: 140px;
  height: 140px;
  background-color: #cccccc;
}

.title-box {
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: space-between;
}

.tag{
  margin-left: 1rem;
}

.content {
  text-align: left;
  width: 100%;
  padding: .5rem 1rem;
}
</style>
