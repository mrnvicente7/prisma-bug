# DMMF Simplification Bug in Prisma without Rust

This directory contains a reproducible example of the DMMF simplification issue when using Prisma without Rust engines.

## The Bug

When using `engineType = "client"` (Prisma ORM without Rust), the `Prisma.dmmf.datamodel.models` returns a significantly simplified structure that is missing critical metadata properties compared to the default Rust-based engine.

## Quick Reproduction

### Prerequisites

```bash
# From the repository root
pnpm install
```

### Step 1: Test WITH Rust Engine (Expected Behavior)

```bash
# Navigate to the control test
cd packages/prisma-no-rust-dmmf/prisma-v6

# Generate Prisma Client
pnpm prisma:generate

# Run the test
pnpm dev
```

**Expected output:** Full DMMF with complete metadata structure:

**At model level:**
- `name`, `dbName`, `schema`
- `fields` (array with full field metadata)
- `primaryKey`, `uniqueFields`, `uniqueIndexes`
- `isGenerated`

**At field level (inside `fields` array):**
- `name`, `kind`, `type`
- `isList`, `isRequired`, `isUnique`, `isId`, `isReadOnly`
- `hasDefaultValue`, `default`, `nativeType`
- `isGenerated`, `isUpdatedAt`
- For relations: `relationName`, `relationFromFields`, `relationToFields`

### Step 2: Test WITHOUT Rust Engine (Bug)

```bash
# Navigate to the bug demonstration
cd ../prisma-v6-no-rust

# Generate Prisma Client
pnpm prisma:generate

# Run the test showing simplified DMMF
pnpm dev
```

**Actual output:** Drastically simplified DMMF structure:

**At model level - Only has:**
- `name`, `dbName`
- `fields` (array with simplified field data)

**At model level - Missing:**
- ❌ `schema`
- ❌ `primaryKey`
- ❌ `uniqueFields`
- ❌ `uniqueIndexes`
- ❌ `isGenerated`

**At field level - Only has:**
- `name`, `kind`, `type`
- For relations: `relationName` (but NOT `relationFromFields` or `relationToFields`)

**At field level - Missing:**
- ❌ `isList`, `isRequired`, `isUnique`, `isId`, `isReadOnly`
- ❌ `hasDefaultValue`, `default`, `nativeType`
- ❌ `isGenerated`, `isUpdatedAt`
- ❌ For relations: `relationFromFields`, `relationToFields`

### Step 3: See the Workaround

```bash
# Still in prisma-v6-no-rust directory

# Run the comparison script
pnpm dev:full
```

This shows:
1. **Runtime DMMF** (from `Prisma.dmmf`) - Simplified (the bug)
2. **Full DMMF** (from `@prisma/internals`) - Complete metadata

This proves that the metadata **exists** but Prisma doesn't expose it automatically in the runtime when using `engineType = "client"`.

## Directory Structure

```
DMMF/
├── README.md (this file)
│
├── prisma-v6/                    # Control Test
│   ├── prisma/
│   │   └── schema.prisma         # Standard Prisma schema (WITH Rust)
│   ├── src/
│   │   └── index.ts              # Outputs full DMMF
│   └── package.json
│
└── prisma-v6-no-rust/            # Bug Demonstration
    ├── prisma/
    │   └── schema.prisma         # Same schema (WITHOUT Rust)
    ├── src/
    │   ├── index.ts              # Shows simplified DMMF bug
    │   └── index-full-dmmf.ts    # Shows workaround
    └── package.json
```

## Key Configuration Difference

### ✅ With Rust (Control)
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
  // No engineType = uses Rust engine (default)
}
```

### ❌ Without Rust (Bug)
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
  engineType = "client"  // This causes the bug
}
```

## What to Look For

### Full DMMF (With Rust) - Expected

```json
{
  "name": "id",
  "kind": "scalar",
  "isList": false,
  "isRequired": true,
  "isUnique": false,
  "isId": true,
  "isReadOnly": false,
  "hasDefaultValue": true,
  "type": "String",
  "nativeType": ["Uuid", []],
  "default": {
    "name": "uuid",
    "args": [4]
  },
  "isGenerated": false,
  "isUpdatedAt": false
}
```

### Simplified DMMF (Without Rust) - Bug

```json
{
    "name": "Car",
    "dbName": null,
    "schema": null,
    "fields": [
      {
        "name": "id",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": true,
        "isReadOnly": false,
        "hasDefaultValue": true,
        "type": "String",
        "nativeType": [
          "Uuid",
          []
        ],
        "default": {
          "name": "uuid",
          "args": [
            4
          ]
        },
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "name",
        "kind": "scalar",
        "isList": false,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "String",
        "nativeType": null,
        "isGenerated": false,
        "isUpdatedAt": false
      },
      {
        "name": "carModel",
        "kind": "object",
        "isList": true,
        "isRequired": true,
        "isUnique": false,
        "isId": false,
        "isReadOnly": false,
        "hasDefaultValue": false,
        "type": "CarModel",
        "nativeType": null,
        "relationName": "CarToCarModel",
        "relationFromFields": [],
        "relationToFields": [],
        "isGenerated": false,
        "isUpdatedAt": false
      }
    ],
    "primaryKey": null,
    "uniqueFields": [],
    "uniqueIndexes": [],
    "isGenerated": false
  }
```

**Problem:** Missing 10+ critical properties!

## Comparison Table

| Property | With Rust | Without Rust | Impact |
|----------|-----------|--------------|---------|
| **Model Level** |
| `schema` | ✅ | ❌ | Can't detect multi-schema setups |
| `primaryKey` | ✅ | ❌ | Can't identify composite primary keys |
| `uniqueFields` | ✅ | ❌ | Can't detect composite unique constraints |
| `uniqueIndexes` | ✅ | ❌ | Can't detect unique indexes |
| **Field Level** |
| `isList` | ✅ | ❌ | **Critical:** Can't distinguish arrays from scalars |
| `isRequired` | ✅ | ❌ | **Critical:** Can't validate required fields |
| `isId` | ✅ | ❌ | **Critical:** Can't identify primary keys |
| `hasDefaultValue` | ✅ | ❌ | Can't detect fields with defaults |
| `default` | ✅ | ❌ | Can't see default value configuration |
| `nativeType` | ✅ | ❌ | Can't see database-specific types |
| **Relations** |
| `relationFromFields` | ✅ | ❌ | **Critical:** Can't see foreign key fields |
| `relationToFields` | ✅ | ❌ | **Critical:** Can't see referenced fields |

## Environment

- **Prisma version:** 6.17.0
- **Node version:** 22.14.0+
- **Database:** PostgreSQL (but affects all databases)
