import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "../landing/SectionLayout";
import { EmailForm } from "./EmailForm";

export const EmailFormSection = () => {
  return (
    <SectionLayout
      variant="invert"
      className="flex flex-col items-center gap-4"
    >
      <Typography variant="h1" as="h2">
        Sois informé de la sortie de Now.ts
      </Typography>
      <Typography variant="h3">
        Ne loupe pas la promotion de lancement et sois le premier a rejoindre la
        communauté Now.ts
      </Typography>
      <div className="m-auto w-full max-w-md">
        <EmailForm />
      </div>
    </SectionLayout>
  );
};
