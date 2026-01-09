import { useState, useEffect } from 'react'
import { Info, Database, AlertTriangle, Bot, Server, Shield } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

const DISCLAIMER_STORAGE_KEY = 'ai-draw-nexus-disclaimer-accepted'

/** 须知内容组件，可复用 */
export function DisclaimerContent() {
  return (
    <div className="pt-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <div className="grid grid-cols-2 gap-3">
        {/* 数据存储说明 */}
        <section className="rounded-lg bg-emerald-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-emerald-800">数据存储说明</h3>
          </div>
          <ul className="space-y-1 text-xs text-emerald-900 leading-relaxed">
            <li className="flex gap-1.5">
              <span className="text-emerald-500 mt-0.5">•</span>
              <span>数据保存在<strong>浏览器本地</strong></span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-emerald-500 mt-0.5">•</span>
              <span><strong>不会</strong>上传至服务器</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-emerald-500 mt-0.5">•</span>
              <span>请定期<strong>导出备份</strong></span>
            </li>
          </ul>
        </section>

        {/* 数据丢失风险 */}
        <section className="rounded-lg bg-amber-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-amber-800">数据丢失风险</h3>
          </div>
          <ul className="space-y-1 text-xs text-amber-900 leading-relaxed">
            <li className="flex gap-1.5">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>清除缓存会<strong>永久丢失</strong>数据</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>无痕模式关闭后数据丢失</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-amber-500 mt-0.5">•</span>
              <span>跨设备数据不会同步</span>
            </li>
          </ul>
        </section>

        {/* AI 生成内容声明 */}
        <section className="rounded-lg bg-purple-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-purple-800">AI 生成内容</h3>
          </div>
          <ul className="space-y-1 text-xs text-purple-900 leading-relaxed">
            <li className="flex gap-1.5">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>内容仅供参考，请自行验证</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>结果可能存在错误</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>勿用于关键决策</span>
            </li>
          </ul>
        </section>

        {/* 服务可用性 */}
        <section className="rounded-lg bg-sky-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Server className="h-4 w-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-sky-800">服务可用性</h3>
          </div>
          <ul className="space-y-1 text-xs text-sky-900 leading-relaxed">
            <li className="flex gap-1.5">
              <span className="text-sky-500 mt-0.5">•</span>
              <span>按"现状"提供服务</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-sky-500 mt-0.5">•</span>
              <span>可能因维护暂时中断</span>
            </li>
            <li className="flex gap-1.5">
              <span className="text-sky-500 mt-0.5">•</span>
              <span>保留修改服务的权利</span>
            </li>
          </ul>
        </section>
      </div>

      {/* 免责声明 - 横跨两列 */}
      <section className="rounded-lg bg-slate-100 p-3 mt-3">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-800">免责声明</h3>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700 leading-relaxed">
          <li className="flex gap-1.5">
            <span className="text-slate-500 mt-0.5">•</span>
            <span>直接或间接损失我们不承担责任</span>
          </li>
          <li className="flex gap-1.5">
            <span className="text-slate-500 mt-0.5">•</span>
            <span>用户自行承担使用风险</span>
          </li>
          <li className="flex gap-1.5 col-span-2">
            <span className="text-slate-500 mt-0.5">•</span>
            <span>用户需确保使用行为符合当地法律法规</span>
          </li>
        </ul>
      </section>

      <p className="text-center text-xs text-muted pt-3 mt-3 border-t border-border">
        继续使用本服务即表示您已阅读并同意以上条款
      </p>
    </div>
  )
}

interface DisclaimerDialogProps {
  /** 受控模式：外部控制 open 状态 */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** 是否显示底部按钮（首次弹窗需要，手动打开不需要） */
  showFooter?: boolean
}

/** 首次访问弹窗（自动检测 localStorage）*/
export function DisclaimerDialog({ open: controlledOpen, onOpenChange, showFooter = true }: DisclaimerDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen

  useEffect(() => {
    // 仅在非受控模式下检查 localStorage
    if (!isControlled) {
      const accepted = localStorage.getItem(DISCLAIMER_STORAGE_KEY)
      if (!accepted) {
        setInternalOpen(true)
      }
    }
  }, [isControlled])

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-xl">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            使用须知与免责声明
          </DialogTitle>
        </DialogHeader>

        <DisclaimerContent />

        {showFooter && (
          <DialogFooter className="pt-4">
            <Button onClick={handleAccept} className="w-full">
              我已了解并同意
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
