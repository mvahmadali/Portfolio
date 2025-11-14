import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectsGallery from './pages/ProjectsGallery'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsGallery />} />
    </Routes>
  )
}

export default App
