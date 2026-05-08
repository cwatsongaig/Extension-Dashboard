@echo off
:: BondBox Dashboard - Auto-start script
:: Starts the FastAPI server in the background on Windows login
cd /d "C:\Development\New Extension Build"
start /min "" python -m uvicorn api.main:app --port 8000
