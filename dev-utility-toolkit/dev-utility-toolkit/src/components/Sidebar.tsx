import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5">
      <h1 className="text-2xl font-bold mb-6">
        Dev Toolkit
      </h1>

      <nav className="flex flex-col gap-3">
        <Link to="/">Home</Link>
        <Link to="/json">JSON Formatter</Link>
        <Link to="/base64">Base64 Tool</Link>
        <Link to="/uuid">UUID Generator</Link>
      </nav>
    </aside>
  )
}
