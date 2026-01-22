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
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-space-grotesk"
          >
            Get in <span className="text-zinc-400">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-600 leading-relaxed"
          >
            Have a question or want to discuss a bulk order? Our team is here to help you with precision components.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-space-grotesk">Our Location</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Industrial Area, Phase II,<br />
                    New Delhi, India - 110020
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-space-grotesk">Phone & WhatsApp</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    +91 98765 43210<br />
                    +91 11 2345 6789
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-space-grotesk">Email Us</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    info@srindustries.com<br />
                    sales@srindustries.com
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                className="inline-flex items-center space-x-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl font-bold transition-all"
              >
                <MessageSquare size={20} />
                <span>Chat with us on WhatsApp</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-50 border border-zinc-100 p-8 md:p-12 rounded-[2.5rem]"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-space-grotesk">Message Sent!</h3>
                <p className="text-zinc-600 mb-8">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-zinc-900 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Inquiry</span>
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
