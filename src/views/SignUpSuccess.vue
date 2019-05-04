<template>
  <div class="signup-success-view container text-center">
    <template v-if="from === 'c'">
      <h2 class="title"><i class="el-icon-success"></i>注册成功</h2>

      <p class="message mb-5">为了保证投诉的真实有效性，请继续完成实名注册或
        <router-link class="signin-link" to="/customer/signin">直接登录</router-link>
      </p>

      <el-button @click="gotoRealNameAuth()" class="btn-continue" type="primary">继续</el-button>
    </template>


    <template v-if="from === 'm'">
      <h2 class="title mb-5"><i class="el-icon-success"></i>注册成功</h2>

      <router-link class="btn-continue el-button el-button--primary" tag="button" to="/merchant/signin">确定</router-link>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { SignInType } from '@/constants';

  @Component({
    props: {
      from: String,
    },
  })
  export default class SignUpSuccess extends Vue {
    from: SignInType;

    gotoRealNameAuth() {
      this.$router.push({ name: 'realnameAuth' });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/helper";

  .signup-success-view {
    margin-top: calc((50vh - 80px) / 2);
  }

  .signin-link {
    color: $--color-primary;
    text-decoration: underline;
  }

  .title i {
    color: lighten($--color-primary, 27%)
  }

  .message {
    font-size: 1.5em;
  }

  .btn-continue {
    width: 10em;
  }
</style>
