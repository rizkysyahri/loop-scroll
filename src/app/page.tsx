"use client";

import Intro from "@/components/intro";
import { useEffect } from "react";
import Lenis from "lenis";
import Draggable from "@/components/draggable";

export default function Home() {
  useEffect(() => {
    // smooth scroll
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // smooth scroll
  }, []);
  return (
    <>
      <Intro />
      {/* <Draggable /> */}
    </>
  );
}
