# Soft But Savage Sandbox App

This repo contains the sandbox-friendly Expo/React Native experience for **Soft But Savage: The ShaiCandie Rebirth Lounge**. The latest build keeps the restricted-environment safeguards while showcasing the full product vision—AI mood care, therapy-grade video sanctuaries, avatar storytelling, courses, and boutique commerce—all wrapped in a minimalist, feminine-chic aesthetic.

## Feature Highlights

- **AI Mood Mentor & Boss Energy Index** – tap-to-update mood snapshots (Body, Money, Boundaries, Spirit) that fuel CBT prompts, breathwork rituals, and personalized celebrations.
- **Video Therapy Sanctuaries** – secure, HIPAA-ready rooms with co-regulation timers, screen sharing, panic-button support, and encryption stats to reassure members.
- **Interactive Community Feed** – voice notes, polls, screen-shared wins, and AI-highlighted recaps keep the lounge vibrant without losing emotional safety.
- **Avatar Studio & Co-Working** – craft animated identities, clone voices, and host body-doubling focus sprints alongside lo-fi soundscapes.
- **Therapy-Aligned Courses** – adaptive lessons for boundaries, financial softness, and sensual entrepreneurship that sync with Boss Energy Index trends.
- **Soft But Savage Boutique** – curated self-care kits, membership upgrades, and retreat passes offered through a secure, multi-device shopfront.
- **Wellness Milestones Dashboard** – track challenge streaks, gratitude notes, and therapy wins in one exportable profile hub.

## Getting Started in the Sandbox

1. Ensure you have Node.js 18+ installed locally.
2. Optionally install Expo CLI: `npm install -g expo-cli`.
3. Start the Expo web preview with `npx expo start --web`. The sandbox-safe emoji tab bar renders without any native dependencies.

## Shipping to a Real Android Device

Follow the embedded checklist at the top of `App.js` when you are ready for hardware:

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

## Visual + UX Notes

- Pastel backgrounds, generous spacing, and bold typographic accents match the Soft But Savage brand personality.
- Emoji-based feature pills nod to real integrations (AI mentor, video chat, boutique) without importing native icon packs.
- The `MoodTracker` component gives stakeholders a tangible feel for the Boss Energy Index interaction before wiring up persistence.

## Tests You Can Add

The bottom of `App.js` contains updated reference Jest smoke tests that align with the new copy. To run them:

1. Install Jest and React Test Renderer:
   ```bash
   npm install --save-dev jest react-test-renderer
   ```
2. Create `__tests__/screens.test.js` and paste the test snippets from the file comments.
3. Add a Jest configuration compatible with Expo/React Native (e.g., using `jest-expo`).
4. Execute `npx jest` to confirm everything renders as expected.

## Next Steps

- Hook the Boss Energy Index to persistent storage (AsyncStorage, Supabase, etc.) so AI prompts and therapy plans reflect real history.
- Scope the integrations for video chat (e.g., Twilio, Vonage) and avatar generation (D-ID, VEED) to meet privacy requirements.
- Finalize crisis-response flows, including guardian notifications and location handoff rules, to complete therapy protection compliance.
- Pair designers with motion/illustration talent for bespoke avatar packs and onboarding micro-interactions.
