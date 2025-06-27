# Spotify Clone PWA

A Spotify clone Progressive Web App (PWA). This app allows users to browse music, search tracks, and enjoy a native app-like experience on their devices.

## Features

- 🎵 **Music Discovery**: Browse popular tracks, featured playlists, and new releases
- 🔍 **Search Functionality**: Search for your favorite tracks
- ❤️ **Liked Songs**: Save and manage your favorite tracks
- 🎧 **Music Player**: Play tracks with full player controls
- 📱 **PWA Support**: Install as a native app on your device
- 🔄 **Offline Support**: Cache music data for offline browsing
- 🎨 **Modern UI**: Beautiful, responsive design inspired by Spotify

## PWA Features

- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: Works without internet connection
- **Auto Updates**: Automatically updates when new versions are available
- **Native Feel**: App-like experience with smooth animations
- **Background Sync**: Syncs data when connection is restored

## Installation

### Desktop (Chrome/Edge)
1. Open the app in your browser
2. Click the install icon in the address bar
3. Click "Install" to add to your desktop

### Mobile (Android)
1. Open the app in Chrome
2. Tap the menu (⋮) and select "Add to Home screen"
3. Tap "Add" to install the app

### Mobile (iOS)
1. Open the app in Safari
2. Tap the share button
3. Select "Add to Home Screen"
4. Tap "Add" to install the app

## Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd spotify-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Spotify API credentials:
   ```env
   VITE_APP_SPOTIFY_CLIENT_ID=your_client_id
   VITE_APP_SPOTIFY_CLIENT_SECRET=your_client_secret
   VITE_APP_SPOTIFY_BASE_URL=https://api.spotify.com/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

### PWA Build
```bash
npm run pwa:build
```

## Customization

### Icons
To customize the PWA icons:
1. Create your own icons (192x192, 512x512, and 180x180 for Apple)
2. Replace the placeholder files in the `public` folder
3. Update the manifest in `vite.config.ts` if needed

### Theme Colors
Update the theme colors in:
- `vite.config.ts` (manifest theme_color)
- `index.html` (meta theme-color)
- CSS variables in `src/css/global.css`

## Project Structure

```
src/
├── components/          # React components
├── context/            # React context providers
├── css/               # Stylesheets
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services
└── main.tsx          # App entry point
```

## PWA Configuration

The PWA is configured in `vite.config.ts` with:
- **Service Worker**: Handles caching and offline functionality
- **Manifest**: Defines app appearance and behavior
- **Icons**: Multiple sizes for different devices
- **Caching Strategy**: Network-first for API calls, cache-first for static assets

## Browser Support

- Chrome 67+
- Firefox 67+
- Safari 11.1+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
