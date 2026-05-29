import { useState } from 'react'
import ToolCard from '../components/ToolCard'

export default function Base64Tool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  return (
    <ToolCard title="Base64 Encode / Decode">
      <textarea
        className="w-full h-40 bg-slate-950 border border-slate-700 rounded-xl p-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setResult(btoa(text))}
          className="bg-cyan-500 px-5 py-2 rounded-xl"
        >
          Encode
        </button>

        <button
          onClick={() => setResult(atob(text))}
          className="bg-green-500 px-5 py-2 rounded-xl"
        >
          Decode
        </button>
      </div>

      <pre className="mt-4 bg-black rounded-xl p-4 break-all">
        {result}
      </pre>
    </ToolCard>
  )
}
