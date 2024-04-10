import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import IconSidebar from "../AgentMainPage/SidePanel/IconSidebar";
function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="app flex h-screen">
      <IconSidebar />
      <div className="content">{children}</div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
