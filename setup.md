# Project Setup

## Backend Setup
Clone the repository and navigate into the backend folder:
git clone https://github.com/Alaric-Jeff/Smart-Automated-Drying-System.git
cd backend
npm install
Set up environment variables: HTTP_PORT (server port), DATABASE_URL (database connection string), HOST (hostname, localhost)
Start the server:
npm run build
npm run start

## Frontend Setup with notes
If the automatic VS Code Flutter setup works, open the folder and start coding. If it fails or shows errors like "please download/copy the SDK manually," follow the manual setup: https://docs.flutter.dev/install/manual, add Flutter to your system PATH, and verify installation:
flutter --version
dart --version
flutter doctor
Create or open the frontend project inside your project folder:
cd <project-root>
flutter create frontend
cd frontend
flutter pub get
flutter run

## Notes
Ensure the backend is running before testing API calls from the frontend. Use an emulator or physical device for running the Flutter app. For Flutter or Dart errors, run flutter doctor and follow the suggested fixes. Keep your .env file secure and do not commit it to version control. For hot reload during development, press r in the Flutter terminal after flutter run. You can customize the frontend folder name if needed, but update paths accordingly.
