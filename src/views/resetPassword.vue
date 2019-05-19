<template>
  <div class="reset-pwd-view text-center mt-4">
    <h2 class="mb-4">找回密码</h2>

    <section v-if="step === 1">
      <el-form :model="form1" :rules="rules" ref="form1">
        <el-form-item prop="username">
          <el-input placeholder="手机号" v-model="form1.username">
          </el-input>
        </el-form-item>

        <el-form-item class="pic-captcha-form-item" prop="picCaptcha">
          <el-input placeholder="请输入右图中的文字" show-password v-model="form1.picCaptcha">
          </el-input>

          <div class="pic-captcha-box">
            <img alt="pic-captcha" class="pic-captcha" src="">
          </div>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitPicCaptcha()" class="btn-block" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section v-if="step === 2">
      <p class="hint text-center">验证码已发送到您的手机</p>

      <el-form :model="form2" :rules="rules" ref="form2">
        <el-form-item prop="username">
          <el-input :disabled="true" placeholder="手机号" v-model="form2.username">
          </el-input>
        </el-form-item>

        <el-form-item class="captcha-row" prop="smsCaptcha">
          <el-input class="captcha-input" placeholder="请输入验证码" ref="captchaInput" v-model="form2.smsCaptcha">
          </el-input>

          <el-button :disabled="captchaDisabled"
                     @click.prevent="requestCaptcha()"
                     class="btn-captha-request ml-2">获取验证码<span v-if="captchaDisabled">({{counter}}s)</span>
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitSMSCaptcha()" class="btn-block" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section v-if="step === 3">
      <p class="hint text-center">设置新密码，不少于8位</p>

      <el-form :model="form3" :rules="rules" ref="form3">
        <el-form-item prop="password">
          <el-input placeholder="请设置您的新密码" show-password v-model="form3.password">
          </el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input placeholder="再次输入您的新密码" show-password v-model="form3.confirmPassword">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetPassword()" class="btn-block" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { phonePattern } from '@/constants';
  import { ElInput } from 'element-ui/types/input';
  import { ElForm } from 'element-ui/types/form';

  import authService from '../services/authentication.service';

  @Component({
    props: {
      from: String,
    },
  })
  export default class ResetPassword extends Vue {

    counter = 0;
    step = 1;

    form1 = {
      username: '',
      picCaptcha: '',
    };

    form2 = {
      username: '',
      smsCaptcha: '',
    };
    form3 = {
      username: '',
      password: '',
      confirmPassword: '',
    };

    rules = {
      username: [
        { required: true, pattern: phonePattern, message: '请填入有效的手机号码', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码须为6位以上', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码须为6位以上', trigger: 'blur' },
        { validator: this.validateConfirmPass, trigger: 'blur' },
      ],
      smsCaptcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 4, message: '验证码长度有误', trigger: 'blur' },
      ],
      picCaptcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 4, message: '验证码长度有误', trigger: 'blur' },
      ],
    };

    captchaDisabled = false;
    private countDownTimer: undefined | number;

    submitPicCaptcha() {
      (this.$refs.form1 as ElForm).validate(valid => {
        if (valid) {

          this.form2.username = this.form1.username;
          this.step = 2;
        }
      });
    }

    submitSMSCaptcha() {

      (this.$refs.form2 as ElForm).validate(valid => {
        if (valid) {

          this.form3.username = this.form2.username;
          this.step = 3;
        }
      });
    }

    resetPassword() {

      (this.$refs.form3 as ElForm).validate(valid => {
        if (valid) {
          authService.resetPwd(this.form3.username, this.form3.password);
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

    private validateConfirmPass(rule: any, value: string, callback: any) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form3.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .reset-pwd-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }

  section {
    width: 360px;
  }

  .pic-captcha-form-item /deep/ .el-form-item__content {
    display: flex;
  }

  .pic-captcha-box {
    width: 150px;
    height: 40px;
    margin-left: 0.5rem;
    background-color: #ccc;
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
