/*
  Warnings:

  - You are about to drop the column `candidateEmail` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `candidateName` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `jobOfferId` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerNotes` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the column `transcript` on the `InterviewResult` table. All the data in the column will be lost.
  - You are about to drop the `CandidateApplication` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[interviewId]` on the table `InterviewResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `interviewId` to the `InterviewResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateApplication" DROP CONSTRAINT "CandidateApplication_jobOfferId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewResult" DROP CONSTRAINT "InterviewResult_jobOfferId_fkey";

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "communicationScore" DOUBLE PRECISION,
ADD COLUMN     "improvements" TEXT,
ADD COLUMN     "isReviewed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "overallScore" DOUBLE PRECISION,
ADD COLUMN     "problemSolvingScore" DOUBLE PRECISION,
ADD COLUMN     "recommendation" TEXT,
ADD COLUMN     "recordingUrl" TEXT,
ADD COLUMN     "recruiterRating" INTEGER,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewerNotes" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "strengths" TEXT,
ADD COLUMN     "technicalScore" DOUBLE PRECISION,
ALTER COLUMN "threadId" DROP NOT NULL,
ALTER COLUMN "runId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InterviewResult" DROP COLUMN "candidateEmail",
DROP COLUMN "candidateName",
DROP COLUMN "jobOfferId",
DROP COLUMN "rating",
DROP COLUMN "reviewedAt",
DROP COLUMN "reviewerNotes",
DROP COLUMN "summary",
DROP COLUMN "transcript",
ADD COLUMN     "interviewId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CandidateApplication";

-- CreateIndex
CREATE UNIQUE INDEX "InterviewResult_interviewId_key" ON "InterviewResult"("interviewId");

-- AddForeignKey
ALTER TABLE "InterviewResult" ADD CONSTRAINT "InterviewResult_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
