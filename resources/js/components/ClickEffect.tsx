// useClickEffect.ts
import { useRef } from "react";

export const useClickEffect = () => {
  const ref = useRef<HTMLElement | null>(null);

  const triggerClickEffect = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("click-pulse");
    void el.offsetWidth; // force reflow
    el.classList.add("click-pulse");
  };

  return { ref, triggerClickEffect };
};
