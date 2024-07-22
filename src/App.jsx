import Login from "./pages/Login/Login"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/ui/Layout/Layout"
import Registration from "./pages/Registration/Registration"
import ContactCard from "./components/ui/ContactCard/ContactCard"
import CreateContact from "./pages/CreateContact/CreateContact"
import { Home } from "./pages/Home/Home"
import useAuth from "./hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


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
        <Route path="/" element={isAuthenticated ? <Layout /> : <Login />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/contact/:id" element={<ContactCard />} />
        </Route>

      </Routes>

    </>
  )
}

export default App
