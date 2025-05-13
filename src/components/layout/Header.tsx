'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                Developer Hub
              </Link>
            </div>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/projects" className="text-neutral-medium hover:text-primary-blue">
              Projects
            </Link>
            <Link href="/about" className="text-neutral-medium hover:text-primary-blue">
              About
            </Link>
            <Link href="/support" className="text-neutral-medium hover:text-primary-blue">
              Support
            </Link>
            <Link href="/contact" className="text-neutral-medium hover:text-primary-blue">
              Contact
            </Link>
            <Link href="/support" className="btn-primary">
              Support My Work
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-medium hover:text-primary-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link 
              href="/projects" 
              className="block px-3 py-2 rounded-md text-neutral-medium hover:text-primary-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md text-neutral-medium hover:text-primary-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/support" 
              className="block px-3 py-2 rounded-md text-neutral-medium hover:text-primary-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-neutral-medium hover:text-primary-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/support" 
              className="block px-3 py-2 text-center btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Support My Work
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
