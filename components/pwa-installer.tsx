"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PWAInstaller() {
  const pathname = usePathname();

  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          // Silently fail in development
          console.log("Service Worker not available in development mode");
        });
    }

    // Handle PWA install prompt
    let deferredPrompt: any;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button
      const installButton = document.getElementById("pwa-install-button");
      if (installButton) {
        installButton.style.display = "block";
        installButton.addEventListener("click", async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("User choice:", outcome);
            deferredPrompt = null;
            if (installButton) {
              installButton.style.display = "none";
            }
          }
        });
      }
    });

    // Handle app installed
    window.addEventListener("appinstalled", () => {
      console.log("PWA installed");
      deferredPrompt = null;
    });
  }, [pathname]);

  return null;
}

