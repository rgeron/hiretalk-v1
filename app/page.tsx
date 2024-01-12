import { CTASection } from "@/features/landing/CTASection";
import { FAQSection } from "@/features/landing/FAQSection";
import { FeaturesPreviewSection } from "@/features/landing/FeaturesPreviewSection";
import { Hero } from "@/features/landing/Hero";
import { Pain } from "@/features/landing/Pain";
import { SectionDivider } from "@/features/landing/SectionDivider";
import { Solution } from "@/features/landing/Solution";
import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import { Pricing } from "@/features/pricing/PricingSection";
import { ReviewGrid } from "@/features/review/ReviewGrid";
import { ReviewTriple } from "@/features/review/ReviewTriple";
import { Brush, Code, Coins, KeyIcon, Mail, Stamp, User2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
      <Header />
      <Hero />

      <Pain />
      <Solution />

      <FeaturesPreviewSection
        features={[
          {
            label: "Stripe",
            icon: <Coins />,
            description:
              "Les paiements, les abonnements, le checkout etc... tout est déjà prêt. Il te suffit de faire les configurations nécessaires dans les paramètres et voir la magie opérer.",
            gif: "/images/stripe2.gif",
          },
          {
            label: "Authentification",
            icon: <KeyIcon />,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            gif: "/images/authentification.gif",
          },
          {
            label: "User management",
            icon: <User2 />,
            description:
              "Payer pour Clerk ? Non. J'ai déjà préparer tous le desgin qui permet à l'utilisateur de facilement modifier ses informations, supprimer son compte etc...",
            gif: "/images/user-management.gif",
          },
          {
            label: "Email",
            icon: <Mail />,
            description:
              "L'envoie d'email n'a jamais été aussi simple. J'ai mis en place Resend et React-email pour offrir à tes utilisateur et au dévleoppeur la meilleur expérience d'email.",
            gif: "/images/mail.gif",
          },

          {
            label: "Style et design",
            icon: <Brush />,
            description:
              "J'ai préparer tous les compsoants nécessaires pour créer une landing page, un dashboard etc... afin de m'assurer que ton application semble professionnel.",
            gif: "/images/ui.png",
          },
          {
            label: "Developer experience à 100%",
            icon: <Code />,
            description:
              "Setup ESLint, Prettier et même Snippets, j'ai pensée à tout. Plus aucune pertes de temps à lire et relire la documentation, j'ai tout préparer pour toi. Pour créer une page NextJS, suffit de faire 'npag' !",
            gif: "/images/dev.gif",
          },
          {
            label: "Marketing",
            icon: <Stamp />,
            description:
              "Pour finir, tu peux avoir accès au cours complet pour apprendre à créer ton SaaS en partant de l'idée jusqu'au lancement et la vente de ton application.",
            gif: "/images/marketing.png",
          },
        ]}
      />

      <CTASection
        ctaHref="#pricing"
        backgroundImage="https://images.unsplash.com/photo-1550418290-a8d86ad674a6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ctaLabel="Rejoindre"
        subtitle="Investit dans tes applications et rejoint la communauté."
        title="C'est l'heure de transformer tes idées en réalité."
      />

      <Pricing
        cards={[
          {
            type: "one-time",
            id: "nowts-onl",
            title: "Now.ts Template Only",
            subtitle: "Parfait pour les développeurs qui veulent aller vite",
            price: 99,
            barredPrice: 150,
            currency: "EUR",
            features: [
              "Template Now.ts à vie",
              "Mise à jour pendant 1 an",
              "Rejoins la communauté Discord",
            ],
            cta: "Crée maintenant",
            ctaSubtitle: "Paiement unique",
          },
          {
            isPopular: true,
            type: "one-time",
            id: "nowts-courses",
            title: "Now.ts + Le cours complet",
            subtitle: "Parfait pour les personnes qui veulent tout savoir",
            price: 149,
            barredPrice: 300,
            currency: "EUR",
            features: [
              "Template Now.ts à vie",
              "Mise à jour pendant 1 an",
              "Rejoins la communauté Discord",
              "Cours pour apprendre à VENDRE ton SaaS avec des experts",
              "Cours pour avoir des idées",
              "Cours pour comprendre Stripe",
              "Cours sur le marketing",
              "Rejoins la communauté discord",
            ],
            cta: "Rejoindre maintenant",
            ctaSubtitle: "Paiement unique",
          },
        ]}
      />

      <FAQSection
        faq={[
          {
            question: "How can I integrate your form product with my website?",
            answer:
              "Easily! Just copy the embed code from the form's settings and paste it into your website's HTML. It's compatible with most web platforms.",
          },
          {
            question:
              "Can I customize the design of the form to match my brand?",
            answer:
              "Absolutely! Our form builder allows you to customize colors, fonts, and layouts to align with your brand's aesthetic.",
          },
          {
            question:
              "Is there a way to receive notifications when someone submits a form?",
            answer:
              "Yes, you can set up email notifications or integrate with your preferred CRM to get real-time updates on form submissions.",
          },
        ]}
      />

      <SectionDivider />
      <ReviewTriple
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=t1",
            name: "Melvyn",
            review: `I really like this template, it's really easy to use and it's really fast to create a new page with it.`,
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t2",
            name: "Melvyn",
            review: `I really like this template, it's really easy to use and it's really fast to create a new page with it.`,
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t3",
            name: "Melvyn",
            review: `I really like this template, it's really easy to use and it's really fast to create a new page with it.`,
            role: "Creator",
          },
        ]}
      />
      <SectionDivider />
      <ReviewGrid
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=t33",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t26",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t6",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet",

            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t62",
            name: "Melvyn",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t1",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t33",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t26",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t6",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet",

            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t62",
            name: "Melvyn",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=t1",
            name: "Melvyn",
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            role: "Creator",
          },
        ]}
      />
      <SectionDivider />
      <Footer />
    </div>
  );
}
