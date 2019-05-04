<template>
  <div class="complaint-details container">
    <div class="row">
      <div class="col-8">
        <el-card class="complaint-main-info" shadow="hover">
          <h3>用户投诉信息</h3>
        </el-card>

        <div class="mt-5">
          <h3>回复</h3>

          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容">
          </el-input>

          <div class="text-right mt-2">
            <el-button class="btn-submit" type="primary" @click="reply()">提交</el-button>
          </div>
        </div>
      </div>

      <el-card class="invoice-info col-4" shadow="hover">
        <h3>发票信息</h3>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class Home extends Vue {

    reply() {
      // do something
    }
  }
</script>

<style lang="scss" scoped>
  .complaint-main-info {
    height: 450px;
  }

  .invoice-info {
    height: 250px;
  }
  .btn-submit {
    width: 10em;
  }
</style>
