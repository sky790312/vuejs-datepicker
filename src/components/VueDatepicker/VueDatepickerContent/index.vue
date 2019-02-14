<template>
  <component :is="contentView"></component>
</template>

<script>
import DayViewContent from './DayViewContent'
import MonthViewContent from './MonthViewContent'
import YearViewContent from './YearViewContent'
import {
  capitalize
} from '@/utils'

export default {
  name: 'VueDatepickerContent',
  components: {
    DayViewContent,
    MonthViewContent,
    YearViewContent
  },

  inject: ['VueDatepicker'],

  computed: {
    contentView () {
      const componentName = `${capitalize(this.VueDatepicker.datepickerView)}Content`
      return componentName
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
