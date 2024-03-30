import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Navbar from "./components/AgentMainPage/Navbar";
import Footer from "./components/Footer/Footer";
import AgentMainPage from "./components/AgentMainPage/AgentMainPage";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Hero /> },
    { path: "/login", element: <Login /> },
    { path: "/main", element: <PrivateRoute><AgentMainPage/></PrivateRoute>},
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
