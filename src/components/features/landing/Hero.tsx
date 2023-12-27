import { Rocket } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";
import { ReviewSmall } from "../review/ReviewSmall";

export const Hero = () => {
  return (
    <main className="m-auto flex min-h-[90vh] max-w-7xl items-center gap-4 px-8 max-lg:flex-col">
      <div className="flex flex-1 flex-col gap-6 lg:gap-8 xl:gap-12">
        <Typography variant="h1">
          Crée ton application en quelques jours avec{" "}
          <span className="bg-foreground text-background">la stack ULTIME</span>
        </Typography>
        <Typography variant={"large"}>
          Après avoir créé plus de 7 applications avec Next.JS, je pense avoir
          trouvé LA stack ultime pour créer des applications en quelques jours.
        </Typography>
        <Button size="lg" className="w-fit">
          <Rocket size={24} className="mr-2" />
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
      <div className="flex-1">
        <Image
          src="/images/nowts.png"
          width={500}
          height={500}
          alt="now-explanation"
        />
      </div>
    </main>
  );
};
