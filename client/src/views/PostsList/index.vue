<template>
  <div id="posts-list-container">
    <!-- "DAYS AGO" SELECT -->
    <div id="days-ago-select-section">
      <DaysAgoSelect />
    </div>

    <!-- DAY STATS -->
    <div id="day-stats-section">
      <DayStats :posts-data="postsList" />
    </div>

    <!-- POSTS LIST -->
    <ul id="posts-list">
      <template v-if="postsList">
        <PostBlock
          v-for="post in postsList"
          :key="post.id"
          :post="post"
        />
      </template>

      <!-- POSTS LIST PLACEHOLDER -->
      <template v-else-if="$apollo.queries.postsList.loading">
        <li
          v-for="n in 5"
          :key="n"
          class="placeholder"
        >
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import GET_POSTS_LIST from '@/graphql/GetPostsList.gql'
import DaysAgoSelect from './DaysAgoSelect'
import DayStats from './DayStats'
import PostBlock from './PostBlock'

const POSTS_LIST_POLLING_INTERVAL = 60000 // 1mn

export default {
  name: 'PostsList',
  components: {
    DaysAgoSelect,
    DayStats,
    PostBlock
  },
  mounted () {
    /*  Trigger the polling the first time if the user
     *  is on `Today` posts list page
     */
    if (this.$route.path === '/posts') {
      this.$apollo.queries.postsList.startPolling(POSTS_LIST_POLLING_INTERVAL)
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/posts') {
        /*  User is on `Today` posts listing
         *    => Make the query actually fetch even if cache exists
         *       to keep the data up to date
         *    => Poll a refresh every minute
         */
        this.$apollo.queries.postsList.setOptions({
          fetchPolicy: 'cache-and-network',
          pollInterval: POSTS_LIST_POLLING_INTERVAL
        })

      /*  User left `Today` and is now in a `days ago` page
       *    => Make the query use the cache if it exists
       *       as a posts list from days ago cannot change,
       *       the cached data will likely be right
       *    => Stop the polling
       */
      } else if (from.path === '/posts') {
        this.$apollo.queries.postsList.setOptions({
          fetchPolicy: 'cache-first',
          pollInterval: undefined
        })
      }
    }
  },
  apollo: {
    postsList: {
      query: GET_POSTS_LIST,
      variables () {
        const { daysAgo } = this.$route.params

        return {
          daysAgo: daysAgo === undefined
            ? 0
            : parseInt(daysAgo)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";

  /*  Pre-compute PostBlock size based on
   *  layout width (here 1024px) and spacing needed
   */
  $spacing: 20px;
  $num-blocks: 3;
  $block-size: ($layout-width / $num-blocks) - (($spacing * ($num-blocks - 1)) / $num-blocks);

  @keyframes PlaceHolderAnimation {
    from {
      opacity: 0.08;
    } to {
      opacity: 0.2;
    }
  }

  #posts-list-container {
    margin-bottom: 50px;

    #days-ago-select-section {
      margin: 40px auto;
      @include flex-center();
    }

    #day-stats-section {
      margin: 40px auto;
      margin-top: 0;
      @include flex-center();
    }

    #posts-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, $block-size);
      grid-gap: $spacing;
      justify-content: space-between;

      /* Block heights */
      li {
        height: $block-size;

        &.placeholder {
          list-style-type: none;
          background-color: $light-grey;
          animation: PlaceHolderAnimation 0.5s ease-in-out infinite;
          animation-direction: alternate;
        }
      }
    }
  }
</style>
