<template>
  <div class="user-complaint-card">
    <div class="media d-flex">
      <div class="thumb"></div>
      <div class="content ml-3">
        <h3 class="title">xxxxxxxxxxxxxxxxxxxxxxx</h3>
        <p class="issue-time">投诉时间：xxxxxxxxx</p>
        <p class="brief-summary">简要内容：xxxxxxxxxxxxxxxxxxxxxxxx</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
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
