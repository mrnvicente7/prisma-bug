import { PrismaClient } from '../db/dist'

const PrismaOrm = new PrismaClient()

async function getCars(opts: { includeModels?: boolean }) {
  const { includeModels } = opts

  const select = await PrismaOrm.car.findMany({
    include: {
      ...(includeModels && {
        carModel: {
          include: {
            stock: {
              select: {
                forecasted: true,
                onhand: true,
              },
            },
          },
        },
      }),
    },
  })

  if (!select) throw new Error('select err')

  return select
}

// Prisma 4 select return (expected):
/* const select: (Car & {
  carModel?: (CarModel & {
    stock: {
      forecasted: number;
      onhand: number;
    }[];
  })[] | undefined;
})[] */

// Prisma 5 select return (not expected):
/* const select: ({
  carModel: {
    id: string;
    car_id: string;
    name: string;
  }[];
} & {
  id: string;
  name: string;
})[] */
