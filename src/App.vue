<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Vuejs datapicker sample</h1>
    <VueDatepicker />
  </div>
</template>

<script>
import VueDatepicker from '@/components/VueDatepicker'

export default {
  name: 'app',
  components: {
    VueDatepicker
  }
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
