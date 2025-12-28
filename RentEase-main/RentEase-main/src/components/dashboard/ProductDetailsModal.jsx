import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, IndianRupee, Package, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusColors = {
  Available: "bg-green-50 text-green-700 border-green-200",
  Rented: "bg-blue-50 text-blue-700 border-blue-200",
  Maintenance: "bg-orange-50 text-orange-700 border-orange-200"
};

const categoryImages = {
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
  Electronics: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
  Books: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",
  Utensils: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
};

export default function ProductDetailsModal({ product, isOpen, onClose, onEdit }) {
  if (!product) return null;

  const imageUrl = product.image_url || categoryImages[product.category] || categoryImages.Furniture;

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img 
                src={imageUrl}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <Badge className={`absolute top-4 left-4 ${statusColors[product.status]} border font-inter`}>
                {product.status}
              </Badge>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-playfair text-3xl font-bold text-white mb-2">{product.name}</h2>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    <span className="font-inter">{product.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    <span className="font-playfair text-2xl font-bold">₹{product.daily_rent}/day</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">Description</h3>
                  <p className="font-inter text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="font-inter text-sm text-gray-600">Category</span>
                  </div>
                  <p className="font-inter font-semibold text-gray-900">{product.category}</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-inter text-sm text-gray-600">Status</span>
                  </div>
                  <p className="font-inter font-semibold text-gray-900">{product.status}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => { onEdit(product); onClose(); }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-inter font-semibold py-6 rounded-2xl shadow-lg"
                >
                  Edit Product
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 font-inter font-semibold py-6 rounded-2xl border-2"
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
