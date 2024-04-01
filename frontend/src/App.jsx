import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Hero from "./components/Landing/Hero";
import Login from "./components/Login/Login";
import Navbar from "./components/AgentMainPage/Navbar";
import Footer from "./components/Footer/Footer";
import AgentMainPage from "./components/AgentMainPage/AgentMainPage";
import { AppProvider } from "./context/AppContext";
import useApplicationData from "./hooks/useApplicationData";

const AppRoutes = () => {
  const { getTriageTicketCount, getAllTicketCount, getClosedTicketCount, getMyTicketCount } = useApplicationData();
  getTriageTicketCount();
  getAllTicketCount();
  getClosedTicketCount();
  getMyTicketCount();
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
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
