/*
  Warnings:

  - Added the required column `groupId` to the `Preset` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Preset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" TEXT NOT NULL,
    "lightId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "hue" INTEGER,
    "saturation" INTEGER,
    "lightness" INTEGER DEFAULT 50,
    "brightness" INTEGER NOT NULL,
    "kelvin" INTEGER
);
INSERT INTO "new_Preset" ("brightness", "hue", "id", "kelvin", "label", "lightId", "lightness", "saturation") SELECT "brightness", "hue", "id", "kelvin", "label", "lightId", "lightness", "saturation" FROM "Preset";
DROP TABLE "Preset";
ALTER TABLE "new_Preset" RENAME TO "Preset";
CREATE UNIQUE INDEX "Preset_label_key" ON "Preset"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
