import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { ComponentPropsWithoutRef } from "react";

export type ReviewItemProps = {
  review: string;
  name: string;
  role: string;
  image: string;
} & ComponentPropsWithoutRef<"div">;

export const ReviewItem = (props: ReviewItemProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <Typography variant="quote">{props.review}</Typography>
      </CardHeader>
      <CardContent className="flex items-center gap-2 rounded-lg bg-background pt-6">
        <div>
          <Avatar>
            <AvatarFallback>{props.name[0]}</AvatarFallback>
            <AvatarImage src={props.image} alt="user image" />
          </Avatar>
        </div>
        <div>
          <Typography variant="small">{props.name}</Typography>
          <Typography variant="muted">{props.role}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
