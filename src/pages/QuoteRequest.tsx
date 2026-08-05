import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, CheckCircle2, User, MapPin, Building2, AlignLeft, ShieldCheck, BadgeCheck, Lock, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase_config';

export const QuoteRequest = () => {
  const { items, clearQuote } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    projectType: 'Home',
    preferredContact: 'Phone',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(2); // 1: Products, 2: Details, 3: Review, 4: Submitted

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your quote list is empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const dateString = now.toISOString().split('T')[0].replace(/-/g, '');
      const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
      const referenceNumber = `QT-${dateString}-${randomStr}`;

      const quoteData = {
        referenceNumber,
        createdAt: serverTimestamp(),
        status: 'pending',
        customer: formData,
        items: items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          brand: item.brand,
          selectedVariant: item.selectedVariant || null,
          selectedSize: item.selectedSize || null,
          selectedColor: item.selectedColor || null,
          quantity: item.quantity
        }))
      };

      await addDoc(collection(db, 'quoteRequests'), quoteData);
      
      clearQuote();
      setSuccessReference(referenceNumber);
      setActiveStep(4);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successReference) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-24 pb-20 flex items-center justify-center px-4">
        <Helmet>
          <title>Request Submitted | Abhishek Ply & Hardware</title>
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-zinc-100 p-8 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-8 h-8" />
          </motion.div>
          
          <h2 className="text-xl font-serif font-bold text-zinc-900 mb-2">Request Submitted</h2>
          <p className="text-zinc-500 font-inter text-sm mb-6 leading-relaxed">
            Thank you for your inquiry. Our team will prepare a customized quotation and contact you shortly.
          </p>
          
          <div className="bg-zinc-50 rounded-xl p-4 mb-8 border border-zinc-100">
            <p className="text-[10px] text-zinc-500 font-outfit uppercase tracking-widest mb-1">Reference Number</p>
            <p className="font-mono text-base font-bold text-zinc-900">{successReference}</p>
          </div>
          
          <Link 
            to="/products"
            className="block w-full py-3 bg-zinc-900 text-white rounded-xl font-outfit text-sm font-medium hover:bg-amber-600 hover:text-zinc-900 transition-colors shadow-sm"
          >
            Continue Browsing
          </Link>
        </motion.div>
      </div>
    );
  }

  const InputField = ({ label, required, ...props }: any) => (
    <div className="mb-3">
      <label className="block text-[11px] font-outfit font-medium text-zinc-600 mb-1.5 uppercase tracking-wider">{label} {required && <span className="text-amber-500">*</span>}</label>
      <input 
        required={required}
        className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm font-inter placeholder:text-zinc-300 bg-zinc-50/50 focus:bg-white"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <Helmet>
        <title>Request Quotation | Abhishek Ply & Hardware</title>
      </Helmet>

      {/* Progress Indicator */}
      <div className="bg-zinc-50/50 border-b border-zinc-100 py-3">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 flex items-center justify-center sm:justify-start text-xs font-outfit gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
          <Link to="/products" className="flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Products
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-300" />
          <div className="flex items-center text-zinc-900 font-medium">
            <span className="w-4 h-4 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] mr-1.5">2</span> Details
          </div>
          <ChevronRight className="w-3 h-3 text-zinc-300" />
          <div className="flex items-center text-zinc-400">
            <span className="w-4 h-4 rounded-full border border-zinc-300 flex items-center justify-center text-[10px] mr-1.5">3</span> Review
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-6 mt-6 md:mt-10">
        
        {/* Page Header */}
        <div className="mb-6 md:mb-8 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] uppercase tracking-wider font-outfit font-medium mb-3 border border-amber-100">
            <FileText className="w-3 h-3" /> Request a Quotation
          </div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 mb-2 tracking-tight">
            Fill in your details and we'll prepare a customized quotation.
          </h1>
          <p className="text-[13px] text-zinc-500 font-inter leading-relaxed">
            Please provide accurate contact information so our sales team can reach out with the best possible pricing for your project requirements.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Form Section */}
          <div className="flex-1 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              
              {/* Contact Info */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-zinc-100 p-5 md:p-6 transition-transform"
              >
                <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-100 pb-4">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-[15px] font-serif font-bold text-zinc-900">Contact Details</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  <InputField label="Full Name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                  <InputField label="Company Name" name="company" value={formData.company} onChange={handleChange} placeholder="Optional" />
                  <InputField label="Mobile Number" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+91" />
                  <InputField label="WhatsApp Number" name="whatsapp" type="tel" required value={formData.whatsapp} onChange={handleChange} placeholder="+91" />
                  <div className="sm:col-span-2">
                    <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com (Optional)" />
                  </div>
                </div>
              </motion.div>

              {/* Address Info */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-zinc-100 p-5 md:p-6 transition-transform"
              >
                <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-100 pb-4">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-[15px] font-serif font-bold text-zinc-900">Delivery Address</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  <div className="sm:col-span-2">
                    <InputField label="Street Address" name="address" required value={formData.address} onChange={handleChange} placeholder="123 Main St, Area" />
                  </div>
                  <InputField label="City" name="city" required value={formData.city} onChange={handleChange} placeholder="Your City" />
                  <InputField label="State" name="state" required value={formData.state} onChange={handleChange} placeholder="Your State" />
                  <InputField label="Pincode" name="pincode" required value={formData.pincode} onChange={handleChange} placeholder="6 Digits" />
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-zinc-100 p-5 md:p-6 transition-transform"
              >
                <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-100 pb-4">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-[15px] font-serif font-bold text-zinc-900">Project Information</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <label className="block text-[11px] font-outfit font-medium text-zinc-600 mb-1.5 uppercase tracking-wider">Project Type <span className="text-amber-500">*</span></label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm font-inter bg-zinc-50/50 focus:bg-white text-zinc-700">
                      <option value="Home">Home / Residential</option>
                      <option value="Office">Office</option>
                      <option value="Hotel">Hotel / Hospitality</option>
                      <option value="Shop">Shop / Retail</option>
                      <option value="Commercial">Commercial Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-outfit font-medium text-zinc-600 mb-1.5 uppercase tracking-wider">Preferred Contact Method <span className="text-amber-500">*</span></label>
                    <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm font-inter bg-zinc-50/50 focus:bg-white text-zinc-700">
                      <option value="Phone">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Additional Notes */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-zinc-100 p-5 md:p-6 transition-transform"
              >
                <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-100 pb-4">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                    <AlignLeft className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-[15px] font-serif font-bold text-zinc-900">Additional Notes</h3>
                </div>
                
                <div>
                  <textarea 
                    name="notes" 
                    rows={3} 
                    value={formData.notes} 
                    onChange={handleChange} 
                    placeholder="Any specific requirements, dimensions, or deadlines?" 
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm font-inter placeholder:text-zinc-300 bg-zinc-50/50 focus:bg-white resize-none"
                  ></textarea>
                </div>
              </motion.div>

              {/* Submit Section */}
              <div className="pt-2 sticky bottom-4 z-20 bg-white/90 backdrop-blur-md p-4 -mx-4 sm:mx-0 rounded-2xl border border-zinc-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:shadow-none sm:border-none sm:bg-transparent sm:backdrop-blur-none sm:p-0 flex flex-col sm:flex-row items-center gap-3">
                <button 
                  type="submit" 
                  disabled={isSubmitting || items.length === 0}
                  className="w-full sm:w-auto flex-1 py-3 px-8 bg-zinc-900 text-white rounded-xl font-outfit font-medium text-sm hover:bg-amber-600 hover:text-zinc-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-zinc-900/20 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
                <Link 
                  to="/products"
                  className="w-full sm:w-auto py-3 px-8 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-outfit font-medium text-sm hover:bg-zinc-50 hover:border-zinc-300 transition-colors text-center"
                >
                  Back to Products
                </Link>
              </div>
              <p className="text-center sm:text-left text-[11px] text-zinc-500 font-inter px-2">
                We usually respond within one business day.
              </p>

            </form>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 order-1 lg:order-2">
            <div className="sticky top-24 space-y-4">
              
              {/* Quote Summary */}
              <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-zinc-100 p-4 md:p-5">
                <h3 className="text-xs font-serif font-bold text-zinc-900 mb-3 uppercase tracking-wider border-b border-zinc-100 pb-3">
                  Quote Summary
                </h3>
                
                <div className="divide-y divide-zinc-50 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {items.map((item, idx) => (
                    <div key={`${item.productId}-${idx}`} className="py-2.5 flex gap-3">
                      <div className="w-12 h-12 bg-zinc-50 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                        <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[12px] font-medium text-zinc-900 truncate" title={item.productName}>{item.productName}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{item.brand}</p>
                        <div className="flex justify-between items-center mt-1">
                          {item.selectedVariant && <span className="text-[10px] text-zinc-500 truncate max-w-[80px]">{item.selectedVariant}</span>}
                          {!item.selectedVariant && <span></span>}
                          <span className="text-[10px] font-outfit font-medium text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-[11px] text-zinc-500 py-4 text-center">Your quote list is empty</div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                   <span className="text-[11px] text-zinc-500 font-inter">Estimated Response</span>
                   <span className="text-[10px] font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">Within 24 Hours</span>
                </div>
              </div>

              {/* Trust Panel */}
              <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-zinc-100 p-4 md:p-5">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2.5 text-[11px] font-inter text-zinc-700">
                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <BadgeCheck className="w-3 h-3" />
                    </div>
                    <span>Genuine Products</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[11px] font-inter text-zinc-700">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                    <span>Trusted Brands</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[11px] font-inter text-zinc-700">
                    <div className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <Lock className="w-3 h-3" />
                    </div>
                    <span>Secure Information</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[11px] font-inter text-zinc-700">
                    <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <CreditCard className="w-3 h-3" />
                    </div>
                    <span>No Advance Payment</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[11px] font-inter text-zinc-700">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <FileText className="w-3 h-3" />
                    </div>
                    <span>Free Quotation</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
