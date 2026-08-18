import { useEffect } from 'react';

/**
 * Injects PWA metadata into <head> ONLY while an /admin route is mounted,
 * and registers a service worker scoped to /admin/ so it can never affect
 * the public storefront.
 *
 * The public site has its own <link rel="apple-touch-icon"> and
 * <meta name="theme-color"> in index.html for its own browser-tab polish.
 * Rather than appending a second, conflicting copy of those singular tags
 * (browsers only honor one), we temporarily swap their values to the admin
 * identity and restore the originals when leaving /admin.
 */
export const AdminPwaSetup = () => {
  useEffect(() => {
    const addedTags: HTMLElement[] = [];
    const restoreFns: (() => void)[] = [];

    const swapAttr = (selector: string, attr: string, newValue: string) => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (!el) return;
      const original = el.getAttribute(attr);
      el.setAttribute(attr, newValue);
      restoreFns.push(() => {
        if (original === null) el.removeAttribute(attr);
        else el.setAttribute(attr, original);
      });
    };

    const addTag = (build: () => HTMLElement) => {
      const el = build();
      document.head.appendChild(el);
      addedTags.push(el);
    };

    // Swap the public site's existing tags to the admin identity
    swapAttr('link[rel="apple-touch-icon"]', 'href', '/admin-apple-touch-icon.png');
    swapAttr('meta[name="theme-color"]', 'content', '#15100B');

    // Add tags that don't already exist on the public site
    addTag(() => {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/admin-manifest.webmanifest';
      return link;
    });
    addTag(() => {
      const meta = document.createElement('meta');
      meta.name = 'apple-mobile-web-app-capable';
      meta.content = 'yes';
      return meta;
    });
    addTag(() => {
      const meta = document.createElement('meta');
      meta.name = 'apple-mobile-web-app-status-bar-style';
      meta.content = 'black-translucent';
      return meta;
    });
    addTag(() => {
      const meta = document.createElement('meta');
      meta.name = 'apple-mobile-web-app-title';
      meta.content = 'Abhishek Admin';
      return meta;
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/admin-sw.js', { scope: '/admin/' })
        .catch((err) => console.warn('Admin service worker registration failed:', err));
    }

    return () => {
      addedTags.forEach((el) => el.remove());
      restoreFns.forEach((fn) => fn());
    };
  }, []);

  return null;
};
