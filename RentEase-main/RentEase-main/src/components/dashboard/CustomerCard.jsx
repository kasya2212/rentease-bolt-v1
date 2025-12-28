import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, History } from "lucide-react";

export default function CustomerCard({ customer, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500"
    >
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B45309] to-amber-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {customer.name?.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div className="flex-1">
          <h3 className="font-playfair text-xl font-bold text-[#111827]">{customer.name}</h3>
          
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="font-inter text-sm">{customer.location}</span>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            {/* Trust Score */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-[#B45309] fill-[#B45309]" />
                <span className="font-inter font-semibold text-[#B45309]">{customer.trust_score}/100</span>
              </div>
              <span className="font-inter text-sm text-gray-500">Trust Score</span>
            </div>
          </div>
          
          {/* Rental History */}
          <div className="mt-4 flex items-start gap-2">
            <History className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <span className="font-inter text-sm text-gray-500">History: </span>
              <span className="font-inter text-sm text-[#111827]">{customer.rental_history}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
