// ---- Filter Target ----

/**
 * Defines which query or dataSource a filter targets,
 * and optionally how its value is injected into REST calls.
 */
export type FilterTarget = {
  /** Whether this target is a Query or a DataSource */
  type: "query" | "dataSource";
  /** Key of the target Query or DataSource */
  key: string;
  /**
   * Optional injection config — injects the filter value directly into
   * the REST API call instead of (or in addition to) array filtering.
   */
  inject?: {
    /** Where to inject the value in the REST call */
    location?: "query" | "header" | "body";
    /** Parameter/header name; defaults to the filter key */
    name?: string;
  };
};

// ---- Filter Config per type ----

export type SelectFilterConfig = {
  type: "select";
  /** Human-readable label shown in the Dashboard header */
  label?: string;
  /** Field name in the data row to filter on */
  field: string;
  /** Available options for the select dropdown */
  options: string[];
  /** Allow selecting multiple values */
  multiple?: boolean;
  /** Which queries/dataSources this filter applies to */
  targets?: FilterTarget[];
};

export type DateRangeFilterConfig = {
  type: "date_range";
  /** Human-readable label shown in the Dashboard header */
  label?: string;
  /** Field name in the data row to filter on (must be a date-parseable value) */
  field: string;
  /** Which queries/dataSources this filter applies to */
  targets?: FilterTarget[];
};

export type StringFilterConfig = {
  type: "string";
  /** Human-readable label shown in the Dashboard header */
  label?: string;
  /** Field name in the data row to filter on */
  field: string;
  /** Which queries/dataSources this filter applies to */
  targets?: FilterTarget[];
};

export type NumberRangeFilterConfig = {
  type: "number_range";
  /** Human-readable label shown in the Dashboard header */
  label?: string;
  /** Field name in the data row to filter on */
  field: string;
  /** Which queries/dataSources this filter applies to */
  targets?: FilterTarget[];
};

export type FilterConfig =
  | SelectFilterConfig
  | DateRangeFilterConfig
  | StringFilterConfig
  | NumberRangeFilterConfig;

// ---- FilterDefinition (serialized form) ----

export type FilterDefinition = FilterConfig & {
  key: string;
};
