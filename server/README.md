# AI Draw Nexus Server

AI Draw Nexus 的独立后端服务，使用 Express 框架构建。

## 功能特性

- ✅ **健康检查** (`GET /api/health`) - 服务状态检查
- ✅ **AI 对话** (`POST /api/chat`) 
  - 支持 OpenAI 和 Anthropic 提供商
  - 支持流式和非流式响应
  - 支持自定义 LLM 配置
  - 访问密码验证
  - 配额管理
- ✅ **URL 解析** (`POST /api/parse-url`)
  - 解析网页内容为 Markdown
  - 支持微信公众号文章

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 配置环境变量

创建 `.env` 文件：

```env
PORT=3000
AI_PROVIDER=openai
AI_BASE_URL=https://api.openai.com/v1
AI_API_KEY=你的API密钥
AI_MODEL_ID=gpt-4
ACCESS_PASSWORD=
```

### 3. 启动服务

```bash
# 开发模式（支持热重载）
npm run dev

# 生产模式
npm run build
npm start
```

## 环境变量说明

| 变量 | 说明 | 默认值 | 必填 |
|------|------|--------|------|
| `PORT` | 服务端口 | `3000` | 否 |
| `AI_PROVIDER` | AI 提供商 (`openai` / `anthropic`) | `openai` | 否 |
| `AI_BASE_URL` | AI API 基础 URL | `https://api.openai.com/v1` | 否 |
| `AI_API_KEY` | AI API 密钥 | - | 是 |
| `AI_MODEL_ID` | AI 模型 ID | `gpt-4` | 否 |
| `ACCESS_PASSWORD` | 访问密码（可选） | - | 否 |

## API 文档

### GET /api/health

健康检查端点

**响应示例：**
```json
{
  "status": "ok"
}
```

### POST /api/chat

AI 对话端点

**请求头：**
- `Content-Type: application/json`
- `X-Access-Password: 访问密码`（可选）

**请求体：**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "你好"
    }
  ],
  "stream": false,
  "llmConfig": {
    "provider": "openai",
    "baseUrl": "https://api.openai.com/v1",
    "apiKey": "sk-xxx",
    "modelId": "gpt-4"
  }
}
```

**响应（非流式）：**
```json
{
  "content": "你好！有什么我可以帮助你的吗？"
}
```

**响应（流式）：**
```
data: {"content":"你"}

data: {"content":"好"}

data: [DONE]
```

### POST /api/parse-url

解析网页内容为 Markdown

**请求体：**
```json
{
  "url": "https://example.com/article"
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "title": "文章标题",
    "content": "# 文章标题\n\n文章内容...",
    "excerpt": "文章摘要",
    "siteName": "example.com",
    "url": "https://example.com/article"
  }
}
```

## 项目结构

```
server/
├── index.ts              # 服务入口
├── routes/              # 路由定义
│   ├── chat.ts         # AI 对话
│   ├── health.ts       # 健康检查
│   └── parse-url.ts    # URL 解析
├── utils/              # 工具函数
│   ├── auth.ts         # 认证
│   ├── ai-providers.ts # AI 提供商
│   ├── stream-openai.ts
│   └── stream-anthropic.ts
├── types/              # 类型定义
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 构建
pnpm run build

# 生产运行
pnpm start

# 清理构建产物
pnpm run clean
```

## Docker 部署

### 构建镜像

```bash
docker build -t ai-draw-nexus-server .
```

### 运行容器

```bash
docker run -d \
  -p 3000:3000 \
  -e AI_API_KEY=your-api-key \
  -e AI_PROVIDER=openai \
  -e AI_MODEL_ID=gpt-4 \
  --name ai-draw-nexus-server \
  ai-draw-nexus-server
```

### 使用 Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - AI_PROVIDER=openai
      - AI_BASE_URL=https://api.openai.com/v1
      - AI_API_KEY=${AI_API_KEY}
      - AI_MODEL_ID=gpt-4
    env_file:
      - .env
    restart: unless-stopped
```

启动：

```bash
docker-compose up -d
```

## 生产部署建议

1. **使用进程管理器**：PM2、systemd
2. **配置反向代理**：Nginx、Caddy
3. **启用 HTTPS**：Let's Encrypt
4. **监控和日志**：配置日志收集和监控
5. **环境变量**：使用安全的方式管理密钥

### PM2 部署示例

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start dist/index.js --name ai-draw-nexus-server

# 查看状态
pm2 status

# 查看日志
pm2 logs ai-draw-nexus-server

# 设置开机自启
pm2 startup
pm2 save
```

## License

MIT
