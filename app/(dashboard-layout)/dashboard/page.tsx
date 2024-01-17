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
import { Input } from "@/components/ui/input";
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

## Subtitle 2

### Subtitle 3

#### Subtitle 4

##### Subtitle 5

###### Subtitle 6

> Quote

- List
- List 2

1. List
2. List 2
`}
            />
            <Input />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
