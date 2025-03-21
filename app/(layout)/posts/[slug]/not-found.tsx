import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>404 - Not Found</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>The post you are looking for doesn't exist.</CardTitle>
          </CardHeader>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
