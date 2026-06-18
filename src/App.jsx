import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/ui/Footer.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { PostDetailPage } from './pages/PostDetailPage.jsx'
import { PostFormPage } from './pages/PostFormPage.jsx'
import { PostsPage } from './pages/PostsPage.jsx'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/new" element={<PostFormPage mode="create" />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          <Route path="/posts/:postId/edit" element={<PostFormPage mode="edit" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
