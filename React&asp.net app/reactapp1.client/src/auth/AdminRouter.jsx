import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/login" replace />;
  } else if (user.role !== "Admin") {
    return <Navigate to="/noaccess" replace />;
  }

  return children;
};

AdminRouter.propTypes = {
  user: PropTypes.shape({
    isConnected: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
    // Add any other properties of the user object as needed
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default AdminRouter;
