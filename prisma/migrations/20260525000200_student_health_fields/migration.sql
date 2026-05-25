-- AlterTable
ALTER TABLE "Student"
ADD COLUMN "address" TEXT,
ADD COLUMN "age" INTEGER,
ADD COLUMN "hasHealthIssue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "healthNotes" TEXT;
