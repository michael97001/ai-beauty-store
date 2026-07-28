<script setup>
import { ref } from 'vue'
import { chat } from '@/utils/ai-api.js'

const open = ref(false)
const messages = ref([
  { type: 'bot', text: '你好！我是AI百业获客顾问 👋\n\n我可以帮你了解：\n• AI获客方案\n• 企业诊断服务\n• 定价与订阅\n• 预约演示\n\n请告诉我你的需求吧！' }
])
const input = ref('')
const loading = ref(false)

async function send() {
  if (!input.value.trim() || loading.value) return

  const userText = input.value.trim()
  messages.value.push({ type: 'user', text: userText })
  input.value = ''
  loading.value = true

  const conversation = messages.value.slice(-5).map(m => ({
    role: m.type === 'user' ? 'user' : 'assistant',
    content: m.text
  }))

  try {
    const result = await chat(userText, 'chat', conversation)
    setTimeout(() => {
      messages.value.push({
        type: 'bot',
        text: result.success ? result.data : result.fallback
      })
      loading.value = false
    }, 500 + Math.random() * 800)
  } catch (error) {
    messages.value.push({ type: 'bot', text: '抱歉，服务暂时不可用。请重试或联系顾问。' })
    loading.value = false
  }
}
</script>

<template>
  <button @click="open = !open" class="chatbot-toggle">💬</button>

  <div v-if="open" class="chatbot-panel open">
    <div class="chatbot-header">
      <span class="font-bold flex items-center gap-2">🤖 AI获客顾问</span>
      <button @click="open = false" class="text-text-muted hover:text-white text-xl">×</button>
    </div>
    <div class="chatbot-messages">
      <div v-for="(msg,i) in messages" :key="i"
           :class="['chat-msg', msg.type]"
           v-html="msg.text.replace(/\n/g, '<br>')"></div>
      <div v-if="loading" class="chat-msg bot flex gap-1">
        <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
        <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
        <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
      </div>
    </div>
    <div class="chatbot-input">
      <input v-model="input" @keyup.enter="send" placeholder="输入问题..." :disabled="loading" />
      <button @click="send" :disabled="loading">{{ loading ? '...' : '发送' }}</button>
    </div>
  </div>
</template>