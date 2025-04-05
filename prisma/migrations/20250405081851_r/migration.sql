-- DropForeignKey
ALTER TABLE `assets` DROP FOREIGN KEY `assets_productId_fkey`;

-- DropIndex
DROP INDEX `assets_productId_key` ON `assets`;

-- AlterTable
ALTER TABLE `products` MODIFY `description` VARCHAR(191) NULL;


