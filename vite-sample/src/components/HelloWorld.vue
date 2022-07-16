<script setup lang="ts">
import { Ref, ref, toRef } from 'vue'
const props = defineProps<{
  item: any
}>()

const url: Ref<string> = toRef(props.item, 'url')
const articleType = ref<string | boolean>('')

if (url.value.indexOf('juejin') !== -1) {
  articleType.value = '掘金'
} else if (url.value.indexOf('github') !== -1) {
  articleType.value = 'Github'
} else if (url.value.indexOf('bilibili') !== -1) {
  articleType.value = 'Bilibili'
} else if (url.value.indexOf('blog.csdn.net') !== -1) {
  articleType.value = 'CSDN'
} else {
  articleType.value = false
}
</script>

<template>
  <li>
    <el-space wrap>
      <a :href="props.item.url" target="_blank">{{ props.item.title }}</a>
      <el-tag v-if="articleType" effect="dark" type="danger" round>{{
        articleType
      }}</el-tag>
    </el-space>
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
    bottom: 4px;
    left: 0;
  }
  &:hover {
    color: #0969da;
    &::after {
      background-color: #0969da;
    }
    // text-decoration: underline;
  }
}
</style>
