import { auth } from "@/lib/auth/helper";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const App = () => {
  return (
    <form>
      <button
        formAction={async () => {
          "use server";

          // Récupérer l'utilisateur
          const user = await auth();

          const stripeCustomerId = user?.stripeCustomerId ?? undefined;

          const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: "subscription", // ou "payment"
            payment_method_types: ["card", "link"],
            line_items: [
              {
                // Ton price_id
                price: "price_1J3x4d2eZvKYlo2C5z3z4d2e",
                quantity: 1,
              },
            ],
            // Remplacer par ton url
            success_url: `http://localhost:300/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:300/payment/cancel`,
          });

          if (!session.url) {
            throw new Error("Something went wrong while creating the session.");
          }

          redirect(session.url);
        }}
      >
        Buy
      </button>
    </form>
  );
};
