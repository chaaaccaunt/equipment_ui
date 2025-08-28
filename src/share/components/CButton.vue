<script lang="ts" setup></script>

<template>
  <button class="button"><slot></slot></button>
</template>

<style lang="scss" scoped>
.button {
  padding: 0.4em 2em;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #54727c;
  border-radius: 0.8em;
  color: #eee;
  &:hover {
    background-color: #486670;
  }
}
</style>
