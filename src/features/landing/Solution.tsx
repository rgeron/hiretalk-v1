"use client";

import { Typography } from "@/components/ui/typography";
import { ArrowRight, Check, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsClient } from "usehooks-ts";
import { SectionLayout } from "./SectionLayout";

export const Solution = () => {
  const isClient = useIsClient();
  const themeObj = useTheme();

  const theme = isClient ? themeObj.theme : "dark";

  return (
    <SectionLayout variant="invert" size="base">
      <div className="flex w-full flex-col gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1">
          Imagine un code ou tout est déjà prêt...
        </Typography>
        <Typography variant="large">Mais pas que !</Typography>
        <Typography variant="large">
          Un cours et des indications pour réaliser tes applications en un temps
          record...
        </Typography>
      </div>
      <div className="mt-12 flex w-full flex-col gap-6">
        <SolutionItem
          painChildren="Pas savoir quel techno choisir"
          solutionChildren={
            <>
              J'ai séléctionner <b>les meilleurs</b> outil pour 2024
            </>
          }
        />
        <SolutionItem
          painChildren={<>Perdre des heures à setup le projet</>}
          solutionChildren={
            <>
              J'ai créer un projet ou TOUT est setup (authentification,
              paiement, style, database etc...)
            </>
          }
        />
        <SolutionItem
          painChildren={<>Galérer avec les bugs</>}
          solutionChildren={
            <>
              J'ai vérifier qu'il n'y avait aucun bug et je t'ai préparer un
              cours pour que tu comprennes le code
            </>
          }
        />
        <SolutionItem
          painChildren={<>Refaire 40x le design</>}
          solutionChildren={
            <>
              J'utilises une librairie de composant simple à customizé et j'ai
              préparer de beau layout
            </>
          }
        />
        <SolutionItem
          painChildren={<>Ne pas savoir vendre ton application</>}
          solutionChildren={
            <>
              J'ai créer un cours pour te partager les meilleurs techniques pour
              vendre ton application
            </>
          }
        />
      </div>
    </SectionLayout>
  );
};

type SolutionProps = {
  painChildren: React.ReactNode;
  solutionChildren: React.ReactNode;
};

const SolutionItem = ({ painChildren, solutionChildren }: SolutionProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <Typography
        as="li"
        variant="large"
        className="inline-flex w-full  max-w-sm items-center gap-2"
      >
        <X className="text-red-500" size={30} />
        <span className="flex-1">{painChildren}</span>
      </Typography>
      <ArrowRight className="flex-1" size={30} />
      <Typography
        as="li"
        variant="large"
        className="inline-flex w-full max-w-sm items-center gap-2"
      >
        <Check className="text-green-500" size={30} />
        <span className="flex-1">{solutionChildren}</span>
      </Typography>
    </div>
  );
};

export default Solution;
