"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import type { ButtonProps } from "../ui/button";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return <LoadingButton loading={pending}>{props.children}</LoadingButton>;
};

export const LoadingButton = ({
  loading,
  ...props
}: ButtonProps & { loading?: boolean }) => {
  return (
    <Button {...props}>
      {loading ? (
        <>
          <Loader className="mr-2" size={16} /> {props.children}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
};

export const SubmitButtonUnstyled = (
  props: ComponentPropsWithoutRef<"button">
) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type={props.type ?? "submit"}
      disabled={props.disabled ?? pending}
    />
  );
};
