<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const faqOpen = ref(null)
const toggleFaq = (i) => { faqOpen.value = faqOpen.value === i ? null : i }
onMounted(() => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  })
})
</script>

<template>
<section class="pt-32 pb-12 text-center">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="section-tag">定价方案</div>
    <h1 class="section-title">简单透明的定价</h1>
    <p class="section-subtitle mx-auto">一次性付费 · 无月租套路 · 30天完整权益，到期可续</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-[1000px] mx-auto px-6">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="card animate-on-scroll">
        <h3 class="text-lg font-bold mb-2">🆓 免费试用</h3>
        <p class="text-text-muted text-sm mb-2">3天体验所有功能</p>
        <div class="text-4xl font-black gradient-text mb-1">¥0</div>
        <div class="text-text-muted text-sm mb-6">3天完整体验 · 无需绑卡</div>
        <ul class="space-y-3 mb-6 text-left">
          <li class="text-text-muted text-sm">✓ 全功能体验</li>
          <li class="text-text-muted text-sm">✓ AI获客+成交+运营+复购</li>
          <li class="text-text-muted text-sm">✓ 工具箱全部工具</li>
          <li class="text-text-muted text-sm">✓ 基础客服支持</li>
        </ul>
        <RouterLink to="/contact" class="btn-outline w-full text-center block">免费试用 3 天</RouterLink>
      </div>
      <div class="card animate-on-scroll featured border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.15)] relative">
        <div class="absolute -top-3 right-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold px-4 py-1 rounded-full">🔥 超值</div>
        <h3 class="text-lg font-bold mb-2">30天完整权限</h3>
        <p class="text-text-muted text-sm mb-2">一次付费 · 30天全解锁</p>
        <div class="text-4xl font-black gradient-text mb-1">$9.9</div>
        <div class="text-text-muted text-sm mb-6">≈ ¥72 / 30天</div>
        <ul class="space-y-3 mb-6 text-left">
          <li class="text-text-muted text-sm">✓ 全部AI引擎无限使用</li>
          <li class="text-text-muted text-sm">✓ 工具箱12款工具打包</li>
          <li class="text-text-muted text-sm">✓ AI诊断不限次数</li>
          <li class="text-text-muted text-sm">✓ 专属技术支持</li>
          <li class="text-text-muted text-sm">✓ 行业插件持续更新</li>
          <li class="text-text-muted text-sm">✓ 到期提醒续费 · 不自动扣</li>
        </ul>
        <RouterLink to="/contact" class="btn-primary w-full text-center block">$9.9 立即解锁</RouterLink>
      </div>
      <div class="card animate-on-scroll">
        <h3 class="text-lg font-bold mb-2">企业专属</h3>
        <p class="text-text-muted text-sm mb-2">多席位 · 批量部署 · 私有化</p>
        <div class="text-2xl font-black gradient-text mb-1">定制报价</div>
        <div class="text-text-muted text-sm mb-6">联系顾问获取团队方案</div>
        <ul class="space-y-3 mb-6 text-left">
          <li class="text-text-muted text-sm">✓ 30天版全部功能</li>
          <li class="text-text-muted text-sm">✓ 多账号管理席位</li>
          <li class="text-text-muted text-sm">✓ 私有化部署</li>
          <li class="text-text-muted text-sm">✓ API开放对接</li>
          <li class="text-text-muted text-sm">✓ 1对1专属顾问</li>
        </ul>
        <RouterLink to="/contact" class="btn-outline w-full text-center block">联系销售</RouterLink>
      </div>
    </div>
  </div>
</section>

<section class="py-20 bg-blue-500/3">
  <div class="max-w-[700px] mx-auto px-6">
    <h2 class="section-title text-center mb-8">常见问题</h2>
    <div class="faq-item" v-for="(faq,i) in [
      { q: '30天到期后会怎样？会自动续费吗？', a: '不会自动续费。到期后账号权限会自动冻结，不会产生任何费用。你可以随时再花$9.9续30天，完全按需付费，无套路。' },
      { q: '$9.9包含工具箱所有工具吗？', a: '是的。一次付费解锁包括12款AI获客/成交/运营/复购工具，都是免费开源或免费额度工具，我们提供推荐和教程。' },
      { q: '支持什么支付方式？', a: '支持支付宝、微信支付、银联卡。企业用户支持对公转账。' },
      { q: '你们主要服务哪些行业？', a: '我们覆盖餐饮、零售、教育、美业、家政、健身、婚庆、医疗八大行业场景，每个场景都有专属的AI解决方案。' },
      { q: '付费后多久能开始使用？', a: '付费即时生效。工具箱工具是开源/免费工具，付费后你会得到一站式工具包推荐+完整使用教程。' },
    ]" :key="i">
      <button @click="toggleFaq(i)" :class="{ 'active': faqOpen === i }" class="faq-question">{{ faq.q }}<span class="faq-icon">+</span></button>
      <div :class="{ 'open': faqOpen === i }" class="faq-answer">{{ faq.a }}</div>
    </div>
  </div>
</section>

<section class="py-20 text-center">
  <div class="max-w-[1200px] mx-auto px-6">
    <h2 class="section-title">还有疑问？</h2>
    <p class="text-text-secondary mb-8">我们的顾问随时为你解答</p>
    <div class="flex gap-4 justify-center flex-wrap">
      <RouterLink to="/contact" class="btn-primary">$9.9 立即获取</RouterLink>
      <RouterLink to="/contact" class="btn-outline">📱 添加微信</RouterLink>
    </div>
  </div>
</section>
</template>
