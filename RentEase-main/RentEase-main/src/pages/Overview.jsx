import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { IndianRupee, Package, TrendingUp, ShoppingCart } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";

export default function Overview() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list()
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list()
  });

  const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
  const activeRentals = products.filter(p => p.status === "Rented").length;

  const activities = [
    { message: "Order #402: Sofa Set delivered to Anjali", type: "delivered", time: "2 hours ago" },
    { message: "New order received: Samsung Smart TV", type: "pending", time: "4 hours ago" },
    { message: "Order #398 completed successfully", type: "completed", time: "Yesterday" },
    { message: "Catering Set returned by Vikram", type: "completed", time: "Yesterday" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="₹1.24L"
          icon={IndianRupee}
          trend="12.5%"
          trendUp={true}
          delay={0}
        />
        <StatCard 
          title="Active Rentals" 
          value={activeRentals > 0 ? activeRentals : 12}
          icon={Package}
          trend="3 new"
          trendUp={true}
          delay={0.1}
        />
        <StatCard 
          title="Total Products" 
          value={products.length > 0 ? products.length : 24}
          icon={ShoppingCart}
          delay={0.2}
        />
        <StatCard 
          title="Growth Rate" 
          value="23%"
          icon={TrendingUp}
          trend="5.2%"
          trendUp={true}
          delay={0.3}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <ActivityCard activities={activities} />

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
        >
          <h3 className="font-playfair text-xl font-bold text-slate-800 mb-6">Performance Overview</h3>
          
          <div className="space-y-6">
            {/* Revenue Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter text-slate-500 text-sm">Monthly Goal</span>
                <span className="font-inter font-semibold text-slate-800 text-sm">₹1.24L / ₹1.5L</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "83%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Category Distribution */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-inter font-semibold text-slate-800 mb-3">Top Categories</h4>
              <div className="space-y-2">
                {[
                  { name: "Furniture", percent: 40, color: "bg-blue-500" },
                  { name: "Electronics", percent: 30, color: "bg-purple-500" },
                  { name: "Utensils", percent: 20, color: "bg-green-500" },
                  { name: "Books", percent: 10, color: "bg-pink-500" },
                ].map((cat, i) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${cat.color}`} />
                      <span className="font-inter text-sm text-slate-600">{cat.name}</span>
                    </div>
                    <span className="font-inter text-sm font-semibold text-slate-800">{cat.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-playfair text-xl font-bold text-slate-800">Recent Orders</h3>
          <a href="/Orders" className="font-inter text-[#B45309] font-medium hover:underline">View All →</a>
        </div>
        
        <div className="space-y-4">
          {[
            { id: "#ORD-101", product: "Study Table & Chair", customer: "Rahul", amount: 2000, status: "Active" },
            { id: "#ORD-102", product: "Harry Potter Book Set", customer: "Sneha", amount: 300, status: "Pending" },
          ].map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <span className="font-inter font-semibold text-blue-600">{order.id}</span>
                <span className="font-inter text-gray-600">{order.product}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-inter text-slate-800">{order.customer}</span>
                <span className="font-inter font-semibold">₹{order.amount.toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-inter ${
                  order.status === "Active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
