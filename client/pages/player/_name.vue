<template>
  <div class="player">
    <video controls muted autoPlay crossOrigin="anonymous">
      <source
        :src="`http://localhost:8000/videos/${vidName}`"
        type="video/mp4"
      />
      <track
        label="English"
        kind="captions"
        srcLang="en"
        :src="`http://localhost:8000/videos/${vidName}/caption`"
        default
      />
    </video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vidName: "",
    };
  },
  mounted() {
    this.vidName = this.$route.params.name;
  },
};
</script>
<style scoped>
.player {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}
</style>
