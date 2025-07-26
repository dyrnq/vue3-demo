<template>

</template>

<script lang="ts" setup>
import { useHead } from '@unhead/vue';

useHead({
    title: "用户管理",
    titleTemplate: (title) => {
        return title ? `${title} - 后台管理系统` : '后台管理系统'
    },
    // meta: [
    //     { name: 'title', content: 'Nuxt 3 學習網站' },
    //     { name: 'description', content: '使用 Nuxt 3 來開發一個網站' },
    //     { name: 'keywords', content: 'Nuxt,Vue' },
    //     { property: 'og:title', content: 'Nuxt 3 學習網站' },
    //     { property: 'og:description', content: '使用 Nuxt 3 來開發一個網站' },
    //     { property: 'og:image', content: '/nuxt.png' }
    // ],
    // script: [
    //     {
    //     src: 'https://third-party-script.com',
    //     tagPosition: 'bodyClose', // 允許的值 head (預設), bodyClose, bodyOpen
    //     },
    // ],
    // link: [
    //     {
    //     rel: 'preconnect',
    //     href: 'https://fonts.googleapis.com'
    //     },
    //     {
    //     rel: 'stylesheet',
    //     href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
    //     crossorigin: ''
    //     },
    // ],


})
</script>
