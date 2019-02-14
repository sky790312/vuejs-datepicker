<template>
  <div class="i-datepicker-header">
    <span
      class="prev"
      @click="showPrevNextMonth(-1)">
    </span>
    <span
      class="current"
      @click="showMonthView()">
      {{ months[VueDatepicker.showDaysYearMonth.month] }} {{ VueDatepicker.showDaysYearMonth.year }}
    </span>
    <span
      class="next"
      @click="showPrevNextMonth(1)">
    </span>
  </div>
</template>

<script>
import {
  MONTHS
} from '../constants'

export default {
  name: 'DayViewHeader',

  inject: [
    'VueDatepicker',
    'setShowDaysYearMonth',
    'setDatepickerView'
  ],

  data () {
    return {
      months: MONTHS
    }
  },

  methods: {
    showPrevNextMonth (prevNextNumber) {
      let year = this.VueDatepicker.showDaysYearMonth.year
      let month = this.VueDatepicker.showDaysYearMonth.month + prevNextNumber
      if (month < 0) {
        month = 11
        year = year - 1
      } else if (month > 11) {
        month = 0
        year = year + 1
      }
      const showDaysYearMonth = {
        year,
        month
      }
      this.setShowDaysYearMonth(showDaysYearMonth)
    },

    showMonthView () {
      this.setDatepickerView('monthView')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
