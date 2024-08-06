import { Markdown, Preview } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function MarkdownEmail(props: {
  markdown: string;
  preview?: string;
}) {
  return (
    <EmailLayout disableTailwind>
      <Preview>{props.preview ?? "You receive a markdown email."}</Preview>
      <Markdown
        markdownCustomStyles={{
          p: {
            fontSize: "1.125rem",
            lineHeight: "1.5rem",
          },
          li: {
            fontSize: "1.125rem",
            lineHeight: "1.5rem",
          },
        }}
      >
        {props.markdown}
      </Markdown>
    </EmailLayout>
  );
}
