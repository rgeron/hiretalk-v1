import { ClientMarkdown } from "@/components/markdown/ClientMarkdown";
import { Layout } from "@/components/page/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";

export type ReviewSingleProps = {
  image: string;
  review: string;
  name: string;
  role: string;
  compagnyImage?: string;
};

export const ReviewSingle = (props: ReviewSingleProps) => {
  return (
    <Layout className="flex flex-col items-center gap-8">
      <div className="flex flex-1 flex-col gap-4">
        <ClientMarkdown className="citation prose-2xl text-center">
          {props.review}
        </ClientMarkdown>
        <div className="m-auto flex gap-2">
          <Avatar className="size-16">
            <AvatarFallback>{props.name[0]}</AvatarFallback>
            <AvatarImage src={props.image} alt={props.name} />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <Typography variant="large">{props.name}</Typography>
            <p className="inline-flex items-center gap-0.5">
              <Typography as="span" variant="small">
                {props.role}
              </Typography>
              {props.compagnyImage ? (
                <>
                  <span>at</span>

                  <Avatar className="size-8">
                    <AvatarFallback>{props.name[0]}</AvatarFallback>
                    <AvatarImage
                      src={props.compagnyImage}
                      className="object-contain"
                      alt={props.name}
                    />
                  </Avatar>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
