"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionLayout } from "./section-layout";

type StatProps = {
  number: number;
  suffix: string;
  text: string;
};

const stats: StatProps[] = [
  {
    number: 40,
    suffix: "%",
    text: "Réduction du temps consacré au tri des candidatures.",
  },
  {
    number: 72,
    suffix: "%",
    text: "Des recruteurs constatent une meilleure qualité de candidats.",
  },
  {
    number: 15,
    suffix: "K+",
    text: "Entretiens IA réalisés chaque mois via notre plateforme.",
  },
  {
    number: 30,
    suffix: "%",
    text: "Augmentation du taux de conversion candidat → embauche.",
  },
];

export function StatsSection() {
  return (
    <SectionLayout size="sm">
      <div className="grid w-full items-center gap-12 sm:grid-cols-2 md:-mx-5 md:max-w-none md:grid-cols-4 md:gap-0">
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center md:px-5">
            <h4 className="mb-2 text-2xl font-bold tabular-nums md:text-3xl">
              <Counter from={0} to={stat.number} />

              {stat.suffix}
            </h4>
            <p className="text-muted-foreground text-sm">{stat.text}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}

function Counter({
  from,
  to,
  duration = 2,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      ease: "easeInOut",

      onUpdate(value) {
        node.textContent = value.toFixed(2);
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
}
