"use client";

import { Typography } from "@/components/ui/typography";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useIsClient } from "usehooks-ts";
import { SectionLayout } from "./SectionLayout";

export const Pain = () => {
  const isClient = useIsClient();
  const themeObj = useTheme();

  const theme = isClient ? themeObj.theme : "dark";

  return (
    <SectionLayout
      variant="card"
      size="base"
      className="m-auto flex max-w-7xl flex-col items-center gap-4 px-8"
    >
      <div className="flex w-full flex-col gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1">
          95% des projets ne sont jamais mis en prod
        </Typography>
        <Typography variant="large">
          Tous les développeurs veulent créer des projets. Très peu arrives à
          les terminer !
        </Typography>
        <Typography variant="large">Pourquoi ?</Typography>
        <ul className="flex flex-col gap-2">
          <Typography
            as="li"
            variant="large"
            className="inline-flex items-center gap-2"
          >
            <X className="text-red-500" size={30} />
            <span className="flex-1">
              Être perdu dans le <b>"techno hell"</b> à réfléchir à LA
              meilleures libriarie
            </span>
          </Typography>
          <Typography
            as="li"
            variant="large"
            className="inline-flex items-center gap-2"
          >
            <X className="text-red-500" size={30} />
            <span className="flex-1">
              Perdes des d'heures à <b>setup le projet</b>
            </span>
          </Typography>
          <Typography
            as="li"
            variant="large"
            className="inline-flex items-center gap-2"
          >
            <X className="text-red-500" size={30} />
            <span className="flex-1">
              Galérer avec les nombreux bugs{" "}
              <b>d'authentification, database et j'en passe</b>
            </span>
          </Typography>
          <Typography
            as="li"
            variant="large"
            className="inline-flex items-center gap-2"
          >
            <X className="text-red-500" size={30} />
            <span className="flex-1">
              Refaire le design 40x tout ça pour avoir <b>un résutlat afreux</b>
            </span>
          </Typography>

          <Typography
            as="li"
            variant="large"
            className="inline-flex items-center gap-2"
          >
            <X className="text-red-500" size={30} />
            <span className="flex-1">
              Ne pas savoir comment <b>vendre</b> ton application
            </span>
          </Typography>
        </ul>
      </div>
      <div className="flex w-full justify-end">
        <Image
          key={theme}
          src={
            theme === "dark"
              ? "/images/pain-dark.png"
              : "/images/pain-light.png"
          }
          width={750}
          height={750}
          className="m-auto w-full max-w-xl"
          alt="now-explanation"
        />
      </div>
    </SectionLayout>
  );
};
