import { Prisma } from '../generated/client'
import prismaInternals from '@prisma/internals'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ============================================================================
// Método 1: DMMF del runtime (Prisma.dmmf) - SIMPLIFIED IN NO-RUST
// ============================================================================
// This is what Prisma provides automatically when using engineType = "client"
// It's MISSING most metadata properties - this is the BUG we're reporting
console.log('=== DMMF del Runtime (Prisma.dmmf) - BUG ===')
const runtimeDmmf = Prisma.dmmf.datamodel.models
console.log(JSON.stringify(runtimeDmmf, null, 2))

// ============================================================================
// Método 2: DMMF completo usando @prisma/internals - MANUAL WORKAROUND
// ============================================================================
// ⚠️ IMPORTANT: This is NOT provided by Prisma automatically!
// You must implement this yourself if you need the full DMMF.
// This requires:
// - Installing @prisma/internals as a dependency
// - Reading the schema.prisma file from the file system
// - Parsing it at runtime or build time
//
// This demonstrates that the metadata EXISTS but Prisma doesn't expose it
// in Prisma.dmmf when using engineType = "client"
async function getFullDMMFFromSchema() {
  const schemaPath = join(__dirname, '../prisma/schema.prisma')
  const schema = readFileSync(schemaPath, 'utf-8')

  const fullDmmf = await prismaInternals.getDMMF({ datamodel: schema })

  console.log('\n=== DMMF Completo desde Schema (@prisma/internals) ===')
  console.log(JSON.stringify(fullDmmf.datamodel.models, null, 2))

  // Comparación: Mostrar un modelo específico
  const carModel = fullDmmf.datamodel.models.find(m => m.name === 'Car')
  console.log('\n=== Modelo Car con todos los detalles ===')
  console.log(JSON.stringify(carModel, null, 2))
}

getFullDMMFFromSchema().catch(console.error)
