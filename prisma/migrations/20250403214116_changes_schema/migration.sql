/*
  Warnings:

  - You are about to drop the column `productId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `currency` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_productId_fkey`;

-- DropIndex
DROP INDEX `orders_productId_fkey` ON `orders`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `productId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `totalAmount`,
    ADD COLUMN `total` DOUBLE NOT NULL,
    MODIFY `currency` ENUM('EUR', 'USD') NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE `prices` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `line_items` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `amount` DOUBLE NOT NULL,
    `currency` ENUM('EUR', 'USD') NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `line_items` ADD CONSTRAINT `line_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `line_items` ADD CONSTRAINT `line_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
