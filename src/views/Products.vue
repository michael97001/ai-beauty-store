<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  })
})
</script>

<template>
<section class="pt-32 pb-12 text-center">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="section-tag">产品功能</div>
    <h1 class="section-title">四大AI引擎，驱动百业增长飞轮</h1>
    <p class="section-subtitle mx-auto">从获客到复购，AI贯穿每一个经营环节</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid md:grid-cols-2 gap-6">
      <div id="acquisition" class="card animate-on-scroll border-l-[3px] border-green-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl bg-green-500/12 flex items-center justify-center text-3xl">🎯</div>
          <div><h2 class="text-xl font-extrabold">AI获客引擎</h2><p class="text-xs text-green-500 font-semibold">精准拉新 · 降低成本</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI自动分析区域消费热力与人群画像，多渠道智能投放，精准锁定潜在客户，获客成本降低45%。</p>
        <ul class="space-y-2 text-text-muted text-sm"><li>✓ LBS附近客源精准定位——方圆3公里高意向客户</li><li>✓ 多渠道智能投放优化——抖音/小红书/微信联动</li><li>✓ 人群画像深度分析——年龄/消费力/偏好精准画像</li><li>✓ 数据复盘自动调整——实时ROI追踪优化</li></ul>
      </div>
      <div id="conversion" class="card animate-on-scroll border-l-[3px] border-blue-400">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl bg-blue-500/12 flex items-center justify-center text-3xl">💰</div>
          <div><h2 class="text-xl font-extrabold">AI成交助手</h2><p class="text-xs text-blue-400 font-semibold">高效转化 · 提升客单</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI个性化方案推荐+虚拟体验（AR预览/试用/试穿），结合智能话术辅助，成交率提升60%。</p>
        <ul class="space-y-2 text-text-muted text-sm"><li>✓ 个性化方案推荐——AI分析客户偏好智能推荐</li><li>✓ 虚拟体验（AR预览/试穿）——AR体验提升购买信心</li><li>✓ 智能话术辅助——销售话术实时提示推荐</li><li>✓ 小程序分享裂变——客户一键分享朋友圈</li></ul>
      </div>
      <div id="operations" class="card animate-on-scroll border-l-[3px] border-cyan-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl bg-cyan-500/12 flex items-center justify-center text-3xl">⚙️</div>
          <div><h2 class="text-xl font-extrabold">AI运营平台</h2><p class="text-xs text-cyan-500 font-semibold">降本增效 · 数据驱动</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI智能排班、库存预测、营收分析一键生成，员工绩效自动评估，运营效率提升2倍。</p>
        <ul class="space-y-2 text-text-muted text-sm"><li>✓ 智能排班减少空档——AI自动匹配客流高峰</li><li>✓ 库存预测防滞销——AI分析历史数据智能补货</li><li>✓ 营收分析一键生成——老板手机端实时看数据</li><li>✓ 员工绩效智能评估——数据客观公正减少纠纷</li></ul>
      </div>
      <div id="repurchase" class="card animate-on-scroll border-l-[3px] border-orange-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-xl bg-orange-500/12 flex items-center justify-center text-3xl">🔄</div>
          <div><h2 class="text-xl font-extrabold">AI复购引擎</h2><p class="text-xs text-orange-500 font-semibold">锁客留存 · 持续变现</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI分析客户消费周期，自动触发精准营销信息，个性化优惠+专属顾问跟进，复购率提升280%。</p>
        <ul class="space-y-2 text-text-muted text-sm"><li>✓ 消费周期预测——AI自动捕捉最佳触达时机</li><li>✓ 自动触发营销——微信/短信自动推送优惠</li><li>✓ 个性化优惠推送——千人千面提升转化率</li><li>✓ 会员积分体系——游戏化运营增强粘性</li></ul>
      </div>
    </div>
  </div>
</section>

<section class="py-20 text-center bg-blue-500/3">
  <div class="max-w-[1200px] mx-auto px-6">
    <h2 class="section-title">想亲自体验这些功能吗？</h2>
    <p class="text-text-secondary mb-8">免费体验或预约一对一演示</p>
    <RouterLink to="/contact" class="btn-primary">立即免费体验</RouterLink>
  </div>
</section>
</template>
