/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_projectId_fkey`;

-- DropTable
DROP TABLE `File`;

-- DropTable
DROP TABLE `Message`;

-- DropTable
DROP TABLE `Project`;
