import { useState } from 'react'
import { Sparkles, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { DisclaimerDialog } from '@/components/layout/DisclaimerDialog'

export function AppHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-surface" />
        </div>
        <span className="text-lg font-semibold text-primary">AI Draw Nexus</span>
      </div>

      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted/20 transition-colors"
            >
              <Info className="text-red-500 h-4 w-4 text-muted" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>使用须知</p>
          </TooltipContent>
        </Tooltip>

        <DisclaimerDialog open={open} onOpenChange={setOpen} showFooter={false} />

        <span className="text-sm text-muted">简体中文</span>
      </div>
    </header>
  )
}
