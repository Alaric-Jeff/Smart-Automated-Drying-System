# 🚀 Project Setup (Backend + Frontend)

## 📦 Backend

1. Clone the repository:

```
git clone https://github.com/Alaric-Jeff/Smart-Automated-Drying-System.git
```

2. Navigate to the backend folder:

```
cd Smart-Automated-Drying-System/backend
```

3. Install dependencies:

```
npm install
```

### ⚙️ Environment Variables (example)

Create a `.env` file in the backend folder:

```
HTTP_PORT=3000
DATABASE_URL="postgres://user:password@localhost:5432/dbname"
HOST="localhost"
```

### 🚀 Start the server

```
npm run build
npm run start
```

### 📁 Backend Folder Structure

```
backend/
 ├─ src/
 │   ├─ controllers/
 │   ├─ services/
 │   ├─ routers/
 │   ├─ utils/
 │   ├─ plugConfigs/
 ├─ package.json
 ├─ tsconfig.json
 └─ .env
```

---

## 🎨 Frontend

1. Navigate to the frontend folder:

```
cd ../frontend
```

2. If the folder does not exist, create it:

```
flutter create frontend
cd frontend
```

3. Install dependencies:

```
flutter pub get
```

4. Run the app:

```
flutter run
```

### ✅ Verify Flutter & Dart installation

```
flutter --version
dart --version
flutter doctor
```

### 📁 Frontend Folder Structure

```
frontend/
 ├─ lib/
 │   ├─ main.dart                  # app entrypoint
 │   ├─ core/                      # global configs, constants, utilities
 │   │   ├─ constants.dart
 │   │   ├─ theme.dart
 │   │   ├─ api_service.dart        # calls Fastify backend
 │   ├─ models/                    # DTOs / data models
 │   │   ├─ sensor_data.dart
 │   │   ├─ device_state.dart
 │   ├─ providers/                 # state management (Riverpod / Provider / Bloc)
 │   │   ├─ sensor_provider.dart
 │   │   ├─ device_provider.dart
 │   ├─ services/                  # abstraction over API, Firebase, Bluetooth
 │   │   ├─ firebase_service.dart
 │   │   ├─ bluetooth_service.dart
 │   ├─ ui/
 │   │   ├─ screens/
 │   │   │   ├─ dashboard_screen.dart
 │   │   │   ├─ login_screen.dart
 │   │   ├─ widgets/
 │   │   │   ├─ sensor_card.dart
 │   │   │   ├─ control_buttons.dart
 │   └─ routes.dart                # named routes
 ├─ pubspec.yaml
 └─ .gitignore
```

### 📝 Notes

* Ensure backend is running before testing API calls.
* Use emulator or physical device for Flutter app.
* Keep `.env` file secure (DO NOT commit).
* Hot reload: press 'r' after `flutter run`.
* You may rename the frontend folder, but update paths accordingly.
