export type ChartLayout = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type CartesianSeriesType = "bar" | "line" | "area" | "scatter";

export type CartesianChartConfig = {
  /** Feldname der Kategorie-Achse */
  categoryField: string;
  /** Ein oder mehrere Wert-Felder */
  valueFields: string[];
  /** Serientyp pro Feld in derselben Reihenfolge wie valueFields (default: "bar" für alle) */
  seriesTypes?: CartesianSeriesType[];
  /** Ausrichtung (relevant für Bar-Serien): vertical = Balken nach oben, horizontal = nach rechts */
  orientation?: "vertical" | "horizontal";
  /** Bar-Serien stapeln statt gruppieren */
  stacked?: boolean;
  /** Datenpunkte bei Line-/Area-Serien markieren */
  showDots?: boolean;
  /** Tooltip bei Hover anzeigen */
  showTooltip?: boolean;
  /** Achsen-Labels anzeigen */
  showLabels?: boolean;
  /** Farben pro Serie (CSS-Farbe oder var(--...)) */
  colors?: string[];
  /** Card-Border, -Hintergrund und -Schatten anzeigen (default: true) */
  showCard?: boolean;
};

export type StatCardConfig = {
  /** Feldname des anzuzeigenden Werts */
  valueField: string;
  /** Optionale Einheit, z.B. "€", "%", "Stk." */
  unit?: string;
  /** Farbe des Werts (CSS-Farbe oder var(--...)) */
  color?: string;
  /** Anzahl Dezimalstellen für numerische Werte */
  decimals?: number;
  /** Card-Border, -Hintergrund und -Schatten anzeigen (default: true) */
  showCard?: boolean;
};

export type ClockCardConfig = {
  /** Zeitzone (IANA), z.B. "Europe/Berlin" – undefined = lokale Zeit */
  timeZone?: string;
  /** Überschreibt das automatisch generierte Label */
  label?: string;
  /** Format des automatischen Labels */
  labelFormat?: "city" | "offset" | "abbreviation" | "full" | "raw";
  /** Stunden anzeigen */
  showHours?: boolean;
  /** Minuten anzeigen */
  showMinutes?: boolean;
  /** Sekunden anzeigen */
  showSeconds?: boolean;
  /** Card-Border, -Hintergrund und -Schatten anzeigen (default: true) */
  showCard?: boolean;
};

export type CartesianChartDefinition = {
  key: string;
  dashboard: string;
  query?: string;
  dataSource?: string;
  label: string;
  description?: string;
  type: "cartesian";
  config: CartesianChartConfig;
  layout?: ChartLayout;
};

export type StatChartDefinition = {
  key: string;
  dashboard: string;
  query?: string;
  dataSource?: string;
  label: string;
  description?: string;
  type: "stat";
  config: StatCardConfig;
  layout?: ChartLayout;
};

export type ClockChartDefinition = {
  key: string;
  dashboard: string;
  label: string;
  description?: string;
  type: "clock";
  config: ClockCardConfig;
  layout?: ChartLayout;
};

export type ChartDefinition =
  | CartesianChartDefinition
  | StatChartDefinition
  | ClockChartDefinition;

export type ChartTypeConfig =
  | { type: "cartesian"; config: CartesianChartConfig }
  | { type: "stat"; config: StatCardConfig }
  | { type: "clock"; config: ClockCardConfig };

import type { ChartSourceRef, DashboardKey } from "./keys";

/**
 * Datenquelle eines Charts: entweder eine Query ODER eine DataSource direkt.
 * Clock-Charts benötigen keine Quelle.
 */
export type ChartMeta = {
  dashboard: DashboardKey;
  source?: ChartSourceRef;
  label: string;
  description?: string;
  layout?: ChartLayout;
};

/** Vollständige Chart-Konfiguration (ohne key) */
export type ChartConfig = ChartMeta & ChartTypeConfig;
