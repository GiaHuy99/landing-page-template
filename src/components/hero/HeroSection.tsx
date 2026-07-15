"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { heroContent, HERO_AUTOPLAY_MS } from "@/content/hero";
import { scrollToSection } from "@/lib/scroll";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const slides = heroContent.slides;
  const {
    activeIndex,
    goNext,
    goPrev,
    goTo,
    pauseAutoplay,
    resumeAutoplay,
  } = useHeroCarousel({
    slideCount: slides.length,
    autoplayMs: HERO_AUTOPLAY_MS,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.src})` }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-navy" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center pt-20 pb-16">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
          {heroContent.brand}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white max-w-3xl leading-tight mb-4">
          {heroContent.title}
        </h1>
        <p className="text-cream text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
          {heroContent.subtitle}
        </p>
        <Button
          onClick={() => {
            const id = heroContent.ctaHref.replace("#", "");
            scrollToSection(id);
          }}
        >
          {heroContent.ctaLabel}
        </Button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          className="p-2 border border-white/20 text-white/80 hover:text-white hover:border-gold/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          className="p-2 border border-white/20 text-white/80 hover:text-white hover:border-gold/50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
