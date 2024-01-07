import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ForceRedirect = ({ user, children }) => {
  if (user.isConnected) {
    return <Navigate to="/user" replace />;
  }
  return children;
};

ForceRedirect.propTypes = {
  user: PropTypes.shape({
    isConnected: PropTypes.bool.isRequired,
    // Add any other properties of the user object as needed
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default ForceRedirect;
