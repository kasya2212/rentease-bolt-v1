import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Phone, Mail, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// HARDCODED DEMO DATA - 6 customers
const DEMO_CUSTOMERS = [
  { id: 1, name: "Priya Sharma", location: "Koregaon Park, Pune", trust_score: 92, rental_history: "12 successful rentals", avatar_initials: "PS" },
  { id: 2, name: "Arjun Patel", location: "Baner, Pune", trust_score: 88, rental_history: "8 successful rentals", avatar_initials: "AP" },
  { id: 3, name: "Sneha Iyer", location: "Viman Nagar, Pune", trust_score: 95, rental_history: "15 successful rentals", avatar_initials: "SI" },
  { id: 4, name: "Rahul Desai", location: "Hinjewadi, Pune", trust_score: 85, rental_history: "6 successful rentals", avatar_initials: "RD" },
  { id: 5, name: "Ananya Singh", location: "Kalyani Nagar, Pune", trust_score: 90, rental_history: "10 successful rentals", avatar_initials: "AS" },
  { id: 6, name: "Vikram Reddy", location: "Wakad, Pune", trust_score: 93, rental_history: "14 successful rentals", avatar_initials: "VR" }
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Use hardcoded demo data
  const customers = DEMO_CUSTOMERS;

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(search.toLowerCase()) ||
    customer.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search customers by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 py-6 font-inter border-2 rounded-xl focus:border-blue-500"
          />
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <p className="font-inter text-slate-500">
          <span className="font-semibold text-slate-800">{filteredCustomers.length}</span> customers
        </p>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-inter gap-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email All</span>
          </Button>
        </div>
      </div>

      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onClick={() => setSelectedCustomer(customer.id === selectedCustomer ? null : customer.id)}
              className={`bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10 hover:shadow-2xl hover:shadow-purple-200/60 transition-all duration-500 cursor-pointer ${
                selectedCustomer === customer.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {customer.name?.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1">
                 <h3 className="font-playfair text-xl font-bold text-slate-800">{customer.name}</h3>

                 <div className="flex items-center gap-2 mt-2 text-slate-500">
                   <span className="font-inter text-sm">{customer.location}</span>
                 </div>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full">
                        <span className="font-inter font-semibold text-blue-600">{customer.trust_score}/100</span>
                      </div>
                      <span className="font-inter text-sm text-gray-500">Trust Score</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="font-inter text-sm text-slate-500">History: </span>
                    <span className="font-inter text-sm text-slate-800">{customer.rental_history}</span>
                  </div>

                  {selectedCustomer === customer.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-gray-100 flex gap-3"
                    >
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2">
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button className="flex-1 bg-white border-2 gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-16 text-center shadow-xl shadow-gray-100/50"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-2">No customers found</h3>
          <p className="font-inter text-slate-500">Try adjusting your search</p>
        </motion.div>
      )}
    </div>
  );
}
