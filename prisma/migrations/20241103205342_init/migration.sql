-- AddForeignKey
ALTER TABLE `lightinginventory` ADD CONSTRAINT `lightinginventory_tag_fkey` FOREIGN KEY (`tag`) REFERENCES `lightingcatalog`(`tag`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soundinventory` ADD CONSTRAINT `soundinventory_tag_fkey` FOREIGN KEY (`tag`) REFERENCES `soundcatalog`(`tag`) ON DELETE RESTRICT ON UPDATE CASCADE;
