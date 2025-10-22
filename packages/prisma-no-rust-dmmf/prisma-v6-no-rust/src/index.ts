import { Prisma } from '../generated/client'

const prismaDmmfModels = Prisma.dmmf.datamodel.models

console.log('prismaDmmfModels', JSON.stringify(prismaDmmfModels, null, 2))

// RESPONSE
// [
//   {
//     "name": "Car",
//     "fields": [
//       {
//         "name": "id",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "name",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "carModel",
//         "kind": "object",
//         "type": "CarModel",
//         "relationName": "CarToCarModel"
//       }
//     ],
//     "dbName": null
//   },
//   {
//     "name": "CarModel",
//     "fields": [
//       {
//         "name": "id",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "car_id",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "name",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "car",
//         "kind": "object",
//         "type": "Car",
//         "relationName": "CarToCarModel"
//       },
//       {
//         "name": "stock",
//         "kind": "object",
//         "type": "ConcessionaireInventory",
//         "relationName": "CarModelToConcessionaireInventory"
//       }
//     ],
//     "dbName": null
//   },
//   {
//     "name": "Concessionaire",
//     "fields": [
//       {
//         "name": "id",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "name",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "created",
//         "kind": "scalar",
//         "type": "DateTime"
//       },
//       {
//         "name": "updated",
//         "kind": "scalar",
//         "type": "DateTime"
//       },
//       {
//         "name": "inventory",
//         "kind": "object",
//         "type": "ConcessionaireInventory",
//         "relationName": "ConcessionaireToConcessionaireInventory"
//       }
//     ],
//     "dbName": null
//   },
//   {
//     "name": "ConcessionaireInventory",
//     "fields": [
//       {
//         "name": "concessionaire_id",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "car_model_id",
//         "kind": "scalar",
//         "type": "String"
//       },
//       {
//         "name": "onhand",
//         "kind": "scalar",
//         "type": "Int"
//       },
//       {
//         "name": "forecasted",
//         "kind": "scalar",
//         "type": "Int"
//       },
//       {
//         "name": "created",
//         "kind": "scalar",
//         "type": "DateTime"
//       },
//       {
//         "name": "updated",
//         "kind": "scalar",
//         "type": "DateTime"
//       },
//       {
//         "name": "concessionaire",
//         "kind": "object",
//         "type": "Concessionaire",
//         "relationName": "ConcessionaireToConcessionaireInventory"
//       },
//       {
//         "name": "carModel",
//         "kind": "object",
//         "type": "CarModel",
//         "relationName": "CarModelToConcessionaireInventory"
//       }
//     ],
//     "dbName": null
//   }
// ]
