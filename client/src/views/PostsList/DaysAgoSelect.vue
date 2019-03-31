<template>
  <select
    :value="$route.params.daysAgo || 0"
    @change="selectDaysAgo"
  >
    <option value="0">Today</option>
    <option value="1">Yesterday</option>
    <option
      v-for="n in 29"
      :value="n + 1"
      :key="n"
    >
      {{ n + 1 }} days ago
    </option>
  </select>
</template>

<script>
export default {
  name: 'DaysAgoSelect',
  methods: {
    selectDaysAgo (event) {
      const daysAgo = +event.target.value

      this.$router.push({
        name: 'postsList',
        params: {
          // If we select 0 days ago (i.e. Today), ignore the parameter
          daysAgo: daysAgo <= 0
            ? undefined
            : daysAgo
        }
      })
    }
  }
}
</script>
