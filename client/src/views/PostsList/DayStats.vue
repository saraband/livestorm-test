<template>
  <div id="day-stats">
    <ul id="stats-list">
      <li
        v-for="key in statsKeys"
        :key="key"
        class="stats-item"
      >
        <strong v-if="areStatsAvailable">{{ stats[key] }}</strong>
        <strong v-else>-</strong>
        <span>{{ key | uppercase }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DayStats',
  props: {
    postsData: {
      type: Array
    }
  },
  data () {
    return {
      // Keep in memory the order of the stats to display
      statsKeys: ['posts', 'votes', 'comments', 'makers']
    }
  },
  computed: {
    /*  Compute the stats for the current day
     *  based on the post data passed through prop
     */
    stats () {
      // No data available yet
      if (!Array.isArray(this.postsData)) {
        return {}
      }

      /*  Different posts can share common makers so we need
       *  to ensure that we don't count twice the same maker
       *  e.g. by using a Set
       */
      const uniqueMakerIds = new Set()

      const postsStats = this.postsData.reduce((statsAcc, post) => {
        statsAcc.votes += post.votes_count
        statsAcc.comments += post.comments_count

        post.makers.forEach(({ id }) => {
          uniqueMakerIds.add(id)
        })

        return statsAcc
      }, {
        posts: this.postsData.length,
        votes: 0,
        comments: 0
      })

      postsStats.makers = uniqueMakerIds.size
      return postsStats
    },
    areStatsAvailable () {
      return !!Object.keys(this.stats).length
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";

  #day-stats {
    display: inline-block;

    #stats-list {
      display: flex;

      .stats-item {
        @include flex(column, center, center);
        @include horizontal-spacing(20px);

        strong {
          color: $orange;
          font-size: $large;
        }

        span {
          color: $light-grey;
          font-size: $normal;
        }
      }
    }
  }
</style>
