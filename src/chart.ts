import type { ChartConfig, ChartDefinition } from "./types/chart";
import type { ChartKey } from "./types/keys";

/**
 * Defines a chart that renders data on a Dashboard.
 *
 * Supported types: `"bar"` | `"line"` | `"stat"` | `"clock"`
 *
 * Layout is optional — omit it to use auto-layout, or specify
 * `{ x, y, w, h }` for an explicit position on the 12-column grid.
 *
 * @example Bar chart
 * ```typescript
 * new Chart("revenue-chart", {
 *   dashboard: "main",
 *   source: { _entity: "query", key: "revenue" },
 *   label: "Revenue by Month",
 *   type: "bar",
 *   config: { categoryField: "month", valueFields: ["amount"] }
 * })
 * ```
 *
 * @example Stat card
 * ```typescript
 * new Chart("total-mrr", {
 *   dashboard: "main",
 *   source: { _entity: "query", key: "mrr" },
 *   label: "MRR",
 *   type: "stat",
 *   config: { valueField: "total", unit: "€", decimals: 0 }
 * })
 * ```
 *
 * @example Clock (timezone display)
 * ```typescript
 * new Chart("berlin-time", {
 *   dashboard: "main",
 *   label: "Berlin",
 *   type: "clock",
 *   config: { timeZone: "Europe/Berlin" }
 * })
 * ```
 */
export class Chart {
  key: ChartKey;
  chartConfig: ChartConfig;

  constructor(key: string, chartConfig: ChartConfig) {
    this.key = key as ChartKey;
    this.chartConfig = chartConfig;
  }

  synthesize(): ChartDefinition {
    const { source, ...rest } = this.chartConfig;
    const sourceFields =
      source?._entity === "query"
        ? { query: source.key as string }
        : source?._entity === "dataSource"
          ? { dataSource: source.key as string }
          : {};
    return { key: this.key, ...rest, ...sourceFields } as ChartDefinition;
  }

  static fromJSON(json: ChartDefinition): Chart {
    const { key, query, dataSource, ...rest } = json as ChartDefinition & {
      query?: string;
      dataSource?: string;
    };
    // Beim Deserialisieren aus JSON bauen wir den source-Ref manuell zurück
    const source = query
      ? ({ _entity: "query", key: query } as never)
      : dataSource
        ? ({ _entity: "dataSource", key: dataSource } as never)
        : undefined;
    return new Chart(key, { ...rest, source } as ChartConfig);
  }
}
