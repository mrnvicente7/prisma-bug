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

// TypeError: e.map is not a function
//     at nf (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:8774)
//     at El (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:8471)
//     at oo (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:7646)
//     at xl (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:7353)
//     at e.interpretNode (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:32509)
//     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//     at async e.interpretNode (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:32277)
//     at async e.run (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:29729)
//     at async e.execute (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:74:41858)
//     at async Bt.request (/Users/mvicente/Desktop/DEV/prisma-bug/packages/prisma-no-rust/citext-extension-pg-adapter/prisma-v6-no-rust/generated/client/runtime/client.js:75:2073) {
//   clientVersion: '6.17.1'
// }

// Node.js v22.14.0
