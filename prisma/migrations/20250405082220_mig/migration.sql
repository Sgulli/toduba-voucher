-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `assets_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
