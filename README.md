# Prisma Bug Reports

This repository contains reproducible examples of bugs and issues found in Prisma ORM.

## Repository Structure

```
packages/
  ├── prisma-no-rust-dmmf/      # DMMF simplification bug (engineType = "client")
  │   ├── prisma-v6/            # Control: with Rust engine
  │   └── prisma-v6-no-rust/    # Bug: without Rust engine
  │
  ├── citext-extension-pg-adapter/  # Citext array bug with PostgreSQL adapter
  │   ├── prisma-v6/            # With Rust engine (P2023 error)
  │   └── prisma-v6-no-rust/    # Without Rust engine (TypeError)
  │
  └── prisma-response-include-optional/  # Issues with optional includes in responses
      ├── prisma-v4/            # Prisma v4 behavior
      └── prisma-v5+/           # Prisma v5+ behavior
```

## Current Issues

### 1. DMMF Simplified in Prisma without Rust

**Location:** [`packages/prisma-no-rust-dmmf/`](packages/prisma-no-rust-dmmf/)

**Summary:** When using `engineType = "client"`, the `Prisma.dmmf.datamodel.models` returns a drastically simplified structure missing critical metadata properties compared to the default Rust-based engine.

**See:** [packages/prisma-no-rust-dmmf/README.md](packages/prisma-no-rust-dmmf/README.md) for full details.

### 2. Citext Array Bug with PostgreSQL Adapter

**Location:** [`packages/citext-extension-pg-adapter/`](packages/citext-extension-pg-adapter/)

**Summary:** When using Prisma v6 with the PostgreSQL adapter (`@prisma/adapter-pg`) and `citext` extension for string array fields (`String[] @db.Citext`), Prisma fails to properly parse the database response. With Rust engine, it throws P2023 error "List field did not return an Array from database". Without Rust engine (`engineType = "client"`), it throws "TypeError: e.map is not a function".

**See:** [packages/citext-extension-pg-adapter/README.md](packages/citext-extension-pg-adapter/README.md) for full details.

### 3. Optional Include Type Regression (v4 → v5+)

**Location:** [`packages/prisma-response-include-optional/`](packages/prisma-response-include-optional/)

**Summary:** Breaking change in TypeScript type inference between Prisma v4 and v5+. When using conditional/optional includes with the spread operator pattern, v5+ incorrectly infers the relation field as always present (non-optional), creating type safety issues.

**See:** [packages/prisma-response-include-optional/README.md](packages/prisma-response-include-optional/README.md) for full details.

## Quick Start

```bash
# Install all dependencies
pnpm install

# Navigate to specific bug reproduction
cd packages/prisma-no-rust-dmmf/

# Follow the README in each package for specific reproduction steps
```

## Environment

- **Node version:** 22.14.0+
- **Package manager:** pnpm 10.16.1+
- **Prisma versions:** Specified in each package
