# wetrack-dashboard

TypeScript-Library zum Definieren, Zusammensetzen und Deployen von Dashboard-Konfigurationen.

## Setup

```bash
bun install
```

## Build (Library Bundle)

```bash
bun run build
```

Der Build erzeugt in `dist/`:

- ESM (`*.mjs`)
- CJS (`*.cjs`)
- Type Declarations (`*.d.ts`)

## Verwendung

Root-Import:

```ts
import { Stack, Dashboard, Query } from "wetrack-dashboard";
```

Subpath-Import:

```ts
import { Query } from "wetrack-dashboard/query";
import { chartSchema } from "wetrack-dashboard/schemas";
```

## Release-Workflow (npm)

1. Build ausführen:

```bash
bun run build
```

2. Paketinhalt prüfen:

```bash
npm run pack:check
```

3. Veröffentlichen:

```bash
npm publish
```

### Architektur

![Architecture Diagram](./docs/assets/architecture.png)

Die zentrale Abstraktion ist die `Stack`-Klasse, die als Orchestrator und Fluent Builder fungiert:

- **stack.ts** — Haupteinstiegspunkt
- **chart.ts, dashboard.ts, datasource.ts, query.ts** — Entity-Definitionen
- **schemas.ts** — Zod Validierungsschemas
- **types/** — Typ-Definitionen pro Domain

**Datenfluss**: `DataSource` → optional über eine oder mehrere `Query`s → `Chart`. Stack erstellen → Entities hinzufügen (`.addDashboard()`, `.addDataSource()`, `.addQuery()`, `.addChart()`) → `.synthesize()` aufrufen.
