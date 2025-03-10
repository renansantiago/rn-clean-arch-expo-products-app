# Products App - Clean Architecture with Expo & React Native

This is a **React Native** application built with **Expo (Prebuild)** using **Clean Architecture**. The application allows users to browse a product catalog, filter products by category, sort them by price or rating, and set purchase reminders using a **Turbo Native Module** that integrates with the iOS Calendar.

---

## Technologies & Libraries Used

This project is built using **React Native with Expo** and follows **Clean Architecture** principles to ensure maintainability and scalability. 

### **Core Technologies**
- **React Native** - Mobile framework for building iOS/Android applications.
- **Expo** - Used for simplified project setup, but the project is configured with `prebuild` to support native modules.
- **TypeScript** - Ensures type safety and better developer experience.
- **Expo Router** - Used for file-based navigation and deep linking.
- **React Native New Architecture (Turbo Native Module)** - Implemented to support native module creation.

### **Libraries Used**
- **Expo Router | Expo Linking** - Handles navigation and deep linking.
- **Expo Calendar** - Handles the integration with the native Calendar along with our custom Native Module to add the reminder feature.
- **Axios** - Handles API requests.
- **Jest** - Handles Unit Testing.
- **RN Testing Library** - Handles UI Testing.

---

## Project Architecture

The project is structured following **Clean Architecture**, ensuring separation of concerns between different layers:

- **Domain Layer:** Contains models and use cases, keeping business logic separate.
- **Data Layer:** Responsible for API requests and response transformations.
- **Presentation Layer:** Contains all UI components and screens.
- **Native Layer:** Contains the Turbo Native Module (`CalendarReminder`) to integrate with iOS Calendar.
- **App Layer:** Handles navigation and deep linking configuration.

---

## Running the App

### **Install Dependencies**
```bash
npm install
```

### **Prepare Native Code with Expo Prebuild**
**Why do we need `prebuild`?**  
Expo by default does not expose native modules. Running `prebuild` generates iOS and Android native projects (`ios/` and `android/` folders) so we can integrate the Turbo Native Module.
```bash
npx expo prebuild
```

### **Run the App**
#### iOS (Simulator)
```bash
npm run ios
```

#### Android (Emulator)
```bash
npm run android
```

---

## Deep Linking

The app supports **deep linking** using the custom scheme **`productsapp://`**. 

### **Testing a Deep Link**
#### iOS (Simulator)
```bash
xcrun simctl openurl booted “productsapp://product/1”
```

#### Android (Emulator or Device)
```bash
adb shell am start -a android.intent.action.VIEW -d “productsapp://product/1”
```

## Testing

This project uses **Jest** for unit testing and **React Native Testing Library** for component testing.

### **Testing Tools**
Unit testing: [Jest](https://jestjs.io/)

Component testing: [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

### **Running Unit & Component Tests**
Run all tests:
```bash
npm run test
```

## Notes

- This project is configured with **Expo Prebuild**, meaning it generates native code and should not be run inside Expo Go.
- Turbo Native Module is implemented **only for iOS** for now.
- The `prebuild` step is **mandatory** for the project to work properly.
