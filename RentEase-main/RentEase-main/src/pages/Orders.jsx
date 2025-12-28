import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrderRow from "../components/dashboard/OrderRow";
import OrderDetailsModal from "../components/dashboard/OrderDetailsModal";

// HARDCODED DEMO DATA - 8 orders
const DEMO_ORDERS = [
  { id: 1, order_id: "ORD-2401", product_name: "Canon EOS 90D DSLR", customer_name: "Priya Sharma", amount: 850, status: "Active", rental_days: 3, pickup_date: "2024-01-15" },
  { id: 2, order_id: "ORD-2402", product_name: "DJI Mavic Air 2 Drone", customer_name: "Arjun Patel", amount: 1200, status: "Active", rental_days: 2, pickup_date: "2024-01-16" },
  { id: 3, order_id: "ORD-2403", product_name: "Luxury Teak Wood Sofa", customer_name: "Sneha Iyer", amount: 450, status: "Pending", rental_days: 7, pickup_date: "2024-01-18" },
  { id: 4, order_id: "ORD-2404", product_name: "PlayStation 5 Console", customer_name: "Rahul Desai", amount: 950, status: "Active", rental_days: 5, pickup_date: "2024-01-14" },
  { id: 5, order_id: "ORD-2405", product_name: "Harry Potter Collection", customer_name: "Ananya Singh", amount: 80, status: "Pending", rental_days: 10, pickup_date: "2024-01-20" },
  { id: 6, order_id: "ORD-2406", product_name: "King Size Bed Frame", customer_name: "Vikram Reddy", amount: 600, status: "Active", rental_days: 14, pickup_date: "2024-01-12" },
  { id: 7, order_id: "ORD-2407", product_name: "Professional Mixer", customer_name: "Meera Nair", amount: 150, status: "Pending", rental_days: 4, pickup_date: "2024-01-19" },
  { id: 8, order_id: "ORD-2408", product_name: "Stainless Cookware Set", customer_name: "Karthik Menon", amount: 200, status: "Active", rental_days: 6, pickup_date: "2024-01-13" }
];

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Use hardcoded demo data
  const orders = DEMO_ORDERS;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_id?.toLowerCase().includes(search.toLowerCase()) ||
      order.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search orders, products, or customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 py-6 font-inter border-2 rounded-xl focus:border-blue-500"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-48 py-6 font-inter border-2 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {filteredOrders.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg shadow-indigo-500/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                  <th className="text-left py-5 px-6 font-inter font-semibold text-gray-600">Order ID</th>
                  <th className="text-left py-5 px-6 font-inter font-semibold text-gray-600">Product</th>
                  <th className="text-left py-5 px-6 font-inter font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-5 px-6 font-inter font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-5 px-6 font-inter font-semibold text-gray-600">Status</th>
                  <th className="text-left py-5 px-6 font-inter font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <OrderRow 
                    key={order.id} 
                    order={order} 
                    index={index}
                    onView={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-16 text-center shadow-xl shadow-gray-100/50"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-2">No orders found</h3>
          <p className="font-inter text-slate-500">Try adjusting your search or filters</p>
        </motion.div>
      )}

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
}
