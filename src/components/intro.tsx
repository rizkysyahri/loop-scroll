"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";

export default function Intro() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLDivElement>(".image-slide");

    let maxWidth = 0;

    const getMaxWidth = () => {
      maxWidth = 0;
      sections.forEach((section: any) => {
        maxWidth += section.offsetWidth;
      });
    };
    getMaxWidth();
    ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

    let scrollTween = gsap.to(sections, {
      x: () => -(maxWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: true,
        end: "+=5000",
        invalidateOnRefresh: true,
        snap: {
          snapTo: (progress: number) => {
            const totalSections = sections.length - 1;
            const targetIdx = Math.round(progress * totalSections);
            return targetIdx / totalSections;
          },
          duration: 0.4,
          ease: "power3.inOut",
        },
      },
    });

    ScrollTrigger.create({
      start: 0.1,
      end: () => ScrollTrigger.maxScroll(window) - 2,
      refreshPriority: -100, // always update last
      onLeave: (self) => {
        self.scroll(self.start + 1);
        ScrollTrigger.update();
      },
      onLeaveBack: (self) => {
        self.scroll(self.end - 1);
        ScrollTrigger.update();
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-full z-[2]"
      ref={containerRef}
    >
      <div className="fixed top-0 left-0 w-full h-full flex select-none">
        <div className="min-w-full relative image-slide">
          <div className="inset-0 absolute">
            <Image
              src="/van 1.jpg"
              alt="image"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="min-w-full relative image-slide">
          <div className="inset-0 absolute">
            <Image
              src="/van 2.jpg"
              alt="image"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="min-w-full relative image-slide">
          <div className="inset-0 absolute">
            <Image
              src="/van 3.jpg"
              alt="image"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="min-w-full relative image-slide">
          <div className="inset-0 absolute">
            <Image
              src="/van 1.jpg"
              alt="image"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
