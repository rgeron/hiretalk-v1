import { Tailwind } from '@react-email/tailwind';

import { SiteConfig } from '@/config';
import { getServerUrl } from '@/lib/server-url';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from '@react-email/components';
import type { PropsWithChildren } from 'react';

export const EmailLayout = ({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) => {
  const baseUrl = getServerUrl();
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: SiteConfig.brand.primary,
            },
          },
        },
      }}
    >
      <Html>
        <Head />
        <Preview>Log in with this magic link.</Preview>
        <Body className="bg-white font-sans">
          <Container className="mx-auto bg-contain bg-bottom bg-no-repeat p-6">
            <table cellPadding={0} cellSpacing={0}>
              <tr>
                <td className="pr-2">
                  <Img
                    src={`${baseUrl}/images/logo.png`}
                    width={32}
                    height={32}
                    className="inline"
                    alt="Codeline"
                  />
                </td>
                <td>
                  <Text className="text-xl font-bold">{SiteConfig.title}</Text>
                </td>
              </tr>
            </table>
            {children}
            <Hr className="mt-12 border-gray-300" />
            <Img
              src={`${baseUrl}/images/logo.png`}
              width={32}
              height={32}
              className="inline"
              alt="Codeline"
            />
            <Text className="ml-1 text-sm text-gray-500">
              {SiteConfig.company.name}
            </Text>
            <Text className="ml-1 text-sm text-gray-500">
              {SiteConfig.company.address}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
