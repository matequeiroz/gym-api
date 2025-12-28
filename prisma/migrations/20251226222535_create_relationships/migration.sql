/*
  Warnings:

  - Added the required column `gymId` to the `tb_check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tb_check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_check_ins" ADD COLUMN     "gymId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_check_ins" ADD CONSTRAINT "tb_check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_check_ins" ADD CONSTRAINT "tb_check_ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "tb_gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
