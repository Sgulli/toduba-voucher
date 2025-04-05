-- DropForeignKey
ALTER TABLE `prices` DROP FOREIGN KEY `prices_productId_fkey`;

-- DropIndex
DROP INDEX `prices_productId_key` ON `prices`;

-- AddForeignKey
-- ALTER TABLE `line_items` ADD CONSTRAINT `line_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
