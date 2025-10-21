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

// Prisma +5 select return (not expected):
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

// Test the function
getCars({ includeModels: true })
  .then((cars) => {
    console.log('Prisma v6 - Cars:', cars)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
  .finally(() => {
    PrismaOrm.$disconnect()
  })
