-- CreateTable
CREATE TABLE "valutes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(15),
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "valutes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "valutes_title_key" ON "valutes"("title");
