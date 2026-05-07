import { Routes, Route, Navigate } from 'react-router-dom'
import TranslatePage from './pages/TranslatePage'
import PracticePage from './pages/PracticePage'
import ReferencePage from './pages/ReferencePage'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/translate" replace />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/reference" element={<ReferencePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
