/*
  Warnings:

  - You are about to alter the column `nota` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Orders" ALTER COLUMN "nota" SET DATA TYPE INTEGER;
