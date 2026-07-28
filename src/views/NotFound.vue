<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
<div class="min-h-screen flex items-center justify-center text-center px-6">
  <div>
    <h1 class="text-8xl font-black gradient-text">404</h1>
    <p class="text-text-secondary text-xl my-4">哎呀！这个页面走丢了，暂时不在这儿。</p>
    <p class="text-text-muted text-sm mb-6">可能已被移除或链接地址有误</p>
    <RouterLink to="/" class="btn-primary inline-block">回到首页</RouterLink>
  </div>
</div>
</template>
