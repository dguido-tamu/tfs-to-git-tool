import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TranslatePage from './pages/TranslatePage'
import PracticePage from './pages/PracticePage'
import ReferencePage from './pages/ReferencePage'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App() {
  const location = useLocation()
  const showFooter = !location.pathname.startsWith('/practice')

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
      {showFooter && <Footer />}
    </>
  )
}

export default App
