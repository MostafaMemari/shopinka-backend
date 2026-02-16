-- DropIndex
DROP INDEX `Seo404Log_path_key` ON `Seo404Log`;

-- AlterTable
ALTER TABLE `Seo404Log` MODIFY `path` TEXT NOT NULL,
    MODIFY `referrer` TEXT NULL,
    MODIFY `userAgent` TEXT NULL;

-- CreateIndex
CREATE INDEX `Seo404Log_createdAt_idx` ON `Seo404Log`(`createdAt`);
