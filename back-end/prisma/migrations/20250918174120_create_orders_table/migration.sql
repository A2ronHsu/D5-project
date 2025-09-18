-- CreateTable
CREATE TABLE "public"."Orders" (
    "id" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "codigoCliente" TEXT NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "printStatus" BOOLEAN NOT NULL,
    "deposito" TEXT NOT NULL,
    "codigoVendedor" TEXT NOT NULL,
    "nombreVendedor" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
