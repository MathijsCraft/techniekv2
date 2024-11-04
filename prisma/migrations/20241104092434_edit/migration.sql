/*
  Warnings:

  - Added the required column `soort` to the `lightingcatalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lightingcatalog` ADD COLUMN `soort` VARCHAR(255) NOT NULL;
