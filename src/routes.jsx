import { Navigate, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import Auth from "./components/auth/auth";

function MainRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Auth>
            <Dashboard />
          </Auth>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
