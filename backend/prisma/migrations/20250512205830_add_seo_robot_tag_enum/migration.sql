/*
  Warnings:

  - The `robotsTag` column on the `SeoMeta` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SeoRobotsTag" AS ENUM ('index_follow', 'noindex_nofollow', 'index_nofollow', 'noindex_follow');

-- AlterTable
ALTER TABLE "SeoMeta" DROP COLUMN "robotsTag",
ADD COLUMN     "robotsTag" "SeoRobotsTag" NOT NULL DEFAULT 'index_follow';
