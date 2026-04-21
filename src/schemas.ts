import z from "zod";

// ---- DataSource ----

export const dataSourceSchema = z.object({
  key: z.string(),
  type: z.enum(["rest"]),
  config: z.object({
    url: z.string().url(),
    method: z.enum(["get", "post", "put"]),
    headers: z.record(z.string(), z.string()).optional(),
    body: z.unknown().optional(),
    credential: z.string().optional(),
  }),
});

// ---- Query ----

const jsonPathQuerySchema = z.object({
  key: z.string(),
  type: z.literal("jsonpath"),
  dataSource: z.string().optional(),
  sourceQuery: z.string().optional(),
  jsonPath: z.string(),
});

const sqlQuerySchema = z.object({
  key: z.string(),
  type: z.literal("sql"),
  dataSource: z.string().optional(),
  sourceQuery: z.string().optional(),
  sql: z.string(),
});

export const querySchema = z.discriminatedUnion("type", [
  jsonPathQuerySchema,
  sqlQuerySchema,
]);

// ---- Dashboard ----

export const dashboardSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string().optional(),
});

// ---- Charts ----

const chartLayoutSchema = z.object({
  x: z.number().int().min(0),
  y: z.number().int().min(0),
  w: z.number().int().min(1).max(12),
  h: z.number().int().min(1),
});

const cartesianChartConfigSchema = z.object({
  /** Feldname der Kategorie-Achse */
  categoryField: z.string(),
  /** Ein oder mehrere Wert-Felder */
  valueFields: z.array(z.string()).min(1),
  /** Serientyp pro Feld (default: "bar" für alle) */
  seriesTypes: z
    .array(z.enum(["bar", "line", "area", "scatter"]))
    .optional(),
  /** Ausrichtung für Bar-Serien */
  orientation: z.enum(["vertical", "horizontal"]).default("vertical"),
  /** Bar-Serien stapeln statt gruppieren */
  stacked: z.boolean().default(false),
  /** Datenpunkte bei Line-/Area-Serien markieren */
  showDots: z.boolean().default(true),
  /** Tooltip bei Hover anzeigen */
  showTooltip: z.boolean().default(true),
  /** Achsen-Labels anzeigen */
  showLabels: z.boolean().default(false),
  /** Farben pro Serie (CSS-Farbe oder var(--...)) */
  colors: z.array(z.string()).optional(),
  /** Card-Border, -Hintergrund und -Schatten anzeigen (default: true) */
  showCard: z.boolean().default(true),
});

const statCardConfigSchema = z.object({
  valueField: z.string(),
  unit: z.string().optional(),
  color: z.string().optional(),
  decimals: z.number().int().min(0).max(10).optional(),
  /** Card-Border, -Hintergrund und -Schatten anzeigen (default: true) */
  showCard: z.boolean().default(true),
});

const clockCardConfigSchema = z.object({
  /** Zeitzone (IANA), z.B. "Europe/Berlin" – undefined = lokale Zeit */
  timeZone: z.string().optional(),
  /** Überschreibt das automatisch generierte Label */
  label: z.string().optional(),
  /** Format des automatischen Labels */
  labelFormat: z
    .enum(["city", "offset", "abbreviation", "full", "raw"])
    .default("raw"),
  /** Stunden anzeigen */
  showHours: z.boolean().default(true),
  /** Minuten anzeigen */
  showMinutes: z.boolean().default(true),
  /** Sekunden anzeigen */
  showSeconds: z.boolean().default(true),
  /** Card-Border, -Hintergrund und -Schatten anzeigen (default: true) */
  showCard: z.boolean().default(true),
});

export const chartSchema = z.discriminatedUnion("type", [
  z.object({
    key: z.string(),
    dashboard: z.string(),
    query: z.string().optional(),
    dataSource: z.string().optional(),
    label: z.string(),
    description: z.string().optional(),
    type: z.literal("cartesian"),
    config: cartesianChartConfigSchema,
    layout: chartLayoutSchema.optional(),
  }),
  z.object({
    key: z.string(),
    dashboard: z.string(),
    query: z.string().optional(),
    dataSource: z.string().optional(),
    label: z.string(),
    description: z.string().optional(),
    type: z.literal("stat"),
    config: statCardConfigSchema,
    layout: chartLayoutSchema.optional(),
  }),
  z.object({
    key: z.string(),
    dashboard: z.string(),
    label: z.string(),
    description: z.string().optional(),
    type: z.literal("clock"),
    config: clockCardConfigSchema,
    layout: chartLayoutSchema.optional(),
  }),
]);

// ---- Filter ----

const filterTargetSchema = z.object({
  type: z.enum(["query", "dataSource"]),
  key: z.string(),
  inject: z
    .object({
      location: z.enum(["query", "header", "body"]).optional(),
      name: z.string().optional(),
    })
    .optional(),
});

const selectFilterSchema = z.object({
  key: z.string(),
  label: z.string().optional(),
  type: z.literal("select"),
  field: z.string(),
  options: z.array(z.string()),
  multiple: z.boolean().optional(),
  targets: z.array(filterTargetSchema).optional(),
});

const dateRangeFilterSchema = z.object({
  key: z.string(),
  label: z.string().optional(),
  type: z.literal("date_range"),
  field: z.string(),
  targets: z.array(filterTargetSchema).optional(),
});

const stringFilterSchema = z.object({
  key: z.string(),
  label: z.string().optional(),
  type: z.literal("string"),
  field: z.string(),
  targets: z.array(filterTargetSchema).optional(),
});

const numberRangeFilterSchema = z.object({
  key: z.string(),
  label: z.string().optional(),
  type: z.literal("number_range"),
  field: z.string(),
  targets: z.array(filterTargetSchema).optional(),
});

export const filterSchema = z.discriminatedUnion("type", [
  selectFilterSchema,
  dateRangeFilterSchema,
  stringFilterSchema,
  numberRangeFilterSchema,
]);

// ---- Stack ----

export const stackSchema = z.object({
  key: z.string(),
  environment: z.enum(["PRODUCTION", "STAGING", "DEVELOPMENT"]),
  dashboards: z.array(dashboardSchema).optional(),
  dataSources: z.array(dataSourceSchema).optional(),
  queries: z.array(querySchema).optional(),
  charts: z.array(chartSchema).optional(),
  filters: z.array(filterSchema).optional(),
});

export type StackSchemaInput = z.input<typeof stackSchema>;
export type StackSchemaOutput = z.output<typeof stackSchema>;
