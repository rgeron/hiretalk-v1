"use client";

import { Typography } from "@/components/nowts/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { useState, type ReactElement, type ReactNode } from "react";
import { LoadingButton } from "../form/submit-button";

type DialogBaseProps = {
  loading?: boolean;
};

type StandardDialogProps = {
  title?: string;
  description?: ReactNode;
  icon?: LucideIcon;
  style?: "default" | "centered";
  // The user needs to type this text to confirm the action
  confirmText?: string;
  // Input field for getting user input
  input?: {
    label: string;
    defaultValue?: string;
    placeholder?: string;
  };
  action?:
    | {
        label: string;
        onClick: (value?: string) => void | Promise<void>;
      }
    | ReactElement;
  cancel?: {
    label: string;
    onClick: () => void | Promise<void>;
  };
};

type CustomDialogProps = {
  children?: ReactNode;
};

export type DialogManagerRendererDialogProps = DialogBaseProps &
  (StandardDialogProps | CustomDialogProps);

export const isStandardDialog = (
  props: DialogManagerRendererDialogProps,
): props is DialogBaseProps & StandardDialogProps => {
  if ("children" in props) {
    return false;
  }

  return true;
};

export const DialogManagerRendererDialog = (
  props: DialogManagerRendererDialogProps,
) => {
  const [confirmText, setConfirmText] = useState("");
  const [inputValue, setInputValue] = useState(
    isStandardDialog(props) ? (props.input?.defaultValue ?? "") : "",
  );

  if (!isStandardDialog(props)) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent>{props.children}</AlertDialogContent>
      </AlertDialog>
    );
  }

  const isConfirmDisabled = props.confirmText
    ? confirmText !== props.confirmText
    : false;

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader
          className={cn({
            "flex flex-col items-center gap-2": props.style === "centered",
          })}
        >
          {props.icon && (
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <props.icon className="size-6" />
            </div>
          )}
          <AlertDialogTitle>{props.title ?? ""}</AlertDialogTitle>
          {typeof props.description === "string" ? (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          ) : (
            props.description
          )}
        </AlertDialogHeader>
        {props.confirmText && (
          <div>
            <Typography>
              Please type{" "}
              <Typography variant="code">{props.confirmText}</Typography> to
              confirm the action.
            </Typography>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        )}
        {props.input && (
          <div className="mt-2">
            <Label>{props.input.label}</Label>
            <Input
              value={inputValue}
              placeholder={props.input.placeholder}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={props.loading}
            onClick={props.cancel?.onClick}
          >
            {props.cancel?.label ?? "Cancel"}
          </AlertDialogCancel>

          {props.action && "label" in props.action ? (
            <AlertDialogAction asChild>
              <LoadingButton
                loading={props.loading}
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                disabled={props.loading || isConfirmDisabled}
                onClick={() => {
                  if (props.action && "onClick" in props.action) {
                    void props.action.onClick(inputValue);
                  }
                }}
              >
                {props.action.label}
              </LoadingButton>
            </AlertDialogAction>
          ) : (
            props.action
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
