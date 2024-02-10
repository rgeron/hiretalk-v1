import { Layout } from "@/components/page/layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/ui/typography";

export type ReviewSingleProps = {
  image: string;
  review: string;
  name: string;
  role: string;
  compagnyImage?: string;
}

export const ReviewSingle = (props: ReviewSingleProps) => {
  return (
    <Layout className="flex items-center gap-8 max-lg:flex-col">
      <div className="flex-1" style={{ maxWidth: 250 }}>
        <AspectRatio ratio={2 / 3}>
          <img
            src={props.image}
            alt="review image"
            className="size-full -rotate-1 border-4 border-background object-cover shadow-lg shadow-foreground/20"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Typography variant="h3">{props.review}</Typography>
        <div className="flex gap-2">
          <div className="flex flex-col gap-0.5">
            <Typography variant="large">{props.name}</Typography>
            <Typography variant="small">{props.role}</Typography>
          </div>
          {props.compagnyImage ? (
            <img src={props.compagnyImage} alt="compagny image" />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
