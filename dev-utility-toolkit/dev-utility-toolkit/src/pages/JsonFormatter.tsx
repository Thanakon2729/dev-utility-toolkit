import { useState } from 'react'
import ToolCard from '../components/ToolCard'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
    } catch {
      setOutput('Invalid JSON')
    }
  }

  return (
    <ToolCard title="JSON Formatter">
      <textarea
        className="w-full h-64 bg-slate-950 border border-slate-700 rounded-xl p-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={formatJson}
        className="mt-4 bg-cyan-500 px-5 py-2 rounded-xl"
      >
        Format
      </button>

      <pre className="mt-4 bg-black rounded-xl p-4 whitespace-pre-wrap">
        {output}
      </pre>
    </ToolCard>
  )
}
