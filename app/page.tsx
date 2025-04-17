import { EmailFormSection } from "@/features/email/email-form-section";
import { BentoGridSection } from "@/features/landing/bento-section";
import { CTASectionCard } from "@/features/landing/cta/cta-card-section";
import { CTAImageSection } from "@/features/landing/cta/cta-image-section";
import { CtaSection } from "@/features/landing/cta/cta-section";
import { FAQSection } from "@/features/landing/faq-section";
import { FeaturesSection } from "@/features/landing/feature-section";
import { Hero } from "@/features/landing/hero";
import { LandingHeader } from "@/features/landing/landing-header";
import { PainSection } from "@/features/landing/pain";
import { ReviewGrid } from "@/features/landing/review/review-grid";
import { ReviewSingle } from "@/features/landing/review/review-single";
import { ReviewTriple } from "@/features/landing/review/review-triple";
import { SectionDivider } from "@/features/landing/section-divider";
import { StatsSection } from "@/features/landing/stats-section";
import { Footer } from "@/features/layout/footer";
import { Pricing } from "@/features/plans/pricing-section";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground relative flex h-fit flex-col">
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
            review: `Talk2Apply **a complètement transformé notre processus de recrutement**. Grâce aux entretiens IA, nous n'avons plus à lire des dizaines de lettres de motivation génériques et pouvons rapidement identifier les candidats motivés.`,
            role: "Directrice RH, Tech Corp",
          },
          {
            image: "https://i.pravatar.cc/300?u=a2",
            name: "Alexandre",
            review: `Talk2Apply nous a permis de **réduire de 40% le temps consacré au tri des candidatures**. Les synthèses fournies sont précises et pertinentes, ce qui facilite grandement notre prise de décision.`,
            role: "Responsable Recrutement, Finance SA",
          },
          {
            image: "https://i.pravatar.cc/300?u=a3",
            name: "Camille",
            review: `L'analyse des soft skills dès la première étape est un atout majeur. **Talk2Apply nous aide à repérer immédiatement les candidats qui correspondent à notre culture d'entreprise**.`,
            role: "Talent Acquisition, StartupLab",
          },
        ]}
      />

      <SectionDivider />

      <ReviewSingle
        image="https://i.pravatar.cc/300?u=5"
        name="Thomas"
        review={`Talk2Apply **a révolutionné notre façon de recruter**. Les entretiens IA nous permettent d'évaluer l'authenticité et la motivation des candidats dès le début du processus, ce qui **a augmenté de 30% la qualité de nos embauches**.`}
        role="DRH"
        compagnyImage="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png"
        key={1}
      />

      <FeaturesSection
        features={[
          {
            badge: "🎙️ Entretien IA",
            title: "Entretiens oraux automatisés",
            description:
              "Notre IA pose des questions personnalisées aux candidats sur leur motivation et leurs compétences.",
            component: (
              <Image
                src="/images/ai-interview.gif"
                alt="Démonstration d'un entretien IA"
                width={200}
                height={100}
                className="h-auto w-full object-cover"
                unoptimized
              />
            ),
          },
          {
            badge: "📊 Analyse",
            title: "Analyse détaillée des réponses",
            description:
              "Recevez une synthèse structurée des réponses et une évaluation des soft skills du candidat.",
            component: (
              <Image
                src="/images/analysis-dashboard.gif"
                alt="Dashboard d'analyse des entretiens"
                width={200}
                height={100}
                className="h-auto w-full object-cover"
              />
            ),
          },
          {
            badge: "⏱️ Gain de temps",
            title: "Filtrage naturel des candidats",
            description:
              "Seuls les candidats réellement motivés iront jusqu'au bout du processus d'entretien.",
            component: (
              <Image
                src="/images/time-saving.gif"
                alt="Démonstration du gain de temps"
                width={200}
                height={100}
                className="h-auto w-full object-cover"
                unoptimized
              />
            ),
          },
          {
            badge: "🔄 Intégration",
            title: "Intégration avec votre ATS",
            description:
              "Talk2Apply s'intègre facilement avec vos systèmes de suivi des candidatures existants.",
            component: (
              <Image
                src="/images/ats-integration.gif"
                alt="Intégration avec les systèmes ATS"
                width={200}
                height={100}
                className="h-auto w-full object-cover"
                unoptimized
              />
            ),
          },
        ]}
      />

      <CTAImageSection />

      <CTASectionCard />

      <CtaSection />

      <Pricing />

      <FAQSection
        faq={[
          {
            question: "Qu'est-ce que Talk2Apply ?",
            answer:
              "Talk2Apply est une plateforme B2B qui révolutionne le processus de recrutement en remplaçant les lettres de motivation traditionnelles par des entretiens oraux instantanés avec une IA.",
          },
          {
            question: "Comment fonctionne l'entretien IA ?",
            answer:
              "Lorsqu'un candidat postule, il reçoit un lien pour effectuer un entretien automatisé. L'IA lui pose des questions personnalisées sur sa motivation et ses compétences. L'entretien est enregistré, transcrit et analysé en temps réel.",
          },
          {
            question: "Quelles informations reçoit le recruteur ?",
            answer:
              "Le recruteur reçoit une synthèse structurée des réponses du candidat, un score d'engagement et de soft skills (basé sur la clarté, la fluidité et la structure du discours), ainsi que la transcription complète et l'audio si nécessaire.",
          },
          {
            question:
              "En quoi Talk2Apply est-il meilleur que les lettres de motivation ?",
            answer:
              "Avec ChatGPT, une lettre de motivation se génère en 5 minutes, ce qui a fait disparaître le filtre naturel. Talk2Apply réintroduit l'authenticité et la friction dans le processus de candidature - seuls les candidats réellement motivés iront jusqu'au bout, ce qui constitue un filtre naturel.",
          },
          {
            question:
              "Talk2Apply peut-il s'intégrer à notre système ATS actuel ?",
            answer:
              "Oui, Talk2Apply s'intègre facilement avec les principaux systèmes ATS du marché pour une expérience fluide et sans friction pour vos équipes RH.",
          },
          {
            question:
              "Est-ce que Talk2Apply est compatible avec tous les types de postes ?",
            answer:
              "Absolument ! Talk2Apply peut être personnalisé pour tous types de postes, des profils techniques aux fonctions support. L'IA adapte ses questions en fonction du poste concerné.",
          },
          {
            question: "Quels sont les avantages pour les candidats ?",
            answer:
              "Les candidats bénéficient d'une expérience moderne et interactive qui leur permet de mettre en valeur leurs compétences orales et leur personnalité, éléments difficiles à exprimer dans une lettre de motivation écrite.",
          },
        ]}
      />

      <SectionDivider />

      <ReviewGrid
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=b1",
            name: "Émilie",
            review:
              "Depuis que nous utilisons Talk2Apply, le taux de candidats qui correspondent réellement à nos attentes a considérablement augmenté. L'IA pose exactement les bonnes questions pour évaluer l'adéquation avec notre culture d'entreprise.",
            role: "Directrice des Ressources Humaines",
          },
          {
            image: "https://i.pravatar.cc/300?u=b2",
            name: "Lucas",
            review:
              "La fonction d'analyse des soft skills de Talk2Apply est impressionnante. Elle nous permet d'identifier rapidement les candidats qui ont non seulement les compétences techniques, mais aussi les qualités humaines que nous recherchons.",
            role: "Responsable Recrutement IT",
          },
          {
            image: "https://i.pravatar.cc/300?u=b3",
            name: "Marie",
            review:
              "L'intégration de Talk2Apply à notre ATS existant a été d'une simplicité remarquable. Notre équipe RH a pu l'adopter sans formation complexe, et les résultats ont été immédiats.",
            role: "Responsable SIRH",
          },
          {
            image: "https://i.pravatar.cc/300?u=b4",
            name: "Nicolas",
            review:
              "Au début, j'étais sceptique quant à l'utilisation de l'IA pour les entretiens, mais Talk2Apply m'a convaincu. La qualité des synthèses et la pertinence des analyses sont impressionnantes.",
            role: "Consultant RH",
          },
          {
            image: "https://i.pravatar.cc/300?u=b5",
            name: "Isabelle",
            review:
              "L'interface utilisateur de Talk2Apply est incroyablement intuitive. Nos recruteurs ont pu se l'approprier en un temps record, ce qui a accéléré l'ensemble de notre processus de recrutement.",
            role: "Chief People Officer",
          },
          {
            image: "https://i.pravatar.cc/300?u=b6",
            name: "Olivier",
            review:
              "La fonctionnalité de personnalisation des questions selon le poste est un véritable atout. Elle nous permet d'adapter précisément les entretiens IA à chaque type de profil recherché.",
            role: "Talent Acquisition Manager",
          },
          {
            image: "https://i.pravatar.cc/300?u=b7",
            name: "Sophie",
            review:
              "Rejoindre la communauté Talk2Apply nous a ouvert des opportunités de networking avec d'autres professionnels RH. C'est plus qu'un outil ; c'est une plateforme d'échange et d'innovation en recrutement.",
            role: "DRH",
          },
          {
            image: "https://i.pravatar.cc/300?u=b8",
            name: "Éric",
            review:
              "La visualisation des données dans Talk2Apply nous aide à avoir une vue d'ensemble sur nos campagnes de recrutement. C'est un game changer pour notre processus d'analyse et de reporting.",
            role: "Data Analyst RH",
          },
          {
            image: "https://i.pravatar.cc/300?u=b9",
            name: "Charlotte",
            review:
              "J'apprécie la flexibilité des formules tarifaires de Talk2Apply. Elles sont accessibles pour les entreprises de toute taille, des startups aux grands groupes.",
            role: "CEO",
          },
          {
            image: "https://i.pravatar.cc/300?u=b10",
            name: "Jean",
            review:
              "L'équipe de support client de Talk2Apply est fantastique. Ils ont été rapides à répondre et très utiles pour toutes les questions que nous avons posées. Un service client de grande qualité.",
            role: "Responsable de la transformation digitale",
          },
        ]}
      />

      <EmailFormSection />

      <SectionDivider />

      <Footer />
    </div>
  );
}
