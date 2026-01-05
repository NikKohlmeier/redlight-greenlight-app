# App Store Submission Guide

## Prerequisites

1. **Apple Developer Account** ($99/year)
   - Sign up at https://developer.apple.com
   - You'll need this to submit to the App Store

2. **EAS Account** (free)
   - Sign up at https://expo.dev (or use existing Expo account)

## Step-by-Step Process

### 1. Login to EAS

```bash
eas login
```

This will prompt you to log in with your Expo account (create one at expo.dev if needed).

### 2. Configure EAS Build

```bash
eas build:configure
```

This creates an `eas.json` file with build configuration.

### 3. Update app.json (Already Done)

Your `app.json` already has:
- ✅ Bundle identifier: `com.redlightgreenlight.app`
- ✅ Build number: `1`
- ✅ Version: `1.0.0`

**Important:** Make sure your app icon and splash screen are proper images (not placeholders):
- `assets/icon.png` - Should be 1024x1024px
- `assets/splash.png` - Should be appropriate size for splash screen

### 4. Build for iOS

#### For App Store Submission:
```bash
eas build --platform ios --profile production
```

#### For Testing (TestFlight):
```bash
eas build --platform ios --profile preview
```

The first time, you'll be asked:
- **Apple Team ID**: Found in your Apple Developer account
- **Distribution Certificate**: EAS can generate this automatically
- **Provisioning Profile**: EAS can generate this automatically

### 5. Wait for Build

The build runs in the cloud and takes 10-20 minutes. You can:
- Check status: `eas build:list`
- View in browser: The build URL will be shown

### 6. Submit to App Store

Once the build completes:

```bash
eas submit --platform ios
```

This will:
1. Upload your app to App Store Connect
2. Create a new app version (if first time)
3. Submit for review

### 7. App Store Connect Setup

Before submitting, you'll need to set up in App Store Connect:
1. Go to https://appstoreconnect.apple.com
2. Create a new app (if first time)
3. Fill in:
   - App name: "Red Light Green Light"
   - Primary language
   - Bundle ID: `com.redlightgreenlight.app`
   - SKU (unique identifier)

### 8. App Store Listing

You'll need to provide:
- **App Description**: What your app does
- **Screenshots**: Required for different device sizes
- **App Icon**: Already configured
- **Privacy Policy URL**: Required for App Store
- **Keywords**: For search
- **Category**: Games or Utilities
- **Age Rating**: Complete questionnaire

### 9. Submit for Review

After `eas submit`, go to App Store Connect:
1. Complete all required fields
2. Add screenshots
3. Submit for review
4. Wait 1-3 days for Apple's review

## Build Profiles

EAS creates different build profiles. Edit `eas.json` to customize:

```json
{
  "build": {
    "production": {
      "ios": {
        "distribution": "store"
      }
    },
    "preview": {
      "ios": {
        "distribution": "internal"
      }
    },
    "development": {
      "ios": {
        "developmentClient": true
      }
    }
  }
}
```

## Important Notes

1. **Bundle Identifier**: Make sure `com.redlightgreenlight.app` is unique and registered in your Apple Developer account

2. **Version Numbers**: 
   - `version` in app.json = User-facing version (e.g., "1.0.0")
   - `buildNumber` in app.json = Build number (increment for each submission)

3. **Icons**: Your current icons are placeholders. Replace with:
   - 1024x1024px PNG for icon.png
   - Proper splash screen image

4. **Testing**: Use TestFlight (preview builds) to test before production submission

5. **Costs**:
   - Apple Developer: $99/year
   - EAS Build: Free tier available, paid plans for more builds

## Quick Commands Reference

```bash
# Login
eas login

# Configure
eas build:configure

# Build for App Store
eas build --platform ios --profile production

# Check build status
eas build:list

# Submit to App Store
eas submit --platform ios

# View build logs
eas build:view [build-id]
```

## Troubleshooting

- **Build fails**: Check logs with `eas build:view [build-id]`
- **Certificate issues**: EAS usually handles this automatically
- **Bundle ID conflicts**: Make sure it's unique and registered
- **Missing assets**: Ensure icon.png and splash.png are valid images

## Next Steps

1. Replace placeholder icons with real images
2. Test the app thoroughly
3. Prepare App Store listing content
4. Run `eas build --platform ios --profile production`
5. Submit when ready!

