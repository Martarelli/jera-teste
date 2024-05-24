import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./components/auth/auth";
import Register from "./pages/register/Register";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
