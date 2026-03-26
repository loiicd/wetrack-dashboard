export type RestDataSourceConfig = {
  url: string;
  method: "get" | "post" | "put";
  headers?: Record<string, string>;
  body?: unknown;
  /**
   * Label of a stored credential from the WeTrack Vault.
   * The credential value is never stored in code — set it in
   * app.wetrack.dev → Settings → Credentials.
   *
   * @example
   * credential: "my-api-key"
   */
  credential?: string;
};

export type DataSourceConfig = {
  type: "rest";
  config: RestDataSourceConfig;
};

export type DataSourceDefinition = DataSourceConfig & {
  key: string;
};
