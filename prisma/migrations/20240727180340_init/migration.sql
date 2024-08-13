-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "procedencia" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "profesion" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cita_medica" (
    "id" TEXT NOT NULL,
    "cita" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "id_persona" TEXT NOT NULL,
    "doctor" TEXT NOT NULL,
    "doctor_telefono" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "doctor_correo" TEXT NOT NULL,

    CONSTRAINT "Cita_medica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cita_medica" ADD CONSTRAINT "Cita_medica_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
