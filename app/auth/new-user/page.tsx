import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SiteConfig } from '@/site-config';

export default function AuthNewUserPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>{SiteConfig.title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
