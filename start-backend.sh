#!/bin/bash
cd "$(dirname "$0")/server"
echo "🚀 Starting ReGen Backend on http://localhost:5000"
python app.py
