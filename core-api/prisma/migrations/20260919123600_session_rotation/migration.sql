-- AlterTable
ALTER TABLE "AppVariables" DROP CONSTRAINT "AppVariables_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AppVariables_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AppVariables_id_seq";

-- AlterTable
ALTER TABLE "Countries" DROP CONSTRAINT "Countries_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Countries_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Countries_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "AppVariables_name_key" ON "AppVariables"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_replacedById_fkey" FOREIGN KEY ("replacedById") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
