import { useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Captures the browser's "beforeinstallprompt" event (Chrome/Edge/Android)
 * so we can show our own "Install App" button instead of relying on the
 * browser's address-bar icon, which is easy to miss inside /admin.
 *
 * iOS Safari never fires this event — there, installing is a manual
 * "Share -> Add to Home Screen" step, so we surface a short instruction
 * instead of a button when we detect iOS.
 */
export function useAdminInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    setIsStandalone(standaloneQuery.matches || (window.navigator as any).standalone === true);

    const handleDisplayModeChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches);
    standaloneQuery.addEventListener?.('change', handleDisplayModeChange);

    setIsIos(/iphone|ipad|ipod/i.test(window.navigator.userAgent));

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    const handleInstalled = () => setDeferredPrompt(null);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      standaloneQuery.removeEventListener?.('change', handleDisplayModeChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return outcome === 'accepted';
  }, [deferredPrompt]);

  return {
    canInstall: !!deferredPrompt && !isStandalone,
    isStandalone,
    isIos: isIos && !isStandalone,
    promptInstall,
  };
}
