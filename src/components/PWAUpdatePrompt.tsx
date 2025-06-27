import { useState, useEffect } from 'react';

interface PWAUpdatePromptProps {
  onUpdate: () => void;
  onSkip: () => void;
}

const PWAUpdatePrompt: React.FC<PWAUpdatePromptProps> = ({ onUpdate, onSkip }) => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled event to hide the install prompt
    window.addEventListener('appinstalled', () => {
      setShowInstallPrompt(false);
    });

    // Listen for service worker update
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setShowUpdatePrompt(true);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (showInstallPrompt) {
    return (
      <div className="pwa-update-prompt">
        <div className="pwa-update-content">
          <h3>Install App</h3>
          <p>Add Spotify Clone to your home screen for a better experience.</p>
          <div className="pwa-update-buttons">
            <button onClick={handleInstall} className="pwa-update-button">
              Install
            </button>
            <button onClick={() => setShowInstallPrompt(false)} className="pwa-skip-button">
              Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showUpdatePrompt) return null;

  return (
    <div className="pwa-update-prompt">
      <div className="pwa-update-content">
        <h3>New Version Available</h3>
        <p>A new version of Spotify Clone is available. Would you like to update?</p>
        <div className="pwa-update-buttons">
          <button onClick={onUpdate} className="pwa-update-button">
            Update Now
          </button>
          <button onClick={onSkip} className="pwa-skip-button">
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt; 