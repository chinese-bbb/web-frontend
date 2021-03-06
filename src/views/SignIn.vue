<template>
  <div class="signin-view d-flex justify-content-center">
    <el-card class="signin-form">
      <el-form :model="form" :rules="rules" ref="form">
        <h2 class="form-title text-center mb-3">登录</h2>

        <el-form-item prop="username">
          <el-input placeholder="" v-model="form.username">
            <span class="" slot="prefix">手机号</span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="" show-password v-model="form.password">
            <span class="" slot="prefix">密<span class="invisible">哦</span>码</span>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm()" class="btn-block" type="primary" :loading="submitting">登录</el-button>
        </el-form-item>

        <el-form-item>
          <router-link :to="{ name: 'cSignUp' }">
            <span class="label">立即注册</span>
          </router-link>

          <router-link :to="{ name: 'resetPwd' }">
            <span class="label">忘记密码</span>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { phonePattern, SignInType, passwordPattern } from '@/constants';
import { ElForm } from 'element-ui/types/form';

import { authService } from '../services';
// @ts-ignore
import { parsePhoneNumberFromString } from '../libs/libphonenumber-custom/mobile.js';

@Component({
  props: {
    from: String,
  },
})
export default class SignIn extends Vue {
  from: SignInType;
  form = {
    username: '',
    password: '',
  };
  submitting = false;

  rules = {
    username: [
      {
        required: true,
        validator: (rule: any, val: any, cb: any) => {
          parsePhoneNumberFromString(val, 'CN').isValid() ? cb() : cb('invalid');
        },
        message: '请填入有效的手机号码',
        trigger: 'blur',
      },
    ],
    password: [
      { required: true, pattern: passwordPattern, message: '请输入有效密码', trigger: 'blur' },
      { min: 8, message: '密码须为8位以上', trigger: 'blur' },
    ],
  };

  submitForm() {
    (this.$refs.form as ElForm).validate(valid => {
      if (valid) {
        this.submitting = true;
        authService
          .signin(this.form.username, this.form.password)
          .then(
            () => {
              this.$store.dispatch('signIn', { username: this.form.username, type: this.from });
              this.$router.push({ name: this.from === SignInType.Customer ? 'profile' : 'dashboard' });
            },
            error => {
              if (error.response.status < 500) {
                this.$message.error('用户名或密码错误，请重试');
              }
            },
          )
          .finally(() => (this.submitting = false));
      } else {
        return false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.signin-form {
  width: 360px;
  margin-top: 5rem;
}

.form-title {
  line-height: 1;
  font-weight: normal;
}

.el-input--prefix /deep/ {
  .el-input__prefix {
    left: 0.5em;
  }

  .el-input__inner {
    padding-left: 4em;
  }
}

.el-form-item:last-child /deep/ .el-form-item__content {
  &::before,
  &::after {
    content: none;
  }

  display: flex;
  justify-content: space-between;
  line-height: 1;
}
</style>
