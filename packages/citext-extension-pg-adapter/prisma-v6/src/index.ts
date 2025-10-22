import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const PrismaOrm = new PrismaClient({ adapter })

const carId = '625094cd-2e07-4dcc-aa97-25ec9313b78d'

// Whitout string[] citext work fine

// const upsertCar = await PrismaOrm.car.upsert({
//   create: {
//     id: carId,
//     name: 'testCar',
//   },
//   update: {},
//   where: { id: carId },
// })

// With string[] citext work fine not working (colors prop)

const upsertCar = await PrismaOrm.car.upsert({
  create: {
    id: carId,
    name: 'testCar',
    colors: ['red', 'white', 'black'],
  },
  update: {},
  where: { id: carId },
})

console.log('upsertCar', upsertCar)

// PrismaClientKnownRequestError:
// Invalid `PrismaOrm.car.upsert()` invocation in
// /Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6/src/index.ts:22:39

// → 22 const upsertCar = await PrismaOrm.car.upsert(
// Inconsistent column data: List field did not return an Array from database. Type identifier was String. Value was Value { typed: Text(Some("{red,white,black}")), native_column_type: None }.
//     at ei.handleRequestError (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6/generated/client/runtime/library.js:124:7268)
//     at ei.handleAndLogRequestError (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6/generated/client/runtime/library.js:124:6593)
//     at ei.request (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6/generated/client/runtime/library.js:124:6300)
//     at async a (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6/generated/client/runtime/library.js:133:9551)
//     at async <anonymous> (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6/src/index.ts:22:19) {
//   code: 'P2023',
//   meta: {
//     modelName: 'Car',
//     message: 'List field did not return an Array from database. Type identifier was String. Value was Value { typed: Text(Some("{red,white,black}")), native_column_type: None }.'
//   },
//   clientVersion: '6.17.1'
// }

// Node.js v22.14.0
//  ELIFECYCLE  Command failed with exit code 1.
