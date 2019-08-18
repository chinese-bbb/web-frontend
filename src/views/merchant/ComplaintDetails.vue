<template>
  <div class="complaint-details container">
    <div class="row">
      <div class="col-12 col-md-8">
        <el-card class="complaint-main-info mb-3" shadow="hover" v-loading="loadingDetails">
          <div class="header">
            <h3>投诉详情</h3>
          </div>

          <div class="content">
            <div class="complaint-meta row mb-2">
              <span class="complaint-type col-12 col-sm-6 col-lg-5"
                >投诉类型：{{ complaintInfo.complain_type | complaintType }}</span
              >
              <span class="complaint-status col-12 col-sm-6 col-lg-3"
                >状态：{{ complaintInfo.complaint_state | complaintState }}</span
              >
              <span class="complaint-owner col-12 col-lg-4">投诉人：{{ complaintInfo.user | userName }}</span>
            </div>

            <p class="brief-summary">{{ complaintInfo.complaint_body }}</p>
          </div>
        </el-card>

        <el-card class="invoice-info mb-3 d-block d-md-none" shadow="hover">
          <h3>发票信息</h3>

          <div class="images-list" v-if="evidenceImages.length">
            <viewer :images="evidenceImages" class="viewer" ref="viewer">
              <template slot-scope="scope">
                <div class="image-wrapper" v-for="(src, index) in scope.images" :key="index">
                  <img class="img-fluid" :src="src" alt="点击查看大图" />
                </div>
              </template>
            </viewer>
          </div>

          <p v-if="!evidenceImages.length">无相关数据</p>
        </el-card>

        <el-card class="complaint-comments" shadow="hover" v-if="comments.length">
          <ol class="comments list-unstyled mb-0">
            <li class="comment media d-flex" v-for="item in comments" :key="item.timestamp">
              <div class="thumb mr-2">
                <i class="el-icon-s-custom"></i>
              </div>

              <div class="media-content flex-grow-1">
                <div class="comment-meta d-flex justify-content-between">
                  <span class="comment-owner-name">{{ item.user | userName(' ') }}：</span>
                  <span class="comment-time mt-1">{{ item.timestamp | date('yyyy-MM-dd HH:mm') }}</span>
                </div>

                <p class="comment-content">{{ item.text }}</p>
              </div>
            </li>
          </ol>
        </el-card>

        <div class="mt-5">
          <h3>回复</h3>

          <el-input
            :autosize="{ minRows: 4 }"
            :disabled="loadingComments || replying"
            placeholder="请输入内容"
            type="textarea"
            v-model="replyText"
          ></el-input>

          <div class="text-right mt-2">
            <el-button
              :disabled="!replyText.length"
              :loading="replying"
              @click="reply()"
              class="btn-submit"
              type="primary"
              >提交</el-button
            >
          </div>
        </div>
      </div>

      <el-card
        class="invoice-info col-md-4 p-0 d-none d-md-block"
        :class="{ empty: evidenceImages.length === 0 }"
        shadow="hover"
      >
        <h3>发票信息</h3>

        <div class="images-list" v-if="evidenceImages.length">
          <viewer :images="evidenceImages" class="viewer" ref="viewer">
            <template slot-scope="scope">
              <div class="image-wrapper" v-for="(src, index) in scope.images" :key="index">
                <img class="img-fluid" :src="src" alt="点击查看大图" />
              </div>
            </template>
          </viewer>
        </div>

        <p class="empty-msg" v-if="!evidenceImages.length">无相关数据</p>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Viewer from 'v-viewer/src/component.vue';
import { complaintService } from '@/services';
import { CommentModel, ServerComplaintModel } from '@/models';

const sourceImages = [];
// const base = parseInt(Math.random() * 60, 10) + 10;
// for (let i = 0; i < 10; i++) {
//   sourceImages.push('https://picsum.photos/1440/900/?image=' + (base + i));
// }

@Component({
  components: {
    Viewer,
  },
})
export default class ComplaintDetails extends Vue {
  @Prop(String) id: string;

  loadingDetails = false;
  loadingComments = false;
  replying = false;
  replyText = '';

  comments: CommentModel[] = [];
  complaintInfo: ServerComplaintModel = {} as any;

  get evidenceImages() {
    if (this.complaintInfo && this.complaintInfo.invoice_files) {
      return this.complaintInfo.invoice_files.concat(this.complaintInfo.evidence_files);
    } else {
      return [];
    }
  }

  viewerOptions = {};

  reply() {
    this.replying = true;

    complaintService
      .addComment(this.id, this.replyText)
      .then(
        () => {
          this.loadComments();
        },
        () => {
          this.$message.error('发送回复失败，请重试');
        },
      )
      .finally(() => (this.replying = false));
  }

  mounted() {
    this.loadDetails();

    this.loadComments();
  }

  loadDetails() {
    this.loadingDetails = true;

    complaintService
      .getComplaint(this.id)
      .then(resp => {
        this.complaintInfo = resp.data;
      })
      .finally(() => (this.loadingDetails = false));
  }

  loadComments() {
    this.loadingComments = true;

    complaintService
      .getCommentsByComplaint(this.id)
      .then(resp => {
        this.comments = resp.data;
      })
      .finally(() => (this.loadingComments = false));
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/helper';

.complaint-main-info {
  //height: 450px;
}

.brief-summary {
  white-space: pre-wrap;
  word-break: break-word;
}

.thumb {
  font-size: 64px;
  line-height: 1;
}

.invoice-info.empty {
  @include media-breakpoint-up(md) {
    height: 200px;
    text-align: center;

    .empty-msg {
      margin-top: 3em;
    }
  }
}

.image-wrapper {
  img {
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.btn-submit {
  width: 10em;
}

.comment:not(:last-child) {
  margin-bottom: 1rem;
  border-bottom: 1px solid $--border-color-light;
}

.comment-meta {
  color: $--color-text-secondary;
}
</style>
