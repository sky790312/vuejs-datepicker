
const types = {
  SET_DATEPICKER_VIEW: 'SET_DATEPICKER_VIEW',
  SET_SHOW_YEAR_RANGE: 'SET_SHOW_YEAR_RANGE',
  SET_SHOW_DAYS_YEAR_MONTH: 'SET_SHOW_DAYS_YEAR_MONTH',
  SET_SHOULD_SHOW_DATEPICKER: 'SET_SHOULD_SHOW_DATEPICKER',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE'
}

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

const state = {
  datepickerView: 'dayView',
  shouldShowDatepicker: false,
  showYearRange: defaultShowYearRange,
  showDaysYearMonth: defaultShowDaysYearMonth,
  selectedDate: {
    year: undefined,
    month: undefined,
    day: undefined
  }
}

const getters = {
  datepickerView: state => state.datepickerView,
  shouldShowDatepicker: state => state.shouldShowDatepicker,
  showYearRange: state => state.showYearRange,
  showDaysYearMonth: state => state.showDaysYearMonth,
  selectedDate: state => state.selectedDate
}

const actions = {
  setDatepickerView ({ commit }, datepickerView = 'day') {
    commit(types.SET_DATEPICKER_VIEW, datepickerView)
  },

  setShouldShowDatepicker ({ commit }, shouldShowDatepicker = false) {
    commit(types.SET_SHOULD_SHOW_DATEPICKER, shouldShowDatepicker)
  },

  setShowYearRange ({ commit }, showYearRange = defaultShowYearRange) {
    commit(types.SET_SHOW_YEAR_RANGE, showYearRange)
  },

  setShowDaysYearMonth ({ commit }, showDaysYearMonth = defaultShowDaysYearMonth) {
    commit(types.SET_SHOW_DAYS_YEAR_MONTH, showDaysYearMonth)
  },

  setSelectedDate ({ commit }, selectedDate = defaultSelectedDate) {
    commit(types.SET_SELECTED_DATE, selectedDate)
  }
}

const mutations = {
  [types.SET_DATEPICKER_VIEW] (state, datepickerView = 'day') {
    state.datepickerView = datepickerView
  },

  [types.SET_SHOULD_SHOW_DATEPICKER] (state, shouldShowDatepicker = false) {
    state.shouldShowDatepicker = shouldShowDatepicker
  },

  [types.SET_SHOW_YEAR_RANGE] (state, showYearRange = {}) {
    state.showYearRange = showYearRange
  },

  [types.SET_SHOW_DAYS_YEAR_MONTH] (state, showDaysYearMonth = {}) {
    state.showDaysYearMonth = showDaysYearMonth
  },

  [types.SET_SELECTED_DATE] (state, selectedDate = {}) {
    state.selectedDate = selectedDate
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
