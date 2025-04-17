import { generateReactHelpers } from "@uploadthing/react";

// Define FileRouter type to use with UploadThing components
export type OurFileRouter = {
  imageUploader: {
    image: {
      maxFileSize: "4MB";
      maxFileCount: 1;
    };
  };
  resumeUploader: {
    pdf: {
      maxFileSize: "8MB";
      maxFileCount: 1;
    };
  };
};

// Generate type-safe React helpers for UploadThing
export const { UploadButton, UploadDropzone, Uploader } =
  generateReactHelpers<OurFileRouter>();
