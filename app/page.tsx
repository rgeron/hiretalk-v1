import { Faq } from "@/features/landing/Faq";
import { FeaturesPreview } from "@/features/landing/FeaturesPreview";
import { Hero } from "@/features/landing/Hero";
import { SectionDivider } from "@/features/landing/SectionDivider";
import { Footer } from "@/features/layout/Footer";
import { Header } from "@/features/layout/Header";
import { ReviewGrid } from "@/features/review/ReviewGrid";
import { ReviewSingle } from "@/features/review/ReviewSingle";
import { ReviewTriple } from "@/features/review/ReviewTriple";
import { Coins, KeyIcon, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
      <Header />
      <Hero />

      <ReviewSingle
        image="https://i.pravatar.cc/300?u=s1"
        name="Melvyn"
        role="Creator"
        review={`I really like this template, it's really easy to use and it's really fast to create a new page with it.`}
      />
      <SectionDivider />
      <Faq
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
      <FeaturesPreview
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
