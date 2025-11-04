# Soft But Savage: The ShaiCandie Rebirth Lounge App

A product vision for a dynamic, women-centered mental wellness ecosystem that blends social connection, therapy, commerce, and AI personalization.

## Brand & Experience Goals

- **Modern female-chic aesthetic:** Minimalist layouts, generous white space, pastel gradients, playful geometric accents, and bespoke illustrations that reinforce the Soft But Savage identity.
- **Empowerment-first storytelling:** Copy, imagery, and interaction patterns should celebrate resilience, softness, and community healing.
- **Calm yet kinetic feel:** Pair soothing color palettes with bold typography and micro-animations to keep the interface vibrant without sacrificing serenity.

## Core User Journeys

| Journey | Description | Key Touchpoints |
| --- | --- | --- |
| Daily Wellbeing Check-in | Capture mood, energy, and reflections while surfacing personalized guidance. | Mood tracker, CBT snippets, journaling prompts, AI coach |
| Community Sharing | Post updates, videos, and supportive messages to peers and moderators. | Social feed, video stories, reactions, moderation tools |
| Virtual Therapy | Book, join, and document secure therapy sessions. | HIPAA-compliant scheduling, video chat, encrypted notes |
| Growth & Learning | Enroll in self-paced courses and live workshops with actionable takeaways. | Course hub, lesson player, cohort chat |
| Commerce & Rewards | Purchase curated products/services and earn badges for wellness habits. | Shopfront, cart, subscriptions, gamified achievements |

## Feature Pillars

### 1. AI-Powered Wellness
- Intelligent mood tracking with sentiment analysis and longitudinal insights.
- AI companion that guides CBT, DBT, and mindfulness exercises with escalation protocols.
- Personalized recommendations spanning content, courses, community groups, and shop items.

### 2. Secure Therapy Enablement
- Encrypted messaging, session notes, and document storage with audit logs.
- Crisis support: panic button, emergency contact routing, optional location sharing.
- Therapist workspace including scheduling, progress tracking, and resource library.

### 3. Social & Avatar-Driven Expression
- Customizable AI-generated avatars (static and animated) for profiles and video overlays.
- Video chat, screen sharing, and live rooms for peer circles and workshops.
- Community moderation dashboards and automated content safety checks.

### 4. Learning & Commerce
- Course catalog with drip content, quizzes, downloadable materials, and cohort discussions.
- Integrated shop for digital and physical wellness offerings, subscriptions, and bundles.
- Unified wallet and rewards system with gamified wellness challenges.

## Experience Design Guidelines

1. **Layout & Color**
   - Prefer card-based layouts with 8pt spacing, rounded corners, and soft drop shadows.
   - Primary palette: blush rose (#F7D1DC), lavender haze (#E4D7FF), warm sand (#F5E6D3), and charcoal accents (#2E2B36).
   - Gradients such as blush-to-lilac add depth to hero sections and call-to-action areas.

2. **Typography**
   - Headings: expressive serif or display font (e.g., Playfair Display) with animated letter-spacing.
   - Body: readable sans-serif (e.g., Inter) with 1.6 line height.
   - Highlight keywords and action verbs using kinetic text treatments and color pops.

3. **Imagery & Motion**
   - Commission illustration sets that blend softness with bold line work.
   - Use subtle motion for avatar breathing, button hover states, and onboarding sequences.
   - Integrate Lottie animations for meditations and breathing exercises.

4. **Accessibility**
   - Maintain WCAG AA contrast, scalable typography, and keyboard navigation.
   - Offer reduced-motion mode and audio/visual therapy session transcripts.

## Platform Architecture

### Recommended Stack

- **Frontend:** React Native (Expo) for cross-platform mobile, React for web portal.
- **Backend:** Node.js (NestJS) or Python (FastAPI) backed by PostgreSQL and Redis for session state.
- **Real-Time & Media:** WebRTC (via Twilio or Daily), AWS Chime SDK, and Socket.IO for live updates.
- **AI & Avatar Integrations:** OpenAI Assistants API for coaching, custom fine-tuned models for mood insights, VEED or D-ID for avatar rendering, ElevenLabs for voice cloning.
- **Commerce & Courses:** Shopify Storefront API or Medusa for products, alongside a course engine (e.g., GraphQL-based custom LMS or integration with LearnWorlds/ThriveCart).
- **Infrastructure:** HIPAA-compliant cloud (AWS or Google Cloud) with VPC isolation, encrypted storage (KMS), and automated compliance monitoring.

### Service Modules

1. **Identity & Access**
   - OAuth2/OpenID Connect with MFA.
   - Role-based access (member, therapist, moderator, admin) and tenant-aware permissions.

2. **Wellness Intelligence**
   - Data pipeline for journaling, mood inputs, wearable integrations.
   - Analytics service for trend detection and recommendation engine.

3. **Therapy Operations**
   - Scheduling service with therapist availability, reminders, and billing hooks.
   - Secure telehealth service with session recording controls and consent workflows.

4. **Community & Content**
   - Feed service with AI-assisted moderation and tagging.
   - Media storage with CDN delivery and DRM for premium lessons.

5. **Commerce & Rewards**
   - Product catalog, order management, subscription billing.
   - Rewards ledger tracking challenges, badges, and redemption.

## Data Privacy & Safety

- Enforce end-to-end encryption for therapy sessions and sensitive messaging.
- Store PHI separately with strict access controls and audit trails.
- Provide opt-in data sharing and transparent consent for AI personalization.
- Integrate crisis hotline routing and local resource mapping for emergencies.

## Roadmap Phases

1. **Phase 0 – Discovery & Branding**
   - Validate personas, finalize visual system, establish compliance partners.
2. **Phase 1 – Core MVP (3-4 months)**
   - Launch mood tracking, AI coach v1, community feed, avatar creation, basic shop.
   - Deliver secure video therapy, journaling, and CBT micro-learning modules.
3. **Phase 2 – Growth & Courses (2-3 months)**
   - Add course marketplace, live workshops, enhanced analytics, and therapist tooling.
4. **Phase 3 – Ecosystem Expansion (ongoing)**
   - Wearable integrations, advanced gamification, multi-language support, regional events.

## Implementation Notes

- Prioritize modular design system (tokens, reusable components) to maintain visual cohesion across mobile/web.
- Establish observability early: structured logging, metrics, tracing, and security monitoring.
- Leverage feature flags and phased rollouts for sensitive AI-driven experiences.
- Document clinical governance policies and review processes for AI recommendations.

---

This repository will evolve into the product backlog and implementation for the Soft But Savage digital lounge, blending empathetic design with secure, intelligent mental wellness support.
