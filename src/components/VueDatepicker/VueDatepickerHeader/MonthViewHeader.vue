<template>
  <div class="i-datepicker-header">
    <span
      class="prev"
      @click="showPrevNextYear(-1)">
    </span>
    <span
      class="current"
      @click="showYearView()">
      {{ VueDatepicker.showDaysYearMonth.year }}
    </span>
    <span
      class="next"
      @click="showPrevNextYear(1)">
    </span>
  </div>
</template>

<script>

export default {
  name: 'MonthViewHeader',

  inject: [
    'VueDatepicker',
    'setShowDaysYearMonth',
    'setDatepickerView'
  ],

  methods: {
    showPrevNextYear (prevNextNumber) {
      const year = this.VueDatepicker.showDaysYearMonth.year + prevNextNumber
      const month = this.VueDatepicker.showDaysYearMonth.month
      const showDaysYearMonth = {
        year,
        month
      }
      this.setShowDaysYearMonth(showDaysYearMonth)
    },

    showYearView () {
      this.setDatepickerView('yearView')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
