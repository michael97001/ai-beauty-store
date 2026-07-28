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

const cases = [
  { name: '北京·川味源', revenue: '月营收从25万→58万', metrics: ['获客成本-52%', '复购率+340%'], type: '餐饮',
    quote: '"AI获客引擎帮我们精准锁定附近食客，一个月营收翻倍。老板再也不用愁客源问题。"' },
  { name: '上海·洁净家政', revenue: '月营收从40万→95万', metrics: ['成交率+68%', '空档率-40%'], type: '家政',
    quote: '"AI成交助手搭配智能匹配，客户满意度和成交率都大幅提升，员工服务难度降低很多。"' },
  { name: '广州·品优零售', revenue: '月营收从60万→130万', metrics: ['退换率-60%', '复购+250%'], type: '零售',
    quote: '"AI需求匹配和虚拟试穿让我们退换率大幅降低，客户体验超好，线上订单翻了一倍。"' },
  { name: '成都·富创健身', revenue: '月营收从35万→78万', metrics: ['私域用户+5000', '自动化触达'], type: '健身',
    quote: '"AI运营平台把我们的私域运营效率提升了3倍，省了两个人力，成本直接降下来了。"' },
  { name: '深圳·智慧教育', revenue: '月营收从50万→120万', metrics: ['ROI 450%', '会员活跃+200%'], type: '教育',
    quote: '"AI复购引擎自动追踪每位学员的消费周期，复购率直接翻倍，老学员再也不流失了。"' },
  { name: '杭州·爱尚婚庆', revenue: '月营收从18万→42万', metrics: ['新客+180%', '员工效率+2x'], type: '婚庆',
    quote: '"智能排班让我们的空档率从35%降到8%，省下的就是赚到的。AI获客更是立竿见影。"' },
]
</script>

<template>
<section class="pt-32 pb-12 text-center">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="section-tag">成功案例</div>
    <h1 class="section-title">真实门店的AI转型成果</h1>
    <p class="section-subtitle mx-auto">超过3000家企业商户使用AI百业获客实现业绩增长</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(c,i) in cases" :key="i" class="card animate-on-scroll overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg">{{ c.name }}</h3>
            <span class="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">{{ c.type }}</span>
          </div>
          <p class="text-text-muted text-sm">{{ c.revenue }}</p>
          <div class="flex gap-2 flex-wrap mt-3">
            <span v-for="m in c.metrics" :key="m" class="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">{{ m }}</span>
          </div>
          <div class="mt-4 p-4 bg-black/20 rounded-xl italic text-sm text-text-muted">{{ c.quote }}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-20 text-center bg-blue-500/3">
  <div class="max-w-[700px] mx-auto px-6">
    <h2 class="section-title mb-4">也想成为下一个成功案例？</h2>
    <p class="text-text-secondary mb-8">立即免费体验或预约演示，让AI帮你解决获客难题</p>
    <RouterLink to="/contact" class="btn-primary">开始免费体验</RouterLink>
  </div>
</section>
</template>
