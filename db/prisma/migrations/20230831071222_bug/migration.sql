-- CreateTable
CREATE TABLE "Car" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concessionaire" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Concessionaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcessionaireInventory" (
    "concessionaire_id" UUID NOT NULL,
    "car_model_id" UUID NOT NULL,
    "onhand" INTEGER NOT NULL DEFAULT 0,
    "forecasted" INTEGER NOT NULL DEFAULT 0,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConcessionaireInventory_pkey" PRIMARY KEY ("concessionaire_id","car_model_id")
);

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcessionaireInventory" ADD CONSTRAINT "ConcessionaireInventory_concessionaire_id_fkey" FOREIGN KEY ("concessionaire_id") REFERENCES "Concessionaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcessionaireInventory" ADD CONSTRAINT "ConcessionaireInventory_car_model_id_fkey" FOREIGN KEY ("car_model_id") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
