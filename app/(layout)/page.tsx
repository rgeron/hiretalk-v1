import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { BuyButton } from "@/components/stripe/BuyButton";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Home page</LayoutTitle>
        <LayoutDescription>The home page at url "/"</LayoutDescription>
      </LayoutHeader>
      <LayoutActions>
        <Button variant="outline" size="sm">
          Ok !
        </Button>
      </LayoutActions>
      <LayoutContent>
        <BuyButton priceId="price_1O37EFGPhxExaYaQWQK1Gm97">Buy now</BuyButton>
        <Typography>Some content</Typography>
      </LayoutContent>
    </Layout>
  );
}
