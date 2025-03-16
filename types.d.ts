// Simple declaration to allow imports from 'framer-motion' without errors
// This is just for backward compatibility as we're removing framer-motion usage
declare module 'framer-motion' {
  import * as React from 'react';
  
  // Declare minimal types needed for existing code
  export const motion: any;
  export const AnimatePresence: React.FC<any>;
} 