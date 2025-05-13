'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // This would eventually send to an API
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: '',
      });
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-dark">Contact</h1>
          <p className="text-lg text-neutral-medium">
            Have a question, feedback, or just want to say hello? Get in touch using the form below.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="card">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <svg 
                    className="mx-auto h-16 w-16 text-green-500 mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h2 className="text-2xl font-semibold mb-2 text-neutral-dark">Message Sent!</h2>
                  <p className="mb-6">Thank you for your message. I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Send a Message</h2>
                  
                  {error && (
                    <div className="mb-6 p-3 bg-red-50 text-accent-red rounded-md">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-neutral-dark font-medium mb-2">
                        Name <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-neutral-dark font-medium mb-2">
                        Email <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-neutral-dark font-medium mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="support">Project Support</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-neutral-dark font-medium mb-2">
                        Message <span className="text-accent-red">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      ></textarea>
                    </div>
                    
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-primary py-3 px-8 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4 text-neutral-dark">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-neutral-dark">Email</h3>
                    <a href="mailto:contact@example.com" className="text-primary-blue hover:underline">
                      contact@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4 text-neutral-dark">Connect</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-3 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <h3 className="font-medium text-neutral-dark">GitHub</h3>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                      github.com/username
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-3 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v19.056c0 1.368-1.104 2.472-2.46 2.472h-15.080c-1.356 0-2.46-1.104-2.46-2.472v-19.056c0-1.368 1.104-2.472 2.46-2.472h15.080zm-5.54 5.616h-4v1.92h1.484v6.336h-1.432v1.92h4v-1.92h-1.536v-8.256h1.484v-1.92zm-3.052-2.448c.936 0 1.692-.768 1.692-1.68s-.756-1.68-1.692-1.68-1.692.756-1.692 1.68.756 1.68 1.692 1.68z"/>
                  </svg>
                  <div>
                    <h3 className="font-medium text-neutral-dark">LinkedIn</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                      linkedin.com/in/username
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-3 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.052 10.052 0 01-3.126 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.927 4.927 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.939 4.939 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                  </svg>
                  <div>
                    <h3 className="font-medium text-neutral-dark">Twitter</h3>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                      @username
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-neutral-dark">Response Time</h2>
              <p>
                I typically respond to all inquiries within 1-2 business days. For urgent matters,
                please indicate this in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
