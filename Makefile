.PHONY: help install clean generate-all

# Default target
help:
	@echo "Prisma Bug Monorepo - Available commands:"
	@echo ""
	@echo "  make install       - Install all dependencies"
	@echo "  make clean         - Clean node_modules and reinstall"
	@echo ""
	@echo "  make generate-all  - Generate all Prisma clients"

# Installation
install:
	pnpm install

clean:
	rm -rf node_modules
	find . -type d -name "node_modules" -exec rm -rf {} +
	find . -type d -name "generated" -exec rm -rf {} +

# Generate Prisma clients
generate-all:
	@find packages -name "schema.prisma" -type f | while read schema; do \
		dir=$$(dirname "$$schema" | xargs dirname); \
		echo "Generating Prisma client in $$dir..."; \
		(cd "$$dir" && pnpm prisma generate) || exit 1; \
	done
