import { Rocket } from "lucide-react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Typography } from "../../components/ui/typography";
import { ReviewSmall } from "../review/ReviewSmall";

export const Hero = () => {
  return (
    <main className="m-auto flex min-h-[90vh] max-w-7xl items-center gap-4 px-8 max-lg:flex-col">
      <div className="flex flex-1 flex-col gap-6 lg:gap-8 xl:gap-12">
        <Typography variant="h1" className="!leading-tight">
          Crée une application de <b>PRO</b>{" "}
          <span className="bg-foreground text-background">
            peu importe tes compétences
          </span>
        </Typography>
        <Typography variant={"large"}>
          Arrête de perdre du temps à configurer ton projet, choisir les bonnes
          bibliothèques, etc... commence dès maintenant ta future application.
        </Typography>
        <Button size="lg" className="w-fit">
          <Rocket size={20} className="mr-2" />
          <span className="text-base">Rejoins maintenant</span>
        </Button>
        <ReviewSmall
          stars={5}
          avatars={[
            "https://i.pravatar.cc/300?u=1",
            "https://i.pravatar.cc/300?u=2",
            "https://i.pravatar.cc/300?u=3",
            "https://i.pravatar.cc/300?u=4",
            "https://i.pravatar.cc/300?u=5",
          ]}
        >
          <b>100 applications</b> créer
        </ReviewSmall>
      </div>
      <div className="flex flex-1 justify-end">
        <Image
          src="/images/nowts-2.png"
          width={500}
          height={500}
          alt="now-explanation"
        />
      </div>
    </main>
  );
};
