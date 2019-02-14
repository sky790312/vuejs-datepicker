<template>
  <div class="i-datepicker-content">
    <div class="i-datepicker-content-inner">
      <span
        v-for="showYear in showYears"
        :key="`${showYear.name}-${showYear.year}`"
        :class="getShowYearClass(showYear)"
        @click="onSelectedYear(showYear)">
        {{ showYear.year }}
      </span>
    </div>
  </div>
</template>

<script>
import {
  YEAR_VIEW_TOTAL_YEARS
} from '../constants'

export default {
  name: 'YearViewContent',

  inject: [
    'VueDatepicker',
    'setShowDaysYearMonth',
    'setDatepickerView'
  ],

  methods: {
    getShowYearClass (showYear) {
      let year = ''
      if (showYear.name === 'lastYear') {
        year = 'last-year'
      } else if (showYear.name === 'currentYear') {
        year = 'current-year'
      } else if (showYear.name === 'nextYear') {
        year = 'next-year'
      }
      let selected = { 'selected': this.VueDatepicker.selectedDate.year === showYear.year }
      let showYearClass = ['year', year, selected]
      return showYearClass
    },

    onSelectedYear (selectedYear) {
      const showDaysYearMonth = {
        year: selectedYear.year,
        month: this.VueDatepicker.showDaysYearMonth.month
      }
      this.setShowDaysYearMonth(showDaysYearMonth)
      this.setDatepickerView('monthView')
    }
  },

  computed: {
    lastYears () {
      return [this.VueDatepicker.showYearRange.firstYear - 1]
    },

    currentShowYears () {
      const currentShowYears = []
      for (let i = this.VueDatepicker.showYearRange.firstYear; i <= this.VueDatepicker.showYearRange.lastYear; i += 1) {
        currentShowYears.push(i)
      }
      return currentShowYears
    },

    nextShowYears () {
      const currentYearsLength = this.VueDatepicker.showYearRange.lastYear - this.VueDatepicker.showYearRange.firstYear + 1
      const nextShowYearsLength = YEAR_VIEW_TOTAL_YEARS - currentYearsLength - this.lastYears.length
      const nextShowYears = []
      for (let i = 1; i <= nextShowYearsLength; i += 1) {
        const nextShowYear = this.VueDatepicker.showYearRange.lastYear + i
        nextShowYears.push(nextShowYear)
      }
      return nextShowYears
    },

    showYears () {
      const lastYears = this.lastYears.map(lastYear => ({ name: 'lastYear', year: lastYear }))
      const currentShowYears = this.currentShowYears.map(currentShowYear => ({ name: 'currentYear', year: currentShowYear }))
      const nextShowYears = this.nextShowYears.map(nextShowYear => ({ name: 'nextYear', year: nextShowYear }))
      return [...lastYears, ...currentShowYears, ...nextShowYears]
    }
  }
}
</script>

<style lang="stylus" scoped>
.year {
  width: calc(100% / var(--i-datepicker-year-rows))
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

.last-year, .next-year {
  color: $dark-gray
}
</style>
