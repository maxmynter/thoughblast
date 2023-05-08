import "dotenv/config";
export default {
  name: "thoughtblast",
  slug: "thoughtblast",
  version: "1.1.5",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.maxmynter.thoughtblast",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    secret: process.env.REACT_APP_WHISPER_SECRET,
    flask_token: process.env.REACT_APP_FLASK_TOKEN,
    flaskBackendURI:
      "staging" === process.env.ENV
        ? process.env.REACT_APP_FLASK_BACKEND_URI_STAGING
        : process.env.REACT_APP_FLASK_BACKEND_URI,

    eas: {
      projectId: "9fdbd214-041e-4df4-8e20-612f281cb097",
    },
  },
};
