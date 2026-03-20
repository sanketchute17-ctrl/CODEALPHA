@echo off

echo ==============================
echo 🚀 Starting Credit App...
echo ==============================

echo Starting Backend...
cd backend
start cmd /k python app.py

echo Waiting for backend...
timeout /t 6

echo Starting Frontend...
cd ../frontend
start cmd /k npm start

echo Waiting for frontend to compile...
timeout /t 15

echo Opening Browser...
start http://localhost:3000

echo ==============================
echo ✅ All services started!
echo ==============================

pause
