import { Hero } from "@/components/features/landing/Hero";
import { SectionDivider } from "@/components/features/landing/SectionDivider";
import { ReviewGrid } from "@/components/features/review/ReviewGrid";
import { ReviewSingle } from "@/components/features/review/ReviewSingle";
import { ReviewTriple } from "@/components/features/review/ReviewTriple";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
      <Hero />

      <ReviewSingle
        image="https://i.pravatar.cc/300?u=s1"
        name="Melvyn"
        role="Creator"
        review={`I really like this template, it's really easy to use and it's really fast to create a new page with it.`}
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
    </div>
  );
}
