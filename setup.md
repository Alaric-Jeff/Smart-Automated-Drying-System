# 🚀 Project Setup (Backend + Frontend)

# ===========================
# 📦 Backend Setup
# ===========================
git clone https://github.com/Alaric-Jeff/Smart-Automated-Drying-System.git
cd Smart-Automated-Drying-System/backend

# Install dependencies
npm install

# ⚙️ Environment Variables (example)
export HTTP_PORT=3000
export DATABASE_URL="postgres://user:password@localhost:5432/dbname"
export HOST="localhost"

# Build & start server
npm run build
npm run start


# ===========================
# 🎨 Frontend Setup
# ===========================
cd ../   # go back to project root

# If the automatic VS Code Flutter setup works, open the folder and start coding.
# If it fails or shows errors like "please download/copy the SDK manually,"
# follow the manual setup: https://docs.flutter.dev/install/manual
# Add Flutter to your system PATH, and verify installation.

# Verify Flutter/Dart installation
flutter --version
dart --version
flutter doctor

# Create frontend project (if not existing)
flutter create frontend
cd frontend

# Install dependencies
flutter pub get

# Run the app (emulator or device required)
flutter run


# ===========================
# 📝 Notes
# ===========================
# - Ensure backend is running before testing API calls.
# - Use emulator or physical device for Flutter app.
# - For errors, run: flutter doctor
# - Keep your .env file secure (DO NOT commit).
# - Hot reload: press 'r' in terminal after `flutter run`.
# - You may rename the frontend folder, but update paths accordingly.