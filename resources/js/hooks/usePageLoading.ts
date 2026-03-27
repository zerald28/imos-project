import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

/**
 * Hook that tracks Inertia navigation state (start/finish).
 * Returns a boolean 'loading' state you can use in components or layouts.
 */
export default function usePageLoading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set up event listeners — each returns an unsubscribe function
    const unsubscribeStart = router.on("start", () => setLoading(true));
    const unsubscribeFinish = router.on("finish", () => setLoading(false));

    // Clean up event listeners when unmounted
    return () => {
      unsubscribeStart();
      unsubscribeFinish();
    };
  }, []);

  return loading;
}
