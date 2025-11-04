# Soft But Savage – Production App Shell

This repository contains the production-ready Expo / React Native foundation for **Soft But Savage: The ShaiCandie Rebirth Lounge**. It ships with fully wired navigation, modular pastel-chic UI components, automated smoke tests, and guidance for standing up AI-powered wellness, therapy, community, and commerce features.

## Feature Highlights

- **Bottom Tab Navigation** – React Navigation tabs with Safe Area awareness and Ionicons deliver a polished native feel on iOS, Android, and web.
- **Modular UI System** – Reusable `SavageCard`, `FeaturePill`, `SupportStat`, and `MoodTracker` components keep the experience consistent while showcasing Boss Energy Index interactions.
- **AI & Therapy Storytelling** – Copy, layout, and stats across all four screens outline the AI mentor, secure therapy sanctuaries, avatar studio, adaptive courses, and boutique commerce roadmap.
- **Accessible Pastel Theme** – Centralized color tokens and typography ramp maintain brand alignment while guaranteeing readable contrast.

## Project Structure

```
src/
  components/       # Shared UI primitives (cards, pills, mood tracker, etc.)
  constants/        # Feature descriptions surfaced across screens
  screens/          # Home, Community, Resources, Profile screens
  theme/            # Color palette used across the app
__tests__/          # Jest smoke tests covering screens + navigation shell
App.js              # Navigation container + tab configuration
```

## Getting Started

1. Install Node.js 18 or later.
2. Install dependencies: `npm install`
3. Launch the local dev experience:
   - Web: `npm run web`
   - Android: `npm run android`
   - iOS (macOS only): `npm run ios`
4. The bottom tab shell and all four core screens will load with production navigation.

## Testing

Run the automated smoke tests to confirm the navigation shell and screen copy render as expected:

```bash
npm test
```

The suite uses `jest-expo` with `@testing-library/react-native` for cross-platform rendering assertions.

## Deployment Checklist

- Configure Expo EAS or classic builds with your bundle identifiers and signing assets.
- Connect the app to your backend of choice (Supabase, Hasura, Firebase, custom) to persist Boss Energy Index scores, therapy logs, and commerce activity.
- Integrate HIPAA-ready video/chat providers and document escalation protocols for panic mode and guardian alerts.
- Wire AI mentor flows via OpenAI, Anthropic, or preferred LLM provider with safety guardrails.
- Attach analytics, error reporting, and feature flagging before going live.

## Security & Compliance Notes

- The navigation shell already relies on `react-native-safe-area-context`, `react-native-screens`, and `react-native-gesture-handler` to match production performance characteristics.
- `npm audit` currently reports known advisories inside Expo SDK 50 (semver + send). Upgrading to a newer Expo SDK (e.g., 54+) resolves them once you are ready to adopt the newer runtime.
- Before launch, review HIPAA, PCI, and data retention requirements with counsel to ensure integrations align with therapy and commerce obligations.

## Next Build Phases

1. **Data & Auth** – Implement secure authentication, user profiles, and persistence for the Boss Energy Index and wellness milestones.
2. **AI Mentor MVP** – Integrate conversational AI with journaling prompts, CBT templates, and crisis escalation guidelines.
3. **Real-Time Experiences** – Add video therapy sanctuaries, avatar meetups, and co-working rooms via a compliant streaming provider.
4. **Courses & Commerce** – Embed lesson delivery, in-app purchasing, and order fulfillment flows.
5. **Quality Ops** – Expand automated testing (unit, integration, Detox), add CI pipelines, and capture observability metrics.

With this foundation you can focus on backend integrations, AI personalization, and compliance workflows while the mobile shell presents the full Soft But Savage brand story.
