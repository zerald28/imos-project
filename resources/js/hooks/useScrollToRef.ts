// useScrollToRef.ts
import { useEffect, useRef } from "react";

export function useScrollToRef(
  ref: React.RefObject<HTMLElement | null>, // ✅ allow null
  offset = 70
) {
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (!ref.current || hasScrolled.current) return;

    const scrollToElement = () => {
      if (!ref.current) return;
      const elementTop = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      const userScrolled = window.scrollY > elementTop - 10;

      if (!userScrolled) {
        window.scrollTo({ top: elementTop, behavior: "smooth" });
        hasScrolled.current = true;
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(scrollToElement));
    const timeout = setTimeout(scrollToElement, 200);
    return () => clearTimeout(timeout);
  }, [ref, offset]);
}
