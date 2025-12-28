import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calendar, IndianRupee } from "lucide-react";

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 48000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 61000 },
  { month: 'Jul', revenue: 68000 },
  { month: 'Aug', revenue: 72000 },
  { month: 'Sep', revenue: 78000 },
  { month: 'Oct', revenue: 85000 },
  { month: 'Nov', revenue: 92000 },
  { month: 'Dec', revenue: 98000 },
];

const categoryData = [
  { name: 'Furniture', value: 40, color: '#3B82F6' },
  { name: 'Electronics', value: 30, color: '#8B5CF6' },
  { name: 'Utensils', value: 20, color: '#EC4899' },
  { name: 'Books', value: 10, color: '#14B8A6' },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Total Revenue", value: "₹98,000", change: "+16%", icon: IndianRupee },
          { title: "Orders This Month", value: "47", change: "+12%", icon: Calendar },
          { title: "Growth Rate", value: "16%", change: "+6%", icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-inter text-slate-500 text-sm">{stat.title}</p>
                <p className="font-playfair text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <span className="font-inter text-sm text-green-600 font-medium">{stat.change} from last month</span>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
        >
          <h3 className="font-playfair text-xl font-bold text-slate-800 mb-6">Revenue Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Inter' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Inter' }}
                  tickFormatter={(value) => `₹${(value/1000)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: 'none', 
                    borderRadius: '16px', 
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter'
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
        >
          <h3 className="font-playfair text-xl font-bold text-slate-800 mb-6">Category Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter'
                  }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 mt-6">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-inter text-sm text-slate-600">{cat.name}</span>
                </div>
                <span className="font-inter text-sm font-semibold text-slate-800">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <h3 className="font-playfair text-xl font-bold text-slate-800 mb-6">Monthly Highlights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Best Day", value: "Tuesday", sub: "42% of orders" },
            { label: "Top Product", value: "Smart TV", sub: "₹32,400 revenue" },
            { label: "Return Rate", value: "1.8%", sub: "Below industry avg" },
            { label: "Avg. Order Value", value: "₹1,850", sub: "↑ 16% from last month" },
          ].map((item, i) => (
            <div key={item.label} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <p className="font-inter text-sm text-slate-500">{item.label}</p>
              <p className="font-playfair text-xl font-bold text-slate-800 mt-1">{item.value}</p>
              <p className="font-inter text-xs text-slate-400 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
