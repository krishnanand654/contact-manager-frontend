import Login from "./pages/Login/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/ui/Layout/Layout"
import Registration from "./pages/Registration/Registration"
import CreateContact from "./pages/CreateContact/CreateContact"
import { Home } from "./pages/Home/Home"
import useAuth from "./hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Profile from "./pages/Profile/Profile"


function App() {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login")
    }
  }, [isAuthenticated])


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
