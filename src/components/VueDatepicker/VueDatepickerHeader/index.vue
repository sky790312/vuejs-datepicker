<template>
  <component :is="headerView"></component>
</template>

<script>
import DayViewHeader from './DayViewHeader'
import MonthViewHeader from './MonthViewHeader'
import YearViewHeader from './YearViewHeader'
import {
  capitalize
} from '@/utils'

export default {
  name: 'VueDatepickerHeader',
  components: {
    DayViewHeader,
    MonthViewHeader,
    YearViewHeader
  },

  inject: ['VueDatepicker'],

  data () {
    return {
    }
  },

  computed: {
    headerView () {
      const componentName = `${capitalize(this.VueDatepicker.datepickerView)}Header`
      return componentName
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
