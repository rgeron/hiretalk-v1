import { BuyButton } from "@/components/stripe/BuyButton";
import { CTASection } from "@/features/landing/CTASection";
import { FAQSection } from "@/features/landing/FAQSection";
import { FeaturesPreviewSection } from "@/features/landing/FeaturesPreviewSection";
import { Hero } from "@/features/landing/Hero";
import { SectionDivider } from "@/features/landing/SectionDivider";
import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import { Pricing } from "@/features/pricing/PricingSection";
import { ReviewGrid } from "@/features/review/ReviewGrid";
import { ReviewSingle } from "@/features/review/ReviewSingle";
import { ReviewTriple } from "@/features/review/ReviewTriple";
import { Coins, KeyIcon, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
      <BuyButton priceId="price_1O37EFGPhxExaYaQWQK1Gm97">Join now</BuyButton>
      <Header />
      <Hero />

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
      <FeaturesPreviewSection
        features={[
          {
            label: "Email",
            icon: <Mail />,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            gif: "https://i.pinimg.com/originals/a0/02/a3/a002a3e51a2adc85d6c0a4684892e743.gif",
          },
          {
            label: "Stripe",
            icon: <Coins />,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            gif: "https://media3.giphy.com/media/WXB88TeARFVvi/200w.gif?cid=6c09b952bov2swd3to4vav7bsgrkxkivmgjepx3kz7kvxh8v&ep=v1_gifs_search&rid=200w.gif&ct=g",
          },
          {
            label: "Authentification",
            icon: <KeyIcon />,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            gif: "https://i.pinimg.com/originals/87/87/b4/8787b48e6e7f084b71cff1fd11cc5e73.gif",
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
