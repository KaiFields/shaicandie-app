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

### 1. Immediate Builder Checklist

- [ ] Stand up a lightweight backend (Supabase, Firebase, or Hasura) with secure auth so the Boss Energy Index and journal data have a real store.
- [ ] Define the user data model (profile, avatar assets, wellness logs, purchase history) and map the API contracts that the mobile app will consume.
- [ ] Wire the `MoodTracker` interactions to that API so state persists between sessions and can feed the AI mentor.

### 2. AI & Therapy Foundations

- [ ] Prototype the AI Mood Mentor with OpenAI or Anthropic, including guardrails for crisis phrases and a visible “escalate to human” affordance.
- [ ] Select a HIPAA-ready provider (e.g., AWS HealthLake, Google Cloud Healthcare API) for storing therapy session summaries and consent records.
- [ ] Document escalation playbooks (panic button routing, emergency contact policy) and surface them in both the product and ops runbooks.

### 3. Real-Time Experiences

- [ ] Evaluate video SDKs (Twilio Live, Vonage, Daily.co) for secure one-on-one therapy and multi-member lounges, noting HIPAA BAAs and cost models.
- [ ] Design the architecture for community posts and livestream chat, including moderation tooling and retention policies.
- [ ] Scope the avatar pipeline (e.g., D-ID or VEED) and determine what rendering or voice assets must be cached on device versus streamed.

### 4. Courses & Commerce Rollout

- [ ] Choose a course delivery stack (Thinkific, LearnWorlds, custom CMS) and define how lesson progress syncs with the Boss Energy Index.
- [ ] Integrate a PCI-compliant commerce solution (Stripe, Shopify, ThriveCart) for kits, retreats, and membership upgrades.
- [ ] Outline fulfillment and refund workflows so the boutique can scale without manual intervention.

### 5. Design & Testing Ops

- [ ] Expand the design system (Figma tokens, typography ramp, motion specs) to cover empty states, error feedback, and success celebrations.
- [ ] Set up automated testing: Jest for component rendering, Detox for end-to-end flows, and static analysis (TypeScript or ESLint) for stability.
- [ ] Plan a closed beta, including cohort selection, feedback forms, and analytics dashboards to monitor emotional safety signals.

Keeping this checklist in your project tracker makes it easy to communicate progress with designers, engineers, and therapists as you bring each capability online.
