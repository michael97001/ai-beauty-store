<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Chatbot from '@/components/Chatbot.vue'

const mobileMenuOpen = ref(false)

onMounted(() => {
  document.body.classList.add('dark')
})
</script>

<template>
  <div class="min-h-screen bg-dark-bg text-white">
    <Navbar :mobile-menu-open="mobileMenuOpen" @toggle-mobile="mobileMenuOpen = !mobileMenuOpen" />
    <RouterView />
    <Footer />
    <Chatbot />
  </div>
</template>
