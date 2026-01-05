# Google Play Store Submission Guide

## Why Android is Easier:

1. **Cost**: $25 one-time fee (vs $99/year for iOS)
2. **Review Time**: Usually faster, sometimes instant (vs 1-3 days for iOS)
3. **Setup**: Simpler - no certificates/profiles needed
4. **Testing**: Can upload and test immediately (vs TestFlight setup)

## Step-by-Step Process

### 1. Create Google Play Developer Account

1. Go to https://play.google.com/console
2. Pay the $25 one-time registration fee
3. Complete your developer profile

### 2. Login to EAS (if not already done)

```bash
eas login
```

### 3. Configure EAS Build (if not already done)

```bash
eas build:configure
```

This will create/update `eas.json` with Android configuration.

### 4. Build for Android

#### For Play Store Submission:
```bash
eas build --platform android --profile production
```

#### For Testing (Internal Testing):
```bash
eas build --platform android --profile preview
```

**Note**: EAS will automatically:
- Generate a keystore for signing
- Handle all signing certificates
- Create the APK/AAB file

### 5. Wait for Build

Build takes 10-20 minutes. Check status:
```bash
eas build:list
```

### 6. Submit to Google Play

Once build completes:

```bash
eas submit --platform android
```

This will:
1. Upload your app to Google Play Console
2. Create a new app (if first time)
3. Set up the release

### 7. Google Play Console Setup

1. Go to https://play.google.com/console
2. Create new app (if first time):
   - App name: "Red Light Green Light"
   - Default language
   - App or game: Game
   - Free or paid: Free
   - Declare ads: Yes/No

### 8. Complete Store Listing

Required information:
- **App Description**: Short and full description
- **Screenshots**: 
  - Phone: At least 2 (up to 8)
  - Tablet: Optional but recommended
  - TV: Optional
- **App Icon**: 512x512px (high-res icon)
- **Feature Graphic**: 1024x500px banner
- **Privacy Policy**: URL required (can be simple)
- **Content Rating**: Complete questionnaire
- **Target Audience**: Age group

### 9. Release to Testing (Recommended First)

Before production, test with:
- **Internal Testing**: Immediate, up to 100 testers
- **Closed Testing**: Up to 20,000 testers
- **Open Testing**: Unlimited testers

### 10. Submit for Production

1. Go to Production in Play Console
2. Create new release
3. Upload the AAB file (or use EAS submit)
4. Add release notes
5. Review and roll out

## Build Commands

```bash
# Build for Play Store
eas build --platform android --profile production

# Build for testing
eas build --platform android --profile preview

# Submit to Play Store
eas submit --platform android

# Check build status
eas build:list
```

## Key Differences from iOS

### Easier:
- ✅ One-time $25 fee (vs $99/year)
- ✅ No certificates to manage manually
- ✅ Faster review process
- ✅ Can test immediately
- ✅ More flexible with updates

### Similar:
- ✅ Both use EAS Build
- ✅ Both need store listing content
- ✅ Both need screenshots
- ✅ Both need privacy policy

## Android-Specific Requirements

1. **App Bundle (AAB)**: Google prefers AAB over APK (EAS builds AAB by default)

2. **Target SDK**: Your app.json should specify (Expo handles this)

3. **Permissions**: Already declared in your app.json if needed

4. **Content Rating**: Complete questionnaire in Play Console

5. **Data Safety**: Required form about data collection

## Quick Comparison

| Feature | iOS | Android |
|---------|-----|---------|
| Cost | $99/year | $25 one-time |
| Review Time | 1-3 days | Hours to 1 day |
| Setup Complexity | Higher | Lower |
| Testing | TestFlight | Internal/Closed/Open |
| Update Speed | Slower | Faster |

## Recommended Approach

1. **Start with Android** - Easier and cheaper to test the process
2. **Get feedback** - Test with friends/family
3. **Then do iOS** - Once you're confident

## Next Steps

1. Create Google Play Developer account ($25)
2. Run `eas build --platform android --profile production`
3. Submit with `eas submit --platform android`
4. Complete store listing in Play Console
5. Release to testing first, then production

## Troubleshooting

- **Build fails**: Check `eas build:list` and view logs
- **Signing issues**: EAS handles this automatically
- **Package name**: Already set in app.json as `com.redlightgreenlight.app`
- **Missing assets**: Ensure icon.png is 1024x1024px

