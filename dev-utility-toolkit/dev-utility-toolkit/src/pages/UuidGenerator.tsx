import { useState } from 'react'
import ToolCard from '../components/ToolCard'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')

  const generate = () => {
    setUuid(crypto.randomUUID())
  }

  return (
    <ToolCard title="UUID Generator">
      <button
        onClick={generate}
        className="bg-cyan-500 px-5 py-2 rounded-xl"
      >
        Generate UUID
      </button>

      <div className="mt-4 bg-black rounded-xl p-4 break-all">
        {uuid}
      </div>
    </ToolCard>
  )
}
