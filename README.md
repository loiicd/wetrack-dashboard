# wetrack-dashboard

> TypeScript SDK for defining Dashboard-as-Code with WeTrack.

[![npm version](https://img.shields.io/npm/v/wetrack-dashboard.svg)](https://www.npmjs.com/package/wetrack-dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install wetrack-dashboard
# or
bun add wetrack-dashboard
```

## Quick Start

```typescript
import { Stack, Dashboard, DataSource, Query, Chart } from "wetrack-dashboard";

export default new Stack("saas-metrics", "PRODUCTION")
  .addDashboard(
    new Dashboard("overview", { label: "SaaS Metrics" })
  )
  .addDataSource(
    new DataSource("api", {
      type: "rest",
      config: {
        url: "https://api.example.com/metrics",
        method: "get",
        credential: "my-api-key", // references Credential Vault
      },
    })
  )
  .addQuery(
    new Query("mrr-data", {
      type: "jsonpath",
      dataSource: "api",
      jsonPath: "$.metrics[*]",
    })
  )
  .addChart(
    new Chart("mrr-chart", {
      dashboard: "overview",
      source: { _entity: "query", key: "mrr-data" },
      label: "Monthly Recurring Revenue",
      type: "cartesian",
      config: { categoryField: "month", valueFields: ["mrr"] },
      layout: { x: 0, y: 0, w: 12, h: 3 },
    })
  );
```

## Deploy

```bash
npx wetrack-cli deploy mystack.ts
```

## API Reference

Full documentation at [docs.wetrack.dev](https://docs.wetrack.dev/docs/sdk-reference).

### Stack

```typescript
new Stack(key: string, environment: "PRODUCTION" | "STAGING" | "DEVELOPMENT")
  .addDashboard(...dashboards)
  .addDataSource(...sources)
  .addQuery(...queries)
  .addChart(...charts)
  .synthesize() // → JSON
```

### Dashboard

```typescript
new Dashboard(key: string, { label: string, description?: string })
```

### DataSource

```typescript
new DataSource(key: string, {
  type: "rest",
  config: {
    url: string,
    method: "get" | "post" | "put",
    headers?: Record<string, string>,
    body?: unknown,
    credential?: string, // Credential Vault label
  },
})
```

### Query

```typescript
// JSONPath
new Query(key: string, {
  type: "jsonpath",
  dataSource?: string,   // DataSource key
  sourceQuery?: string,  // another Query key (chaining)
  jsonPath: string,
})

// SQL (in-memory, table is always ?)
new Query(key: string, {
  type: "sql",
  dataSource?: string,
  sourceQuery?: string,
  sql: string,
})
```

### Chart

```typescript
new Chart(key: string, {
  dashboard: string,
  source?: { _entity: "query" | "dataSource", key: string },
  label: string,
  type: "cartesian" | "stat" | "clock",
  config: CartesianChartConfig | StatConfig | ClockConfig,
  layout?: { x: number, y: number, w: number, h: number },
})
```

#### CartesianChartConfig

```typescript
{
  categoryField: string,        // x-axis field
  valueFields: string[],        // y-axis fields
  seriesTypes?: ("bar" | "line" | "area" | "scatter")[], // one per valueField (default: "bar")
}
```

## Subpath Exports

```typescript
import { Stack } from "wetrack-dashboard";
import { Chart } from "wetrack-dashboard/chart";
import { stackSchema } from "wetrack-dashboard/schemas";
```

## Build

```bash
bun run build
```

Outputs to `dist/`: ESM (`*.mjs`), CJS (`*.cjs`), Types (`*.d.ts`).

## License

MIT — see [LICENSE](./LICENSE)
