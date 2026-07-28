<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)
const dropdownOpen = ref(false)
const mobileDropdownOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { name: '产品功能', path: '/products', hasDropdown: true },
  { name: '解决方案', path: '/solutions' },
  { name: '成功案例', path: '/cases' },
  { name: '工具箱', path: '/toolbox' },
  { name: '定价方案', path: '/pricing' },
  { name: '关于我们', path: '/about' },
]

const dropdownItems = [
  { name: 'AI获客引擎', anchor: '#acquisition', icon: '🎯' },
  { name: 'AI成交助手', anchor: '#conversion', icon: '💰' },
  { name: 'AI运营平台', anchor: '#operations', icon: '⚙️' },
  { name: 'AI复购引擎', anchor: '#repurchase', icon: '🔄' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) dropdownOpen.value = false
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['fixed top-0 left-0 right-0 z-[1000] nav-glass transition-all duration-300',
    scrolled ? 'shadow-lg' : '']">
    <div class="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 text-xl font-extrabold">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm text-white font-black">AI</span>
        <span class="gradient-text">百业获客</span>
      </a>

      <!-- Desktop Nav -->
      <ul class="hidden lg:flex gap-8 items-center">
        <li class="nav-dropdown relative">
          <button
            @click="dropdownOpen = !dropdownOpen"
            :class="route.path === '/products' ? 'text-white font-medium' : 'text-text-muted hover:text-white'"
            class="flex items-center gap-1 py-2 text-sm transition-colors"
          >
            产品功能
            <svg class="w-3 h-3 transition-transform" :class="{ 'rotate-180': dropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div v-show="dropdownOpen" class="absolute top-full left-0 mt-2 min-w-[240px] bg-[#0f172a] border border-[rgba(59,130,246,0.15)] rounded-xl py-3 shadow-2xl backdrop-blur-xl">
            <a v-for="item in dropdownItems" :key="item.name"
               :href="item.anchor"
               class="flex items-center gap-3 px-5 py-3 text-sm text-text-muted hover:text-white hover:bg-blue-500/10 transition-colors"
            ><span>{{ item.icon }}</span>{{ item.name }}</a>
          </div>
        </li>
        <li v-for="item in navItems.slice(1)" :key="item.name">
          <RouterLink
            :to="item.path"
            :class="{ 'text-white font-medium': route.path === item.path }"
            class="text-text-muted hover:text-white text-sm transition-colors block py-2"
          >{{ item.name }}</RouterLink>
        </li>
      </ul>

      <!-- CTA + Hamburger -->
      <div class="flex items-center gap-3">
        <RouterLink to="/contact" class="btn-primary btn-sm hidden sm:inline-flex">$9.9 立即获取</RouterLink>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer">
          <span class="w-6 h-[2px] bg-white transition-all block" :class="{ 'rotate-45 translate-y-[7px]': mobileMenuOpen }"></span>
          <span class="w-6 h-[2px] bg-white transition-all block" :class="{ 'opacity-0': mobileMenuOpen }"></span>
          <span class="w-6 h-[2px] bg-white transition-all block" :class="{ '-rotate-45 -translate-y-[7px]': mobileMenuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="lg:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-dark-bg/98 backdrop-blur-xl z-[999] flex flex-col p-8 overflow-y-auto">
        <ul class="space-y-0">
          <li>
            <button @click="mobileDropdownOpen = !mobileDropdownOpen"
              class="w-full flex items-center justify-between py-4 text-lg font-medium text-white border-b border-border-subtle">
              产品功能
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div v-show="mobileDropdownOpen" class="pl-4 pb-3 space-y-2">
              <a v-for="item in dropdownItems" :key="item.name" :href="item.anchor"
                 @click="mobileMenuOpen = false"
                 class="flex items-center gap-2 py-2.5 text-base text-text-muted hover:text-white transition-colors">
                <span>{{ item.icon }}</span>{{ item.name }}
              </a>
            </div>
          </li>
          <li v-for="item in navItems.slice(1)" :key="item.name">
            <RouterLink :to="item.path" @click="mobileMenuOpen = false"
              class="block py-4 text-lg text-white border-b border-border-subtle hover:text-primary-light transition-colors">{{ item.name }}</RouterLink>
          </li>
        </ul>
        <div class="mt-6 space-y-3">
          <RouterLink to="/contact" @click="mobileMenuOpen = false" class="btn-primary w-full text-center block">$9.9 立即获取</RouterLink>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
