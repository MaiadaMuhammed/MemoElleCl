// components/ui/GlassCard.tsx
import { cn } from '@/lib/utils'

export default function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      "bg-white/60 backdrop-blur-md border border-white/40 shadow-glass rounded-luxury p-6",
      className
    )}>
      {children}
    </div>
  )
}