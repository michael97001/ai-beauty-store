<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const activeTab = ref('acquire')
const unlocked = ref(false)
const unlockCode = ref('')
const showUnlock = ref(false)

const tabs = [
  { id: 'acquire', name: 'AI获客', icon: '🎯', color: 'green' },
  { id: 'convert', name: 'AI成交', icon: '💰', color: 'blue' },
  { id: 'operate', name: 'AI运营', icon: '⚙️', color: 'cyan' },
  { id: 'retain', name: 'AI复购', icon: '🔄', color: 'orange' },
]

const tools = {
  acquire: [
    {
      name: 'n8n',
      desc: '开源自动化工作流平台，串联1000+应用，自动抓取潜在客户、多渠道分发、定时投放。',
      download: 'https://github.com/n8n-io/n8n/releases',
      docs: 'https://docs.n8n.io/',
      type: '开源自部署',
      req: 'Node.js 18+ · Docker 推荐',
      steps: [
        '1. 下载 n8n Docker 镜像或 npm 全局安装',
        '2. 启动 n8n 服务，打开 http://localhost:5678',
        '3. 创建工作流：HTTP请求 → 数据清洗 → 写入CRM',
        '4. 设置定时触发，自动采集潜在客户数据',
      ],
    },
    {
      name: 'Social Auto Upload',
      desc: '开源一键多平台自动发布工具，支持抖音、小红书、快手、B站、微信视频号同时分发。',
      download: 'https://github.com/dreammis/social-auto-upload/releases',
      docs: 'https://github.com/dreammis/social-auto-upload#readme',
      type: '开源自部署',
      req: 'Python 3.10+ · Chrome',
      steps: [
        '1. 下载源码，pip install -r requirements.txt',
        '2. 配置各平台 Cookie（扫码登录一次即可）',
        '3. 准备视频/图文素材，填写发布配置',
        '4. 运行脚本，自动多平台定时发布',
      ],
    },
    {
      name: 'Thunderbit',
      desc: 'AI网页数据采集器，2次点击从任意网站提取潜在客户信息，自动识别字段，导出Excel/CRM。',
      download: 'https://www.thunderbit.com/download/',
      docs: 'https://docs.thunderbit.com/',
      type: 'Chrome插件（免费额度）',
      req: 'Chrome 浏览器',
      steps: [
        '1. 安装 Thunderbit Chrome 插件',
        '2. 打开目标网页，点击 Thunderbit 图标',
        '3. AI自动识别字段，点击提取',
        '4. 导出到 Excel 或直接推送到 CRM',
      ],
    },
  ],
  convert: [
    {
      name: 'Dify',
      desc: '119k⭐开源AI应用平台，搭建智能客服机器人、知识库问答、产品推荐引擎，自部署无限调用。',
      download: 'https://github.com/langgenius/dify/releases',
      docs: 'https://docs.dify.ai/',
      type: '开源自部署',
      req: 'Docker · 4GB+ 内存',
      steps: [
        '1. 下载 docker-compose.yml，一键启动',
        '2. 打开 http://localhost，注册管理员',
        '3. 创建「智能客服」应用，导入产品知识库',
        '4. 配置话术提示词，发布到网站/微信',
        '5. 客户咨询自动应答，成交率提升60%',
      ],
    },
    {
      name: 'GPT Runner',
      desc: '开源AI项目文件管理工具，多模型切换，可为不同客户场景配置专属AI对话模板。',
      download: 'https://github.com/nicepkg/gpt-runner/releases',
      docs: 'https://github.com/nicepkg/gpt-runner#readme',
      type: '开源自部署',
      req: 'Node.js 18+',
      steps: [
        '1. npm install -g gpt-runner',
        '2. 配置 OpenAI/本地模型 API Key',
        '3. 创建不同场景的对话模板（售前/售后/推荐）',
        '4. 团队成员通过 Web 界面使用',
      ],
    },
    {
      name: 'Chatwoot',
      desc: '开源全渠道客服系统，WhatsApp/微信/邮件/网站聊天统一收件箱，团队协作处理客户咨询。',
      download: 'https://github.com/chatwoot/chatwoot/releases',
      docs: 'https://www.chatwoot.com/docs',
      type: '开源自部署',
      req: 'Docker · 2GB+ 内存',
      steps: [
        '1. Docker 一键部署 Chatwoot',
        '2. 接入微信/WhatsApp/邮件渠道',
        '3. 配置自动分配规则，客户咨询自动路由',
        '4. 设置快捷回复模板，提升响应速度',
      ],
    },
  ],
  operate: [
    {
      name: 'Flowise',
      desc: '47k⭐开源AI工作流可视化编排平台，拖拽构建自动化运营流程，无需写代码。',
      download: 'https://github.com/FlowiseAI/Flowise/releases',
      docs: 'https://docs.flowiseai.com/',
      type: '开源自部署',
      req: 'Node.js 18+ · 2GB+ 内存',
      steps: [
        '1. npm install -g flowise',
        '2. 启动后打开 http://localhost:3000',
        '3. 拖拽节点编排：数据源 → AI处理 → 输出',
        '4. 可视化调试，一键部署为API',
        '5. 场景：自动生成日报、库存预警、排班优化',
      ],
    },
    {
      name: 'Activepieces',
      desc: '开源Zapier替代品，无代码自动化，连接200+应用，自动录入数据、推送报表、触发任务。',
      download: 'https://github.com/activepieces/activepieces/releases',
      docs: 'https://www.activepieces.com/docs',
      type: '开源自部署',
      req: 'Docker 推荐',
      steps: [
        '1. Docker 一键部署',
        '2. 选择触发器（定时/API/ webhook）',
        '3. 添加动作：数据格式化 → 写入表格 → 发通知',
        '4. 常用场景：每日营收报表推送、库存不足预警',
      ],
    },
    {
      name: 'Baserow',
      desc: '开源无代码数据库，替代Airtable，客户资料管理、库存追踪、项目排班一目了然。',
      download: 'https://github.com/Baserow/baserow/releases',
      docs: 'https://baserow.io/docs',
      type: '开源自部署',
      req: 'Docker · 2GB+ 内存',
      steps: [
        '1. Docker 部署 Baserow',
        '2. 创建客户资料表、库存表、排班表',
        '3. 配置视图：看板、日历、表格',
        '4. 设置自动化：客户状态变更自动通知',
      ],
    },
  ],
  retain: [
    {
      name: 'Mautic',
      desc: '开源营销自动化平台，邮件/SMS/微信自动触发，客户旅程编排，复购周期智能提醒。',
      download: 'https://github.com/mautic/mautic/releases',
      docs: 'https://docs.mautic.org/',
      type: '开源自部署',
      req: 'PHP 8.1+ · MySQL · 2GB+ 内存',
      steps: [
        '1. 部署 Mautic（Docker 或 LAMP）',
        '2. 导入客户列表，配置客户旅程',
        '3. 设置触发器：消费后30天自动发优惠券',
        '4. 复购率提升280%，老客户不再流失',
      ],
    },
    {
      name: 'APITable',
      desc: '开源多维表格（Airtable替代），客户消费周期追踪、自动化提醒、团队协作管理。',
      download: 'https://github.com/apitable/apitable/releases',
      docs: 'https://help.apitable.com/',
      type: '开源自部署',
      req: 'Docker · 4GB+ 内存',
      steps: [
        '1. Docker 一键部署 APITable',
        '2. 创建客户消费记录表',
        '3. 配置自动化：消费后N天自动高亮提醒',
        '4. 接入webhook，到期自动推送微信通知',
      ],
    },
    {
      name: 'ERPNext',
      desc: '开源轻量ERP+CRM，客户管理+消费周期标注+复购预警+库存管理一站式。',
      download: 'https://github.com/frappe/erpnext/releases',
      docs: 'https://docs.erpnext.com/',
      type: '开源自部署',
      req: 'Docker · 4GB+ 内存',
      steps: [
        '1. Docker 部署 ERPNext',
        '2. 导入客户数据，设置消费周期标签',
        '3. 配置复购预警：到期前7天自动提醒',
        '4. 生成复购漏斗报表，追踪转化',
      ],
    },
  ],
}

function tryUnlock() {
  if (unlockCode.value.trim() === 'aibusiness9.9') {
    unlocked.value = true
    showUnlock.value = false
    localStorage.setItem('toolbox_unlocked', '1')
    localStorage.setItem('toolbox_expire', Date.now() + 30 * 24 * 60 * 60 * 1000 + '')
  } else {
    alert('激活码不正确。请付款 $9.9 后联系微信 aa0936aa 获取激活码。')
  }
}

onMounted(() => {
  const exp = localStorage.getItem('toolbox_expire')
  if (exp && parseInt(exp) > Date.now()) {
    unlocked.value = true
  }
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  })
})
</script>

<template>
<!-- Header -->
<section class="pt-32 pb-12 text-center">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="section-tag">🧰 AI工具箱</div>
    <h1 class="section-title">12款AI获客工具 · 一站打包下载</h1>
    <p class="section-subtitle mx-auto">付费 $9.9 解锁全部工具 + 完整使用教程 · 30天有效</p>
  </div>
</section>

<!-- 未解锁提示 -->
<section v-if="!unlocked" class="py-8">
  <div class="max-w-[600px] mx-auto px-6">
    <div class="card border border-orange-500/30 bg-orange-500/5 p-8 text-center animate-on-scroll">
      <div class="text-5xl mb-4">🔒</div>
      <h3 class="text-xl font-bold mb-2">工具箱已锁定</h3>
      <p class="text-text-muted text-sm mb-6">付款 $9.9 后获取激活码，解锁全部12款工具下载链接 + 图文教程</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <button @click="showUnlock = true" class="btn-primary">输入激活码解锁</button>
        <RouterLink to="/contact" class="btn-outline">扫码付款获取</RouterLink>
      </div>
      <div class="mt-6 flex items-center justify-center gap-4 text-xs text-text-muted">
        <span>💚 微信支付</span>
        <span>💙 支付宝</span>
        <span>💰 $9.9 / 30天</span>
      </div>
    </div>
  </div>
</section>

<!-- 激活码输入 -->
<section v-if="showUnlock && !unlocked" class="py-4">
  <div class="max-w-[400px] mx-auto px-6">
    <div class="card p-6 text-center">
      <h3 class="font-bold mb-3">输入激活码</h3>
      <input v-model="unlockCode" type="text" class="form-input mb-3 text-center" placeholder="输入付款后获取的激活码" @keyup.enter="tryUnlock" />
      <button @click="tryUnlock" class="btn-primary w-full mb-2">解锁</button>
      <button @click="showUnlock = false" class="text-xs text-text-muted hover:text-white">取消</button>
    </div>
  </div>
</section>

<!-- 已解锁：工具列表 -->
<section v-if="unlocked" class="py-8">
  <div class="max-w-[1200px] mx-auto px-6">
    <!-- 解锁提示 -->
    <div class="text-center mb-8 animate-on-scroll">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        已解锁 · 30天完整权限
      </div>
    </div>

    <!-- Tab 切换 -->
    <div class="flex justify-center gap-2 mb-10 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        :class="['px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
          activeTab === tab.id
            ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
            : 'bg-white/5 text-text-muted hover:text-white']">
        {{ tab.icon }} {{ tab.name }}
      </button>
    </div>

    <!-- 工具卡片 -->
    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="tool in tools[activeTab]" :key="tool.name"
        class="card animate-on-scroll p-6">
        <!-- 工具名 -->
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-extrabold">{{ tool.name }}</h3>
          <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded-full">{{ tool.type }}</span>
        </div>
        <p class="text-text-secondary text-sm leading-relaxed mb-4">{{ tool.desc }}</p>

        <!-- 环境要求 -->
        <div class="mb-4 p-2 bg-black/20 rounded-lg text-xs text-text-muted">
          <span class="text-white font-semibold">环境要求：</span>{{ tool.req }}
        </div>

        <!-- 使用教程 -->
        <div class="mb-5">
          <div class="text-xs font-bold text-white mb-2">📐 使用教程</div>
          <ol class="space-y-1.5">
            <li v-for="(step, i) in tool.steps" :key="i" class="text-xs text-text-muted leading-relaxed pl-1">{{ step }}</li>
          </ol>
        </div>

        <!-- 下载按钮 -->
        <div class="flex gap-2">
          <a :href="tool.download" target="_blank" class="btn-primary btn-sm flex-1 text-center">📥 下载</a>
          <a :href="tool.docs" target="_blank" class="btn-outline btn-sm flex-1 text-center">📖 文档</a>
        </div>
      </div>
    </div>

    <!-- 底部 CTA -->
    <div class="mt-12 text-center animate-on-scroll">
      <div class="card p-8 max-w-[500px] mx-auto">
        <h3 class="text-lg font-bold mb-2">需要帮助？</h3>
        <p class="text-text-muted text-sm mb-4">安装部署遇到问题？添加微信获取远程协助</p>
        <RouterLink to="/contact" class="btn-primary">📱 联系技术支持</RouterLink>
      </div>
    </div>
  </div>
</section>
</template>