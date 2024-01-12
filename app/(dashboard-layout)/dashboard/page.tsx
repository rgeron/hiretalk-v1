import { ServerMdx } from "@/components/markdown/ServerMdx";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Find out how many people are visiting your website, how they found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServerMdx
              source={`## Subtitle
            
\`\`\`js
const x = () => {}
\`\`\`

Please ok. I like https://google.com

I like \`JavaScript\` Code !
`}
            />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
