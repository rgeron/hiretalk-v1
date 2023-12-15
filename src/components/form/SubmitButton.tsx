'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';
import { Loader } from '../ui/loader';

export const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props}>
      {pending ? (
        <>
          <Loader className="mr-2" size={16} /> {props.children}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
};
export const SubmitButtonUnstyled = (props: ComponentPropsWithoutRef<'button'>) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type={props.type ?? 'submit'}
      disabled={props.disabled ?? pending}
    />
  );
};
