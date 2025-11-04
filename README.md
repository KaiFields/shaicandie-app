# Soft But Savage – Production App Shell

This repository now contains a production-focused Expo / React Native app for **Soft But Savage: The ShaiCandie Rebirth Lounge**. It implements secure auth scaffolding, persistent Boss Energy Index tracking, AI mentor wiring, compliant video sanctuaries, adaptive courses, boutique commerce, and an upgraded quality pipeline so you can ship confidently.

## Feature Highlights

- **Secure Auth & Profiles** – The `AuthProvider` stores encrypted tokens with Expo Secure Store, hydrates user profiles, and exposes sign-in/sign-up/update flows backed by your API.
- **Boss Energy Persistence** – AsyncStorage-powered `BossEnergyProvider` keeps daily snapshots, calculates streaks/weekly averages, and surfaces milestone toggles on the Profile screen.
- **AI Mentor MVP** – The `AIMentorPanel` sends prompts to your configured mentor API with CBT context sourced from Boss Energy metrics, returning personalized guidance and crisis language.
- **Real-Time Sanctuaries** – Community includes Daily-style `VideoSanctuaryCard` embeds that request secure room URLs and display HIPAA-friendly video or avatar coworking spaces inside a WebView.
- **Courses & Commerce** – Resources fetches course catalogs and shop inventory from your commerce backend, launching deeplinks or checkout flows directly from the app.
- **Quality Operations** – Jest tests now wrap screens with providers, mock native surfaces, and validate that navigation loads the authenticated home experience. Environment variables flow through `app.json` and `.env`.

## Project Structure

```
src/
  components/          # UI primitives + AI, commerce, live, and Boss Energy modules
  context/             # AuthProvider and BossEnergyProvider
  navigation/          # AppNavigator with auth + main tab stacks
  screens/             # Auth stack + Home, Community, Resources, Profile tabs
  services/            # API helpers for mentor, commerce, and video URLs
  theme/               # Color palette tokens
__tests__/             # Jest smoke tests (provider-aware)
.env.example           # Required environment variables
app.json               # Expo config with runtime extra values
```

## Environment Configuration

Copy `.env.example` to `.env` (never commit secrets) and provide production endpoints:

```
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `AUTH_API_URL` | REST API that handles sign-in/up and profile updates |
| `MENTOR_API_URL` | AI mentor session endpoint returning CBT guidance |
| `VIDEO_PROVIDER_URL` | Compliant streaming host (e.g., Daily, Zoom, Twilio) |
| `COMMERCE_URL` | Backend that returns course/product catalogs and checkout links |
| `SENTRY_DSN` | Observability endpoint for crash/error capture |

Expo automatically injects these into `Constants.expoConfig.extra` at runtime.

## Getting Started

1. Install Node.js 18 or later.
2. Install dependencies: `npm install`
3. Create your `.env` (as above) or configure CI secrets.
4. Launch the app:
   - Web preview: `npm run web`
   - Android (device/emulator): `npm run android`
   - iOS (simulator, macOS only): `npm run ios`
5. The auth gate appears; create or log in to view the main tabs.

## Testing & Quality

```bash
npm test
```

The Jest suite stubs native modules, mocks API calls, and verifies that each screen renders its production copy plus the authenticated navigation shell. Extend this with Detox or Playwright when you introduce end-to-end flows.

For observability, populate `SENTRY_DSN` or your chosen monitoring provider and instrument additional traces/metrics as you scale.

## Deployment Checklist

- Configure Expo EAS (or bare builds) with signing credentials and environment secrets.
- Point `AUTH_API_URL`, `MENTOR_API_URL`, `VIDEO_PROVIDER_URL`, and `COMMERCE_URL` at HIPAA/PCI compliant services.
- Implement API endpoints that mirror the expected JSON responses used by `AuthContext`, `submitMentorPrompt`, `fetchCourses`, and `fetchProducts`.
- Add panic-mode escalation on the backend to notify guardians/therapists when the mentor flags crisis keywords.
- Connect analytics, Sentry, and feature flagging prior to public release.

## Security & Compliance

- Tokens and profiles are persisted with Expo Secure Store, while Boss Energy entries live in AsyncStorage until your backend sync is active.
- Video sanctuaries embed your provider’s fully compliant rooms inside a WebView for cross-platform consistency. Swap in a native SDK when available.
- Update privacy policies, consent flows, and data retention strategies in coordination with licensed clinicians and legal counsel.

## Roadmap Suggestions

- Replace WebView rooms with native Daily/Twilio integrations once ejecting is feasible.
- Layer in push notifications, offline caching, and localized content for global members.
- Expand testing with Detox end-to-end suites and GitHub Actions/Expo EAS CI pipelines.
- Instrument boss energy insights with dashboards (e.g., Supabase, Metabase) for coaches and therapists.

With this foundation, the lounge can focus on rich integrations, trauma-informed care, and commerce experiences while the app keeps everything cohesive, secure, and on-brand.
