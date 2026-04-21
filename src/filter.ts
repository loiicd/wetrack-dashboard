import type { FilterConfig, FilterDefinition } from "./types/filter";

/**
 * Defines a dashboard filter that appears in the Dashboard header,
 * allowing users to interactively filter chart data at runtime.
 *
 * Filters can apply to Queries (post-fetch array filtering) or DataSources
 * (injecting the value directly into REST API calls).
 *
 * @example Select filter (single)
 * ```typescript
 * new Filter("status", {
 *   type: "select",
 *   label: "Status",
 *   field: "status",
 *   options: ["active", "inactive", "pending"],
 *   targets: [{ type: "query", key: "items" }]
 * })
 * ```
 *
 * @example Date range filter with REST injection
 * ```typescript
 * new Filter("period", {
 *   type: "date_range",
 *   label: "Zeitraum",
 *   field: "createdAt",
 *   targets: [{
 *     type: "dataSource",
 *     key: "api",
 *     inject: { location: "query", name: "from" }
 *   }]
 * })
 * ```
 *
 * @example Number range filter
 * ```typescript
 * new Filter("amount", {
 *   type: "number_range",
 *   label: "Betrag",
 *   field: "amount",
 *   targets: [{ type: "query", key: "transactions" }]
 * })
 * ```
 *
 * @example String filter
 * ```typescript
 * new Filter("search", {
 *   type: "string",
 *   label: "Suche",
 *   field: "name",
 *   targets: [{ type: "query", key: "items" }]
 * })
 * ```
 */
export class Filter {
  readonly key: string;
  readonly config: FilterConfig;

  constructor(key: string, config: FilterConfig) {
    this.key = key;
    this.config = config;
  }

  synthesize(): FilterDefinition {
    return {
      key: this.key,
      ...this.config,
    };
  }

  static fromJSON(json: FilterDefinition): Filter {
    const { key, ...config } = json;
    return new Filter(key, config as FilterConfig);
  }
}
