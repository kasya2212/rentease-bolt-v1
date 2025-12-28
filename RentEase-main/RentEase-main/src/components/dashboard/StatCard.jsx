import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, trend, trendUp, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
          <Icon className="w-7 h-7 text-blue-600" />
        </div>
        {trend && (
          <span className={`font-inter text-sm font-medium px-3 py-1.5 rounded-full ${
            trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <p className="font-inter text-slate-500 text-sm mb-2">{title}</p>
      <p className="font-playfair text-2xl font-bold text-slate-800 leading-tight break-all">{value}</p>
    </motion.div>
  );
}
