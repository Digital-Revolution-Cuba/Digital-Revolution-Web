// Small helpers to read transition durations (in ms) from CSS variables or computed styles.

export function parseTimeToMs(timeStr) {
  // "90ms" -> 90, "0.09s" -> 90
  if (!timeStr) return 0;
  const t = String(timeStr).trim();
  if (t.endsWith('ms')) return parseFloat(t);
  if (t.endsWith('s')) return parseFloat(t) * 1000;
  return parseFloat(t) || 0;
}

export function readCssVarMs(varName, fallback = null) {
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return val ? parseTimeToMs(val.split(/\s*,\s*/)[0]) : fallback;
}

/**
 * Reads the maximum transition duration from an element's computed transitionDuration.
 * Returns fallbackMs when selector not found or parsing fails.
 */
export function getTransitionDurationMs(selector, fallbackMs = 0) {
  const el = document.querySelector(selector);
  if (!el) return fallbackMs;
  const cs = getComputedStyle(el);
  const durations = (cs.transitionDuration || '')
    .split(',')
    .map((s) => parseTimeToMs(s.trim()));
  const max = durations.length ? Math.max(...durations) : 0;
  return Math.max(max, fallbackMs);
}
