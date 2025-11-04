# Soft But Savage Sandbox App

This repo contains the sandbox-friendly Expo/React Native experience for **Soft But Savage: The ShaiCandie Rebirth Lounge**. The code ships with:

- Four themed screens (Home, Community, Resources, Profile) that match the brand language.
- A reusable `SavageCard` component for consistent styling and accessibility.
- A sandbox fallback shell that avoids native module imports so it can render in restricted preview environments.
- A commented "real navigation" implementation you can enable when running on a physical device.

## Getting Started in the Sandbox

1. Ensure you have Node.js 18+ installed locally.
2. Install Expo CLI if you want to run it locally: `npm install -g expo-cli` (optional for sandbox preview).
3. Start the Expo web preview with `npx expo start --web`. The sandbox-safe emoji tab bar will render without native dependencies.

## Shipping to a Real Android Device

When you are ready to test on hardware, follow the steps embedded at the top of `App.js`:

1. `npx create-expo-app soft-but-savage`
2. `cd soft-but-savage`
3. Install the navigation and icon packages:
   ```bash
   npx expo install @react-navigation/native @react-navigation/bottom-tabs
   npx expo install react-native-safe-area-context react-native-screens
   npx expo install @expo/vector-icons
   ```
4. Replace the generated `App.js` with the one in this repository.
5. Uncomment the "REAL NAVIGATION APP" block and delete the sandbox fallback `<App />`.
6. Run `npx expo start --android` and open the project in Expo Go on your device.

## Tests You Can Add

The bottom of `App.js` contains reference Jest smoke tests that validate each screen and the faux tab bar. To run them:

1. Install Jest and React Test Renderer:
   ```bash
   npm install --save-dev jest react-test-renderer
   ```
2. Create `__tests__/screens.test.js` and paste the test snippets from the file comments.
3. Add a Jest configuration compatible with Expo/React Native (e.g., using `jest-expo`).
4. Execute `npx jest` to confirm everything renders as expected.

## Next Feature Ideas

- Decide on the exact interaction for the **Boss Energy Index** (slider, checklist, or micro journal) so the screen can capture and surface trends.
- Layer in persistence (AsyncStorage or backend sync) once the interaction model is chosen.
- Introduce analytics or mood insights on the Profile screen after the data flow is defined.

Refer to the inline question near the end of `App.js` to clarify the Boss Energy Index behavior before we build it out.
