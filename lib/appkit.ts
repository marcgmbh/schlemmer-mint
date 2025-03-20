"use client";

// Instead of importing from the non-existent @reown/appkit/modal,
// we'll create a simple implementation that uses our custom hook
import { useAppKit } from '@/hooks/use-appkit';

// Create a global reference to the open function
let openModalFn: (options: { view: 'Connect' | 'Network' }) => void = () => {
  console.warn('Modal function not initialized yet');
  // Default implementation shows an alert if called before initialization
  window.alert('Wallet connection not initialized. Please refresh the page.');
};

// Function to set the reference to the open function
export function setOpenModalFunction(fn: typeof openModalFn) {
  openModalFn = fn;
}

// Export the openModal function that will use our reference
export function openModal(options: { view: 'Connect' | 'Network' }) {
  return openModalFn(options);
}

// Hook to initialize the modal function
export function useInitializeModal() {
  const appKit = useAppKit();
  
  // Set the open function reference on first render
  if (typeof window !== 'undefined') {
    setOpenModalFunction(appKit.open);
  }
  
  return appKit;
} 