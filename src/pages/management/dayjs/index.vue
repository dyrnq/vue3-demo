<template>

<el-card>

   {{ now.format('YYYY-MM-DD') }}


</el-card>

<el-card>
      {{ now.isLeapYear() }}
</el-card>

</template>

<script setup lang="ts">

import dayjs from 'dayjs'

// 时间相关插件
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
import duration from 'dayjs/plugin/duration'
import rTime from 'dayjs/plugin/relativeTime'
import isLeapYear from 'dayjs/plugin/isLeapYear'

// 扩展插件
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(duration)
dayjs.extend(rTime)
dayjs.extend(isLeapYear)

dayjs.locale('zh-cn')
const now = dayjs()



</script>

