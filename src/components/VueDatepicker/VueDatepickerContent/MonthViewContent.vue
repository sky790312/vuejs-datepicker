<template>
  <div class="i-datepicker-content">
    <div class="i-datepicker-content-inner">
      <span
        v-for="(month, index) in months"
        :key="month"
        :class="['month', { 'selected': isSelected(index) }]"
        @click="onSelectedMonth(index)">
        {{ month }}
      </span>
    </div>
  </div>
</template>

<script>
import {
  MONTHS
} from '../constants'

export default {
  name: 'MonthViewContent',

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
    isSelected (selectedMonth) {
      return this.VueDatepicker.selectedDate.year === this.VueDatepicker.showDaysYearMonth.year && this.VueDatepicker.selectedDate.month === selectedMonth
    },

    onSelectedMonth (selectedMonth) {
      const showDaysYear = this.VueDatepicker.showDaysYearMonth.year
      const showDaysYearMonth = {
        year: showDaysYear,
        month: selectedMonth
      }
      this.setShowDaysYearMonth(showDaysYearMonth)
      this.setDatepickerView('dayView')
    }
  }
}
</script>

<style lang="stylus" scoped>
.month {
  width: calc(100% / var(--i-datepicker-month-rows))
  padding: 20px
  box-sizing: border-box
  border-radius: 50%
  border: 1px solid $white
  cursor: pointer

  &:hover {
    border-color: $red
  }

  &.selected {
    color: $white
    background-color: $red
  }
}
</style>
