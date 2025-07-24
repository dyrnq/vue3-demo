<template>
  <div class="pagination-box">
    <el-pagination
        v-model:current-page="paginationData.currentPage"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="[50,100,1000,10000]"
        background
        hide-on-single-page
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.total"
        @size-change="changeSize"
        @current-change="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = withDefaults(defineProps<{
  currentPage: number,
  pageSize?: number,
  total: number
}>(), {
  pageSize: 100,
})


const paginationData = ref({
  currentPage: props.currentPage,
  pageSize: props.pageSize
})



// 改变每页大小
const changeSize = (size: number) => {
  paginationData.value.currentPage = 1;
  paginationData.value.pageSize = size;
  emits('changeSize', size);
}
const changePage = (page: number) => {
  paginationData.value.currentPage = page;
  emits('changePage', page);
}



const emits = defineEmits<{
  (event: 'changePage', page: number): void
  (event: 'changeSize', size: number): void
  (event: 'update:pageSize', size: number): void
  (event: 'update:currentPage', page: number): void
}>()
</script>

<style lang="scss" scoped>
.pagination-box {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
