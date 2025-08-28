<script lang="ts" setup></script>

<template>
  <div class="home"></div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  &__actions {
    position: absolute;
    left: 0;
    top: 0;
    width: max-content;
    display: flex;
    flex-direction: column;
    gap: 1em;
    z-index: 2;
  }
  &__component {
    height: 100%;
  }
}
</style>
