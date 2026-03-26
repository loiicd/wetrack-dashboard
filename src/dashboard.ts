import type { DashboardConfig, DashboardDefinition } from "./types/dashboard";
import type { DashboardKey } from "./types/keys";

/**
 * Represents a dashboard in the system. It encapsulates the dashboard's key and its configuration, providing methods to synthesize the dashboard definition for deployment and to create a Dashboard instance from a JSON representation.
 * @param key - The unique identifier for the dashboard.
 * @param dashboardConfig - The configuration object for the dashboard, containing all necessary settings and parameters.
 */
export class Dashboard {
  key: DashboardKey;
  dashboardConfig: DashboardConfig;

  constructor(key: string, dashboardConfig: DashboardConfig) {
    this.key = key as DashboardKey;
    this.dashboardConfig = dashboardConfig;
  }

  synthesize(): DashboardDefinition {
    return {
      key: this.key,
      ...this.dashboardConfig,
    };
  }

  static fromJSON(json: DashboardDefinition): Dashboard {
    const { key, ...dashboardConfig } = json;
    return new Dashboard(key, dashboardConfig);
  }
}
