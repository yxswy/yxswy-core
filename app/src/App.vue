<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const link = (url: string) => {
  router.push(url);
};
</script>

<template>
  <header></header>
  <div class="_box">
    <div class="_aside">
      <ul>
        <li @click="link('/')">Homepage</li>
        <li>Login</li>
        <li @click="link('/add')">Append Url</li>
        <li>Help</li>
        <li>Log</li>
      </ul>
    </div>
    <div class="_container">
      <router-view v-slot="{ Component }">
        <div>
          <component :is="Component" />
        </div>
      </router-view>
    </div>
  </div>
</template>
