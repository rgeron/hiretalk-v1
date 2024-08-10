import { cn } from "@/lib/utils";
import {
  Link,
  LinkProps,
  Section,
  SectionProps,
  Text,
  TextProps,
} from "@react-email/components";

export const EmailLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      className={cn("text-indigo-500 hover:underline", props.className)}
    />
  );
};

export const EmailText = (props: TextProps) => {
  return (
    <Text {...props} className={cn("text-lg leading-6", props.className)} />
  );
};

export const EmailSection = (props: SectionProps) => {
  return <Section {...props} className={cn("my-6", props.className)} />;
};
