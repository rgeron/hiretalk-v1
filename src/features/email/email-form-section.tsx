import { Typography } from "@/components/nowts/typography";
import { SectionLayout } from "../landing/section-layout";
import { EmailForm } from "./email-form";

export const EmailFormSection = () => {
  return (
    <SectionLayout
      size="lg"
      className="relative flex w-full flex-col items-center gap-16"
    >
      <div className="relative m-auto flex max-w-xl flex-col gap-4 text-center">
        <Typography
          variant="small"
          className="text-primary font-extrabold uppercase"
        >
          Révolutionnez votre recrutement
        </Typography>
        <Typography variant="h2" className="text-center text-4xl lg:text-5xl">
          Rejoignez les entreprises qui utilisent{" "}
          <span className="text-gradient from-primary to-secondary bg-gradient-to-r font-mono font-extrabold uppercase">
            Talk2Apply
          </span>
        </Typography>
        <Typography variant="h3">
          Obtenez une démo personnalisée et découvrez comment remplacer
          efficacement vos lettres de motivation.
        </Typography>
        <div className="mx-auto mt-6 w-full max-w-md">
          <EmailForm
            submitButtonLabel="Demander une démo"
            successMessage="Merci pour votre intérêt ! Un membre de notre équipe vous contactera prochainement."
          />
        </div>
      </div>
    </SectionLayout>
  );
};
