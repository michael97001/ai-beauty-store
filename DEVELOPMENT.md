# AI美业获客平台 - 本地开发指南

## 快速开始

### 前置条件
- Node.js 18+
- Ollama（已安装 qwen2.5:7b 模型）

### 安装依赖

```bash
# 前端依赖
npm install

# 后端依赖
cd server
npm install
cd ..
```

### 启动服务

**方式一：分别启动**

```bash
# 终端 1 - 启动Ollama
ollama serve

# 终端 2 - 启动后端API
npm run server:start
# 或开发模式（自动重启）
npm run server:dev

# 终端 3 - 启动前端
npm run dev
```

**方式二：使用concurrently同时启动**

```bash
npm install -D concurrently
npm run dev:all
```

## 项目结构

```
AI-Beauty-SaaS/
├── src/                    # 前端源码
│   ├── components/         # Vue组件
│   │   ├── Navbar.vue      # 导航栏（企业级响应式）
│   │   ├── Footer.vue      # 页脚（含ICP备案信息）
│   │   └── Chatbot.vue     # AI客服聊天机器人
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页（企业级SaaS着陆页）
│   │   ├── Products.vue    # 产品功能页
│   │   ├── Solutions.vue   # 行业方案页
│   │   ├── Pricing.vue     # 定价方案页
│   │   ├── Cases.vue       # 成功案例页
│   │   ├── About.vue       # 关于我们
│   │   ├── Contact.vue     # 联系我们（含表单）
│   │   └── NotFound.vue    # 404页面
│   ├── utils/
│   │   └── ai-api.js       # AI API调用工具
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── App.vue
│   ├── main.js
│   └── style.css           # 企业级科技风主题
├── server/                 # 后端API服务器
│   ├── index.js            # Express服务器（Ollama集成）
│   └── package.json
├── public/                 # 静态资源
├── vite.config.js
└── package.json
```

## API接口

### 健康检查
```
GET /api/health
```

### AI对话
```
POST /api/chat
Body: { message, type, conversation }
Response: { reply, model }
```

### AI诊断
```
POST /api/diagnosis
Body: { businessType, location, size, monthlyRevenue, challenges }
Response: { result, model }
```

### AI发型推荐
```
POST /api/hairstyle
Body: { gender, faceShape, stylePreference }
Response: { results, model }
```

### AI获客方案
```
POST /api/acquisition
Body: { industry, targetAudience, budget }
Response: { plan, model }
```

## 环境变量

```bash
# .env文件（可选）
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
PORT=3001
```

## 测试

```bash
# 测试API
curl http://localhost:3001/api/health

# 测试AI对话
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "你好", "type": "chat"}'
```

## 开发说明

1. **前端开发**：修改 `src/` 下的文件，vite会自动热更新
2. **后端开发**：修改 `server/index.js`，使用 `npm run server:dev` 自动重启
3. **AI模型**：确保Ollama正在运行且模型已加载

## 故障排除

- **API连接失败**：确认Ollama和后端服务都在运行
- **模型加载慢**：首次加载需要几秒钟，后续请求会快很多
- **端口冲突**：修改 `.env` 中的 PORT 设置
