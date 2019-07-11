<template>
  <div class="user-complaint-card">
    <div class="media d-flex">
      <!-- <div class="thumb"></div> -->
      <div class="content">
        <div class="title-box">
          <h3 class="title">{{ complaint.complain_type | complaintType }}</h3>
          <el-tag :type="complaint.complaint_state | complaintStateClass" class="tag" size="small"
            >{{ complaint.complaint_state | complaintState }}
          </el-tag>
        </div>
        <p class="issue-time">投诉时间：{{ new Date(complaint.complain_timestamp).toLocaleDateString('zh-CN') }}</p>

        <v-clamp class="clamped-text" :max-lines="3" autoresize tag="p"
          >简要内容：{{ complaint.complaint_body }}
          <el-button
            size="small"
            v-if="expanded || clamped"
            slot="after"
            slot-scope="{ toggle, expanded, clamped }"
            class="ml-2"
            @click="toggle"
            >{{ expanded ? '收起' : '显示更多' }}</el-button
          >
        </v-clamp>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VClamp from 'vue-clamp';
import { ServerComplaintModel } from '@/models';

@Component({
  components: {
    VClamp,
  },
})
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
