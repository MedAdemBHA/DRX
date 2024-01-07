// auth/Auth.js
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const login = (data) => {
    setUserData(data);

    localStorage.setItem("userData", JSON.stringify(data));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  const hasRole = (role) => {
    return userData && userData.role === role;
  };

  const isAuthenticated = () => {
    return !!userData;
  };

  useEffect(() => {
    // Add any additional initialization logic here
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData, login, logout, hasRole, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
