import type {
  DataSourceConfig,
  DataSourceDefinition,
} from "./types/datasource";
import type { DataSourceKey } from "./types/keys";

/**
 * Defines a REST API data source that WeTrack will call to fetch chart data.
 *
 * @example Basic usage
 * ```typescript
 * new DataSource("api", {
 *   type: "rest",
 *   config: { url: "https://api.example.com/metrics", method: "get" }
 * })
 * ```
 *
 * @example With a stored credential (value set in app.wetrack.dev → Settings → Credentials)
 * ```typescript
 * new DataSource("protected-api", {
 *   type: "rest",
 *   config: {
 *     url: "https://api.example.com/metrics",
 *     method: "get",
 *     credential: "my-api-key"  // references a credential label — never the actual value
 *   }
 * })
 * ```
 */
export class DataSource {
  readonly _entity = "dataSource" as const;
  key: DataSourceKey;
  dataSourceConfig: DataSourceConfig;

  constructor(key: string, dataSourceConfig: DataSourceConfig) {
    this.key = key as DataSourceKey;
    this.dataSourceConfig = dataSourceConfig;
  }

  synthesize(): DataSourceDefinition {
    return {
      key: this.key,
      ...this.dataSourceConfig,
    };
  }

  static fromJSON(json: DataSourceDefinition): DataSource {
    const { key, ...dataSourceConfig } = json;
    return new DataSource(key, dataSourceConfig as DataSourceConfig);
  }
}
