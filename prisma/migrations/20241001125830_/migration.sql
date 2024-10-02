/*
  Warnings:

  - You are about to drop the column `groupId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `CategoryGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_groupId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `groupId`;

-- DropTable
DROP TABLE `CategoryGroup`;
