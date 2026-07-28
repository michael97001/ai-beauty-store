<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const form = ref({ name: '', phone: '', shopName: '', shopType: '', city: '', message: '' })
const submitted = ref(false)

function submitForm() {
  if (!form.value.name || !form.value.phone) {
    alert('请填写姓名和手机号')
    return
  }
  submitted.value = true
  setTimeout(() => { submitted.value = false; form.value = { name: '', phone: '', shopName: '', shopType: '', city: '', message: '' } }, 3000)
}

onMounted(() => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  })
})
</script>

<template>
<section class="pt-32 pb-12 text-center">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="section-tag">联系我们</div>
    <h1 class="section-title">开启AI获客之旅</h1>
    <p class="section-subtitle mx-auto">填写表单或扫码添加微信，立即获取AI工具箱</p>
  </div>
</section>

<section class="py-12">
  <div class="max-w-[900px] mx-auto px-6">
    <div class="grid md:grid-cols-2 gap-10">
      <div class="card animate-on-scroll">
        <h3 class="text-lg font-bold mb-6">📋 免费申请体验</h3>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div><label class="form-label">您的姓名 *</label><input v-model="form.name" type="text" class="form-input" placeholder="如：张经理" required></div>
          <div><label class="form-label">手机号码 *</label><input v-model="form.phone" type="tel" class="form-input" placeholder="如：13800138000" required></div>
          <div><label class="form-label">门店名称</label><input v-model="form.shopName" type="text" class="form-input" placeholder="如：xx餐饮/xx零售"></div>
          <div><label class="form-label">门店类型</label><select v-model="form.shopType" class="form-input"><option value="">请选择</option><option>餐饮</option><option>零售</option><option>教育</option><option>美业</option><option>家政</option><option>健身</option><option>婚庆</option><option>医疗</option><option>其他</option></select></div>
          <div><label class="form-label">所在城市</label><input v-model="form.city" type="text" class="form-input" placeholder="如：北京"></div>
          <div><label class="form-label">需求描述</label><textarea v-model="form.message" class="form-input" placeholder="请简单描述您的门店情况和需求..."></textarea></div>
          <button type="submit" class="btn-primary w-full justify-center">{{ submitted ? '✅ 已提交，顾问即将与您联系！' : '提交申请，免费体验' }}</button>
        </form>
      </div>
      <div>
        <!-- 微信二维码 -->
        <div class="card animate-on-scroll mb-5 text-center">
          <h3 class="text-lg font-bold mb-4">📱 添加微信咨询 &amp; 付款</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <img src="/wechat-qr.jpg" alt="微信收款码" class="w-full aspect-square rounded-xl border border-green-500/20 mb-2" />
              <p class="text-xs text-green-400">💚 微信支付</p>
            </div>
            <div>
              <img src="/alipay-qr.jpg" alt="支付宝收款码" class="w-full aspect-square rounded-xl border border-blue-500/20 mb-2" />
              <p class="text-xs text-blue-400">💙 支付宝</p>
            </div>
          </div>
          <p class="text-sm text-text-muted mt-3">微信ID：aa0936aa</p>
          <p class="text-xs text-text-muted">备注"百业获客"· 付款后发送截图</p>
        </div>
        <!-- 价格卡片 -->
        <div class="card animate-on-scroll text-center">
          <div class="text-gradient font-black text-2xl">$9.9</div>
          <div class="text-xs text-text-muted">= 30天完整权限 · 工具箱全部解锁</div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>