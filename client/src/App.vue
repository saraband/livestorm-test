<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout/Default'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style lang="scss">
    @import "@/assets/styles/global.scss";

  * {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: $beige;
  }
</style>
