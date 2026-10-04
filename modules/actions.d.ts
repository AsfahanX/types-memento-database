import type { Entry } from "./entries";

declare global {
  /**
   * @see https://scripts.mementodatabase.com/scripts/actions/#arguments
   */
  function arg(name: string): unknown;

  /**
   * @see https://scripts.mementodatabase.com/scripts/actions/#bulk-context
   */
  function selectedEntries<T>(): Entry<T>[];
}
