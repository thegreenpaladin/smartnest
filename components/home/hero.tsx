"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    id: "s1",
    eyebrow: "Smart Deals This Week",
    title: "Smart Wearables",
    subtitle: "Up to 35% OFF",
    cta: "/shop?category=personal-climate",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
    accent: "from-[#12345e] via-[#184976] to-[#1f5f92]",
  },
  {
    id: "s2",
    eyebrow: "Home Setup Upgrade",
    title: "Lighting + Utility",
    subtitle: "Build a cleaner, smarter desk",
    cta: "/shop?category=lighting",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1200",
    accent: "from-[#0f3559] via-[#14456f] to-[#1a5a89]",
  },
  {
    id: "s3",
    eyebrow: "Power Everywhere",
    title: "Portable Charging",
    subtitle: "Fast-charge essentials for work & travel",
    cta: "/shop?category=portable-power",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=1200",
    accent: "from-[#173e67] via-[#20507c] to-[#2a6799]",
  },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[index];
  const goNext = () => setIndex((current) => (current + 1) % slides.length);
  const goPrev = () => setIndex((current) => (current - 1 + slides.length) % slides.length);

  return (
    <section className="w-full px-4 md:px-6 pt-5 pb-6">
      <div className={`relative overflow-hidden border border-[#b9cee6] bg-gradient-to-r ${activeSlide.accent}`}>
        <div className="grid md:grid-cols-[1.1fr_0.9fr] items-center gap-8 px-8 md:px-12 py-10 md:py-12">
          <div className="text-white space-y-4 z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d7ecff] font-semibold">{activeSlide.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-[0.95]">{activeSlide.title}</h1>
            <p className="text-base md:text-lg text-[#d7ecff]">{activeSlide.subtitle}</p>
            <Link
              href={activeSlide.cta}
              className="inline-flex items-center border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#123e67] hover:bg-[#eef7ff]"
            >
              Shop this deal
            </Link>
          </div>

          <div className="relative h-56 md:h-72">
            <Image src={activeSlide.image} alt={activeSlide.title} fill className="object-contain object-right" priority />
          </div>
        </div>

        <button
          onClick={goPrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[#d5e8fb] bg-white text-[#174d7f] shadow-md grid place-items-center transition hover:bg-[#ecf5ff]"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[#d5e8fb] bg-white text-[#174d7f] shadow-md grid place-items-center transition hover:bg-[#ecf5ff]"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-8 flex gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              onClick={() => setIndex(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              className={`h-1.5 transition-all ${slideIndex === index ? "w-8 bg-white" : "w-3 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
