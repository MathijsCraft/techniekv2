/*
  Warnings:

  - You are about to drop the column `extraInfo` on the `lightingcatalog` table. All the data in the column will be lost.
  - Added the required column `dmx` to the `lightingcatalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lightingcatalog` DROP COLUMN `extraInfo`,
    ADD COLUMN `dmx` INTEGER NOT NULL;
