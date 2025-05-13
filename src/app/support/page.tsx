'use client';

import { useState, useRef } from 'react';
import DonationForm from '@/components/payment/DonationForm';

export default function SupportPage() {
  const [donationAmount, setDonationAmount] = useState<number | string>(5);
  const [selectedProject, setSelectedProject] = useState('all');
  const [frequency, setFrequency] = useState('one-time');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const projectOptions = [
    { id: 'all', name: 'All Projects' },
    { id: 'pdf-made-simple', name: 'PDF Made Simple' },
    { id: 'developer-hub', name: 'Developer Hub' },
  ];
  
  const presetAmounts = [5, 10, 15, 25, 50];
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value === '' ? '' : parseFloat(e.target.value));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };
  
  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-dark">Support My Work</h1>
          <p className="text-lg text-neutral-medium max-w-2xl mx-auto">
            Your support helps me continue developing free, useful applications and tools.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Donation Form */}
          <div className="md:col-span-3">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Make a Donation</h2>
              
              {!showPaymentForm ? (
              <form onSubmit={handleSubmit}>
                {/* Project Selection */}
                <div className="mb-6">
                  <label htmlFor="project" className="block text-neutral-dark font-medium mb-2">
                    Select Project to Support
                  </label>
                  <select
                    id="project"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    {projectOptions.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-neutral-dark font-medium mb-2">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                    {presetAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-2 px-4 rounded-md border ${
                          donationAmount === amount
                            ? 'bg-blue-50 border-primary-blue text-primary-blue'
                            : 'border-neutral-light hover:bg-neutral-light hover:bg-opacity-50'
                        }`}
                        onClick={() => setDonationAmount(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="customAmount" className="block text-neutral-dark font-medium mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-medium">
                        $
                      </span>
                      <input
                        id="customAmount"
                        type="number"
                        min="1"
                        step="1"
                        value={donationAmount === '' ? '' : donationAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full rounded-md border-neutral-light py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Donation Frequency */}
                <div className="mb-6">
                  <label className="block text-neutral-dark font-medium mb-2">
                    Donation Frequency
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value="one-time"
                        checked={frequency === 'one-time'}
                        onChange={() => setFrequency('one-time')}
                        className="form-radio text-primary-blue"
                      />
                      <span className="ml-2">One-time</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value="monthly"
                        checked={frequency === 'monthly'}
                        onChange={() => setFrequency('monthly')}
                        className="form-radio text-primary-blue"
                      />
                      <span className="ml-2">Monthly</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value="yearly"
                        checked={frequency === 'yearly'}
                        onChange={() => setFrequency('yearly')}
                        className="form-radio text-primary-blue"
                      />
                      <span className="ml-2">Yearly</span>
                    </label>
                  </div>
                </div>
                
                {/* Personal Info (Optional) */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-neutral-dark">Personal Information (Optional)</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-neutral-medium mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Your name (optional)"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-neutral-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border-neutral-light py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Your email (optional)"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn-primary py-3 px-8">
                    Donate ${donationAmount} {frequency !== 'one-time' && `/ ${frequency}`}
                  </button>
                </div>
              </form>
              ) : (
                <div>
                  <button 
                    onClick={() => setShowPaymentForm(false)}
                    className="mb-6 flex items-center text-primary-blue hover:text-blue-700"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to donation details
                  </button>
                  
                  <DonationForm 
                    selectedProject={selectedProject}
                    donationAmount={donationAmount}
                    frequency={frequency}
                    name={name}
                    email={email}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar Info */}
          <div className="md:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4 text-neutral-dark">Why Support?</h2>
              <p className="mb-4">
                Your support helps fund the continued development and maintenance of these projects.
                All projects are created independently and made available for free.
              </p>
              <p>
                By supporting this work, you're helping cover costs for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Server and infrastructure</li>
                <li>Development time</li>
                <li>New features and improvements</li>
                <li>Bug fixes and maintenance</li>
              </ul>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-neutral-dark">Other Ways to Support</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Provide feedback and suggestions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Report bugs and issues</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Share the projects with others</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Star the projects on GitHub</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                Is this a one-time or recurring donation?
              </h3>
              <p>
                You can choose between a one-time donation or recurring monthly/yearly support.
                Recurring donations are especially helpful for long-term development.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                How will my donation be used?
              </h3>
              <p>
                Donations directly support the development and maintenance of the projects on this site.
                This includes hosting costs, development time, and resources for creating new features.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                Will the projects remain free after donating?
              </h3>
              <p>
                Yes! All projects will remain free for everyone. Your donation helps ensure that
                these tools can remain available without requiring payment from users.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                Can I get a receipt for my donation?
              </h3>
              <p>
                Yes, if you provide your email address, you'll receive a receipt for your donation.
                Please note that donations are not tax-deductible.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
