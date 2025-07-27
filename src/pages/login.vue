<template>


  <div class="container">
    <div class="form-box">
      <div class="form">
        <div class="sys-name mb30 flex-center"><img class="logo-img mr5" src="@/assets/logo.png" alt="">管理后台</div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item class="mb25" prop="username">
            <el-input style="width: 300px" :prefix-icon="User" clearable v-model="ruleForm.username" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item class="mb25" prop="password">
            <el-input :prefix-icon="Lock" show-password clearable v-model="ruleForm.password" placeholder="请输入密码" @keyup.enter="login"/>
          </el-form-item>
          <el-button size="large" type="primary" round @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
    <RouterView />
</template>


<route>
{
    meta: {
        layout: 'other'
    }
}
</route>

<script lang="ts" setup>
import {Lock, User} from "@element-plus/icons-vue"

import { useCookies } from '@vueuse/integrations/useCookies'
import { useBase64 } from '@vueuse/core'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Login'
})

const cookies = useCookies(['locale']);

const router = useRouter();

const ruleForm = ref({
  username: '',
  password: ''
})
const rules = ref({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  },],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },],
})

const login = () => {

  cookies.set('locale', 'zh-CN', { maxAge: 30*24*60*60, secure: true, sameSite: "strict" })
}

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url("../assets/login-bg.png") no-repeat center / cover;

  .form-box{
    width: 1150px;
    margin: auto;
    height: 600px;
    background:url("../assets/login-form.png") no-repeat center / cover;
    display: flex;
    border-radius: 20px;
    justify-content: flex-end;
    overflow: hidden;
    box-shadow: 0 0 15px 10px rgba(46, 92, 246, 0.2);;
  }

  .form {
    width: 450px;
    text-align: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .sys-name {
      font-weight: normal;
      font-size: 22px;
      white-space: nowrap;
      animation: logoAnimation 0.8s ease;

      .logo-img {
        width: 40px;
      }
    }
  }
}

@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

:deep(*) {
  .el-button {
    width: 100%;
    font-size: 16px;
    height: 45px;
  }

  .el-input__inner {
    --el-input-inner-height: 45px;
    font-size: 16px;
  }

  .el-icon {
    font-size: 16px;
  }
}
</style>