import { Prisma } from '../generated/client'

const prismaDmmfModels = Prisma.dmmf.datamodel.models

console.log('prismaDmmfModels', JSON.stringify(prismaDmmfModels, null, 2))

// RESPONSE
// [
//   {
//     "name": "Car",
//     "dbName": null,
//     "schema": null,
//     "fields": [
//       {
//         "name": "id",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": true,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "String",
//         "nativeType": [
//           "Uuid",
//           []
//         ],
//         "default": {
//           "name": "uuid",
//           "args": [
//             4
//           ]
//         },
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "name",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "String",
//         "nativeType": null,
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "carModel",
//         "kind": "object",
//         "isList": true,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "CarModel",
//         "nativeType": null,
//         "relationName": "CarToCarModel",
//         "relationFromFields": [],
//         "relationToFields": [],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       }
//     ],
//     "primaryKey": null,
//     "uniqueFields": [],
//     "uniqueIndexes": [],
//     "isGenerated": false
//   },
//   {
//     "name": "CarModel",
//     "dbName": null,
//     "schema": null,
//     "fields": [
//       {
//         "name": "id",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": true,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "String",
//         "nativeType": [
//           "Uuid",
//           []
//         ],
//         "default": {
//           "name": "uuid",
//           "args": [
//             4
//           ]
//         },
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "car_id",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": true,
//         "hasDefaultValue": false,
//         "type": "String",
//         "nativeType": [
//           "Uuid",
//           []
//         ],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "name",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "String",
//         "nativeType": null,
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "car",
//         "kind": "object",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "Car",
//         "nativeType": null,
//         "relationName": "CarToCarModel",
//         "relationFromFields": [
//           "car_id"
//         ],
//         "relationToFields": [
//           "id"
//         ],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "stock",
//         "kind": "object",
//         "isList": true,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "ConcessionaireInventory",
//         "nativeType": null,
//         "relationName": "CarModelToConcessionaireInventory",
//         "relationFromFields": [],
//         "relationToFields": [],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       }
//     ],
//     "primaryKey": null,
//     "uniqueFields": [],
//     "uniqueIndexes": [],
//     "isGenerated": false
//   },
//   {
//     "name": "Concessionaire",
//     "dbName": null,
//     "schema": null,
//     "fields": [
//       {
//         "name": "id",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": true,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "String",
//         "nativeType": [
//           "Uuid",
//           []
//         ],
//         "default": {
//           "name": "uuid",
//           "args": [
//             4
//           ]
//         },
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "name",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "String",
//         "nativeType": null,
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "created",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "DateTime",
//         "nativeType": null,
//         "default": {
//           "name": "now",
//           "args": []
//         },
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "updated",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "DateTime",
//         "nativeType": null,
//         "isGenerated": false,
//         "isUpdatedAt": true
//       },
//       {
//         "name": "inventory",
//         "kind": "object",
//         "isList": true,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "ConcessionaireInventory",
//         "nativeType": null,
//         "relationName": "ConcessionaireToConcessionaireInventory",
//         "relationFromFields": [],
//         "relationToFields": [],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       }
//     ],
//     "primaryKey": null,
//     "uniqueFields": [],
//     "uniqueIndexes": [],
//     "isGenerated": false
//   },
//   {
//     "name": "ConcessionaireInventory",
//     "dbName": null,
//     "schema": null,
//     "fields": [
//       {
//         "name": "concessionaire_id",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": true,
//         "hasDefaultValue": false,
//         "type": "String",
//         "nativeType": [
//           "Uuid",
//           []
//         ],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "car_model_id",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": true,
//         "hasDefaultValue": false,
//         "type": "String",
//         "nativeType": [
//           "Uuid",
//           []
//         ],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "onhand",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "Int",
//         "nativeType": null,
//         "default": 0,
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "forecasted",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "Int",
//         "nativeType": null,
//         "default": 0,
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "created",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": true,
//         "type": "DateTime",
//         "nativeType": null,
//         "default": {
//           "name": "now",
//           "args": []
//         },
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "updated",
//         "kind": "scalar",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "DateTime",
//         "nativeType": null,
//         "isGenerated": false,
//         "isUpdatedAt": true
//       },
//       {
//         "name": "concessionaire",
//         "kind": "object",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "Concessionaire",
//         "nativeType": null,
//         "relationName": "ConcessionaireToConcessionaireInventory",
//         "relationFromFields": [
//           "concessionaire_id"
//         ],
//         "relationToFields": [
//           "id"
//         ],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       },
//       {
//         "name": "carModel",
//         "kind": "object",
//         "isList": false,
//         "isRequired": true,
//         "isUnique": false,
//         "isId": false,
//         "isReadOnly": false,
//         "hasDefaultValue": false,
//         "type": "CarModel",
//         "nativeType": null,
//         "relationName": "CarModelToConcessionaireInventory",
//         "relationFromFields": [
//           "car_model_id"
//         ],
//         "relationToFields": [
//           "id"
//         ],
//         "isGenerated": false,
//         "isUpdatedAt": false
//       }
//     ],
//     "primaryKey": {
//       "name": null,
//       "fields": [
//         "concessionaire_id",
//         "car_model_id"
//       ]
//     },
//     "uniqueFields": [],
//     "uniqueIndexes": [],
//     "isGenerated": false
//   }
// ]