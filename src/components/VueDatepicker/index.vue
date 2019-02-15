<template>
  <div class="i-datepicker">
    <input
      type="date"
      class="i-datepicker-input"
      v-model="selectedDateValue"
      @click.prevent="onDatepickerInputClick()">
    <div
      class="i-datepicker-container"
      v-if="shouldShowDatepicker">
      <VueDatepickerHeader></VueDatepickerHeader>
      <VueDatepickerContent></VueDatepickerContent>
    </div>
  </div>
</template>

<script>
import VueDatepickerHeader from './VueDatepickerHeader/'
import VueDatepickerContent from './VueDatepickerContent/'
import {
  DAY_VIEW_ROWS,
  MONTH_VIEW_ROWS,
  YEAR_VIEW_ROWS
} from './constants'

const getFirstYear = (date = new Date()) => {
  return parseInt(parseInt(date.getFullYear() / 10, 10) + '0', 10)
}

const getLastYear = (date = new Date()) => {
  return parseInt(parseInt(date.getFullYear() / 10, 10) + '9', 10)
}

const defaultShowYearRange = {
  firstYear: getFirstYear(),
  lastYear: getLastYear()
}

const defaultShowDaysYearMonth = {
  year: new Date().getFullYear(),
  month: new Date().getMonth()
}

const defaultSelectedDate = {
  year: undefined,
  month: undefined,
  day: undefined
}

export default {
  name: 'VueDatepicker',

  components: {
    VueDatepickerHeader,
    VueDatepickerContent
  },

  data () {
    return {
      datepickerView: 'dayView',
      shouldShowDatepicker: false,
      showYearRange: defaultShowYearRange,
      showDaysYearMonth: defaultShowDaysYearMonth,
      selectedDate: defaultSelectedDate
    }
  },

  computed: {
    selectedDateValue: {
      get () {
        if (this.selectedDate.year === undefined || this.selectedDate.month === undefined || this.selectedDate.day === undefined) {
          return
        }

        let day = this.selectedDate.day
        let month = this.selectedDate.month + 1
        if ((this.selectedDate.day).toString().length === 1) {
          day = `0${day}`
        }

        if ((this.selectedDate.month + 1).toString().length === 1) {
          month = `0${month}`
        }
        const selectedDate = `${this.selectedDate.year}-${month}-${day}`
        return selectedDate
      },
      set (value) {
        const date = new Date(value)
        const selectedDate = {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate()
        }
        this.setSelectedDate(selectedDate)
        this.setShowDaysYearMonth(selectedDate)
      }
    }
  },

  methods: {
    onDatepickerInputClick () {
      this.setShouldShowDatepicker(true)
    },

    setDatepickerView (datepickerView = 'day') {
      this.datepickerView = datepickerView
    },

    setShouldShowDatepicker (shouldShowDatepicker = false) {
      this.shouldShowDatepicker = shouldShowDatepicker
    },

    setShowYearRange (showYearRange = defaultShowYearRange) {
      this.showYearRange = showYearRange
    },

    setShowDaysYearMonth (showDaysYearMonth = defaultShowDaysYearMonth) {
      this.showDaysYearMonth = showDaysYearMonth
    },

    setSelectedDate (selectedDate = defaultSelectedDate) {
      this.selectedDate = selectedDate
    }
  },

  mounted () {
    const htmlEl = document.documentElement
    htmlEl.style.setProperty('--i-datepicker-day-rows', DAY_VIEW_ROWS)
    htmlEl.style.setProperty('--i-datepicker-month-rows', MONTH_VIEW_ROWS)
    htmlEl.style.setProperty('--i-datepicker-year-rows', YEAR_VIEW_ROWS)
  },

  provide () {
    const VueDatepicker = {}
    Object.defineProperty(VueDatepicker, 'datepickerView', {
      enumerable: true,
      get: () => this.datepickerView
    })
    Object.defineProperty(VueDatepicker, 'showDaysYearMonth', {
      enumerable: true,
      get: () => this.showDaysYearMonth
    })
    Object.defineProperty(VueDatepicker, 'selectedDate', {
      enumerable: true,
      get: () => this.selectedDate
    })
    Object.defineProperty(VueDatepicker, 'showYearRange', {
      enumerable: true,
      get: () => this.showYearRange
    })

    return {
      VueDatepicker,
      setDatepickerView: this.setDatepickerView,
      setShouldShowDatepicker: this.setShouldShowDatepicker,
      setShowYearRange: this.setShowYearRange,
      setShowDaysYearMonth: this.setShowDaysYearMonth,
      setSelectedDate: this.setSelectedDate
    }
  }
}
</script>
<style lang="stylus">
.i-datepicker {
  width: 300px
  text-align: center

  .i-datepicker-input {
    margin-bottom: 10px
  }

  .i-datepicker-container {
    background-color: $white
    border: 1px solid $dark-gray
  }

  .i-datepicker-header {
    display: flex
  }

  .prev, .next {
    position: relative
    display: block
    width: 15%
    padding: 10px 0
    cursor: pointer

    &::after {
      content: ''
      position: absolute
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-50%)
      border: 6px solid transparent
    }

    &:hover {
      background-color: $light-gray
    }
  }

  .prev {
    &::after {
      border-right: 10px solid $black
      // margin-left: -5px
    }
  }

  .next {
    &::after {
      border-left: 10px solid $black
      // margin-left: 5px;
    }
  }

  .current {
    cursor: pointer
    width: 70%
    padding: 10px 0

    &:hover {
      background-color: $light-gray
    }
  }

  .i-datepicker-content-header {
    display: flex
  }

  .i-datepicker-content-inner {
    display: flex
    flex-wrap: wrap
  }
}
</style>
