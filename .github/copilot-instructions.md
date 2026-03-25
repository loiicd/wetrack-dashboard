# Copilot Instructions

## Commands

```bash
bun install        # Install dependencies
bun run index.ts   # Run entry point (index.ts must be created by the user)
```

No test, lint, or build scripts are defined — the project runs directly via Bun with no emit step.

## Architecture

`wetrack-dashboard` is a TypeScript library for defining, composing, and deploying dashboard configurations programmatically. The central abstraction is the `Stack` class, which acts as an orchestrator and fluent builder.

```
src/
├── stack.ts        # Stack — main entry point and orchestrator
├── chart.ts        # Chart entity
├── dashboard.ts    # Dashboard entity
├── datasource.ts   # DataSource entity
├── query.ts        # Query entity
├── connector.ts    # REST API connector (converts Zod schemas → JSON schemas)
├── transform.ts    # Transform entity (SUM, AVG, GROUP_BY)
├── schemas.ts      # Zod validation schemas for all entities
└── types/          # Type definitions (one file per domain)
    ├── chart.ts    # BarChartConfig, LineChartConfig, StatCardConfig, ClockCardConfig, etc.
    ├── dashboard.ts
    ├── datasource.ts
    ├── query.ts
    ├── stack.ts    # StackEnvironment enum (PRODUCTION, STAGING, DEVELOPMENT)
    ├── connector.ts
    ├── transform.ts
    └── keys.ts     # Branded key types for cross-entity references
```

**Data flow**: User code creates a `Stack`, adds entities via fluent methods (`.addDashboard()`, `.addDataSource()`, `.addQuery()`, `.addChart()`), then calls `.synthesize()` to serialize or `.deploy(apiUrl)` to POST the configuration to a backend.

## Key Conventions

### Config vs. Definition pattern
Every entity has two related types:
- `*Config` — runtime configuration (metadata + settings, no key)
- `*Definition` — serialized form (`Config` + a branded key), used in `synthesize()` output

### Branded key types (`types/keys.ts`)
Cross-entity references use branded types to prevent mixing up IDs:
```ts
type DashboardKey = string & { readonly _brand: "DashboardKey" }
type QueryKey     = string & { readonly _brand: "QueryKey" }
// etc.
```
Always use the appropriate branded type (not plain `string`) when referencing another entity.

### `ChartSourceRef` discriminated union
Charts reference data via a discriminated union in `types/keys.ts`:
```ts
type ChartSourceRef =
  | { type: "query";      key: QueryKey }
  | { type: "dataSource"; key: DataSourceKey }
```

### Entity class shape
Every entity class follows the same pattern:
- Constructor accepts a `*Config` object
- `synthesize()` method returns a `*Definition` (serializable)
- Static `fromJSON()` factory method for deserialization
- `_entity` string literal property for runtime type identification

### Zod schemas in `schemas.ts`
All schemas live in `schemas.ts` (not co-located with types). Use discriminated unions (`z.discriminatedUnion`) for polymorphic types (chart types, query types). Validation runs inside `Stack` before deployment.

### Module imports
- Import entity classes from `src/*.ts` (e.g., `import { Chart } from "./chart"`)
- Import types from `src/types/*.ts` (e.g., `import type { ChartConfig } from "./types/chart"`)
- `verbatimModuleSyntax` is enabled — always use `import type` for type-only imports

### TypeScript strictness
`strict: true` plus `noUncheckedIndexedAccess` and `noImplicitOverride` are enabled. `noUnusedLocals` and `noUnusedParameters` are **off**.
