import { Rocket } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

export const Hero = () => {
  return (
    <main className="m-auto flex max-w-7xl items-center gap-4 px-8 max-lg:flex-col">
      <div className="flex flex-1 flex-col gap-4">
        <Typography variant="h1">
          Crée ton application en quelques jours avec{" "}
          <span className="bg-foreground text-background">la stack ULTIME</span>
        </Typography>
        <Typography variant={"large"}>
          Après avoir créé plus de 7 applications avec Next.JS, je pense avoir
          trouvé LA stack ultime pour créer des applications en quelques jours.
        </Typography>
        <Button size="lg" className="w-fit">
          <Rocket size={28} className="mr-2" />
          <span className="text-base">Create NOW</span>
        </Button>
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
