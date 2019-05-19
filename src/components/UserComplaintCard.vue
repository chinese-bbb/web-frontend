<template>
  <div class="user-complaint-card">
    <div class="media d-flex">
      <div class="header">
        <span class="complaint-type">投诉类型：xxx</span>
        <span class="complaint-status">状态：xxx</span>
        <span class="complaint-owner">投诉人：xxx</span>
      </div>

      <div class="content ml-3">
        <p class="brief-summary">简要内容：xxxxxxxxxxxxxxxxxxxxxxxx</p>

        <el-button class="btn-block">查看具体</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class UserComplaintCard extends Vue {

  }
</script>

<style lang="scss" scoped>
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

  .content {
    text-align: left;
  }
</style>
