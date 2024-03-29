import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Hero /> },
    { path: "/login", element: <Login /> },
    { path: "/main", element: <MainPage/> },
  ]);
  return routes;
};
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
