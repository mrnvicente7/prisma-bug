# Prisma Bug Reports

This repository contains reproducible examples of bugs and issues found in Prisma ORM.

## Repository Structure

```
packages/
  ├── prisma-no-rust/           # Issues related to Prisma without Rust (engineType = "client")
  │   └── DMMF/                 # DMMF simplification bug
  │       ├── prisma-v6/        # Control: with Rust engine
  │       └── prisma-v6-no-rust/ # Bug: without Rust engine
  │
  └── prisma-response-include-optional/  # Issues with optional includes in responses
      ├── prisma-v4/            # Prisma v4 behavior
      └── prisma-v5+/           # Prisma v5+ behavior
```

## Current Issues

### 1. DMMF Simplified in Prisma without Rust

**Location:** [`packages/prisma-no-rust/DMMF/`](packages/prisma-no-rust/DMMF/)

**Summary:** When using `engineType = "client"`, the `Prisma.dmmf.datamodel.models` returns a drastically simplified structure missing critical metadata properties compared to the default Rust-based engine.

**See:** [packages/prisma-no-rust/DMMF/README.md](packages/prisma-no-rust/DMMF/README.md) for full details.

### 2. Optional Include Type Regression (v4 → v5+)

**Location:** [`packages/prisma-response-include-optional/`](packages/prisma-response-include-optional/)

**Summary:** Breaking change in TypeScript type inference between Prisma v4 and v5+. When using conditional/optional includes with the spread operator pattern, v5+ incorrectly infers the relation field as always present (non-optional), creating type safety issues.

**See:** [packages/prisma-response-include-optional/README.md](packages/prisma-response-include-optional/README.md) for full details.

## Quick Start

```bash
# Install all dependencies
pnpm install

# Navigate to specific bug reproduction
cd packages/prisma-no-rust/DMMF/

# Follow the README in each package for specific reproduction steps
```

## Environment

- **Node version:** 22.14.0+
- **Package manager:** pnpm 10.16.1+
- **Prisma versions:** Specified in each package
