import Hero from "./components/Hero/Hero"
import Login from "./components/Login/Login"
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

const AppRoutes =() => {
  let routes = useRoutes([
    { path: '/', element: <Hero /> },
    { path: '/login', element: <Login /> },
  ]);
  return routes
}
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <AppRoutes/>
    <Footer/>
    </BrowserRouter>
  )
}

export default App