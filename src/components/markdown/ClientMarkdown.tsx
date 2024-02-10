import Markdown from "react-markdown";
import { rehypePlugins, remarkPlugins } from "./markdown.config";

export type ClientMarkdownProps = {
  markdown: string;
}

export const ClientMarkdown = (props: ClientMarkdownProps) => {
  return (
    <Markdown
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
      className="prose dark:prose-invert"
    >
      {props.markdown}
    </Markdown>
  );
};
