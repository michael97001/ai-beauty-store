<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref(null)
const statsRef = ref(null)
const showDemo = ref(false)
const demoStep = ref(0)
let animFrame
let demoTimer

const demoSteps = [
  { icon: '🎯', title: 'AI获客引擎启动', desc: 'AI分析区域消费热力·定位附近客源', metric: '已锁定 127 位潜在客户', color: 'green' },
  { icon: '💰', title: 'AI成交助手介入', desc: '个性化方案推荐·AR虚拟体验·智能话术', metric: '成交率 +60%', color: 'blue' },
  { icon: '⚙️', title: 'AI运营平台调度', desc: '智能排班·库存预测·营收分析一键生成', metric: '运营效率 2x', color: 'cyan' },
  { icon: '🔄', title: 'AI复购引擎触发', desc: '消费周期预测·自动触发精准营销', metric: '复购率 +280%', color: 'orange' },
  { icon: '✅', title: '全链路闭环完成', desc: '获客→成交→运营→复购 一气呵成', metric: '获客成本 -45%', color: 'green' },
]

function startDemo() {
  demoStep.value = 0
  demoTimer = setInterval(() => {
    if (demoStep.value < demoSteps.length - 1) {
      demoStep.value++
    } else {
      clearInterval(demoTimer)
    }
  }, 1800)
}

function openDemo() {
  showDemo.value = true
  setTimeout(startDemo, 300)
}

function closeDemo() {
  showDemo.value = false
  clearInterval(demoTimer)
  demoStep.value = 0
}

function skipDemo() {
  clearInterval(demoTimer)
  demoStep.value = demoSteps.length - 1
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, particles = []

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect()
    w = canvas.width = rect.width
    h = canvas.height = rect.height
  }
  resize()

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.4 + 0.05
    })
  }

  function animate() {
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(96,165,250,${p.opacity})`; ctx.fill()
    })
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
    }
    animFrame = requestAnimationFrame(animate)
  }
  animate()
  window.addEventListener('resize', resize)

  gsap.utils.toArray('.animate-on-scroll').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
    )
  })

  if (statsRef.value) {
    const counters = statsRef.value.querySelectorAll('.stat-counter')
    counters.forEach(counter => {
      ScrollTrigger.create({
        trigger: counter, start: 'top 90%',
        onEnter: () => {
          const target = parseInt(counter.dataset.target)
          let current = 0
          const step = Math.ceil(target / 60)
          const interval = setInterval(() => {
            current += step
            if (current >= target) { current = target; clearInterval(interval) }
            counter.textContent = current + (counter.dataset.suffix || '')
          }, 25)
        }, once: true
      })
    })
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', () => {})
})
</script>

<template>
<!-- Hero -->
<section class="min-h-screen flex items-center relative overflow-hidden pt-20">
  <div class="orb-glow w-[600px] h-[600px] bg-blue-500/10 -top-[20%] -left-[15%]"></div>
  <div class="orb-glow w-[400px] h-[400px] bg-cyan-400/8 -bottom-[15%] -right-[10%]"></div>
  <div class="orb-glow w-[300px] h-[300px] bg-orange-500/6 top-[30%] left-[55%]"></div>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

  <div class="container max-w-[1200px] mx-auto px-6 relative z-10 py-20">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <div class="section-tag animate-fade-up">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          百业AI获客SaaS平台 · 为企业获客而生
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-tight mb-6 animate-fade-up" style="animation-delay: 0.1s;">
          <span class="gradient-text">获客成本降低45%</span><br />
          百业AI全链条增长引擎
        </h1>
        <p class="text-text-secondary text-lg mb-8 max-w-lg leading-relaxed animate-fade-up" style="animation-delay: 0.2s;">
          LBS精准获客 · AI智能成交 · 私域自动化运营 · 复购智能提醒<br />
          <strong class="text-white">餐饮 · 零售 · 教育 · 美业 · 家政 · 健身 · 婚庆 · 医疗</strong> 一站式AI获客解决方案
        </p>
        <div class="flex gap-4 mb-12 flex-wrap animate-fade-up" style="animation-delay: 0.3s;">
          <RouterLink to="/contact" class="btn-primary text-base font-bold px-9 py-4">
            立即免费体验 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </RouterLink>
          <button @click="openDemo" class="btn-outline text-base font-bold px-9 py-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            观看演示
          </button>
        </div>
        <div class="flex items-center gap-6 text-text-muted text-sm animate-fade-up" style="animation-delay: 0.4s;">
          <div class="flex -space-x-2">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-bold border-2 border-dark-bg">王</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-xs text-white font-bold border-2 border-dark-bg">李</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs text-white font-bold border-2 border-dark-bg">张</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs text-white font-bold border-2 border-dark-bg">刘</div>
            <div class="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold border-2 border-dark-bg">3000+</div>
          </div>
          <span>已有 <strong class="text-white">3000+</strong> 企业商户选择我们</span>
        </div>
      </div>
      <div class="hidden lg:block animate-fade-up" style="animation-delay: 0.3s;">
        <div class="demo-window pulse-glow">
          <div class="demo-bar">
            <span class="demo-dot"></span><span class="demo-dot"></span><span class="demo-dot"></span>
            <span class="text-[11px] text-text-muted ml-4">AI百业获客 · 实时数据看板</span>
          </div>
          <div class="p-6 space-y-5">
            <div class="grid grid-cols-3 gap-3">
              <div class="p-4 bg-green-500/8 border border-green-500/20 rounded-xl text-center">
                <div class="text-2xl font-black text-green-400 stat-counter" data-target="127"></div>
                <div class="text-[11px] text-text-muted mt-1">今日新客</div>
              </div>
              <div class="p-4 bg-blue-500/8 border border-blue-500/20 rounded-xl text-center">
                <div class="text-2xl font-black text-blue-400"><span class="stat-counter" data-target="86"></span>K</div>
                <div class="text-[11px] text-text-muted mt-1">今日营收</div>
              </div>
              <div class="p-4 bg-orange-500/8 border border-orange-500/20 rounded-xl text-center">
                <div class="text-2xl font-black text-orange-400"><span class="stat-counter" data-target="68"></span>%</div>
                <div class="text-[11px] text-text-muted mt-1">复购率</div>
              </div>
            </div>
            <div class="bg-black/30 rounded-xl p-4">
              <div class="flex justify-between text-xs text-text-muted mb-2">
                <span>AI获客效果</span><span class="text-green-400">+45%</span>
              </div>
              <div class="h-2 bg-black/40 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style="width:75%"></div>
              </div>
              <div class="flex justify-between text-xs text-text-muted mt-3">
                <span>AI成交转化</span><span class="text-orange-400">+60%</span>
              </div>
              <div class="h-2 bg-black/40 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" style="width:60%"></div>
              </div>
              <div class="flex justify-between text-xs text-text-muted mt-3">
                <span>AI复购提升</span><span class="text-green-400">+280%</span>
              </div>
              <div class="h-2 bg-black/40 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style="width:90%"></div>
              </div>
            </div>
            <div class="flex gap-2 justify-center">
              <span class="px-3 py-1.5 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold flex items-center gap-1">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>AI系统运行中
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 客户痛点 -->
<section class="py-20 bg-blue-500/3">
  <div class="max-w-[1200px] mx-auto px-6 text-center">
    <div class="section-tag">经营痛点</div>
    <h2 class="section-title">你的门店是否也面临这些问题？</h2>
    <p class="section-subtitle mx-auto">企业获客经营不易，我们深知你的困惑</p>
    <div class="grid md:grid-cols-3 gap-6 mt-12">
      <div class="card text-center animate-on-scroll">
        <div class="text-4xl mb-4">😫</div>
        <h3 class="text-lg font-bold mb-2">客流越来越贵</h3>
        <p class="text-text-muted text-sm">美团抖音抽成越来越高，自然进店客流持续下滑，花钱买流量不划算</p>
      </div>
      <div class="card text-center animate-on-scroll">
        <div class="text-4xl mb-4">😤</div>
        <h3 class="text-lg font-bold mb-2">成交越来越难</h3>
        <p class="text-text-muted text-sm">顾客比价意识强，体验项目转化率低，员工销售能力参差不齐</p>
      </div>
      <div class="card text-center animate-on-scroll">
        <div class="text-4xl mb-4">😩</div>
        <h3 class="text-lg font-bold mb-2">老客不断流失</h3>
        <p class="text-text-muted text-sm">会员休眠率高，复购周期长，缺乏有效的自动化运营和唤醒手段</p>
      </div>
    </div>
    <div class="mt-10">
      <RouterLink to="/contact" class="btn-primary">免费诊断你的门店</RouterLink>
    </div>
  </div>
</section>

<!-- 解决方案 -->
<section class="py-20">
  <div class="max-w-[1200px] mx-auto px-6 text-center">
    <div class="section-tag">解决方案</div>
    <h2 class="section-title">四大AI引擎，驱动百业获客增长飞轮</h2>
    <p class="section-subtitle mx-auto mb-12">从获客到复购，AI贯穿每一个经营环节</p>
  </div>
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid md:grid-cols-2 gap-6">
      <div class="card animate-on-scroll border-l-[3px] border-green-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl bg-green-500/12 flex items-center justify-center text-2xl">🎯</div>
          <div><h3 class="text-xl font-extrabold">AI获客引擎</h3><p class="text-xs text-green-500 font-semibold">ACQUIRE</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI自动分析区域消费热力与人群画像，LBS精准定位附近客源，多渠道智能投放，获客成本降低45%。</p>
        <ul class="space-y-2 text-text-muted text-sm mb-4"><li>✓ LBS附近客源精准定位</li><li>✓ 多渠道智能投放优化</li><li>✓ 人群画像深度分析</li></ul>
        <a href="/toolbox" class="inline-flex items-center gap-1 text-xs text-green-400 font-semibold hover:text-green-300 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> 工具箱 →</a>
      </div>
      <div class="card animate-on-scroll border-l-[3px] border-blue-400">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl bg-blue-500/12 flex items-center justify-center text-2xl">💰</div>
          <div><h3 class="text-xl font-extrabold">AI成交助手</h3><p class="text-xs text-blue-400 font-semibold">CONVERT</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI个性化方案推荐 + 虚拟体验（AR预览/试用/试穿），结合智能话术辅助，成交率提升60%。</p>
        <ul class="space-y-2 text-text-muted text-sm mb-4"><li>✓ 个性化方案推荐</li><li>✓ 虚拟体验（AR预览）</li><li>✓ 智能话术辅助</li></ul>
        <a href="/toolbox" class="inline-flex items-center gap-1 text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> 工具箱 →</a>
      </div>
      <div class="card animate-on-scroll border-l-[3px] border-cyan-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl bg-cyan-500/12 flex items-center justify-center text-2xl">⚙️</div>
          <div><h3 class="text-xl font-extrabold">AI运营平台</h3><p class="text-xs text-cyan-500 font-semibold">OPERATE</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI智能排班、库存预测、营收分析一键生成，员工绩效自动评估，运营效率提升2倍。</p>
        <ul class="space-y-2 text-text-muted text-sm mb-4"><li>✓ 智能排班减少空档</li><li>✓ 库存预测防滞销</li><li>✓ 营收分析一键生成</li></ul>
        <a href="#toolbox" class="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 14l6m0 0v6m0-6L10 14"/></svg> 工具箱 →</a>
      </div>
      <div class="card animate-on-scroll border-l-[3px] border-orange-500">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl bg-orange-500/12 flex items-center justify-center text-2xl">🔄</div>
          <div><h3 class="text-xl font-extrabold">AI复购引擎</h3><p class="text-xs text-orange-500 font-semibold">RETAIN</p></div>
        </div>
        <p class="text-text-secondary leading-relaxed mb-4">AI分析客户消费周期，自动触发精准营销信息，个性化优惠+专属顾问跟进，复购率提升280%。</p>
        <ul class="space-y-2 text-text-muted text-sm mb-4"><li>✓ 消费周期预测</li><li>✓ 自动触发营销</li><li>✓ 复购率提升280%</li></ul>
        <a href="/toolbox" class="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg> 工具箱 →</a>
      </div>
    </div>
  </div>
</section>

<!-- 数据统计 -->
<section ref="statsRef" class="py-20 bg-gradient-to-b from-blue-500/5 to-transparent">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="card text-center animate-on-scroll"><div class="stat-number gradient-text"><span class="stat-counter" data-target="3000" data-suffix="+"></span></div><div class="text-sm text-text-muted mt-2">合作门店</div></div>
      <div class="card text-center animate-on-scroll"><div class="stat-number gradient-text"><span class="stat-counter" data-target="45"></span>%</div><div class="text-sm text-text-muted mt-2">平均获客成本降低</div></div>
      <div class="card text-center animate-on-scroll"><div class="stat-number gradient-text"><span class="stat-counter" data-target="60"></span>%</div><div class="text-sm text-text-muted mt-2">平均成交率提升</div></div>
      <div class="card text-center animate-on-scroll"><div class="stat-number gradient-text"><span class="stat-counter" data-target="280"></span>%</div><div class="text-sm text-text-muted mt-2">平均复购率提升</div></div>
    </div>
  </div>
</section>

<!-- AI工具箱 -->
<section id="toolbox" class="py-20">
  <div class="max-w-[1200px] mx-auto px-6 text-center">
    <div class="section-tag">🧰 工具箱</div>
    <h2 class="section-title">AI获客工具精选</h2>
    <p class="section-subtitle mx-auto mb-12">每个AI引擎配套真实可用的开源/免费工具，即下即用</p>
    <div class="grid md:grid-cols-2 gap-6">
      <!-- AI获客类 -->
      <div class="card animate-on-scroll border-l-[3px] border-green-500 p-6 text-left">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">🎯</span>
          <h3 class="text-lg font-extrabold">AI获客工具包</h3>
        </div>
        <ul class="space-y-4">
          <li><a href="https://n8n.io" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-green-400 transition-colors">n8n</div><div class="text-xs text-text-muted">开源自动化工作流 · 串联1000+应用 · 自部署获客机器人</div></a></li>
          <li><a href="https://github.com/nicedoc/social-auto-upload" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-green-400 transition-colors">Social Auto Upload</div><div class="text-xs text-text-muted">开源一键多平台分发 · 抖音/小红书/快手自动发布</div></a></li>
          <li><a href="https://www.thunderbit.com" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-green-400 transition-colors">Thunderbit</div><div class="text-xs text-text-muted">AI网页数据采集器 · 自动抓取潜在客户信息 · 免费额度</div></a></li>
        </ul>
      </div>
      <!-- AI成交类 -->
      <div class="card animate-on-scroll border-l-[3px] border-blue-400 p-6 text-left">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">💰</span>
          <h3 class="text-lg font-extrabold">AI成交工具包</h3>
        </div>
        <ul class="space-y-4">
          <li><a href="https://github.com/langgenius/dify" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-blue-400 transition-colors">Dify</div><div class="text-xs text-text-muted">119k⭐开源AI应用平台 · 知识库+智能体 · 自建客服机器人</div></a></li>
          <li><a href="https://github.com/nicepkg/gpt-runner" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-blue-400 transition-colors">GPT Runner</div><div class="text-xs text-text-muted">开源AI项目文件管理 · 多模型切换 · 一键部署到服务器</div></a></li>
          <li><a href="https://www.chatwoot.com" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-blue-400 transition-colors">Chatwoot</div><div class="text-xs text-text-muted">开源全渠道客服 · WhatsApp/微信/邮件统一收件箱</div></a></li>
        </ul>
      </div>
      <!-- AI运营类 -->
      <div class="card animate-on-scroll border-l-[3px] border-cyan-500 p-6 text-left">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">⚙️</span>
          <h3 class="text-lg font-extrabold">AI运营工具包</h3>
        </div>
        <ul class="space-y-4">
          <li><a href="https://github.com/FlowiseAI/Flowise" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-cyan-400 transition-colors">Flowise</div><div class="text-xs text-text-muted">47k⭐开源 · 拖拽构建AI工作流 · 可视化编排自动化运营</div></a></li>
          <li><a href="https://github.com/activepieces/activepieces" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-cyan-400 transition-colors">Activepieces</div><div class="text-xs text-text-muted">开源Zapier替代 · 无代码自动化 · 数据录入/报表推送</div></a></li>
          <li><a href="https://www.baserow.io" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-cyan-400 transition-colors">Baserow</div><div class="text-xs text-text-muted">开源无代码数据库 · 客户资料+库存管理 · 自部署</div></a></li>
        </ul>
      </div>
      <!-- AI复购类 -->
      <div class="card animate-on-scroll border-l-[3px] border-orange-500 p-6 text-left">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-2xl">🔄</span>
          <h3 class="text-lg font-extrabold">AI复购工具包</h3>
        </div>
        <ul class="space-y-4">
          <li><a href="https://github.com/princessmortix/Mautic" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-orange-400 transition-colors">Mautic</div><div class="text-xs text-text-muted">开源营销自动化 · 邮件/SMS营销 · 客户旅程自动触发</div></a></li>
          <li><a href="https://github.com/apitable/apitable" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-orange-400 transition-colors">APITable</div><div class="text-xs text-text-muted">开源多维表格 · 客户周期追踪+自动化提醒 · 可部署</div></a></li>
          <li><a href="https://github.com/jgraph/drawio" target="_blank" class="group"><div class="font-semibold text-sm group-hover:text-orange-400 transition-colors">CRM Easy</div><div class="text-xs text-text-muted">开源轻量客户管理 · 消费周期标注+复购预警</div></a></li>
        </ul>
      </div>
    </div>
    <div class="mt-8">
      <RouterLink to="/toolbox" class="btn-primary">全部工具一键打包 · $9.9 / 30天</RouterLink>
    </div>
  </div>
</section>

<!-- 适用行业 -->
<section class="py-20">
  <div class="max-w-[1200px] mx-auto px-6 text-center">
    <div class="section-tag">适用行业</div>
    <h2 class="section-title">为多行业场景量身打造</h2>
    <p class="section-subtitle mx-auto mb-12">每个行业都有专属的AI解决方案，精准解决痛点</p>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="card text-center animate-on-scroll p-8">
        <div class="text-5xl mb-4">🍽️</div>
        <h3 class="text-lg font-bold mb-3">餐饮行业</h3>
        <p class="text-text-secondary text-sm leading-relaxed mb-4">LBS精准定位附近食客、智能排班减少空档、AI套餐推荐提升客单、会员自动触达复购。</p>
        <ul class="text-left text-sm text-text-muted space-y-1.5"><li>✓ LBS附近获客</li><li>✓ AI套餐推荐</li><li>✓ 智能预约排班</li></ul>
      </div>
      <div class="card text-center animate-on-scroll p-8">
        <div class="text-5xl mb-4">🏠</div>
        <h3 class="text-lg font-bold mb-3">家政服务</h3>
        <p class="text-text-secondary text-sm leading-relaxed mb-4">AI需求分析带入服务项目、服务评价追踪建立信任、消费行为分析精准推送、自动化私域运营。</p>
        <ul class="text-left text-sm text-text-muted space-y-1.5"><li>✓ AI需求分析</li><li>✓ 服务效果追踪</li><li>✓ 私域自动化运营</li></ul>
      </div>
      <div class="card text-center animate-on-scroll p-8">
        <div class="text-5xl mb-4">🛒</div>
        <h3 class="text-lg font-bold mb-3">零售门店</h3>
        <p class="text-text-secondary text-sm leading-relaxed mb-4">AI需求匹配推荐产品、虚拟试用/试穿降低退换、UGC内容自动分发转化、复购周期智能提醒。</p>
        <ul class="text-left text-sm text-text-muted space-y-1.5"><li>✓ AI需求匹配</li><li>✓ 虚拟试用/试穿</li><li>✓ 复购周期管理</li></ul>
      </div>
    </div>
  </div>
</section>

<!-- 合作流程 -->
<section class="py-20 bg-blue-500/3">
  <div class="max-w-[1200px] mx-auto px-6 text-center">
    <div class="section-tag">合作流程</div>
    <h2 class="section-title">三步开启AI获客</h2>
    <p class="section-subtitle mx-auto mb-12">简单三步，快速启动AI获客引擎</p>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="card animate-on-scroll text-center relative">
        <div class="w-14 h-14 rounded-full bg-blue-500/15 flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-500/30">1</div>
        <h3 class="text-lg font-bold mb-2">免费注册</h3>
        <p class="text-text-muted text-sm">填写基本信息，立即开通免费版账号，无需任何费用</p>
      </div>
      <div class="card animate-on-scroll text-center relative">
        <div class="w-14 h-14 rounded-full bg-blue-500/15 flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-500/30">2</div>
        <h3 class="text-lg font-bold mb-2">AI诊断</h3>
        <p class="text-text-muted text-sm">6分钟AI门店诊断，智能分析经营状况，生成专属方案</p>
      </div>
      <div class="card animate-on-scroll text-center relative">
        <div class="w-14 h-14 rounded-full bg-blue-500/15 flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-500/30">3</div>
        <h3 class="text-lg font-bold mb-2">落地见效</h3>
        <p class="text-text-muted text-sm">专属顾问全程陪跑，7天快速上手，30天可见成效</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-24 text-center relative overflow-hidden">
  <div class="orb-glow w-[800px] h-[800px] bg-blue-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
  <div class="max-w-[1200px] mx-auto px-6 relative z-10">
    <div class="section-tag">立即行动</div>
    <h2 class="section-title max-w-[700px] mx-auto">准备好让AI帮你解决获客难题了吗？</h2>
    <p class="text-text-secondary text-lg max-w-[500px] mx-auto mb-10">3000+企业商户的共同选择，现在加入还不晚</p>
    <div class="flex gap-4 justify-center flex-wrap">
      <RouterLink to="/contact" class="btn-primary text-base font-bold px-10 py-4">立即免费体验 →</RouterLink>
      <RouterLink to="/contact" class="btn-outline text-base font-bold px-10 py-4">预约顾问演示</RouterLink>
    </div>
    <p class="text-text-muted text-sm mt-6">免费版永久使用 · 无需绑定银行卡 · 随时取消</p>
  </div>
</section>

<!-- 演示冲窗 -->
<transition name="demo-fade">
  <div v-if="showDemo" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click.self="closeDemo">
    <div class="relative bg-[#0b1120] border border-blue-500/20 rounded-2xl w-full max-w-[640px] overflow-hidden shadow-2xl">
      <!-- 关闭按钮 -->
      <button @click="closeDemo" class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-colors">×</button>

      <!-- 标题栏 -->
      <div class="px-6 py-4 border-b border-blue-500/10 flex items-center gap-2">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span class="text-sm font-bold">AI百业获客 · 产品演示</span>
        <span class="text-xs text-text-muted ml-auto">{{ demoStep + 1 }} / {{ demoSteps.length }}</span>
      </div>

      <!-- 演示内容 -->
      <div class="p-8 min-h-[320px] flex flex-col items-center justify-center">
        <!-- 进度条 -->
        <div class="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
            :style="{ width: ((demoStep + 1) / demoSteps.length * 100) + '%' }"></div>
        </div>

        <!-- 当前步骤 -->
        <transition name="step-slide" mode="out-in">
          <div :key="demoStep" class="text-center">
            <div class="text-6xl mb-4 animate-bounce">{{ demoSteps[demoStep].icon }}</div>
            <h3 class="text-xl font-extrabold mb-2" :class="'text-' + demoSteps[demoStep].color + '-400'">{{ demoSteps[demoStep].title }}</h3>
            <p class="text-text-secondary text-sm mb-4">{{ demoSteps[demoStep].desc }}</p>
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-bold"
              :class="'text-' + demoSteps[demoStep].color + '-400'">
              📈 {{ demoSteps[demoStep].metric }}
            </div>
          </div>
        </transition>

        <!-- 步骤指示器 -->
        <div class="flex gap-2 mt-8">
          <span v-for="(s, i) in demoSteps" :key="i"
            :class="['w-2 h-2 rounded-full transition-all', i <= demoStep ? 'bg-blue-400' : 'bg-white/10']"
            :style="i === demoStep ? 'width: 24px' : ''"></span>
        </div>
      </div>

      <!-- 底部 CTA -->
      <div class="px-6 py-4 border-t border-blue-500/10 flex items-center justify-between">
        <span class="text-xs text-text-muted">演示自动播放中...</span>
        <div class="flex gap-2">
          <button v-if="demoStep < demoSteps.length - 1" @click="skipDemo" class="btn-outline btn-sm">跳过 →</button>
          <RouterLink v-if="demoStep === demoSteps.length - 1" to="/contact" @click="closeDemo" class="btn-primary btn-sm">$9.9 立即体验</RouterLink>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<style scoped>
.demo-fade-enter-active, .demo-fade-leave-active { transition: all 0.3s; }
.demo-fade-enter-from, .demo-fade-leave-to { opacity: 0; }
.step-slide-enter-active { transition: all 0.4s ease; }
.step-slide-enter-from { opacity: 0; transform: translateY(20px); }
</style>
