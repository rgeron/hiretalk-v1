import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";

export default function CancelPaymentPage() {
  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Oops! Something Went Wrong</LayoutTitle>
          <LayoutDescription>
            We encountered an issue processing your payment. Please check your
            payment details and try again. If the problem persists, don’t
            hesitate to contact us for assistance. We’re here to help you
            resolve this smoothly.
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <ContactSupportDialog />
          <ContactFeedbackPopover />
        </LayoutContent>
      </Layout>
    </>
  );
}
