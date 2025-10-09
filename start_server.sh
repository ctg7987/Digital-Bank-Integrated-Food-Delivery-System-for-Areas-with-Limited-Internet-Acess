#!/bin/bash

# USSD Food Delivery System - Startup Script
# Starts both the backend API server and opens the web interface

echo "🍽️ USSD Food Delivery System - Starting..."
echo "================================================"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

# Make the web server executable
chmod +x web_server.py

echo "🚀 Starting backend API server..."
echo "📡 Server will run on: http://localhost:8080"
echo "🔗 API endpoint: http://localhost:8080/api/ussd"
echo ""

# Start the web server in background
python3 web_server.py &

# Get the process ID
SERVER_PID=$!

echo "✅ Backend server started (PID: $SERVER_PID)"
echo "⏳ Waiting 2 seconds for server to initialize..."

# Wait for server to start
sleep 2

# Check if server is running
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server is running successfully!"
    echo ""
    echo "🌐 Opening web interface..."
    
    # Try to open the web interface
    if command -v open &> /dev/null; then
        # macOS
        open "http://localhost:8080/index.html"
    elif command -v xdg-open &> /dev/null; then
        # Linux
        xdg-open "http://localhost:8080/index.html"
    elif command -v start &> /dev/null; then
        # Windows (Git Bash)
        start "http://localhost:8080/index.html"
    else
        echo "📱 Please manually open: http://localhost:8080/index.html"
    fi
    
    echo ""
    echo "🎉 System is ready!"
    echo "📱 Web Interface: http://localhost:8080/index.html"
    echo "🔧 API Endpoint: http://localhost:8080/api/ussd"
    echo ""
    echo "⏹️  Press Ctrl+C to stop the server"
    
    # Wait for user to stop
    trap "echo ''; echo '🛑 Stopping server...'; kill $SERVER_PID; echo '✅ Server stopped.'; exit 0" INT
    
    # Keep script running
    while true; do
        sleep 1
    done
    
else
    echo "❌ Failed to start server"
    echo "Please check if port 8080 is available"
    exit 1
fi
