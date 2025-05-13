'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  altText: string;
}

export default function ImageGallery({ images, altText }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // If no images, show placeholder
  if (!images.length) {
    return (
      <div className="h-96 bg-neutral-light rounded-lg flex items-center justify-center">
        <p className="text-neutral-medium">No images available</p>
      </div>
    );
  }
  
  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="relative h-96 bg-neutral-light rounded-lg overflow-hidden mb-4">
        {/* Actual Image */}
        <Image
          src={images[activeIndex]}
          alt={`${altText} - Image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className="object-contain"
          priority={activeIndex === 0}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2 px-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-24 rounded-md overflow-hidden transition-all ${
                activeIndex === index
                  ? 'ring-2 ring-primary-blue ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${altText} thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
