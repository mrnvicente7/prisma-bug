# Prisma Optional Include Type Regression

## Overview

This test case demonstrates a breaking change in Prisma's TypeScript type inference between version 4 and version 5+ when using optional/conditional includes in queries.

## The Issue

### Prisma v4 Behavior (Expected)

In Prisma 4, when using a conditional/optional `include` with the spread operator pattern, the TypeScript return type correctly reflects that the included relation is **optional** (`undefined` when the condition is false).

**Code:**
```typescript
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

  return select
}
```

**Inferred Return Type (v4):**
```typescript
const select: (Car & {
  carModel?: (CarModel & {
    stock: {
      forecasted: number;
      onhand: number;
    }[];
  })[] | undefined;
})[]
```

**Key Point:** Notice `carModel?` is marked as **optional** with `| undefined`, which accurately represents that this field may or may not be present depending on the `includeModels` parameter.

### Prisma v5+ Behavior (Regression L)

In Prisma 5 and later versions (including v6), the same code produces an **incorrect** type inference. The return type **always** includes the relation fields, even when they are conditionally included.

**Same Code, Different Type:**
```typescript
const select: ({
  carModel: {
    id: string;
    car_id: string;
    name: string;
  }[];
} & {
  id: string;
  name: string;
})[]
```

**Problems:**
1. `carModel` is **no longer optional** - it's marked as a required field
2. The nested `stock` selection is **completely ignored** in the type
3. TypeScript now incorrectly assumes `carModel` will always be present, even when `includeModels` is `false`
4. This creates a **type safety issue** - the runtime value can be `undefined`, but TypeScript thinks it's always defined

## Test Setup

This package contains two implementations:
- `prisma-v4/` - Demonstrates correct behavior with Prisma 4.13.0
- `prisma-v5+/` - Demonstrates the regression with Prisma 6.17.1
