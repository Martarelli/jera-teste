import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Popular from "./pages/Popular/Popular";
import Auth from "./components/auth/auth";
import Register from "./pages/register/Register";
import Logout from "./pages/logout/Logout";
import TopRated from "./pages/topRated/TopRated";

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/popular"
          element={
            <Auth>
              <Popular />
            </Auth>
          }
        />
        <Route
          path="/toprated"
          element={
            <Auth>
              <TopRated />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
