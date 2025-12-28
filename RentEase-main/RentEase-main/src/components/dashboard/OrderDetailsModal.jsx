import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, IndianRupee, User, Package, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";

const statusColors = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Completed: "bg-blue-50 text-blue-700 border-blue-200"
};

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(order?.status || "");
  const queryClient = useQueryClient();

  if (!order) return null;

  const handleStatusUpdate = async () => {
    try {
      await base44.entities.Order.update(order.id, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setEditingStatus(false);
      onClose();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <h2 className="font-playfair text-3xl font-bold mb-2">Order Details</h2>
              <p className="font-inter text-blue-100">{order.order_id}</p>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-inter text-sm text-gray-500">Product</p>
                    <p className="font-inter font-semibold text-lg">{order.product_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-inter text-sm text-gray-500">Amount</p>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-5 h-5" />
                    <span className="font-playfair text-2xl font-bold">{order.amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {order.customer_name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-inter text-sm text-gray-500">Customer</p>
                    <p className="font-inter font-semibold text-lg">{order.customer_name}</p>
                  </div>
                  <User className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-inter text-sm text-gray-600">Location</span>
                    </div>
                    <p className="font-inter font-medium">Pune, Maharashtra</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="font-inter text-sm text-gray-600">Order Date</span>
                    </div>
                    <p className="font-inter font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="font-inter font-semibold text-gray-700 mb-3 block">Order Status</label>
                {editingStatus ? (
                  <div className="flex gap-3">
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="flex-1 py-6 font-inter border-2 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleStatusUpdate}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingStatus(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <Badge className={`${statusColors[order.status]} border font-inter text-base px-4 py-2`}>
                      {order.status}
                    </Badge>
                    <Button
                      onClick={() => { setEditingStatus(true); setNewStatus(order.status); }}
                      variant="outline"
                      className="font-inter"
                    >
                      Change Status
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-inter font-semibold py-6 rounded-2xl shadow-lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
