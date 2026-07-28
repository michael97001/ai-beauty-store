import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// ============================================
// Ollama API 配置
// ============================================
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
const MODEL_NAME = process.env.OLLAMA_MODEL || 'qwen2.5:7b'

// ============================================
// 系统提示词
// ============================================
const SYSTEM_PROMPTS = {
  diagnosis: `你是一位专业的美业经营顾问，擅长分析发廊、美容院、假发品牌的经营状况。
请根据用户提供的信息，进行以下维度评估（1-10分）：
1. 获客能力
2. 成交效率
3. 运营管理
4. 客户留存
5. 数字化程度

请以简体中文回答，先给出总分，再逐项评分与建议。保持简洁有条理。`,

  hairstyle: `你是一位专业的造型师，擅长根据脸型和风格推荐适合的发型。
请根据用户的信息（性别、脸型、风格偏好）推荐4款适合的发型。
每款发型需包含：名称、适合脸型、特点描述、搭配建议。
以简体中文回答，保持简洁。`,

  acquisition: `你是一位美业数字营销专家，擅长制定 AI 驱动的获客方案。
请根据用户的行业类型、目标客群、预算，生成一份个性化的 AI 获客方案。
方案需包含：渠道策略、内容策略、预算分配、预期效果。
以简体中文回答，保持专业且实用。`,

  chat: `你是一位 AI 美业 SaaS 平台的智能顾问。
你可以帮助用户了解：
- AI 获客引擎（LBS 附近获客、智能投放、人群画像）
- AI 成交助手（方案推荐、虚拟体验、智能话术）
- AI 运营平台（智能排班、库存预测、营收分析）
- AI 复购引擎（周期预测、自动触发营销、个性化优惠）

请以简体中文回答，保持简洁专业。如果用户问到产品功能，请参考以下数据：
- 获客成本降低 45%
- 成交率提升 60%
- 运营效率翻倍
- 复购率提升 280%`
}

// ============================================
// API 路由
// ============================================

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: MODEL_NAME, timestamp: new Date().toISOString() })
})

// AI 对话接口
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversation, type = 'chat' } = req.body
    
    if (!message) {
      return res.status(400).json({ error: '请提供消息内容' })
    }

    const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.chat
    
    // 构建对话历史
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversation || []),
      { role: 'user', content: message }
    ]

    // 调用 Ollama API
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`Ollama API 错误: ${response.status}`)
    }

    const data = await response.json()
    
    res.json({
      reply: data.message?.content || '抱歉，我暂时无法回应。',
      model: MODEL_NAME
    })

  } catch (error) {
    console.error('API 错误:', error)
    res.status(500).json({
      error: 'AI 服务暂时不可用',
      message: error.message
    })
  }
})

// AI 诊断接口
app.post('/api/diagnosis', async (req, res) => {
  try {
    const { businessType, location, size, monthlyRevenue, challenges } = req.body
    
    const message = `请对以下美业门店进行诊断评估：

- 行业类型：${businessType || '未指定'}
- 地点：${location || '未指定'}
- 规模：${size || '未指定'}
- 月营收：${monthlyRevenue || '未指定'}
- 面临挑战：${challenges || '未指定'}

请给出详细评分和改进建议。`

    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: message,
        system: SYSTEM_PROMPTS.diagnosis,
        stream: false
      })
    })

    const data = await response.json()
    
    res.json({
      result: data.response || '诊断暂时不可用',
      model: MODEL_NAME
    })

  } catch (error) {
    console.error('诊断 API 错误:', error)
    res.status(500).json({ error: '诊断服务暂时不可用' })
  }
})

// AI 发型推荐接口
app.post('/api/hairstyle', async (req, res) => {
  try {
    const { gender, faceShape, stylePreference } = req.body
    
    const message = `我是${gender || '未知'}性，脸型是${faceShape || '未指定'}，偏好${stylePreference || '未指定'}风格。
请推荐 4 款适合我的发型。`

    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: message,
        system: SYSTEM_PROMPTS.hairstyle,
        stream: false
      })
    })

    const data = await response.json()
    
    res.json({
      results: data.response || '推荐暂时不可用',
      model: MODEL_NAME
    })

  } catch (error) {
    console.error('发型推荐 API 错误:', error)
    res.status(500).json({ error: '推荐服务暂时不可用' })
  }
})

// AI 获客方案接口
app.post('/api/acquisition', async (req, res) => {
  try {
    const { industry, targetAudience, budget } = req.body
    
    const message = `请为以下情况制定 AI 获客方案：

- 行业：${industry || '未指定'}
- 目标客群：${targetAudience || '未指定'}
- 预算：${budget || '未指定'}

请给出具体的渠道策略、内容策略、预算分配和预期效果。`

    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: message,
        system: SYSTEM_PROMPTS.acquisition,
        stream: false
      })
    })

    const data = await response.json()
    
    res.json({
      plan: data.response || '方案生成暂时不可用',
      model: MODEL_NAME
    })

  } catch (error) {
    console.error('获客方案 API 错误:', error)
    res.status(500).json({ error: '方案生成服务暂时不可用' })
  }
})

// 静态文件服务（前端构建输出）
app.use(express.static('../dist'))

// 所有其他路由返回 index.html（SPA 支持）
app.get('*', (req, res) => {
  res.sendFile('../dist/index.html')
})

app.listen(PORT, () => {
  console.log(`🚀 AI Beauty SaaS 服务器运行在 http://localhost:${PORT}`)
  console.log(`📊 模型: ${MODEL_NAME}`)
  console.log(`🔗 Ollama: ${OLLAMA_HOST}`)
})
