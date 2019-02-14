<template>
  <div class="i-datepicker-header">
    <span
      class="prev"
      @click="showPrevNextYears(-1)">
    </span>
    <span class="year-range">
      {{ VueDatepicker.showYearRange.firstYear }} - {{ VueDatepicker.showYearRange.lastYear }}
    </span>
    <span
      class="next"
      @click="showPrevNextYears(1)">
    </span>
  </div>
</template>

<script>
import {
  PREV_NEXT_YEARS_TIME
} from '../constants'

export default {
  name: 'YearViewHeader',

  inject: [
    'VueDatepicker',
    'setShowDaysYearMonth',
    'setShowYearRange',
    'setDatepickerView'
  ],

  methods: {
    showPrevNextYears (prevNextNumber) {
      const prevNextYears = prevNextNumber * PREV_NEXT_YEARS_TIME
      const firstYear = this.VueDatepicker.showYearRange.firstYear + prevNextYears
      const lastYear = this.VueDatepicker.showYearRange.lastYear + prevNextYears
      const showYearRange = {
        firstYear,
        lastYear
      }
      this.setShowYearRange(showYearRange)
    },

    showYearView () {
      this.setDatepickerView('yearView')
    }
  }
}
</script>

<style lang="stylus" scoped>
.year-range {
  width: 70%
  padding: 10px 0
}
</style>
