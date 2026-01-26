/**
 * Logger utility for controlled logging
 * Only logs in development mode to avoid console pollution in production
 */

const isDev = import.meta.env?.DEV ?? false;

export const logger = {
  log(...args: unknown[]): void {
    if (isDev) {
      console.log(...args);
    }
  },

  warn(...args: unknown[]): void {
    if (isDev) {
      console.warn(...args);
    }
  },

  error(...args: unknown[]): void {
    // Always log errors, even in production
    console.error(...args);
  },

  debug(...args: unknown[]): void {
    if (isDev) {
      console.debug(...args);
    }
  },

  info(...args: unknown[]): void {
    if (isDev) {
      console.info(...args);
    }
  },

  group(label: string): void {
    if (isDev) {
      console.group(label);
    }
  },

  groupEnd(): void {
    if (isDev) {
      console.groupEnd();
    }
  },
};
