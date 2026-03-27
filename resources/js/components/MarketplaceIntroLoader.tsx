// resources/js/Components/MarketplaceIntroLoader.tsx
import React, { useEffect, useState } from "react";

export default function MarketplaceIntroLoader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out before removing from DOM
    const timeout = setTimeout(() => setFadeOut(true), 1200); // start fade-out slightly before 1.5s
    const removeTimeout = setTimeout(() => setShow(false), 1500); // actually hide after transition
    return () => {
      clearTimeout(timeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-sidebar-primary dark:bg-gray-900 
        transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <img
        src="/marketplacelogo.png"
        alt="Marketplace Logo"
        className="w-64 h-64 mb-4 animate-pulse opacity-0 transition-opacity duration-700"
        onLoad={(e) => (e.currentTarget.style.opacity = "1")} // fade-in logo when loaded
        loading="eager"
      />
      <div className="flex space-x-1 mt-2">
        <span className="w-2 h-2 bg-sidebar rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-sidebar rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-sidebar rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
}
