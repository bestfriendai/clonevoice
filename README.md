# CloneVoice

Expo + React Native app scaffold for recording and playing back voice clips.

## What this app currently does

- Records audio with the device microphone (real device permission flow)
- Plays back the latest recording
- Configures RevenueCat SDK when `extra.revenuecat_api_key` is set in Expo config

## Setup

```bash
npm install
npx expo install --fix
```

## Run

```bash
npm run start
```

## Type-check

```bash
npx tsc --noEmit
```

## Notes

- Update `extra.revenuecat_api_key` in `app.config.js` with a valid key to enable purchases setup.
- iOS and Android microphone permissions are already declared in Expo config.
