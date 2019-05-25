<template>
  <div class="signin-view d-flex justify-content-center">
    <el-card class="signin-form">
      <el-form :model="form" :rules="rules" ref="form">
        <h2 class="form-title text-center mb-3">登录</h2>

        <el-form-item prop="username">
          <el-input placeholder="" v-model="form.username">
            <span class="" slot="prefix">用户名</span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="" show-password v-model="form.password">
            <span class="" slot="prefix">密<span class="invisible">哦</span>码</span>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="btn-block" type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>

        <el-form-item>
          <router-link to="/customer/signup">
            <span class="label">立即注册</span>
          </router-link>

          <router-link to="/customer/resetpwd">
            <span class="label">忘记密码</span>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { phonePattern, SignInType } from '@/constants';
import { ElForm } from 'element-ui/types/form';

import authService from '../services/authentication.service';

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

  rules = {
    username: [{ required: true, pattern: phonePattern, message: '请填入有效的手机号码', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码须为6位以上', trigger: 'blur' },
    ],
  };

  submitForm() {
    (this.$refs.form as ElForm).validate(valid => {
      if (valid) {
        authService.signin(this.form.username, this.form.password).then(
          () => {
            this.$store.commit('authenticate', this.form);
            this.$router.push({ name: this.from === SignInType.Customer ? 'profile' : 'dashboard' });
          }, error => {
            this.$message.error(error.message);
          },
        );
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
