import { ReactNode } from 'react'

interface Props {
  title: string
  children?: ReactNode
}

export default function ToolCard({ title, children }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  )
}
