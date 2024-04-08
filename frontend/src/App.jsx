import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Hero from "./components/Landing/Hero";
import Login from "./components/Login/Login";
import Navbar from "./components/AgentMainPage/Navbar";
import AgentMainPage from "./components/AgentMainPage/AgentMainPage";
import { AppProvider } from "./context/AppContext";
import useApplicationData from "./hooks/useApplicationData";
import useLocalStorage from "./hooks/useLocalStorage";

const AppRoutes = () => {
  const { getAgents } = useApplicationData();
  useLocalStorage();
  
  getAgents();
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
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
