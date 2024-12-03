"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";

export default function Draggable() {
  const containerRef = useRef(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef([]); // To store image elements for looping

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".image-slide");

    let maxWidth = 0;

    // Calculate maxWidth based on all image widths
    const getMaxWidth = () => {
      maxWidth = 0;
      sections.forEach((section: any) => {
        maxWidth += section.offsetWidth;
      });
    };
    getMaxWidth();
    ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

    // GSAP Tween to move images horizontally
    let scrollTween = gsap.to(sections, {
      x: () => -(maxWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: true,
        end: "+=5000", // Length of scrollable area
        invalidateOnRefresh: true,
        snap: {
          snapTo: (progress: number) => {
            const totalSections = sections.length - 1;
            const targetIdx = Math.round(progress * totalSections);
            return targetIdx / totalSections;
          },
          duration: 0.4,
          ease: "power2.inOut",
        },
      },
    });

    // Add looping logic for dragging effect
    const dragScroll = gsap.to(sections, {
      x: () => -(maxWidth - window.innerWidth),
      paused: true,
      duration: 0.5,
    });

    let dragStart = 0;
    let dragEnd = 0;

    const handleDrag = (e: MouseEvent | TouchEvent) => {
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const dragDistance = x - dragStart;
      dragEnd = dragDistance;

      gsap.set(sections, { x: dragEnd });
    };

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      dragStart = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("touchmove", handleDrag);
    };

    const handleDragEnd = () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleDrag);

      if (dragEnd < -100) {
        gsap.to(sections, {
          x: `+=${maxWidth}`,
          duration: 0.3,
        });
      } else if (dragEnd > 100) {
        gsap.to(sections, {
          x: `-=${maxWidth}`,
          duration: 0.3,
        });
      }
    };

    imagesContainerRef.current?.addEventListener("mousedown", handleDragStart);
    imagesContainerRef.current?.addEventListener("touchstart", handleDragStart);
    imagesContainerRef.current?.addEventListener("mouseup", handleDragEnd);
    imagesContainerRef.current?.addEventListener("touchend", handleDragEnd);

    // Loop logic after dragging
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
      imagesContainerRef.current?.removeEventListener(
        "mousedown",
        handleDragStart
      );
      imagesContainerRef.current?.removeEventListener(
        "touchstart",
        handleDragStart
      );
      imagesContainerRef.current?.removeEventListener("mouseup", handleDragEnd);
      imagesContainerRef.current?.removeEventListener(
        "touchend",
        handleDragEnd
      );
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-full z-[2] overflow-hidden"
      ref={containerRef}
    >
      <div
        className="fixed top-0 left-0 w-full h-full flex select-none overflow-hidden"
        ref={imagesContainerRef}
      >
        <div className="min-w-full relative image-slide">
          <div className="inset-0 absolute">
            <Image
              src="https://cdn.sanity.io/images/0lcqjj4b/production/9e1aba67afcab3c93f415c2ca901f483727c4f9c-2560x1440.jpg?q=100&auto=format"
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
              src="https://cdn.sanity.io/images/0lcqjj4b/production/41e6450b375bf97d5e1c7ae8700f9a1344ceaf57-2560x1440.jpg?q=100&auto=format"
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
              src="https://cdn.sanity.io/images/0lcqjj4b/production/91b221970dca87e4a00c9373535c0625b369999d-2560x1440.jpg?q=100&auto=format"
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
              src="https://cdn.sanity.io/images/0lcqjj4b/production/9e1aba67afcab3c93f415c2ca901f483727c4f9c-2560x1440.jpg?q=100&auto=format"
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
