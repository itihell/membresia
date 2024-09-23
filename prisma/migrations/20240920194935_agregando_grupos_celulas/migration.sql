-- CreateTable
CREATE TABLE "grupos" (
    "id" SERIAL NOT NULL,
    "grupo" TEXT NOT NULL,
    "lider_id" TEXT NOT NULL,
    "iglesia_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grupos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos_has_personas" (
    "id" TEXT NOT NULL,
    "grupo_id" INTEGER NOT NULL,
    "persona_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grupos_has_personas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grupos_grupo_key" ON "grupos"("grupo");

-- CreateIndex
CREATE UNIQUE INDEX "grupos_has_personas_grupo_id_persona_id_key" ON "grupos_has_personas"("grupo_id", "persona_id");

-- AddForeignKey
ALTER TABLE "grupos_has_personas" ADD CONSTRAINT "grupos_has_personas_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupos_has_personas" ADD CONSTRAINT "grupos_has_personas_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
