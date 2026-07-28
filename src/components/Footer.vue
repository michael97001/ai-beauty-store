<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-black/50 border-t border-border-subtle pt-16 pb-6">
    <div class="max-w-[1200px] mx-auto px-6">
      <!-- 主体 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <!-- 品牌 -->
        <div class="lg:col-span-2">
          <a href="/" class="flex items-center gap-2 text-xl font-extrabold mb-4">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm text-white font-black">AI</span>
            <span class="gradient-text">百业获客</span>
          </a>
          <p class="text-text-muted text-sm leading-relaxed max-w-sm">
            专注为餐饮、零售、教育、美业、家政、健身、婚庆、医疗等行业提供AI全链条获客解决方案。LBS精准获客、AI智能成交、私域运营、自动复购，一站式闭环。
          </p>
          <div class="flex gap-3 mt-5">
            <a href="#" class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-sm hover:bg-blue-500/20 transition-colors" title="企业微信">💬</a>
            <a href="#" class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-sm hover:bg-green-500/20 transition-colors" title="微信公众号">📱</a>
            <a href="#" class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-sm hover:bg-orange-500/20 transition-colors" title="抖音">🎵</a>
          </div>
        </div>

        <!-- 产品 -->
        <div>
          <h4 class="text-sm font-bold mb-5 text-white">产品功能</h4>
          <ul class="space-y-3">
            <li><RouterLink to="/products#acquisition" class="text-text-muted text-sm hover:text-primary-light transition-colors">AI获客引擎</RouterLink></li>
            <li><RouterLink to="/products#conversion" class="text-text-muted text-sm hover:text-primary-light transition-colors">AI成交助手</RouterLink></li>
            <li><RouterLink to="/products#operations" class="text-text-muted text-sm hover:text-primary-light transition-colors">AI运营平台</RouterLink></li>
            <li><RouterLink to="/products#repurchase" class="text-text-muted text-sm hover:text-primary-light transition-colors">AI复购引擎</RouterLink></li>
          </ul>
        </div>

        <!-- 解决方案 -->
        <div>
          <h4 class="text-sm font-bold mb-5 text-white">解决方案</h4>
          <ul class="space-y-3">
            <li><RouterLink to="/solutions#restaurant" class="text-text-muted text-sm hover:text-primary-light transition-colors">餐饮行业方案</RouterLink></li>
            <li><RouterLink to="/solutions#home" class="text-text-muted text-sm hover:text-primary-light transition-colors">家政服务方案</RouterLink></li>
            <li><RouterLink to="/solutions#retail" class="text-text-muted text-sm hover:text-primary-light transition-colors">零售门店方案</RouterLink></li>
          </ul>
        </div>

        <!-- 关于 -->
        <div>
          <h4 class="text-sm font-bold mb-5 text-white">关于我们</h4>
          <ul class="space-y-3">
            <li><RouterLink to="/about" class="text-text-muted text-sm hover:text-primary-light transition-colors">公司介绍</RouterLink></li>
            <li><RouterLink to="/cases" class="text-text-muted text-sm hover:text-primary-light transition-colors">成功案例</RouterLink></li>
            <li><RouterLink to="/toolbox" class="text-text-muted text-sm hover:text-primary-light transition-colors">AI 工具箱</RouterLink></li>
            <li><RouterLink to="/pricing" class="text-text-muted text-sm hover:text-primary-light transition-colors">定价方案</RouterLink></li>
            <li><RouterLink to="/contact" class="text-text-muted text-sm hover:text-primary-light transition-colors">联系我们</RouterLink></li>
          </ul>
        </div>
      </div>

      <!-- 底部 -->
      <div class="border-t border-border-subtle pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-xs">
          <div>
            © 2026 AI百业获客平台 版权所有
            <br class="md:hidden" />
            <a href="#" class="hover:text-primary-light ml-2">隐私政策</a>
            <a href="#" class="hover:text-primary-light ml-3">服务协议</a>
          </div>
          <div class="flex items-center gap-3">
            <span>商务合作：hello@aibeauty.saas</span>
            <span class="hidden md:inline">|</span>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow" class="hover:text-primary-light">
              京ICP备XXXXXXXX号
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
