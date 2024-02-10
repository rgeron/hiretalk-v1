import { BentoGridSection } from "@/features/landing/BentoSection";
import { CTASection } from "@/features/landing/CTASection";
import { FAQSection } from "@/features/landing/FAQSection";
import { FeaturesPreviewSection } from "@/features/landing/FeaturesPreviewSection";
import { Hero } from "@/features/landing/Hero";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { PainSection } from "@/features/landing/Pain";
import { SectionDivider } from "@/features/landing/SectionDivider";
import StatsSection from "@/features/landing/StatsSection";
import { Footer } from "@/features/layout/Footer";
import { Pricing } from "@/features/pricing/PricingSection";
import { ReviewGrid } from "@/features/review/ReviewGrid";
import { ReviewTriple } from "@/features/review/ReviewTriple";
import { Calendar, CalendarClock, Eye, Repeat } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
      <div className="mt-16"></div>
      <LandingHeader />

      <Hero />

      <StatsSection />

      <BentoGridSection />

      <PainSection />

      <SectionDivider />

      <ReviewTriple
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=a1",
            name: "Sophie",
            review: `Threader <b>has completely transformed the way I manage my social media</b> content. The ability to schedule posts and use AI for content suggestions has saved me hours each week.`,
            role: "Digital Marketer",
          },
          {
            image: "https://i.pravatar.cc/300?u=a2",
            name: "Alex",
            review: `Using Threader has significantly boosted my online engagement. <b>The analytics tool helps me understand what works</b>, allowing me to refine my strategy and grow my follower base.`,
            role: "Social Media Influencer",
          },
          {
            image: "https://i.pravatar.cc/300?u=a3",
            name: "Jordan",
            review: `The ease of scheduling and the AI-generated content features are game-changers. <b>Threader's user-friendly interface</b> makes it perfect for anyone looking to enhance their online presence.`,
            role: "Entrepreneur",
          },
        ]}
      />
      <SectionDivider />

      <FeaturesPreviewSection
        features={[
          {
            label: "Schedule your post",
            icon: <Calendar />,
            description: "Schedule your post on the Threader in a few clicks.",
            gif: "/images/placeholder1.gif",
          },
          {
            label: "See what you scheduled",
            icon: <CalendarClock />,
            description:
              "With the calendar view, you can see what you scheduled and when.",
            gif: "/images/placeholder1.gif",
          },
          {
            label: "Preview your post",
            icon: <Eye />,
            description:
              "Preview your post before scheduling it to see how it will look like.",
            gif: "/images/placeholder1.gif",
          },
          {
            label: "Schedule repost",
            icon: <Repeat />,
            description:
              "Automatically repost your post after a certain amount of time.",
            gif: "/images/placeholder1.gif",
          },
        ]}
      />

      <CTASection
        ctaHref="#pricing"
        backgroundImage="https://images.unsplash.com/photo-1550418290-a8d86ad674a6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ctaLabel="Start for free"
        subtitle="Join the Threader community now"
        title="Start publishing your content faster"
      />

      <Pricing
        cards={[
          {
            type: "monthly",
            id: "Free",
            title: "Threader Free",
            subtitle: "Perfect for tiny creator",
            price: 0,
            currency: "USD",
            features: [
              "Scehdule 1 post in advance",
              "See what you scheduled",
              "Auto-repost your thread",
            ],
            cta: "Start now",
            ctaSubtitle: "Free forever",
            priceId: "",
          },
          {
            isPopular: true,
            type: "monthly",
            id: "premium",
            title: "Threader Premium",
            subtitle: "Perfect for content creator",
            price: 49,
            barredPrice: 59,
            currency: "USD",
            features: [
              "Schedule Infinite post in advance",
              "See what you scheduled",
              "Auto-repost your thread",
              "Preview your post",
            ],
            cta: "Start 7 days trial",
            ctaSubtitle: "Then $49/month",
            priceId: "",
          },
        ]}
      />
      <FAQSection
        faq={[
          {
            question: "What is Threader?",
            answer:
              "Threader is an innovative platform designed to help you write, schedule, and publish content to your account with the assistance of AI, enhancing your business's online presence.",
          },
          {
            question: "How does AI Content Generation work?",
            answer:
              "Our AI Content Generation feature leverages the power of artificial intelligence to create unique and engaging content for your Threads, making content creation easier and more efficient.",
          },
          {
            question: "Can I schedule my threads in advance?",
            answer:
              "Yes, with Threader, you can schedule your threads for a specific time, allowing you to maintain a consistent online presence without the need to manually post every day.",
          },
          {
            question: "What is the Now.TS project?",
            answer:
              "Now.TS is a new project announced on our platform that enables users to create professional Next.js applications in days, streamlining the development process.",
          },
          {
            question: "How can I get more followers?",
            answer:
              "To gain more followers, focus on creating content related to Next.js, as our analysis shows it's highly engaging. Utilize our research tools to understand trends and improve your content strategy.",
          },
          {
            question: "What are the benefits of posting with Threader?",
            answer:
              "Posting with Threader allows you to schedule posts, avoid daily manual postings, track your scheduled content easily, and maintain consistency in your online activity.",
          },
          {
            question: "What pricing plans does Threader offer?",
            answer:
              "Threader offers two pricing plans: THREADER FREE, perfect for tiny creators, allowing you to schedule 1 post in advance; and THREADER PREMIUM, ideal for content creators, offering unlimited scheduling, post previews, and auto-reposting features.",
          },
        ]}
      />

      <SectionDivider />
      <ReviewGrid
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=b1",
            name: "Eva",
            review:
              "Since I started using Threader, my content creation process has been streamlined. The AI suggestions are spot on, helping me to connect better with my audience. Highly recommend for anyone looking to elevate their content game.",
            role: "Content Creator",
          },
          {
            image: "https://i.pravatar.cc/300?u=b2",
            name: "Lucas",
            review:
              "Threader's scheduling feature is a lifesaver. It allows me to plan my content calendar efficiently, ensuring I never miss posting on the optimal days and times. Fantastic tool for social media managers.",
            role: "Social Media Manager",
          },
          {
            image: "https://i.pravatar.cc/300?u=b3",
            name: "Mia",
            review:
              "The analytics provided by Threader are invaluable. They've given me insights into what my audience loves, helping me double my engagement rate in just a few months.",
            role: "Digital Marketer",
          },
          {
            image: "https://i.pravatar.cc/300?u=b4",
            name: "Noah",
            review:
              "I was skeptical about AI-generated content, but Threader changed my mind. The content feels personal and has significantly increased my interaction rates.",
            role: "Blogger",
          },
          {
            image: "https://i.pravatar.cc/300?u=b5",
            name: "Isabella",
            review:
              "Threader's user interface is incredibly user-friendly. I was able to onboard my team in no time, and we've seen a marked improvement in our social media performance.",
            role: "Team Leader",
          },
          {
            image: "https://i.pravatar.cc/300?u=b6",
            name: "Oliver",
            review:
              "Auto-reposting with Threader is a feature I didn't know I needed. It's great for getting more mileage out of your best content without any extra effort.",
            role: "Freelancer",
          },
          {
            image: "https://i.pravatar.cc/300?u=b7",
            name: "Sophia",
            review:
              "Joining the Threader community has opened up networking opportunities with fellow content creators. It's more than just a tool; it's a platform for growth.",
            role: "Influencer",
          },
          {
            image: "https://i.pravatar.cc/300?u=b8",
            name: "Elijah",
            review:
              "The calendar view in Threader helps me visualize my content strategy for the entire month. It's been a game changer for my planning process.",
            role: "Strategist",
          },
          {
            image: "https://i.pravatar.cc/300?u=b9",
            name: "Charlotte",
            review:
              "I appreciate the flexibility in Threader's pricing plans. It's accessible for creators at any stage of their journey, from beginners to established influencers.",
            role: "Entrepreneur",
          },
          {
            image: "https://i.pravatar.cc/300?u=b10",
            name: "James",
            review:
              "The customer support team at Threader is fantastic. They've been quick to respond and helpful with any questions I've had. Great service overall.",
            role: "Customer",
          },
        ]}
      />

      <SectionDivider />
      <Footer />
    </div>
  );
}
