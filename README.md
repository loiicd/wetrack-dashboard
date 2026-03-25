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
