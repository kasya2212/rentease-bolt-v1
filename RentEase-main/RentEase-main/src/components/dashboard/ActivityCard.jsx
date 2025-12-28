import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, Package, Truck } from "lucide-react";

const icons = {
  delivered: Truck,
  pending: Clock,
  completed: CheckCircle2,
  active: Package
};

export default function ActivityCard({ activities }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50"
    >
      <h3 className="font-playfair text-xl font-bold text-[#111827] mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = icons[activity.type] || Package;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-300"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-inter text-[#111827] font-medium">{activity.message}</p>
                <p className="font-inter text-gray-500 text-sm">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
