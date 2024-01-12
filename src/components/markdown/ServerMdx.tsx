import { MDXRemote } from "next-mdx-remote/rsc";
import { rehypePlugins, remarkPlugins } from "./markdown.config";

export type ServerMdxProps = {
  source: string;
};

// * If you want to add custom component, such as an "EmailForm", you can add it to the MdxComponent object.
const MdxComponent = {} satisfies Record<string, React.ComponentType>;

// ! This is used only on server.
export const ServerMdx = (props: ServerMdxProps) => {
  return (
    <div className="prose dark:prose-invert">
      <MDXRemote
        source={props.source}
        components={MdxComponent}
        options={{
          mdxOptions: {
            // * We need to use `as never` because `MDXRemote` has legacy version of "unified"
            remarkPlugins: remarkPlugins as never,
            rehypePlugins: rehypePlugins as never,
            format: "mdx",
          },
        }}
      />
    </div>
  );
};
