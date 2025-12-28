import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, Edit2, Trash2, Eye } from "lucide-react";

const statusColors = {
  Available: "bg-green-100 text-green-700 border-green-200",
  Rented: "bg-orange-100 text-orange-700 border-orange-200",
  Maintenance: "bg-red-100 text-red-700 border-red-200"
};

const categoryImages = {
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop",
  Electronics: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=500&fit=crop",
  Books: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=500&fit=crop",
  Utensils: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop"
};

export default function ProductCard({ product, index, onEdit, onDelete, onView }) {
  const imageUrl = product.image_url || categoryImages[product.category] || categoryImages.Furniture;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-indigo-500/10 hover:shadow-2xl hover:shadow-purple-200/70 transition-all duration-500 group"
    >
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className={`absolute top-4 right-4 ${statusColors[product.status]} border font-inter`}>
          {product.status}
        </Badge>
        
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onView?.(product); }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit?.(product); }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-purple-50 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-purple-600" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete?.(product); }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <span className="font-inter text-sm text-blue-600 font-medium">{product.category}</span>
        <h3 className="font-playfair text-lg font-bold text-slate-800 mt-1 mb-3 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-inter text-sm text-slate-500 mb-3 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-1">
          <IndianRupee className="w-5 h-5 text-slate-800" />
          <span className="font-playfair text-2xl font-bold text-slate-800">{product.daily_rent}</span>
          <span className="font-inter text-slate-500">/day</span>
        </div>
      </div>
    </motion.div>
  );
}
