"use client";

import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from "./section-layout";

export const PainSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1">À l'ère de ChatGPT...</Typography>
        <Typography variant="large">
          La lettre de motivation est devenue obsolète et inefficace
        </Typography>
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="flex-1 rounded-lg bg-red-500/20 p-4 lg:p-6">
            <Typography variant="h3" className="text-red-500">
              😞 Recrutement traditionnel
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-lg">
              <li>Des centaines de lettres générées par IA en 5 minutes</li>
              <li>Impossible de mesurer l'intérêt réel du candidat</li>
              <li>Tri des candidatures chronophage et inefficace</li>
              <li>Aucune évaluation des soft skills</li>
            </ul>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/20 p-4 lg:p-6">
            <Typography variant="h3" className="text-green-500">
              😎 Recrutement avec Talk2Apply
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-lg">
              <li>Entretiens oraux instantanés avec IA personnalisée</li>
              <li>Filtre naturel : seuls les candidats motivés participent</li>
              <li>Synthèse structurée et score d'engagement automatisés</li>
              <li>Évaluation des soft skills dès la première étape</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
