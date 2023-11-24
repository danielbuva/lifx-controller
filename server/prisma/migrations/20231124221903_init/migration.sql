-- CreateTable
CREATE TABLE "Preset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "hue" INTEGER,
    "saturation" INTEGER,
    "lightness" INTEGER DEFAULT 50,
    "brightness" INTEGER NOT NULL,
    "kelvin" INTEGER,
    "colorRepresentation" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Preset_label_key" ON "Preset"("label");
