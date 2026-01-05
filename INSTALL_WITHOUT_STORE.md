# Installing App on Phone Without App Stores

## Option 1: Expo Go (Easiest - For Development)

### For Testing/Development:
```bash
npm start
```

Then:
1. Install **Expo Go** app from App Store/Play Store (free)
2. Scan the QR code that appears in terminal
3. App opens in Expo Go

**Limitations:**
- Some native modules might not work
- App runs inside Expo Go (not standalone)
- Good for development/testing

## Option 2: Development Build (Recommended)

### Build Development Version:

#### For Android:
```bash
eas build --platform android --profile development
```

This creates an APK you can install directly:
1. Download the APK from the build page
2. Transfer to your Android phone
3. Enable "Install from unknown sources" in settings
4. Tap the APK to install

#### For iOS:
```bash
eas build --platform ios --profile development
```

**Requirements:**
- Apple Developer account ($99/year) - but you don't need to submit to App Store
- Install via TestFlight or direct install

**Install on iOS:**
1. Download the .ipa file
2. Use tools like:
   - **AltStore** (free, requires computer)
   - **Sideloadly** (free, requires computer)
   - **TestFlight** (free, but requires Apple Developer account)

## Option 3: Preview Build (Easiest for Android)

### Android - Direct APK Installation:

```bash
eas build --platform android --profile preview
```

This creates an APK file:
1. Download APK from build page
2. Transfer to Android phone (email, USB, cloud storage)
3. On phone: Settings → Security → Enable "Install unknown apps"
4. Open the APK file and install

**No Google Play account needed!**

## Option 4: Local Development Build

### Using Expo Development Build:

1. **Install Expo Dev Client:**
   ```bash
   npx expo install expo-dev-client
   ```

2. **Build development version:**
   ```bash
   eas build --platform android --profile development --local
   ```
   (Add `--local` to build on your machine)

3. **Install the APK** on your Android device

## Option 5: Android - Direct APK (Simplest)

### Build Standalone APK:

```bash
eas build --platform android --profile preview
```

**Steps:**
1. After build completes, download the APK
2. Transfer to your Android phone:
   - Email it to yourself
   - Use USB cable
   - Upload to Google Drive/Dropbox
   - Use ADB: `adb install app.apk`
3. On Android phone:
   - Open Settings → Security
   - Enable "Install from unknown sources" (or "Install unknown apps")
   - Open the APK file
   - Tap "Install"

**No store, no account needed!**

## Option 6: iOS - Ad Hoc Distribution

### For iOS (Requires Apple Developer Account):

```bash
eas build --platform ios --profile preview
```

Then use:
- **AltStore** (free, sideloading)
- **Sideloadly** (free, sideloading)
- **TestFlight** (free, but requires developer account)

## Quick Comparison

| Method | Android | iOS | Cost | Easiest? |
|--------|---------|-----|------|----------|
| Expo Go | ✅ | ✅ | Free | ⭐⭐⭐⭐⭐ |
| Preview Build (APK) | ✅ | ❌ | Free | ⭐⭐⭐⭐⭐ |
| Development Build | ✅ | ✅ | Free* | ⭐⭐⭐⭐ |
| Ad Hoc (iOS) | ❌ | ✅ | $99/year | ⭐⭐⭐ |

*Free for Android, requires Apple Developer for iOS

## Recommended: Android APK (Easiest)

For Android, this is the simplest:

```bash
# 1. Build APK
eas build --platform android --profile preview

# 2. Download APK from build page

# 3. Transfer to phone and install
```

**No accounts, no stores, just install the APK!**

## For iOS Without App Store

**Options:**
1. **Expo Go** - Free, easiest, but limited
2. **TestFlight** - Free, but needs $99 Apple Developer account
3. **AltStore/Sideloadly** - Free sideloading, but needs $99 Apple Developer account for builds

**Note:** iOS is more restrictive. You need an Apple Developer account ($99/year) to build installable apps, even if you don't submit to the App Store.

## Step-by-Step: Android APK (Recommended)

1. **Build:**
   ```bash
   eas build --platform android --profile preview
   ```

2. **Wait for build** (10-20 minutes)

3. **Download APK:**
   - Visit the build URL shown in terminal
   - Or check: `eas build:list`
   - Download the APK file

4. **Install on Android:**
   - Transfer APK to phone (email/USB/cloud)
   - Settings → Security → Enable "Install unknown apps"
   - Open APK file → Install

**Done!** No store needed.

## Troubleshooting

**Android:**
- "Install blocked": Enable "Install unknown apps" in Settings
- "App not installed": Make sure you downloaded the APK (not AAB)
- Build fails: Check `eas build:list` for errors

**iOS:**
- Need Apple Developer account for any installable build
- Use Expo Go for free testing (limited features)
- AltStore/Sideloadly for sideloading (free tools, but need dev account for build)

