import { PrismaClient } from '../generated/client'

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

// Test the function
getCars({ includeModels: true })
  .then((cars) => {
    console.log('Prisma v4 - Cars:', cars)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
  .finally(() => {
    PrismaOrm.$disconnect()
  })
