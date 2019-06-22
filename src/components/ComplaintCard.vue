<template>
  <div class="user-complaint-card">
    <div class="media d-flex">
      <div class="thumb"></div>
      <div class="content">
        <div class="title-box">
          <h3 class="title">{{ complaint.complain_type | complaintType }}</h3>
          <el-tag :type="complaint.complaint_state | complaintStateClass" class="tag" size="small"
            >{{ complaint.complaint_state | complaintState }}
          </el-tag>
        </div>
        <p class="issue-time">投诉时间：{{ new Date(complaint.complain_timestamp).toLocaleDateString('zh-CN') }}</p>
        <p class="brief-summary">简要内容：{{ complaint.complaint_body }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ServerComplaintModel } from '@/models';

@Component
export default class ComplaintCard extends Vue {
  @Prop(Object) complaint: ServerComplaintModel;
}
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

.tag {
  margin-left: 1rem;
}

.content {
  text-align: left;
  flex-grow: 1;
  padding: 0.5rem 1rem;
}
</style>
