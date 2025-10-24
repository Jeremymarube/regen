#!/bin/bash
cd "$(dirname "$0")/client"
echo "🚀 Starting ReGen Frontend on http://localhost:3000"
source ~/.nvm/nvm.sh
nvm use 18
npm run dev
