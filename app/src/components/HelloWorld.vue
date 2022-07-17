<script setup lang="ts">
import { CLIENT_RENEG_WINDOW } from 'tls';
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

const link = (link: string) => {
  // @ts-ignore
  (window as any).open(link)
}
</script>

<template>
  <li @click="link(props.item.url)" :title="props.item.url">
    <el-space wrap>
      <a>{{ props.item.title }}</a>
      <el-tag v-if="articleType" effect="dark" type="danger" round>{{
        articleType
      }}</el-tag>
    </el-space>
  </li>
</template>
