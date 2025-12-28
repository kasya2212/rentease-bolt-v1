import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Upload, IndianRupee, Package, Tag, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";

export default function AddProductDrawer({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    daily_rent: "",
    description: "",
    image_url: ""
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const queryClient = useQueryClient();

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setFormData({ ...formData, image_url: file_url });
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
        
        try {
          const { file_url } = await base44.integrations.Core.UploadFile({ file });
          setFormData({ ...formData, image_url: file_url });
        } catch (error) {
          console.error("Upload failed:", error);
        }
        
        stopCamera();
      }, 'image/jpeg', 0.9);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.daily_rent) return;
    
    setIsSubmitting(true);
    try {
      await base44.entities.Product.create({
        ...formData,
        daily_rent: parseFloat(formData.daily_rent),
        status: "Available"
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setFormData({ name: "", category: "", daily_rent: "", description: "", image_url: "" });
      setPreviewImage(null);
      onClose();
    } catch (error) {
      console.error("Failed to create product:", error);
    } finally {
      setIsSubmitting(false);
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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-[#111827]">List New Item</h2>
                  <p className="font-inter text-gray-500 mt-1">Add a product to your inventory</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="mb-8">
                <label className="font-inter font-semibold text-slate-800 mb-4 block">Visuals</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50/50">
                  {isCameraActive ? (
                    <div className="space-y-4">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline
                        className="w-full rounded-xl shadow-lg"
                      />
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={capturePhoto}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-inter gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          Capture Photo
                        </Button>
                        <Button
                          variant="outline"
                          onClick={stopCamera}
                          className="font-inter"
                        >
                          Cancel
                        </Button>
                      </div>
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  ) : previewImage ? (
                    <div className="relative">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-xl object-cover shadow-lg"
                      />
                      <button 
                        onClick={() => { setPreviewImage(null); setFormData({...formData, image_url: ""}); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="font-inter text-slate-500 mb-6">Upload your product image</p>
                      <div className="flex gap-4 justify-center">
                        <Button
                          variant="outline"
                          onClick={startCamera}
                          className="font-inter gap-2 border-2 hover:border-blue-500 hover:text-blue-600"
                        >
                          <Camera className="w-4 h-4" />
                          Take Picture
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="font-inter gap-2 border-2 hover:border-purple-500 hover:text-purple-600"
                        >
                          <Upload className="w-4 h-4" />
                          Upload from Gallery
                        </Button>
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="font-inter font-semibold text-slate-800 mb-2 block">Product Name</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="e.g., Teak Wood 3-Seater Sofa"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pl-12 py-6 font-inter text-lg border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-inter font-semibold text-slate-800 mb-2 block">Category</label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger className="py-6 font-inter text-lg border-2 focus:border-blue-500 rounded-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Utensils">Utensils</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-inter font-semibold text-slate-800 mb-2 block">Daily Rent (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="500"
                      value={formData.daily_rent}
                      onChange={(e) => setFormData({...formData, daily_rent: e.target.value})}
                      className="pl-12 py-6 font-inter text-2xl font-semibold border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-inter font-semibold text-slate-800 mb-2 block">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <Textarea
                      placeholder="Describe your product..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="pl-12 pt-4 font-inter border-2 focus:border-blue-500 rounded-xl min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.category || !formData.daily_rent || isSubmitting}
                className="w-full mt-8 py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-inter font-semibold text-lg rounded-2xl shadow-lg shadow-blue-200/50 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Listing..." : "List Product"}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
