"use client";

import { useEffect } from 'react';
import { useInitializeModal } from '@/lib/appkit';

// This component initializes the modal function and doesn't render anything
export function ModalInitializer() {
  // Call our hook to set up the modal function
  const appKit = useInitializeModal();
  
  useEffect(() => {
    console.log('Modal function initialized');
  }, []);
  
  // This component doesn't render anything visible
  return null;
} 