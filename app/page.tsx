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
import { ReviewSingle } from "@/features/review/ReviewSingle";
import { ReviewTriple } from "@/features/review/ReviewTriple";
import { Brush, Coins, KeyIcon, Mail, Stamp, User2 } from "lucide-react";

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
            gif: "/images/stripe.gif",
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
            gif: "https://i.pinimg.com/originals/a0/02/a3/a002a3e51a2adc85d6c0a4684892e743.gif",
          },

          {
            label: "Style et design",
            icon: <Brush />,
            description:
              "J'ai préparer tous les compsoants nécessaires pour créer une landing page, un dashboard etc... afin de m'assurer que ton application semble professionnel.",
            gif: "https://i.pinimg.com/originals/87/87/b4/8787b48e6e7f084b71cff1fd11cc5e73.gif",
          },
          {
            label: "Marketing",
            icon: <Stamp />,
            description:
              "Pour finir, tu peux avoir accès au cours complet pour apprendre à créer ton SaaS en partant de l'idée jusqu'au lancement et la vente de ton application.",
            gif: "https://i.pinimg.com/originals/87/87/b4/8787b48e6e7f084b71cff1fd11cc5e73.gif",
          },
        ]}
      />

      <ReviewSingle
        image="https://i.pravatar.cc/300?u=s1"
        name="Melvyn"
        role="Creator"
        review={`I really like this template, it's really easy to use and it's really fast to create a new page with it.`}
      />
      <SectionDivider />
      <CTASection
        ctaHref="/"
        backgroundImage="https://images.unsplash.com/photo-1682687982502-1529b3b33f85"
        ctaLabel="Rejoindre"
        subtitle="Tu le mérites."
        title="C'est le moment de passer à l'action."
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
      <Pricing
        cards={[
          {
            isPopular: true,
            type: "monthly",
            id: "basic-monthly",
            title: "Basic Plan",
            subtitle: "Perfect for individuals",
            price: 9.99,
            barredPrice: 12.99,
            currency: "USD",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            cta: "Subscribe Now",
            ctaSubtitle: "Billed monthly",
          },
          {
            type: "yearly",
            id: "pro-yearly",
            title: "Pro Plan",
            subtitle: "Ideal for professionals",
            price: 99.99,
            currency: "USD",
            features: ["Feature A", "Feature B", "Feature C", "Feature D"],
            cta: "Get Started",
            ctaSubtitle: "Billed yearly",
          },
          {
            type: "onetime",
            id: "enterprise",
            title: "Enterprise Package",
            subtitle: "For large scale businesses",
            price: 499,
            features: ["Advanced Feature 1", "Advanced Feature 2"],
            cta: "Contact Us",
            ctaSubtitle: "Custom pricing",
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
