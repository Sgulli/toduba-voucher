-- DropForeignKey
ALTER TABLE `assets` DROP FOREIGN KEY `assets_productId_fkey`;

-- DropForeignKey
ALTER TABLE `line_items` DROP FOREIGN KEY `line_items_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `line_items` DROP FOREIGN KEY `line_items_productId_fkey`;

-- DropIndex
DROP INDEX `line_items_orderId_fkey` ON `line_items`;

-- DropIndex
DROP INDEX `line_items_productId_fkey` ON `line_items`;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `line_items` ADD CONSTRAINT `line_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `line_items` ADD CONSTRAINT `line_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
