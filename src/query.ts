import type { QueryConfig, QueryDefinition } from "./types/query";
import type { QueryKey } from "./types/keys";

/**
 * Transforms data from a DataSource or another Query using JSONPath or SQL.
 * Queries can be chained: use `sourceQuery` to take the output of another
 * Query as input.
 *
 * @example JSONPath query
 * ```typescript
 * new Query("revenue", {
 *   type: "jsonpath",
 *   dataSource: "api",
 *   jsonPath: "$.data.revenue[*]"
 * })
 * ```
 *
 * @example SQL query (in-memory, runs on the result of another query)
 * ```typescript
 * new Query("monthly-totals", {
 *   type: "sql",
 *   sourceQuery: "revenue",
 *   sql: "SELECT month, SUM(amount) as total FROM ? GROUP BY month ORDER BY month"
 * })
 * ```
 */
export class Query {
  readonly _entity = "query" as const;
  key: QueryKey;
  config: QueryConfig;

  constructor(key: string, config: QueryConfig) {
    this.key = key as QueryKey;
    this.config = config;
  }

  synthesize(): QueryDefinition {
    const base = {
      key: this.key,
      type: this.config.type,
      dataSource: this.config.dataSource,
      sourceQuery: this.config.sourceQuery,
    };

    if (this.config.type === "jsonpath") {
      return { ...base, type: "jsonpath", jsonPath: this.config.jsonPath };
    } else {
      return { ...base, type: "sql", sql: this.config.sql };
    }
  }

  static fromJSON(json: QueryDefinition): Query {
    const { key, ...config } = json;
    return new Query(key, config as QueryConfig);
  }
}
