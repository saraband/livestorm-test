<template>
  <div class="default-layout">
    <Header />
    <div id="body">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'DefaultLayout',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";

  .default-layout {
    width: $layout-width;
    min-height: 100vh;
    margin: auto;
    @include flex(column, center, stretch);

    #body {
      flex-grow: 1;
    }
  }
</style>
