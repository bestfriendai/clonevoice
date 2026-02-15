module.exports = {
  name: "CloneVoice",
  slug: "clonevoice",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  scheme: "clonevoice",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#8b5cf6"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.clonevoice.app",
    infoPlist: {
      NSMicrophoneUsageDescription: "CloneVoice needs microphone access to record your voice",
      NSPhotoLibraryUsageDescription: "CloneVoice needs photo library access to save voice clips"
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#8b5cf6"
    },
    package: "com.clonevoice.app",
    permissions: ["RECORD_AUDIO", "READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"]
  },
  plugins: [
    "expo-router",
    "expo-audio",
    [
      "expo-av",
      {
        microphonePermission: "Allow CloneVoice to access your microphone."
      }
    ],
    [
      "expo-image-picker",
      {
        microphonePermission: "Allow CloneVoice to access your microphone."
      }
    ]
  ],
  extra: {
    revenuecat_api_key: "rcap_key_placeholder"
  }
};
