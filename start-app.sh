#!/bin/bash
# Find the path to npm
NPM_PATH=$(find /usr/local -name npm 2>/dev/null | head -1)

if [ -z "$NPM_PATH" ]; then
  echo "npm not found. Trying node directly..."
  NODE_PATH=$(find /usr/local -name node 2>/dev/null | head -1)
  
  if [ -z "$NODE_PATH" ]; then
    echo "Node not found. Please install Node.js"
    exit 1
  fi
  
  echo "Using node at: $NODE_PATH"
  $NODE_PATH ./node_modules/.bin/next dev
else
  echo "Using npm at: $NPM_PATH"
  $NPM_PATH run dev
fi 