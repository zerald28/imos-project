import React, { useEffect } from "react";

export default function TestRealtime() {
  useEffect(() => {
    console.log("👂 Subscribing to test-channel...");

    window.Echo.channel("test-channel")
      .listen(".test.event", (e: any) => {
        console.log("📨 Event received from server:", e.message);
      })
      .error((err: unknown) => {
        if (err instanceof Error) {
          console.error("❌ Echo error:", err.message);
        } else {
          console.error("❌ Echo error:", err);
        }
      });
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Realtime Test</h1>
      <p>Waiting for broadcast...</p>
    </div>
  );
}
