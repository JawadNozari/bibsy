/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[qrCode]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qrCode` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "qrCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "qrCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_qrCode_key" ON "Staff"("qrCode");

-- CreateIndex
CREATE UNIQUE INDEX "Student_qrCode_key" ON "Student"("qrCode");
