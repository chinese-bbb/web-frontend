<template>
  <div class="signup-view d-flex justify-content-center">
    <el-card class="signup-form">
      <el-form :model="form1" :rules="rules" key="form" ref="form" v-if="step === 1">
        <h2 class="form-title text-center mb-3">注册</h2>

        <el-form-item prop="phone_num" ref="phoneInput">
          <el-input placeholder="请输入手机号" ref="phoneInput" v-model="form1.phone_num"></el-input>
        </el-form-item>

        <el-form-item class="captcha-row" prop="captcha">
          <el-input
            class="captcha-input"
            placeholder="请输入验证码"
            ref="captchaInput"
            v-model="form1.captcha"
          ></el-input>

          <el-button
            :disabled="captchaDisabled"
            :loading="requestingSms"
            @click.prevent="requestCaptcha()"
            class="btn-captha-request ml-2"
          >
            获取验证码
            <span v-if="captchaDisabled">({{ counter }}s)</span>
          </el-button>
        </el-form-item>

        <el-form-item class="inline-radios" prop="agreement">
          <el-radio-group v-model="form1.agreement">
            <el-radio :label="true">
              我已阅读并同意
              <a @click.prevent="dialogVisible = true" href="#">用户条款</a>
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button :loading="submitting" @click="tryStep2()" class="btn-block" type="primary">注册</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="form2" :rules="rules" key="passForm" ref="passForm" v-if="step === 2">
        <h2 class="form-title text-center mb-3">设置密码</h2>

        <el-form-item prop="password">
          <el-input placeholder="请设置您的新密码" show-password v-model="form2.password"></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input placeholder="再次输入您的新密码" show-password v-model="form2.confirmPassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="tryStep3()" class="btn-block" type="primary">确定</el-button>
        </el-form-item>
      </el-form>

      <el-form :model="form3" :rules="rules" class="info-form" key="infoForm" ref="infoForm" v-if="step === 3">
        <h2 class="form-title text-center mb-3">设置基本信息</h2>

        <div class="row names">
          <el-form-item class="col" label="姓" prop="lastName">
            <el-input v-model="form3.lastName"></el-input>
          </el-form-item>

          <el-form-item class="col" label="名" prop="firstName">
            <el-input v-model="form3.firstName"></el-input>
          </el-form-item>
        </div>

        <el-form-item class="inline-radios" label="性别" prop="gender">
          <el-radio-group v-model="form3.gender">
            <el-radio label="male">男性</el-radio>
            <el-radio label="female">女性</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="item-email" label="邮箱" prop="email">
          <el-input v-model="form3.email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :loading="submitting" @click="submitForm()" class="btn-block" type="primary">完成</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogVisible" title="用户条款">
      <service-term></service-term>

      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { captchaPattern, passwordPattern, phonePattern, SignInType } from '@/constants';
import { ElForm } from 'element-ui/types/form';
import { ElInput } from 'element-ui/types/input';

import ServiceTerm from '../components/service-term.vue';

import { authService } from '../services';

@Component({
  components: {
    ServiceTerm,
  },
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
    agreement: null,
  };

  form2 = {
    password: '',
    confirmPassword: '',
  };

  form3 = {
    firstName: '',
    gender: '',
    lastName: '',
    email: '',
  };

  rules = {
    phone_num: [{ required: true, pattern: phonePattern, message: '请填入有效的手机号码', trigger: 'blur' }],
    gender: [{ required: true, message: '请确定用户性别', trigger: 'change' }],
    captcha: [
      {
        required: true,
        pattern: captchaPattern,
        message: '验证码格式有误',
        trigger: 'blur',
      },
      { min: 4, message: '验证码长度有误', trigger: 'blur' },
    ],
    agreement: [{ required: true, message: '用户条款未同意', trigger: 'change' }],
    password: [
      { required: true, pattern: passwordPattern, message: '请输入有效密码（字母、数字、特殊字符）', trigger: 'blur' },
      { min: 8, message: '密码须为8位以上', trigger: 'blur' },
    ],
    confirmPassword: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, message: '密码须为8位以上', trigger: 'blur' },
      { validator: this.validateConfirmPass, trigger: 'blur' },
    ],
    lastName: [{ required: true, message: '请输入您的姓氏', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
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
    this.submitting = true;
    (this.$refs.form as ElForm).validate(valid => {
      if (valid) {
        authService
          .validateSMS(this.form1.phone_num, this.form1.captcha)
          .then(
            () => {
              this.step = 2;
              clearInterval(this.countDownTimer);
            },
            error => {
              this.$message.error('短信验证码错误');
            },
          )
          .finally(() => (this.submitting = false));
      } else {
        this.submitting = false;
      }
    });
  }

  tryStep3() {
    (this.$refs.passForm as ElForm).validate(valid => {
      if (valid) {
        this.step = 3;
      }
    });
  }

  submitForm() {
    this.submitting = true;
    (this.$refs.infoForm as ElForm).validate(valid => {
      if (valid) {
        authService
          .signup({
            phoneNum: this.form1.phone_num,
            password: this.form2.password,
            sex: this.form3.gender,
            firstName: this.form3.firstName,
            lastName: this.form3.lastName,
            email: this.form3.email,
          })
          .then(
            () => {
              this.$store.dispatch('signIn', { username: this.form1.phone_num, type: SignInType.Customer });
              this.$router.push({ name: 'cSignUpSuccess' });
            },
            error => {
              this.$message.error('注册失败，请重试');
            },
          )
          .finally(() => (this.submitting = false));
      } else {
        this.submitting = true;
      }
    });
  }

  requestCaptcha() {
    this.requestingSms = true;
    (this.$refs.form as ElForm).validateField('phone_num', err => {
      if (!err) {
        authService
          .isPhoneExisted(this.form1.phone_num)
          .then(
            () => {
              throw new Error('手机号码已注册');
            },
            () => true,
          )
          .then(() =>
            authService.sendSMS(this.form1.phone_num).then(
              () => {
                this.countDown();
              },
              error => {
                this.$message.error('发送验证码失败，请重试');
              },
            ),
          )
          .catch(error => this.$message.error(error.message))
          .finally(() => {
            this.requestingSms = false;
          });
      } else {
        this.requestingSms = true;
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

.inline-radios /deep/ {
  .el-form-item__label,
  .el-form-item__content {
    line-height: 28px;
  }
}

.names /deep/ .el-input {
  width: calc(100% - 40px);
}

.item-email /deep/ .el-input {
  width: calc(100% - 54px);
}
</style>
