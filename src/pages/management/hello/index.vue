<template>



<CustomPagination v-model:currentPage="pagination.pageIndex" v-model:pageSize="pagination.pageSize"
                      :total="pagination.total" @changePage="changePage"/>

</template>


<script lang="ts" setup>
import {reactive,computed,ref} from "vue";

const pagination = ref({
    pageIndex: 1,
    pageSize: 50,
    total: 10000
})

const changePage = (page: number) => {
    pagination.value.pageIndex = page;
    //getTableList();
}


</script>

<style scoped lang="scss"></style>

<route>
{
    meta: {
        requireAuth: true
    }
}
</route>