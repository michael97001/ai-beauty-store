// AI API 调用工具
const API_BASE = 'http://localhost:3001/api'

/**
 * 通用对话接口
 * @param {string} message - 用户消息
 * @param {string} type - 对话类型：chat | diagnosis | solution | acquisition
 * @param {Array} conversation - 历史对话
 * @returns {Promise<Object>}
 */
export async function chat(message, type = 'chat', conversation = []) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversation, type })
    })
    
    if (!response.ok) throw new Error('网络回应异常')
    
    const data = await response.json()
    return { success: true, data: data.reply }
  } catch (error) {
    console.error('AI 对话错误:', error)
    return { 
      success: false, 
      error: 'AI 服务暂时不可用，请稍后重试',
      fallback: generateFallbackReply(message, type)
    }
  }
}

/**
 * AI 诊断接口
 * @param {Object} params - 诊断参数
 * @returns {Promise<Object>}
 */
export async function diagnose(params) {
  try {
    const response = await fetch(`${API_BASE}/diagnosis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    
    if (!response.ok) throw new Error('网络回应异常')
    
    const data = await response.json()
    return { success: true, data: data.result }
  } catch (error) {
    console.error('诊断错误:', error)
    return { success: false, error: '诊断服务暂时不可用' }
  }
}

/**
 * AI 方案推荐接口
 * @param {Object} params - 推荐参数
 * @returns {Promise<Object>}
 */
export async function recommendSolution(params) {
  try {
    const response = await fetch(`${API_BASE}/solution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    
    if (!response.ok) throw new Error('网络回应异常')
    
    const data = await response.json()
    return { success: true, data: data.results }
  } catch (error) {
    console.error('方案推荐错误:', error)
    return { success: false, error: '推荐服务暂时不可用' }
  }
}

/**
 * AI 获客方案接口
 * @param {Object} params - 方案参数
 * @returns {Promise<Object>}
 */
export async function generateAcquisitionPlan(params) {
  try {
    const response = await fetch(`${API_BASE}/acquisition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    
    if (!response.ok) throw new Error('网络回应异常')
    
    const data = await response.json()
    return { success: true, data: data.plan }
  } catch (error) {
    console.error('获客方案错误:', error)
    return { success: false, error: '方案生成服务暂时不可用' }
  }
}

/**
 * 备用回复（当 AI 服务不可用时）
 */
function generateFallbackReply(message, type) {
  const fallbacks = {
    diagnosis: `感谢您的咨询！\u{1F916}

AI 诊断功能正在载入中，以下是初步建议：

📊 **初步评估：**
• 建议先进行完整的 AI 诊断评估
• 我们的顾问会在 24 小时内为您提供专业分析
• 您可以先体验我们的免费版功能

💡 **立即行动：**
1. 填写联系表单预约诊断
2. 或点击右下角聊天按钮咨询

📞 联系我们获取完整报告`,

    solution: `AI方案推荐进行中！✨

以下是基于您信息的初步推荐：

✨ **推荐方案：**
我们的 AI 方案推荐引擎会根据您的需求智能匹配最佳方案。

💡 建议填写表单获取完整评估报告！`,

    acquisition: `获客方案生成中！📈

以下是初步策略建议：

🎯 **渠道策略：**
• LBS 附近精准投放（抖音/小红书/微信）
• KOL/KOC 合作推广
• 客户转介绍奖励计划

💡 **内容策略：**
• 案例分享与对比
• 行业知识科普内容
• 用户见证与评价

📊 **预期效果：**
• 月均新客增长 30-50%
• 获客成本降低 20-30%

💬 联系我们获取完整定制方案`,

    chat: `您好！我是 AI 百业顾问 🤖

我正在学习中，目前可以提供以下帮助：

🔹 **产品介绍：** AI 获客、成交、运营、复购四大引擎
🔹 **行业方案：** 餐饮、零售、教育、美业、家政等多行业方案
🔹 **定价咨询：** 免费版、专业版、企业版
🔹 **预约演示：** 一对一产品体验

💡 您也可以直接浏览我们的产品页面或填写联系表单获取专业顾问服务！`
  }
  
  return fallbacks[type] || fallbacks.chat
}