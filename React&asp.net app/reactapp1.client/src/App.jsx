import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import SignInForm from "./pages/SignInForm";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage ";
import UserPage from "./pages/UserPage ";
import NotF from "./pages/NotF";
import NotA from "./pages/NotA";
import AdminRouter from "./auth/AdminRouter";
import ForceRedirect from "./auth/ForceRedirect";
import { AuthProvider, useAuth } from "./auth/Auth";
import { useEffect, useState } from "react";

const App = () => {
  const { userData, isAuthenticated } = useAuth();
  const [authState, setAuthState] = useState({
    isConnected: isAuthenticated(),
    role: userData ? userData.role : null,
  });

  console.log(authState);

  const user = {
    isConnected: authState.isConnected,
    role: authState.role,
  };

  // Update the authentication state when it changes
  useEffect(() => {
    setAuthState({
      isConnected: isAuthenticated(),
      role: userData ? userData.role : null,
    });
  }, [isAuthenticated, userData]);

  return (
    <AuthProvider>
      <div className="bg-light" style={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <ForceRedirect user={user}>
                <SignInForm />
              </ForceRedirect>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute user={user}>
                <UserPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/Admin"
            element={
              <AdminRouter user={user}>
                <AdminPage />
              </AdminRouter>
            }
          ></Route>
          <Route path="*" element={<NotF />}></Route>
          <Route path="/noacces" element={<NotA />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
