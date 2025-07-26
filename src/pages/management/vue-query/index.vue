<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

export default defineComponent({
  name: 'App',
  components: { VueQueryDevtools },
  setup() {
    const { data, error, isFetching, isPending } = useQuery({
      queryKey: ['repoData'],
      async queryFn() {
        return await fetch('https://api.github.com/repos/Tanstack/query').then(
          (response) => response.json(),
        )
      },
    })

    return {
      data,
      error,
      isFetching,
      isPending,
    }
  },
})
</script> -->





<template>
  <el-card>
  <template v-if="isPending"> Loading... </template>
  <template v-else-if="error">
    'An error has occurred: {{ error.message }}
  </template>
  <template v-else>
    {{ status }}
    <!-- {{ data }} -->
    <template v-if="status==200">
    <h1>{{ data.name }}</h1>
    <p>{{ data.description }}</p>
    <strong>👀 {{ data.subscribers_count }}</strong>
    <strong>✨ {{ data.stargazers_count }}</strong>
    <strong>🍴 {{ data.forks_count }}</strong>
    </template>
    <template v-else>
      
      <el-button type="danger" plain disabled>{{ data.message }}</el-button>
    </template>
    <div>{{ isFetching ? 'Updating...' : '' }}</div>
  </template>
  <VueQueryDevtools />
  </el-card>
</template>


<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'


interface RepoData {
  name: string
  description: string
  subscribers_count: number
  stargazers_count: number
  forks_count: number,
  message?: string
}

const data = ref<RepoData>({
  name: '',
  description: '',
  subscribers_count: 0,
  stargazers_count: 0,
  forks_count: 0
})

const status=ref(0);

const { data: repoInfo, error, isFetching, isPending } = useQuery({
  queryKey: ['repoData'],
  async queryFn() {
    const response = await fetch('https://api.github.com/repos/Tanstack/query')

    return {
     data: await response.json(),
     status: response.status,
     statusText: response.statusText
    }

  },
  refetchInterval: 30000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: "always"
})

watch(repoInfo, (newValue) => {
  if (newValue && newValue.data) {
    data.value = newValue.data
  }
  if (newValue && newValue.status) {
    status.value = newValue.status
  }

},{immediate: true }

)
</script>