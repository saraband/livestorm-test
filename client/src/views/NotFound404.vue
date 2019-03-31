<template>
  <div id="container-404">
    <h2>404 Page not found</h2>
    <h4>Lost in the internet ? Let us bring you back <router-link to="/">Home</router-link></h4>
  </div>
</template>

<script>
export default {
  name: 'NotFound404'
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";

  #container-404 {
    margin-top: 50px;
    padding: 20px;
    background-color: white;
    @include flex(column, center, center);

    h2 {
      font-size: $big;
      color: $orange;
    }

    h4 {
      font-size: $large;
      font-weight: normal;
      color: $black;
      margin-top: 10px;
    }

    a {
      color: $orange;
    }
  }
</style>
