"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useIsClient } from "usehooks-ts";

export const CanvasConfettiBySide = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isClient = useIsClient;

  useEffect(() => {
    const canvas = canvasRef.current;
    const colors = ["#ef4444", "#f59e0b"];
    const end = Date.now() + 5 * 1000;

    if (!canvas) {
      return;
    }

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const frame = () => {
      void myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      void myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      myConfetti.reset();
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 h-full w-full"
    ></canvas>,
    window.document.body
  );
};
