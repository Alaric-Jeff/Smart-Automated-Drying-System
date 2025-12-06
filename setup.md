# 🚀 Project Setup (Backend + Frontend)

# 📦 Backend
git clone https://github.com/Alaric-Jeff/Smart-Automated-Drying-System.git

cd Smart-Automated-Drying-System/backend

npm install


# ⚙️ Environment Variables (example)
HTTP_PORT=3000

DATABASE_URL="postgres://user:password@localhost:5432/dbname"

HOST="localhost"

# 🚀 Start the server
npm run build

npm run start


# 🎨 Frontend
cd ../   # back to project root


If the automatic VS Code Flutter setup works, open the folder and start coding

If it fails or shows errors like "please download/copy the SDK manually,"
 
follow the manual setup: https://docs.flutter.dev/install/manual
 
Add Flutter to your system PATH, and verify installation.


flutter --version

dart --version

flutter doctor


flutter create frontend

cd frontend

flutter pub get

flutter run


# 📝 Notes
- Ensure backend is running before testing API calls.
  
 - Use emulator or physical device for Flutter app.
   
 - For errors, run: flutter doctor
   
 - Keep .env file secure (DO NOT commit).
   
 - Hot reload: press 'r' after `flutter run`.
 - 
 - You may rename the frontend folder, but update paths accordingly.
