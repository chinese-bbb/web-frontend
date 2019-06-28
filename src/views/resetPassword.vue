<template>
  <div class="reset-pwd-view text-center mt-4">
    <h2 class="mb-4">找回密码</h2>

    <section v-if="step === 1">
      <el-form :model="form1" :rules="rules" key="form3" ref="form1">
        <el-form-item prop="username">
          <el-input placeholder="手机号" v-model="form1.username"></el-input>
        </el-form-item>

        <el-form-item class="pic-captcha-form-item" prop="picCaptcha">
          <el-input placeholder="请输入右图中的文字" v-model="form1.picCaptcha"></el-input>

          <div @click="refreshPicCaptcha" class="pic-captcha-box">
            <img :src="picCaptchaMeta.dataURL" alt="pic-captcha" class="pic-captcha" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitPicCaptcha()" class="btn-block" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </section>

    <section v-if="step === 2">
      <p class="hint text-center">验证码已发送到您的手机</p>

      <el-form :model="form2" :rules="rules" key="form2" ref="form2">
        <el-form-item prop="username">
          <el-input :disabled="true" placeholder="手机号" v-model="form2.username"></el-input>
        </el-form-item>

        <el-form-item class="captcha-row" prop="smsCaptcha">
          <el-input
            class="captcha-input"
            placeholder="请输入验证码"
            ref="captchaInput"
            v-model="form2.smsCaptcha"
          ></el-input>

          <el-button
            :loading="requestingSms"
            :disabled="captchaDisabled"
            @click.prevent="requestCaptcha()"
            class="btn-captha-request ml-2"
          >
            获取验证码
            <span v-if="captchaDisabled">({{ counter }}s)</span>
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button :loading="validating" @click="submitSMSCaptcha()" class="btn-block" type="primary"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
    </section>

    <section v-if="step === 3">
      <p class="hint text-center">设置新密码，不少于8位</p>

      <el-form :model="form3" :rules="rules" key="form3" ref="form3">
        <el-form-item prop="password">
          <el-input placeholder="请设置您的新密码" show-password v-model="form3.password"></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input placeholder="再次输入您的新密码" show-password v-model="form3.confirmPassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :loading="resetting" @click="resetPassword()" class="btn-block" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { phonePattern, SignInType } from '@/constants';
import { ElInput } from 'element-ui/types/input';
import { ElForm } from 'element-ui/types/form';
import { CodeMeta, create as createVerificationCode } from 'verification-code';

import { authService } from '../services';

@Component({})
export default class ResetPassword extends Vue {
  @Prop({ type: String, default: SignInType.Customer }) from: SignInType;

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
    username: [{ required: true, pattern: phonePattern, message: '请填入有效的手机号码', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, message: '密码须为8位以上', trigger: 'blur' },
    ],
    confirmPassword: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, message: '密码须为8位以上', trigger: 'blur' },
      { validator: this.validateConfirmPass, trigger: 'blur' },
    ],
    smsCaptcha: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { min: 4, message: '验证码长度有误', trigger: 'blur' },
    ],
    picCaptcha: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { min: 4, message: '验证码长度有误', trigger: 'blur' },
      {
        validator: (rule: any, value: string, callback: any) => {
          const code = this.picCaptchaMeta.code;
          if (value.toLowerCase() === code.toLowerCase()) {
            callback();
          } else {
            callback('验证码输入错误');
          }
        },
        trigger: 'blur',
      },
    ],
  };

  captchaDisabled = false;
  validating = false;
  resetting = false;
  requestingSms = false;
  picCaptchaMeta: CodeMeta = { code: '', dataURL: '' };
  private countDownTimer: undefined | number;

  mounted() {
    this.refreshPicCaptcha();
  }

  beforeDestroy() {
    clearInterval(this.countDownTimer);
  }

  refreshPicCaptcha() {
    const { code, dataURL } = createVerificationCode();

    this.picCaptchaMeta.dataURL = dataURL;
    this.picCaptchaMeta.code = code;
  }

  submitPicCaptcha() {
    (this.$refs.form1 as ElForm).validate(valid => {
      if (valid) {
        this.form2.username = this.form1.username;
        this.step = 2;

        this.requestCaptcha();
      }
    });
  }

  submitSMSCaptcha() {
    (this.$refs.form2 as ElForm).validate(valid => {
      if (valid) {
        this.validating = true;
        authService
          .validateSMS(this.form1.username, this.form2.smsCaptcha)
          .then(() => {
            clearInterval(this.countDownTimer);
            this.form3.username = this.form2.username;
            this.step = 3;
          })
          .finally(() => {
            this.validating = false;
          });
      }
    });
  }

  resetPassword() {
    (this.$refs.form3 as ElForm).validate(valid => {
      if (valid) {
        this.resetting = true;
        authService
          .resetPwd(this.form3.username, this.form3.password)
          .then(() => {
            this.$msgbox.alert('密码已重置', {
              showConfirmButton: true,
              center: true,
              showClose: false,
              callback: () => {
                this.$router.push({
                  name: this.from === SignInType.Customer ? 'cSignIn' : 'mSignIn',
                });
              },
            });
          })
          .finally(() => {
            this.resetting = false;
          });
      }
    });
  }

  requestCaptcha() {
    this.requestingSms = true;
    authService
      .sendSMS(this.form1.username)
      .then(
        () => {
          this.countDown();
        },
        error => {
          this.$message.error(error.message);
        },
      )
      .finally(() => {
        this.requestingSms = false;
      });
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
  display: flex;
  cursor: pointer;

  .pic-captcha {
    width: 100%;
    height: 100%;
    border: 1px solid #b6b6b6;
  }
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
