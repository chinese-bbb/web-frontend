<template>
  <div class="signup-view d-flex justify-content-center">
    <el-card class="signup-form">
      <el-form :model="form" :rules="rules" ref="form">
        <h2 class="form-title text-center mb-3">注册</h2>

        <el-form-item prop="phone_num">
          <el-input placeholder="请输入手机号" v-model="form.phone_num"> </el-input>
        </el-form-item>

        <el-form-item class="captcha-row" prop="captcha">
          <el-input class="captcha-input" ref="captchaInput" placeholder="请输入验证码" v-model="form.captcha">
          </el-input>

          <el-button class="btn-captha-request ml-2" :disabled="captchaDisabled" @click.prevent="requestCaptcha()"
            >获取验证码<span v-if="captchaDisabled">({{ counter }}s)</span></el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button class="btn-block" type="primary" @click="submitForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { captchaPattern, phonePattern } from '@/constants';
import { ElForm } from 'element-ui/types/form';
import { ElInput } from 'element-ui/types/input';

@Component({
  components: {},
})
export default class SignIn extends Vue {
  counter = 0;

  form = {
    phone_num: '',
    captcha: '',
  };

  rules = {
    phone_num: [{ required: true, pattern: phonePattern, message: '请填入有效的手机号码', trigger: 'blur' }],
    captcha: [{ required: true, pattern: captchaPattern, message: '验证码格式有误', trigger: 'blur' }],
  };

  captchaDisabled = false;
  private countDownTimer: undefined | number;

  beforeDestroy() {
    clearInterval(this.countDownTimer);
  }

  submitForm() {
    (this.$refs.form as ElForm).validate(valid => {
      if (valid) {
        this.$router.push({ name: 'cSignUpSuccess' });
      } else {
        return false;
      }
    });
  }

  requestCaptcha() {
    this.countDown();
  }

  private countDown() {
    this.counter = 59;
    this.captchaDisabled = true;
    this.countDownTimer = setInterval(() => {
      this.counter -= 1;
      if (this.counter === 0) {
        clearInterval(this.countDownTimer);
        this.captchaDisabled = false;
        (this.$refs.captchaInput as ElInput).focus();
      }
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.signup-form {
  width: 360px;
  margin-top: 5rem;
}

.form-title {
  line-height: 1;
  font-weight: normal;
}

.captcha-input {
  width: 50%;
}

.captcha-row /deep/ .el-form-item__content {
  display: flex;

  .captcha-input {
    flex-grow: 1;
  }
}
</style>
