-- CreateTable
CREATE TABLE "familias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iglesia_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_edit_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "familias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "familias_has_personas" (
    "id" TEXT NOT NULL,
    "familia_id" TEXT NOT NULL,
    "persona_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "familias_has_personas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "familias" ADD CONSTRAINT "familias_iglesia_id_fkey" FOREIGN KEY ("iglesia_id") REFERENCES "iglesias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "familias" ADD CONSTRAINT "familias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "familias" ADD CONSTRAINT "familias_user_edit_id_fkey" FOREIGN KEY ("user_edit_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "familias_has_personas" ADD CONSTRAINT "familias_has_personas_familia_id_fkey" FOREIGN KEY ("familia_id") REFERENCES "familias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "familias_has_personas" ADD CONSTRAINT "familias_has_personas_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
