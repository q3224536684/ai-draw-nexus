import { useState } from 'react'
import { AppSidebar, AppHeader } from '@/components/layout'
import { Github, Info, Database, AlertTriangle, Bot, Server, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabType = 'about' | 'notice'

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabType>('about')

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <AppHeader />
        <div className="flex flex-1 justify-center px-8 pt-8">
          <div className="flex w-full max-w-4xl gap-8">
            {/* 左侧 Tab 导航 */}
            <nav className="w-44 shrink-0">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={cn(
                      'w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      activeTab === 'about'
                        ? 'bg-primary text-surface'
                        : 'text-muted hover:bg-muted/20 hover:text-primary'
                    )}
                  >
                    <Github className="h-4 w-4" />
                    关于项目
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notice')}
                    className={cn(
                      'w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      activeTab === 'notice'
                        ? 'bg-primary text-surface'
                        : 'text-muted hover:bg-muted/20 hover:text-primary'
                    )}
                  >
                    <Info className="h-4 w-4" />
                    用户须知
                  </button>
                </li>
              </ul>
            </nav>

            {/* 右侧内容区域 */}
            <div className="flex-1">
              {activeTab === 'about' ? <AboutContent /> : <NoticeContent />}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function AboutContent() {
  return (
    <div className="space-y-8">
      {/* 开源信息 */}
      <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-primary">
          <Github className="h-5 w-5" />
          开源项目
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          本项目的代码已全部开源至{' '}
          <a
            href="https://github.com/liujuntao123/ai-draw-nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80"
          >
            liujuntao123/ai-draw-nexus
          </a>
          。
        </p>
      </section>

      {/* 赞助支持 */}
      <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-primary">赞助支持</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted">
          如果你认为本项目对你有帮助，欢迎请作者喝奶茶。
          同时你将获得网站的无限使用额度。
        </p>
        <div className="flex justify-center">
          <img
            src="/donate.png"
            alt="请作者喝奶茶"
            className="max-w-xs rounded-lg border border-border"
          />
        </div>
      </section>

      {/* 联系作者 */}
      <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-primary">联系作者</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted">
          如果你有任何的建议和想法，欢迎联系作者。
        </p>
        <div className="flex justify-center">
          <img
            src="/contact.png"
            alt="联系作者"
            className="max-w-xs rounded-lg border border-border"
          />
        </div>
      </section>
    </div>
  )
}

function NoticeContent() {
  return (
    <div className="space-y-5">
      {/* 页面标题 */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-xl font-bold text-primary">使用须知与免责声明</h1>
      </div>

      {/* 数据存储说明 */}
      <section className="rounded-lg bg-emerald-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-5 w-5 text-emerald-600" />
          <h3 className="text-base font-semibold text-emerald-800">数据存储说明</h3>
        </div>
        <ul className="space-y-2 text-sm text-emerald-900 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-emerald-500 mt-1">•</span>
            <span>您的所有数据均保存在<strong className="font-semibold">浏览器本地存储</strong>中</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-500 mt-1">•</span>
            <span>我们<strong className="font-semibold">不会</strong>将您的数据上传至服务器</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-500 mt-1">•</span>
            <span>请定期<strong className="font-semibold">导出备份</strong>您的重要数据</span>
          </li>
        </ul>
      </section>

      {/* 数据丢失风险 */}
      <section className="rounded-lg bg-amber-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <h3 className="text-base font-semibold text-amber-800">数据丢失风险</h3>
        </div>
        <ul className="space-y-2 text-sm text-amber-900 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-amber-500 mt-1">•</span>
            <span>清除浏览器缓存或数据会导致所有数据<strong className="font-semibold">永久丢失</strong></span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 mt-1">•</span>
            <span>使用隐私模式（无痕模式）时，关闭窗口后数据将丢失</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 mt-1">•</span>
            <span>更换浏览器或设备时，数据不会自动同步</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-500 mt-1">•</span>
            <span>浏览器更新或重置可能导致数据丢失</span>
          </li>
        </ul>
      </section>

      {/* AI 生成内容声明 */}
      <section className="rounded-lg bg-purple-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="h-5 w-5 text-purple-600" />
          <h3 className="text-base font-semibold text-purple-800">AI 生成内容声明</h3>
        </div>
        <ul className="space-y-2 text-sm text-purple-900 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>AI 生成的图表内容仅供参考，请自行验证准确性</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>生成结果可能存在错误或不准确之处</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>请勿将未经验证的 AI 生成内容用于关键决策</span>
          </li>
        </ul>
      </section>

      {/* 服务可用性 */}
      <section className="rounded-lg bg-sky-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Server className="h-5 w-5 text-sky-600" />
          <h3 className="text-base font-semibold text-sky-800">服务可用性</h3>
        </div>
        <ul className="space-y-2 text-sm text-sky-900 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-sky-500 mt-1">•</span>
            <span>本服务按"现状"提供，不保证服务的持续可用性</span>
          </li>
          <li className="flex gap-2">
            <span className="text-sky-500 mt-1">•</span>
            <span>服务可能因维护、升级等原因暂时中断</span>
          </li>
          <li className="flex gap-2">
            <span className="text-sky-500 mt-1">•</span>
            <span>我们保留随时修改或终止服务的权利</span>
          </li>
        </ul>
      </section>

      {/* 免责声明 */}
      <section className="rounded-lg bg-slate-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-slate-600" />
          <h3 className="text-base font-semibold text-slate-800">免责声明</h3>
        </div>
        <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-slate-500 mt-1">•</span>
            <span>因使用本服务产生的任何直接或间接损失，我们不承担责任</span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-500 mt-1">•</span>
            <span>用户应自行承担使用本服务的风险</span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-500 mt-1">•</span>
            <span>用户需确保其使用行为符合当地法律法规</span>
          </li>
        </ul>
      </section>

      <p className="text-center text-sm text-muted pt-3 border-t border-border">
        继续使用本服务即表示您已阅读并同意以上条款
      </p>
    </div>
  )
}
