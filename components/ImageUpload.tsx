import React, { useEffect, useRef } from 'react';
import { CLOUDINARY_CONFIG } from '../services/cloudinary';

interface ImageUploadProps {
  currentImage?: string;
  onImageUpload: (url: string) => void;
  label?: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageUpload,
  label = "Upload Image" 
}) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Load Cloudinary widget script
    if (!document.getElementById('cloudinary-upload-widget')) {
      const script = document.createElement('script');
      script.id = 'cloudinary-upload-widget';
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      alert('Cloudinary widget is still loading. Please try again.');
      return;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CONFIG.cloudName,
        uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        styles: {
          palette: {
            window: '#0A0A0A',
            windowBorder: '#EAB308',
            tabIcon: '#EAB308',
            menuIcons: '#FFFFFF',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#EAB308',
            action: '#EAB308',
            inactiveTabIcon: '#555555',
            error: '#F44235',
            inProgress: '#EAB308',
            complete: '#22C55E',
            sourceBg: '#1A1A1A'
          },
          fonts: {
            default: null,
            "'Inter', sans-serif": {
              url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
              active: true
            }
          }
        }
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onImageUpload(result.info.secure_url);
        }
        if (error) {
          console.error('Upload error:', error);
        }
      }
    );

    widgetRef.current.open();
  };

  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 ml-1">
        {label}
      </label>
      
      {currentImage && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 mb-3">
          <img 
            src={currentImage} 
            alt="Current" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-bold">Click below to change</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={openUploadWidget}
        className="w-full px-4 py-3 bg-brand-black/50 border-2 border-dashed border-white/20 hover:border-brand-yellow rounded-xl text-white/60 hover:text-brand-yellow text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {currentImage ? 'Change Image' : 'Upload Image'}
      </button>
    </div>
  );
};