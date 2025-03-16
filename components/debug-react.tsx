"use client";

import React from 'react';

export function DebugReact() {
  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#333', color: 'white', padding: 10, zIndex: 9999 }}>
      React version: {React.version}
    </div>
  );
} 