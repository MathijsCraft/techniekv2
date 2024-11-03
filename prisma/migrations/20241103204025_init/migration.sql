-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'OWNER', 'TEAM') NOT NULL DEFAULT 'TEAM',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lightingcatalog` (
    `id` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `extraInfo` VARCHAR(255) NULL,

    UNIQUE INDEX `lightingcatalog_tag_key`(`tag`),
    INDEX `lightingcatalog_tag_idx`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lightinginventory` (
    `id` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `number` INTEGER NOT NULL DEFAULT 1,
    `locatie` VARCHAR(255) NOT NULL,
    `status` ENUM('WERKEND', 'TER_REPARATIE', 'DEFECT') NOT NULL DEFAULT 'WERKEND',
    `dmx` INTEGER NULL,
    `universe` INTEGER NOT NULL DEFAULT 1,
    `kanalen` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `lightinginventory_tag_idx`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soundcatalog` (
    `id` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `extraInfo` VARCHAR(255) NULL,

    UNIQUE INDEX `soundcatalog_tag_key`(`tag`),
    INDEX `soundcatalog_tag_idx`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `soundinventory` (
    `id` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `number` INTEGER NOT NULL DEFAULT 1,
    `locatie` VARCHAR(255) NOT NULL,
    `status` ENUM('WERKEND', 'TER_REPARATIE', 'DEFECT') NOT NULL DEFAULT 'WERKEND',
    `patch` VARCHAR(255) NULL,
    `stereo` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `soundinventory_tag_idx`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
