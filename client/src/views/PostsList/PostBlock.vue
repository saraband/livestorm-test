<template>
  <li class="post-block-container">
    <!-- THUMBNAIL -->
    <div
      class="thumbnail"
      :style="`
        background-image: url(${post.thumbnail_url});
      `"
    >
    </div>

    <!-- DESCRIPTION -->
    <div class="description">
      <h2 class="title">{{ post.name }}</h2>
      <h4 class="upvotes">{{ post.votes_count }} upvotes</h4>
      <p class="tagline">{{ post.tagline }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'PostBlock',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/global.scss";

  .post-block-container {
    background-color: white;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    @include flex(column, stretch, stretch);

    .thumbnail {
      height: 45%;
      flex-shrink: 0;
      background-position: center;
      background-size: cover;
    }

    .description {
      flex-grow: 1;
      padding: 20px;
      @include flex(column, flex-start, center);

      .title {
        text-align: center;
        font-size: $large;
        color: $orange;
        margin-bottom: 10px;
      }

      .upvotes {
        text-align: center;
        font-size: $small;
        font-weight: normal;
        color: $black;
        margin-bottom: 20px;
      }

      .tagline {
        font-size: $normal;
        color: $black;
        text-align: center;
      }
    }
  }
</style>
