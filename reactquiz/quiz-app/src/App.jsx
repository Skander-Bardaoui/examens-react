import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import ManageQuestions from './pages/ManageQuestions'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizz" element={<Quiz />} />
        <Route path="/question/add" element={<ManageQuestions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App