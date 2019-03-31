<template>
  <div id="header">
    <h1>
      <router-link to="/">
        ProductHunt
      </router-link>
    </h1>
    <h3>The best new products, every day</h3>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";

  #header {
    margin: 30px auto 0 auto;
    flex-shrink: 0;
    @include flex(column, center, center);

    h1 {
      font-size: $big;
      margin-bottom: 15px;

      a {
        color: $orange;
        text-decoration: none;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    h3 {
      font-size: $medium;
      color: $light-grey;
      font-weight: normal;
      margin-bottom: 0;
    }
  }
</style>
