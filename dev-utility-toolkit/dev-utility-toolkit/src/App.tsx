import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'
import Base64Tool from './pages/Base64Tool'
import UuidGenerator from './pages/UuidGenerator'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json" element={<JsonFormatter />} />
        <Route path="/base64" element={<Base64Tool />} />
        <Route path="/uuid" element={<UuidGenerator />} />
      </Routes>
    </Layout>
  )
}
