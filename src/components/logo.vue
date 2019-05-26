<template>
  <div v-html="svgSrc" class="logo-wrapper">
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Logo extends Vue {
    @Prop({ type: String, required: true }) readonly svgSrc!: string;
  }
</script>

<style lang="scss" scoped>

</style>
