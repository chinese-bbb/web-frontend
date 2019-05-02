<template>
  <header class="header" ref="header">
    <div class="container">
      <h1>
        <router-link to="/">
          <!-- logo -->
          <slot>
            <img
              alt="element-logo"
              class="nav-logo"
              :class="{'in-home-page': inHomePage}"
              src="../assets/images/logo.png">
          </slot>
          <span class="title">互信公益</span>
        </router-link>
      </h1>

      <!-- nav -->
      <ul class="nav">
        <!-- 通知入口 -->
        <li class="nav-item nav-notifications" v-if="isLoggedIn">
          <el-badge :value="12" class="item nav-item--view">
            <span><fa-icon icon="bell"></fa-icon></span>
          </el-badge>
          <i></i>
        </li>

        <!-- 登录入口 -->
        <li class="nav-item entrance-item" v-if="!isLoggedIn">
          <router-link class="nav-item--view" to="/customer/signin">
            <span class="label">登录</span>
          </router-link>
        </li>

        <!-- gap -->
        <li class="nav-item" v-if="!isLoggedIn">
          <div class="nav-gap"></div>
        </li>

        <!-- 注册入口 -->
        <li class="nav-item entrance-item" v-if="!isLoggedIn">
          <router-link class="nav-item--view" to="/customer/signup">
            <span class="label">注册</span>
          </router-link>
        </li>

        <!-- 用户管理菜单 -->
        <li class="nav-item nav-theme-switch" v-if="isLoggedIn">
          <el-dropdown class="nav-item--view nav-dropdown">
            <span class="el-dropdown-link">
              <fa-icon icon="user"></fa-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户主页</el-dropdown-item>
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue {
  public isLoggedIn = false;
  get inHomePage() {
    return this.$store.state.inHomePage;
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/helper";

  $--nav-item-gap: 15px;
  $--header-text-color: #fff;
  $--link-color: $--header-text-color;
  $--active-indicator-color: $--header-text-color;
  $--header-font-size: 18px;

  .header {
    height: $headerHeight;
    background-color: $--color-primary;
    color: $--header-text-color;
    top: 0;
    left: 0;
    width: 100%;
    line-height: $headerHeight;
    z-index: 100;
    position: relative;

    .container {
      height: 100%;
      box-sizing: border-box;
    }

    h1 {
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: normal;

      a {
        text-decoration: none;
        display: block;
      }
    }

    .title {
      display: block;
      float: right;
      margin-left: 1rem;
    }

    .nav {
      float: right;
      height: 100%;
      line-height: 80px;
      background: transparent;
      padding: 0;
      margin: 0;

      &::before, &::after {
        display: table;
        content: "";
      }

      &::after {
        clear: both;
      }
    }

    .nav-gap {
      position: relative;
      width: 1px;
      height: 80px;
      padding: 0 $--nav-item-gap;

      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        width: 1px;
        height: 16px;
        background: $--border-color-lighter;
      }
    }

    .nav-logo,
    .nav-logo-small {
      vertical-align: sub;
    }

    .nav-logo-small {
      display: none;
    }

    .nav-item {
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;

      a {
        text-decoration: none;
        color: $--link-color;
        opacity: 0.5;
        display: block;

        &.active,
        &:hover {
          opacity: 1;
        }

        &.active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: calc(50% - 15px);
          width: 30px;
          height: 2px;
          background: $--active-indicator-color;
        }
      }
    }

    .nav-item--view {
      padding: 0 $--nav-item-gap;
    }
  }

  .nav-notifications {
    height: 100%;
  }

  .nav-notifications .el-badge {
    display: inline;
    vertical-align: text-bottom;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }

    .el-badge__content {
      right: 20px;
    }
  }

  .nav-dropdown {
    display: block;
    padding-left: 18px;
    width: 100%;

    span {
      display: block;
      font-size: $--header-font-size;
      color: $--header-text-color;
      transition: .2s;
      padding: 0 $--nav-item-gap;
      user-select: none;
      opacity: 0.5;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }

    &:hover {
      span {
        color: $--active-indicator-color;
      }
    }
  }

  .nav-dropdown-list {
    width: auto;
  }

  @include media-breakpoint-down(xs) {
    .header {
      .nav-logo {
        display: none;
      }

      .nav-logo-small {
        display: inline-block;
      }

      .nav-item {
        margin-left: 6px;

        &.lang-item,
        &:last-child {
          margin-left: 10px;
        }

        a {
          padding: 0 5px;
        }
      }

      .nav-theme-switch, .nav-algolia-search {
        display: none;
      }
    }
  }

  @include media-breakpoint-up(md) {
    .header {
      .nav-logo.in-home-page {
        width: 200px;
      }
      .nav-item {
        a, span {
          font-size: $--header-font-size;
        }
      }

      .nav-dropdown {
        padding: 0;
      }

      .nav-gap {
        padding: 0 8px;
      }

      .nav-versions {
        display: none;
      }
    }
  }
</style>
