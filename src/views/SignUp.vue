<template>
  <div class="signup-view d-flex justify-content-center">
    <el-card class="signup-form">
      <el-form :model="form1" :rules="rules" key="form" ref="form" v-if="step === 1">
        <h2 class="form-title text-center mb-3">注册</h2>

        <el-form-item prop="phone_num" ref="phoneInput">
          <el-input placeholder="请输入手机号" v-model="form1.phone_num"></el-input>
        </el-form-item>

        <el-form-item class="captcha-row" prop="captcha">
          <el-input class="captcha-input" placeholder="请输入验证码" ref="captchaInput" v-model="form1.captcha">
          </el-input>

          <el-button :disabled="captchaDisabled" :loading="requestingSms" @click.prevent="requestCaptcha()"
                     class="btn-captha-request ml-2">获取验证码
            <span v-if="captchaDisabled">({{ counter }}s)</span>
          </el-button>
        </el-form-item>

        <el-form-item class="inline-radios" prop="gender">
          <el-radio-group v-model="form1.gender">
            <el-radio label="male">男性</el-radio>
            <el-radio label="female">女性</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="inline-radios" prop="agreement">
          <el-radio label="true" v-model="form1.agreement">我已阅读并同意
            <a @click.prevent="dialogVisible = true" href="#">用户条款</a>
          </el-radio>
        </el-form-item>

        <el-form-item>
          <el-button @click="tryStep2()" class="btn-block" type="primary">注册</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="form2" :rules="passRules" key="passForm" ref="passForm" v-if="step === 2">
        <h2 class="form-title text-center mb-3">设置密码</h2>

        <el-form-item prop="password">
          <el-input placeholder="请设置您的新密码" show-password v-model="form2.password"></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input placeholder="再次输入您的新密码" show-password v-model="form2.confirmPassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm()" class="btn-block" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="用户条款">
      <article><p>adlkfjdskfja;ldskf;kajlkdsfjlkadsjflkajdkslfjajkdsfjl</p></article>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { captchaPattern, phonePattern } from '@/constants';
  import { ElForm } from 'element-ui/types/form';
  import { ElInput } from 'element-ui/types/input';

  import {authService} from '../services';

  @Component({
    components: {},
  })
  export default class SignUp extends Vue {
    counter = 0;
    dialogVisible = false;
    requestingSms = false;
    submitting = false;
    step = 1;

    form1 = {
      phone_num: '',
      captcha: '',
      agreement: '',
      gender: '',
    };

    form2 = {
      password: '',
      confirmPassword: '',
    };

    rules = {
      phone_num: [{ required: true, pattern: phonePattern, message: '请填入有效的手机号码', trigger: 'blur' }],
      gender: [{ required: true, message: '请确定用户性别', trigger: 'blur' }],
      captcha: [{ required: true, pattern: captchaPattern, message: '验证码格式有误', trigger: 'blur' }],
      agreement: [{ required: true, message: '用户条款未同意', trigger: 'blur' }],
    };

    passRules = {
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码须为8位以上', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, message: '密码须为8位以上', trigger: 'blur' },
        { validator: this.validateConfirmPass, trigger: 'blur' },
      ],
    };

    captchaDisabled = false;

    private countDownTimer: undefined | number;

    beforeDestroy() {
      clearInterval(this.countDownTimer);
    }

    handleClose() {
      this.dialogVisible = false;
    }

    tryStep2() {
      (this.$refs.form as ElForm).validate(valid => {
        if (valid) {
          this.submitting = true;
          authService.validateSMS(this.form1.phone_num, this.form1.captcha)
            .then(() => {
              this.step = 2;
              clearInterval(this.countDownTimer);
            }, error => {
              this.$message.error(error.message);
            })
            .finally(() => this.submitting = false);
        }
      });
    }

    submitForm() {
      (this.$refs.passForm as ElForm).validate(valid => {
        if (valid) {
          this.submitting = true;
          authService.signup(this.form1.phone_num, this.form2.password, this.form1.gender)
            .then(() => {
              this.$router.push({ name: 'cSignUpSuccess' });
            }, error => {
              this.$message.error(error.message);
            })
            .finally(() => this.submitting = false);
        }
      });
    }

    requestCaptcha() {
      (this.$refs.form as ElForm).validateField('phone_num', err => {
        if (!err) {
          this.requestingSms = true;

          authService.sendSMS(this.form1.phone_num).then(() => {
            this.countDown();
          }, error => {
            this.$message.error(error.message);
          }).finally(() => {
            this.requestingSms = false;
          });
        }
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
      } else if (value !== this.form2.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
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

  .inline-radios /deep/ .el-form-item__content {
    line-height: 1;

    .el-radio {
      margin-bottom: 0;
    }
  }
</style>
