# Mini Shop — Simple E‑Commerce Demo

This repository contains a minimal Flask server that serves a single HTML page from the templates folder and static CSS/JS assets under `static/`.

## Features

- Product grid rendered in the browser
- Client-side cart (stored in localStorage)
- Minimal Flask backend to serve the page
- Simple, easy-to-read code intended for learning and prototyping

## Recommended prerequisites

- Python 3.8 or newer (3.8+)
- pip (Python package installer)
- Optional: Docker 

On Windows, these tools are typically available after installing Python from python.org and adding it to PATH.

## Repository layout

Top-level files/folders you will use:

- `app.py` — small Flask app that serves the page
- `requirements.txt` — Python dependencies
- `static/` — static assets (CSS and JS)
  - `static/css/styles.css`
  - `static/js/app.js`
- `templetes/index.html` — HTML template used by the app (see note below)
- `Dockerfile` — container build Docker file

## Create and activate a Python virtual environment (Windows)

PowerShell (recommended):

```powershell
python -m venv .venv
# If PowerShell blocks scripts, allow the session only:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
```
or you can use CMD simply
```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

macOS / Linux (for reference):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run the application

There are a few ways to run the app. The simplest is to run the module directly:

```powershell
python app.py
```

This will start the Flask development server on port 5000 by default. Open a browser and go to:

http://127.0.0.1:5000/

Alternatively, you can use the `flask` command-line tooling. In PowerShell:

```powershell
# $env:FLASK_APP = 'app.py'
# $env:FLASK_ENV = 'development'
flask run --host=0.0.0.0 --port=5000
```

In cmd.exe:

```cmd
set FLASK_APP=app.py
set FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

## License

This project is provided as-is for learning and demo purposes. Use and modify freely."# flask_http_server" 
