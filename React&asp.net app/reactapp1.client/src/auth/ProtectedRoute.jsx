import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/login" replace />;
  } else if (user.role !== "chef") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

PrivateRouter.propTypes = {
  user: PropTypes.shape({
    isConnected: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default PrivateRouter;
