'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', phone: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <span>Contact SR Industries</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-5 text-zinc-900"
          >
            Get in <span className="text-zinc-400">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-zinc-500 leading-relaxed"
          >
            Have a question or want to discuss a bulk order? Our manufacturing team is ready to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-zinc-200">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-900">Registered Factory</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    Plot No. 9, Gali No. 11,<br />
                    Saroorpur Industrial Area, Ballabhgarh,<br />
                    Faridabad, Haryana – 121004, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-zinc-200">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-900">Phone & WhatsApp</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    <a href="tel:+919873741552" className="hover:text-zinc-900 transition-colors underline">Main Inquiry: +91 9873741552</a><br />
                    <a href="https://wa.me/919873741552" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors underline">WhatsApp: 9873741552</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-zinc-200">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-900">Email Us</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    info@srindustries.co.in<br />
                    sales@srindustries.co.in
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="https://wa.me/919873741552"
                target="_blank"
                className="inline-flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 min-h-[52px] rounded-2xl font-semibold transition-all shadow-lg shadow-green-200"
              >
                <MessageSquare size={22} fill="white" />
                <span>Chat on WhatsApp</span>
              </Link>
              <Link
                href="tel:+919873741552"
                className="inline-flex items-center justify-center space-x-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-8 py-4 min-h-[52px] rounded-2xl font-semibold transition-all"
              >
                <Phone size={22} />
                <span>Call Directly</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-50 border border-zinc-100 p-8 md:p-12 rounded-[3rem]"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Inquiry Received</h3>
                <p className="text-zinc-500 mb-8 text-sm">
                  Thank you for reaching out. Our sales team will review your requirements and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-zinc-900 font-bold hover:underline underline-offset-4"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                    Bulk Requirements / Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="List the components and quantities you need..."
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-semibold text-base hover:bg-zinc-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 shadow-xl shadow-zinc-200"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
