import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

import Overview from "./pages/Overview";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import UserNotRegistered from "./pages/UserNotRegistered";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout currentPageName="Overview"><Overview /></Layout>} />
        <Route path="/Overview" element={<Layout currentPageName="Overview"><Overview /></Layout>} />
        <Route path="/Products" element={<Layout currentPageName="Products"><Products /></Layout>} />
        <Route path="/Orders" element={<Layout currentPageName="Orders"><Orders /></Layout>} />
        <Route path="/Analytics" element={<Layout currentPageName="Analytics"><Analytics /></Layout>} />
        <Route path="/Customers" element={<Layout currentPageName="Customers"><Customers /></Layout>} />
        <Route path="/Settings" element={<Layout currentPageName="Settings"><Settings /></Layout>} />
        <Route path="/unauthorized" element={<UserNotRegistered />} />
      </Routes>
    </BrowserRouter>
  );
}
