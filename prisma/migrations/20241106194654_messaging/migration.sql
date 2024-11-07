-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(255) NOT NULL,
    `eventName` VARCHAR(255) NOT NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `supportType` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` ENUM('AANVRAAG', 'GOEDGEKEURD', 'AFGEROND') NOT NULL DEFAULT 'AANVRAAG',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(255) NOT NULL,
    `projectId` VARCHAR(255) NOT NULL,
    `fileUrl` VARCHAR(255) NOT NULL,
    `fileName` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(255) NOT NULL,
    `projectId` VARCHAR(255) NOT NULL,
    `sender` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
