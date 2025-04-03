/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `assets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `prices` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `assets` DROP FOREIGN KEY `assets_productId_fkey`;

-- DropForeignKey
ALTER TABLE `prices` DROP FOREIGN KEY `prices_productId_fkey`;

-- DropIndex
DROP INDEX `assets_productId_fkey` ON `assets`;

-- DropIndex
DROP INDEX `prices_productId_fkey` ON `prices`;

-- AlterTable
ALTER TABLE `assets` MODIFY `productId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `prices` MODIFY `productId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `assets_productId_key` ON `assets`(`productId`);

-- CreateIndex
CREATE UNIQUE INDEX `prices_productId_key` ON `prices`(`productId`);

-- AddForeignKey
ALTER TABLE `prices` ADD CONSTRAINT `prices_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
