<template>

  <el-card class="table-container">
    <p>{{ $t('user') }}</p>
    <p>{{ t('user') }}</p>
  </el-card>



</template>


<script lang="ts" setup>
import {reactive,computed,ref} from "vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n() // use as global scope


</script>

<style scoped lang="scss"></style>