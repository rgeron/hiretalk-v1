import { prisma } from "@/lib/prisma";
import { utapi } from "@/lib/utapi";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const threadId = formData.get("threadId") as string;

    if (!file || !threadId) {
      return NextResponse.json(
        { error: "Missing file or threadId" },
        { status: 400 },
      );
    }

    // Upload the recording to UploadThing
    const uploadResponse = await utapi.uploadFiles([file]);

    if (uploadResponse[0].error) {
      console.error("Upload error:", uploadResponse[0].error);
      return NextResponse.json(
        { error: "Failed to upload recording" },
        { status: 500 },
      );
    }

    const fileUrl = uploadResponse[0].data.url;

    // Update the interview record with the recording URL
    const interview = await prisma.interview.findFirst({
      where: { threadId },
    });

    if (interview) {
      await prisma.interview.update({
        where: { id: interview.id },
        data: { recordingUrl: fileUrl },
      });
    } else {
      console.warn(`No interview found with threadId: ${threadId}`);
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error("Error handling recording upload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
