<template>


<el-card>
<el-button type="primary" @click="notify">Primary</el-button>
</el-card>

<el-card style="margin-top: 20px;">
<el-button type="primary" @click="get">Primary</el-button>
</el-card>

<el-card style="margin-top: 20px;">
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>

  <div class="mb-4" style="margin-top: 20px;">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </div>

  <div class="mb-4" style="margin-top: 20px;">
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </div>

  <div style="margin-top: 20px;">
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </div>

</el-card>


</template>


<script lang="ts" setup>
import {reactive,computed,ref} from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

const service = axios.create({
  baseURL: "/ui", // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
    // 处理 CORS
    'Access-Control-Allow-Origin': '*'
  }
})

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
  }); // ToastOptions
}

const get = async () =>{
    try{
      const response = await service.get('favicon.ico')

      toast(response.status, {
        autoClose: 1000,
      });

    } catch (error) {

      toast(error, {
        autoClose: 6000,
      });

      if (axios.isCancel(error)) {
        console.log('请求取消')
      }
    }
};

</script>

<style scoped lang="scss"></style>

<route>
{
    meta: {
        requireAuth: false
    }
}
</route>