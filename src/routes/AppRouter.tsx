import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="menu.html" element={<Menu />} />
          <Route path="login.html" element={<Login />} />
          <Route path="register.html" element={<Register />} />
          <Route path="cart.html" element={<Cart />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
