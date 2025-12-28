import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/createPageUrl";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  Plus,
  Menu,
  X,
} from "lucide-react";
import AddProductDrawer from "../components/dashboard/AddProductDrawer";

const LOGO_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68d80d60b76cbe09750cf1e1/4e5678b28_WhatsAppImage2025-12-11at133139_6087a179.jpg";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, page: "Overview" },
  { name: "Products", icon: Package, page: "Products" },
  { name: "Orders", icon: ShoppingCart, page: "Orders" },
  { name: "Analytics", icon: BarChart3, page: "Analytics" },
  { name: "Customers", icon: Users, page: "Customers" },
  { name: "Settings", icon: Settings, page: "Settings" },
];

export default function Layout({ children, currentPageName }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <img
            src={LOGO_URL}
            alt="RentEase"
            className="h-10 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <span className="hidden font-playfair text-2xl font-bold text-[#3B82F6]">
            RentEase
          </span>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-xl flex items-center gap-1 text-sm font-inter font-medium"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">List Item</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <img src={LOGO_URL} alt="RentEase" className="h-12" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.name}
                      to={createPageUrl(item.page)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-inter ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] bg-white/80 backdrop-blur-md border-r border-gray-100 flex-col z-40">
        <div className="p-8 border-b border-gray-100">
          <img src={LOGO_URL} alt="RentEase" className="h-16 mb-2" />
          <p className="font-inter text-sm text-gray-500">Vendor Dashboard</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.name}
                to={createPageUrl(item.page)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-inter transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[280px] pt-20 lg:pt-0 min-h-screen">
        <header className="hidden lg:flex items-center justify-between p-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold">
              {currentPageName}
            </h1>
            <p className="font-inter text-gray-500">Welcome back</p>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            List New Item
          </button>
        </header>

        <div className="px-4 lg:px-8 pb-8">{children}</div>
      </main>

      {/* Add Product Drawer */}
      <AddProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
