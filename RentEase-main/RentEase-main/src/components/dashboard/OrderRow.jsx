import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, MoreVertical, Eye, Edit2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors = {
  Active: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-orange-100 text-orange-700 border-orange-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200"
};

export default function OrderRow({ order, index, onView }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="border-b border-gray-100 hover:bg-amber-50/30 transition-colors duration-300"
    >
      <td className="py-5 px-6">
        <span className="font-inter font-semibold text-blue-600">{order.order_id}</span>
      </td>
      <td className="py-5 px-6">
        <span className="font-inter text-slate-800">{order.product_name}</span>
      </td>
      <td className="py-5 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-semibold text-white">
            {order.customer_name?.charAt(0)}
          </div>
          <span className="font-inter text-slate-800">{order.customer_name}</span>
        </div>
      </td>
      <td className="py-5 px-6">
        <div className="flex items-center gap-1">
          <IndianRupee className="w-4 h-4 text-slate-800" />
          <span className="font-inter font-semibold text-slate-800">{order.amount?.toLocaleString()}</span>
        </div>
      </td>
      <td className="py-5 px-6">
        <Badge className={`${statusColors[order.status]} border font-inter`}>
          {order.status}
        </Badge>
      </td>
      <td className="py-5 px-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(order)} className="font-inter gap-2 cursor-pointer">
              <Eye className="w-4 h-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onView?.(order)} className="font-inter gap-2 cursor-pointer">
              <Edit2 className="w-4 h-4" /> Edit Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </motion.tr>
  );
}
