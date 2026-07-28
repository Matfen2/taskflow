import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import KanbanPage from './pages/KanbanPage'

const isAuth = () => !!localStorage.getItem('token')

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuth() ? <>{children}</> : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/kanban" element={<PrivateRoute><KanbanPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={isAuth() ? '/kanban' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}