"use client";

import { useCallback, useEffect, useState } from "react";

type UseHeroCarouselOptions = {
  slideCount: number;
  autoplayMs?: number;
  enableKeyboard?: boolean;
};

export function useHeroCarousel({
  slideCount,
  autoplayMs = 5000,
  enableKeyboard = true,
}: UseHeroCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (slideCount <= 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(
    () => goTo(activeIndex + 1),
    [activeIndex, goTo],
  );
  const goPrev = useCallback(
    () => goTo(activeIndex - 1),
    [activeIndex, goTo],
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || autoplayPaused || slideCount <= 1) return;

    const timer = window.setInterval(goNext, autoplayMs);
    return () => window.clearInterval(timer);
  }, [goNext, autoplayPaused, autoplayMs, slideCount]);

  useEffect(() => {
    if (!enableKeyboard) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableKeyboard, goNext, goPrev]);

  return {
    activeIndex,
    goTo,
    goNext,
    goPrev,
    pauseAutoplay: () => setAutoplayPaused(true),
    resumeAutoplay: () => setAutoplayPaused(false),
  };
}
