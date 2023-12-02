'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Loader } from '../ui/loader';

export type ConfirmationDialogProps = {
  title: string;
  description?: string;
  action: {
    label: string;
    onClick: () => void | Promise<void>;
  };
  cancel?: {
    label: string;
    onClick: () => void | Promise<void>;
  };
  loading?: boolean;
};

export const ProviderConfirmationDialog = ({
  title,
  description,
  loading,
  action,
  cancel,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={cancel?.onClick}>
            {cancel?.label ?? 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={action.onClick}>
            {loading ? <Loader /> : action.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
