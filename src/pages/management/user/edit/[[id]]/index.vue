<template>
<el-card>
<div v-if="id">用户详情：{{ id }}</div>
<div v-else>没有id</div>
</el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

interface Params {
  id?: string
  type?: string
}

const params = route.params as Params
const id = params.id
</script>
