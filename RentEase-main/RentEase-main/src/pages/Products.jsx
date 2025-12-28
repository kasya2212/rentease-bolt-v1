import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "../components/dashboard/ProductCard";
import ProductDetailsModal from "../components/dashboard/ProductDetailsModal";

// HARDCODED DEMO DATA - 12 products
const DEMO_PRODUCTS = [
  { id: 1, name: "Luxury Teak Wood 3-Seater Sofa", category: "Furniture", daily_rent: 450, status: "Available", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop&q=80", description: "Premium teak wood sofa with elegant cushions" },
  { id: 3, name: "DJI Mavic Air 2 Drone", category: "Electronics", daily_rent: 1200, status: "Available", image_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=500&fit=crop&q=80", description: "4K drone with 34-min flight time" },
  { id: 4, name: "Vintage Oak Bookshelf", category: "Furniture", daily_rent: 320, status: "Available", image_url: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=500&fit=crop&q=80", description: "5-tier solid oak bookshelf" },
  { id: 5, name: "Complete Harry Potter Collection", category: "Books", daily_rent: 80, status: "Rented", image_url: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600&h=500&fit=crop&q=80", description: "All 7 books in hardcover" },
  { id: 6, name: "Professional Mixer Grinder", category: "Electronics", daily_rent: 150, status: "Available", image_url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=500&fit=crop&q=80", description: "750W motor with 3 jars" },
  { id: 7, name: "Stainless Steel Cookware Set", category: "Utensils", daily_rent: 200, status: "Available", image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop&q=80", description: "12-piece premium cookware" },
  { id: 8, name: "Sony PlayStation 5 Gaming Console", category: "Electronics", daily_rent: 950, status: "Rented", image_url: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=500&fit=crop&q=80", description: "Latest gen console with 2 controllers" },
  { id: 9, name: "Modern King Size Bed Frame", category: "Furniture", daily_rent: 600, status: "Available", image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=500&fit=crop&q=80", description: "Solid wood with storage" },
  { id: 10, name: "Management & Finance Books Bundle", category: "Books", daily_rent: 100, status: "Available", image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=500&fit=crop&q=80", description: "10 bestselling business books" },
  { id: 11, name: "Premium Dinner Set - 36 Pieces", category: "Utensils", daily_rent: 180, status: "Maintenance", image_url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=500&fit=crop&q=80", description: "Bone china dinner set for 6" },
  { id: 12, name: "Ergonomic Office Chair", category: "Furniture", daily_rent: 280, status: "Available", image_url: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=500&fit=crop&q=80", description: "Mesh back with lumbar support" }
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Use hardcoded demo data
  const products = DEMO_PRODUCTS;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  const handleDelete = (product) => {
    alert(`Delete functionality disabled in demo mode`);
  };

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
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 py-6 font-inter border-2 rounded-xl focus:border-blue-500"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full lg:w-48 py-6 font-inter border-2 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Utensils">Utensils</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-48 py-6 font-inter border-2 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Rented">Rented</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <p className="font-inter text-slate-500">
          Showing <span className="font-semibold text-slate-800">{filteredProducts.length}</span> products
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onView={handleView}
              onEdit={handleView}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-16 text-center shadow-xl shadow-gray-100/50"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-2">No products found</h3>
          <p className="font-inter text-slate-500">Try adjusting your search or filters</p>
        </motion.div>
      )}

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={(product) => {
          setIsDetailsOpen(false);
        }}
      />
    </div>
  );
}
