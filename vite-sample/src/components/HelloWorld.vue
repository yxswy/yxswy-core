<script setup lang="ts">
const props = defineProps<{
  item: any
}>()
</script>

<template>
  <li>
    <a :href="props.item.url" target="_blank">{{ props.item.title }}</a>
  </li>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  transition: all 0.21s;
  color: black;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -3px;
    left: 0;
  }
  &:hover {
    color: #42b983;
    &::after {
      background-color: #42b983;
    }
    // text-decoration: underline;
  }
}
</style>
