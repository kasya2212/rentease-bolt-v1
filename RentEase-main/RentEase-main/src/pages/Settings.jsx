import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bell, Shield, User, ChevronRight, Save, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Settings() {
  const [deliveryRadius, setDeliveryRadius] = useState([5]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Rajiv Mehta",
    email: "rajiv@rentease.in",
    phone: "+91 98765 43210",
    businessName: "Mehta Rentals"
  });
  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    promotions: false,
    updates: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaveSuccess(true);
    setIsSaving(false);
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          <h3 className="font-playfair text-xl font-bold text-[#111827]">Profile Settings</h3>
        </div>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            RM
          </div>
          <div>
            <h4 className="font-playfair text-2xl font-bold text-[#111827]">Rajiv Mehta</h4>
            <p className="font-inter text-gray-500">Vendor since 2023</p>
            <button className="font-inter text-blue-600 text-sm font-medium mt-2 hover:underline">
              Change Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-inter text-sm font-medium text-gray-600 mb-2 block">Full Name</label>
            <Input 
              value={profileData.fullName} 
              onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
              className="py-6 font-inter border-2 rounded-xl focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="font-inter text-sm font-medium text-gray-600 mb-2 block">Email</label>
            <Input 
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              className="py-6 font-inter border-2 rounded-xl focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="font-inter text-sm font-medium text-gray-600 mb-2 block">Phone</label>
            <Input 
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              className="py-6 font-inter border-2 rounded-xl focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="font-inter text-sm font-medium text-gray-600 mb-2 block">Business Name</label>
            <Input 
              value={profileData.businessName}
              onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
              className="py-6 font-inter border-2 rounded-xl focus:border-blue-500" 
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h3 className="font-playfair text-xl font-bold text-[#111827]">Location & Delivery</h3>
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-6 h-80 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.174619534405!2d73.9086208!3d18.5362493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Vendor Location Map"
          ></iframe>
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-inter font-medium text-slate-800">Koregaon Park, Pune</span>
            </div>
            <button 
              onClick={() => {
                const newLocation = prompt("Enter new location (e.g., Viman Nagar, Pune):");
                if (newLocation) {
                  alert(`Location will be updated to: ${newLocation}`);
                }
              }}
              className="font-inter text-sm text-blue-600 font-medium hover:underline px-4 py-2 bg-blue-50 rounded-lg"
            >
              Change Location
            </button>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="font-inter font-medium text-[#111827]">Delivery Radius</span>
            <span className="font-playfair text-2xl font-bold text-blue-600">{deliveryRadius[0]} km</span>
          </div>
          <Slider
            value={deliveryRadius}
            onValueChange={setDeliveryRadius}
            max={20}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span className="font-inter text-sm text-gray-400">1 km</span>
            <span className="font-inter text-sm text-gray-400">20 km</span>
          </div>
          <p className="font-inter text-sm text-gray-600 mt-4">
            Your products will be available for delivery within {deliveryRadius[0]} km radius from your location.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600" />
          <h3 className="font-playfair text-xl font-bold text-[#111827]">Notifications</h3>
        </div>

        <div className="space-y-4">
          {[
            { key: "orders", label: "Order Updates", desc: "Get notified when you receive new orders" },
            { key: "messages", label: "Customer Messages", desc: "Receive notifications for new messages" },
            { key: "promotions", label: "Promotions", desc: "Updates about promotional opportunities" },
            { key: "updates", label: "App Updates", desc: "Important updates about RentEase" },
          ].map((item) => (
            <div 
              key={item.key} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
            >
              <div>
                <p className="font-inter font-medium text-[#111827]">{item.label}</p>
                <p className="font-inter text-sm text-gray-500">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-500/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="font-playfair text-xl font-bold text-[#111827]">Security</h3>
        </div>

        <div className="space-y-4">
          {[
            { label: "Change Password", desc: "Update your account password" },
            { label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
            { label: "Login History", desc: "View recent login activity" },
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => alert(`${item.label} feature coming soon!`)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all text-left"
            >
              <div>
                <p className="font-inter font-medium text-[#111827]">{item.label}</p>
                <p className="font-inter text-sm text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button 
          onClick={handleSave}
          disabled={isSaving || saveSuccess}
          className={`w-full py-6 font-inter font-semibold text-lg rounded-2xl shadow-lg transition-all duration-300 ${
            saveSuccess 
              ? 'bg-green-500 hover:bg-green-500' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          } text-white`}
        >
          {saveSuccess ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Settings Saved Successfully!
            </>
          ) : isSaving ? (
            <>
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
