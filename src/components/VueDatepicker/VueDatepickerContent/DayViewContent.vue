<template>
  <div class="i-datepicker-content">
    <div class="i-datepicker-content-header">
      <span
        v-for="week in weeks"
        :key="week"
        class="week">
        {{ week }}
      </span>
    </div>
    <div class="i-datepicker-content-inner">
      <span
        v-for="showDay in showDays"
        :key="`${showDay.name}-${showDay.day}`"
        :class="getShowDayClass(showDay)"
        @click="onSelectedDate(showDay.name, showDay.day)">
        {{ showDay.day }}
      </span>
    </div>
  </div>
</template>

<script>
import {
  WEEKS,
  DAY_VIEW_TOTAL_DAYS
} from '../constants'

export default {
  name: 'DayViewContent',

  inject: [
    'VueDatepicker',
    'setSelectedDate',
    'setShouldShowDatepicker'
  ],

  data () {
    return {
      weeks: WEEKS
    }
  },

  methods: {
    getReactiveYearMonth (showsMonth) {
      let year = this.VueDatepicker.showDaysYearMonth.year
      let month = this.VueDatepicker.showDaysYearMonth.month

      if (showsMonth === 'lastMonth') {
        month = month - 1
      } else if (showsMonth === 'nextMonth') {
        month = month + 1
      }

      if (month < 0) {
        month = 11
        year = year - 1
      } else if (month > 11) {
        month = 0
        year = year + 1
      }

      const reactiveDate = {
        year,
        month
      }
      return reactiveDate
    },

    getShowDayClass (showDay) {
      let showMonthDay = ''
      if (showDay.name === 'lastMonth') {
        showMonthDay = 'last-month-day'
      } else if (showDay.name === 'currentMonth') {
        showMonthDay = 'current-month-day'
      } else if (showDay.name === 'nextMonth') {
        showMonthDay = 'next-month-day'
      }
      let selected = { 'selected': this.isSelected(showDay.name, showDay.day) }
      let showDayClass = ['day', showMonthDay, selected]
      if (showDay.name === 'currentMonth') {
        let today = { 'today': this.isToday(showDay.day) }
        showDayClass.push(today)
      }
      return showDayClass
    },

    isToday (currentMonthShowDay) {
      const today = new Date()
      if (this.VueDatepicker.showDaysYearMonth.year !== today.getFullYear() || this.VueDatepicker.showDaysYearMonth.month !== today.getMonth()) {
        return
      }

      return today.getDate() === currentMonthShowDay
    },

    isSelected (showsMonth, selectedDay) {
      const reactiveYearMonth = this.getReactiveYearMonth(showsMonth)

      const isSelect = this.VueDatepicker.selectedDate.year === reactiveYearMonth.year && this.VueDatepicker.selectedDate.month === reactiveYearMonth.month && this.VueDatepicker.selectedDate.day === selectedDay
      return isSelect
    },

    onSelectedDate (showsMonth, selectedDay) {
      const reactiveYearMonth = this.getReactiveYearMonth(showsMonth)

      const selectedDate = {
        year: reactiveYearMonth.year,
        month: reactiveYearMonth.month,
        day: selectedDay
      }
      this.setSelectedDate(selectedDate)
      this.setShouldShowDatepicker(false)
    }
  },

  computed: {
    lastMonthShowDays () {
      const firstDay = new Date(this.VueDatepicker.showDaysYearMonth.year, this.VueDatepicker.showDaysYearMonth.month, 1)
      const lastMonthLastDay = new Date(this.VueDatepicker.showDaysYearMonth.year, this.VueDatepicker.showDaysYearMonth.month, 0).getDate()
      const lastMonthShowDaysLength = firstDay.getDay()

      const lastMonthShowDays = []
      for (let i = 0, j = lastMonthLastDay; i < lastMonthShowDaysLength; i += 1) {
        lastMonthShowDays.push(j)
        j = j - 1
      }

      return lastMonthShowDays.reverse()
    },

    currentMonthShowDays () {
      const currentMonthDaysLength = new Date(this.VueDatepicker.showDaysYearMonth.year, this.VueDatepicker.showDaysYearMonth.month + 1, 0).getDate()

      const currentMonthShowDays = []
      for (let i = 1; i <= currentMonthDaysLength; i += 1) {
        currentMonthShowDays.push(i)
      }
      return currentMonthShowDays
    },

    nextMonthShowDays () {
      const currentMonthDaysLength = new Date(this.VueDatepicker.showDaysYearMonth.year, this.VueDatepicker.showDaysYearMonth.month + 1, 0).getDate()
      const nextMonthShowDaysLength = DAY_VIEW_TOTAL_DAYS - currentMonthDaysLength - this.lastMonthShowDays.length

      const nextMonthShowDays = []
      for (let i = 1; i <= nextMonthShowDaysLength; i += 1) {
        nextMonthShowDays.push(i)
      }
      return nextMonthShowDays
    },

    showDays () {
      const lastMonthShowDays = this.lastMonthShowDays.map(lastMonthShowDay => ({ name: 'lastMonth', day: lastMonthShowDay }))
      const currentMonthShowDays = this.currentMonthShowDays.map(currentMonthShowDay => ({ name: 'currentMonth', day: currentMonthShowDay }))
      const nextMonthShowDays = this.nextMonthShowDays.map(nextMonthShowDay => ({ name: 'nextMonth', day: nextMonthShowDay }))
      return [...lastMonthShowDays, ...currentMonthShowDays, ...nextMonthShowDays]
    }
  }
}
</script>

<style lang="stylus" scoped>
.day, .week {
  width: calc(100% / var(--i-datepicker-day-rows))
  padding: 10px
  box-sizing: border-box
  border-radius: 50%
  border: 1px solid $white
}

.day {
  cursor: pointer

  &:hover {
    border-color: $red
  }

  &.selected {
    color: $white
    background-color: $red
  }
}

.last-month-day, .next-month-day {
  color: $dark-gray
}

.today {
  color: $red
}
</style>
