/**
 * Responsive Design Testing Utilities
 * Run these in browser console or integrate with testing framework
 * Provides tools for testing responsive design, accessibility, and performance
 */

// ========================================
// Breakpoint Definitions
// ========================================

export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '4k': 2560,
  '8k': 4320,
};

export const DEVICES = {
  'iPhone SE': { width: 375, height: 667, touch: true, pixelRatio: 2 },
  'iPhone 14': { width: 390, height: 844, touch: true, pixelRatio: 3 },
  'iPhone 14 Pro Max': { width: 430, height: 932, touch: true, pixelRatio: 3 },
  'iPad Mini': { width: 768, height: 1024, touch: true, pixelRatio: 2 },
  'iPad Pro 11': { width: 834, height: 1194, touch: true, pixelRatio: 2 },
  'iPad Pro 12.9': { width: 1024, height: 1366, touch: true, pixelRatio: 2 },
  'MacBook Air 13': { width: 1440, height: 900, touch: false, pixelRatio: 2 },
  'Desktop 1080p': { width: 1920, height: 1080, touch: false, pixelRatio: 1 },
  'Desktop 1440p': { width: 2560, height: 1440, touch: false, pixelRatio: 1 },
  'Desktop 4K': { width: 3840, height: 2160, touch: false, pixelRatio: 1 },
  'Desktop 8K': { width: 7680, height: 4320, touch: false, pixelRatio: 1 },
};

// ========================================
// Feature Detection
// ========================================

/**
 * Test container query support
 * @returns {boolean} Whether container queries are supported
 */
export function testContainerQueries() {
  const hasSupport = CSS.supports('container-type', 'inline-size');
  console.log(
    `Container Queries: ${hasSupport ? '✅ Supported' : '❌ Not supported'}`,
  );
  return hasSupport;
}

/**
 * Test CSS clamp() support
 * @returns {boolean} Whether clamp() is supported
 */
export function testClamp() {
  const hasSupport = CSS.supports('width', 'clamp(1rem, 2vw, 3rem)');
  console.log(
    `CSS clamp(): ${hasSupport ? '✅ Supported' : '❌ Not supported'}`,
  );
  return hasSupport;
}

/**
 * Test CSS :has() selector support
 * @returns {boolean} Whether :has() is supported
 */
export function testHasSelector() {
  try {
    document.querySelector(':has(*)');
    console.log('CSS :has(): ✅ Supported');
    return true;
  } catch {
    console.log('CSS :has(): ❌ Not supported');
    return false;
  }
}

/**
 * Run all feature detection tests
 * @returns {Object} Object with all test results
 */
export function runFeatureTests() {
  console.group('🔍 CSS Feature Detection');
  const results = {
    containerQueries: testContainerQueries(),
    clamp: testClamp(),
    hasSelector: testHasSelector(),
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches,
    prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light',
    touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    hoverDevice: window.matchMedia('(hover: hover)').matches,
  };
  console.log(
    'Prefers Reduced Motion:',
    results.prefersReducedMotion ? '⚡ Yes' : '🎬 No',
  );
  console.log(
    'Color Scheme:',
    results.prefersColorScheme === 'dark' ? '🌙 Dark' : '☀️ Light',
  );
  console.log('Touch Device:', results.touchDevice ? '👆 Yes' : '🖱️ No');
  console.log('Hover Device:', results.hoverDevice ? '🖱️ Yes' : '👆 No');
  console.groupEnd();
  return results;
}

// ========================================
// Accessibility Audits
// ========================================

/**
 * Test touch target sizes (WCAG 2.2 - 2.5.5 Target Size)
 * Minimum size should be 44x44px
 * @returns {Array} Array of elements that violate the minimum size
 */
export function auditTouchTargets() {
  const minSize = 44; // WCAG 2.2 minimum
  const interactiveElements = document.querySelectorAll(
    'a, button, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])',
  );

  const violations = [];

  interactiveElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);

    // Skip hidden elements
    if (
      styles.display === 'none' ||
      styles.visibility === 'hidden' ||
      rect.width === 0
    ) {
      return;
    }

    if (rect.width < minSize || rect.height < minSize) {
      violations.push({
        element: el,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        selector: generateSelector(el),
        issue: `Size ${Math.round(rect.width)}x${Math.round(rect.height)}px is below minimum ${minSize}x${minSize}px`,
      });
    }
  });

  console.group(`👆 Touch Target Audit (Min: ${minSize}px)`);
  if (violations.length > 0) {
    console.warn(`❌ Found ${violations.length} violations:`);
    violations.forEach((v, i) => {
      console.log(`${i + 1}. ${v.selector}: ${v.issue}`);
    });
  } else {
    console.log('✅ All touch targets meet WCAG 2.2 requirements');
  }
  console.groupEnd();

  return violations;
}

/**
 * Audit focus indicators
 * @returns {Array} Elements without visible focus indicators
 */
export function auditFocusIndicators() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const violations = [];

  focusableElements.forEach((el) => {
    const styles = window.getComputedStyle(el);
    const focusStyles = window.getComputedStyle(el, ':focus-visible');

    // Skip hidden elements
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      return;
    }

    // Check if outline is explicitly removed without alternative
    if (styles.outline === 'none' || styles.outlineWidth === '0px') {
      // Check for alternative focus indicators
      const hasBoxShadow = styles.boxShadow !== 'none';
      const hasBorder = styles.borderWidth !== '0px';

      if (!hasBoxShadow && !hasBorder) {
        violations.push({
          element: el,
          selector: generateSelector(el),
          issue: 'No visible focus indicator detected',
        });
      }
    }
  });

  console.group('🎯 Focus Indicator Audit');
  if (violations.length > 0) {
    console.warn(`⚠️ Found ${violations.length} potential issues:`);
    violations.forEach((v, i) => {
      console.log(`${i + 1}. ${v.selector}: ${v.issue}`);
    });
  } else {
    console.log('✅ Focus indicators appear to be present');
  }
  console.groupEnd();

  return violations;
}

/**
 * Check for missing alt text on images
 * @returns {Array} Images without proper alt text
 */
export function auditImageAlt() {
  const images = document.querySelectorAll('img');
  const violations = [];

  images.forEach((img) => {
    const alt = img.getAttribute('alt');
    const ariaHidden = img.getAttribute('aria-hidden');
    const role = img.getAttribute('role');

    // Skip decorative images (aria-hidden or role="presentation")
    if (ariaHidden === 'true' || role === 'presentation' || role === 'none') {
      return;
    }

    if (alt === null) {
      violations.push({
        element: img,
        selector: generateSelector(img),
        src: img.src,
        issue: 'Missing alt attribute',
      });
    } else if (alt === '' && ariaHidden !== 'true') {
      // Empty alt without aria-hidden might be an issue
      violations.push({
        element: img,
        selector: generateSelector(img),
        src: img.src,
        issue:
          'Empty alt attribute (should have aria-hidden="true" if decorative)',
      });
    }
  });

  console.group('🖼️ Image Alt Text Audit');
  if (violations.length > 0) {
    console.warn(`❌ Found ${violations.length} issues:`);
    violations.forEach((v, i) => {
      console.log(`${i + 1}. ${v.selector}: ${v.issue}`);
      console.log(`   Source: ${v.src.substring(0, 50)}...`);
    });
  } else {
    console.log('✅ All images have proper alt text');
  }
  console.groupEnd();

  return violations;
}

/**
 * Run full accessibility audit
 */
export function runAccessibilityAudit() {
  console.group('♿ Accessibility Audit');
  auditTouchTargets();
  auditFocusIndicators();
  auditImageAlt();
  console.groupEnd();
}

// ========================================
// Responsive Testing Tools
// ========================================

/**
 * Log current viewport information
 */
export function logViewportInfo() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio;

  let breakpoint = 'xs';
  for (const [name, value] of Object.entries(BREAKPOINTS)) {
    if (width >= value) {
      breakpoint = name;
    }
  }

  console.group('📱 Viewport Info');
  console.log(`Size: ${width}x${height}px`);
  console.log(`Pixel Ratio: ${pixelRatio}x`);
  console.log(
    `Active Breakpoint: ${breakpoint} (≥${BREAKPOINTS[breakpoint]}px)`,
  );
  console.log(`Touch: ${'ontouchstart' in window ? 'Yes' : 'No'}`);
  console.log(`Orientation: ${width > height ? 'Landscape' : 'Portrait'}`);
  console.groupEnd();
}

/**
 * Create a visual breakpoint indicator
 */
export function showBreakpointIndicator() {
  // Remove existing indicator
  const existing = document.getElementById('breakpoint-indicator');
  if (existing) existing.remove();

  const indicator = document.createElement('div');
  indicator.id = 'breakpoint-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 16px;
    font-family: monospace;
    font-size: 12px;
    z-index: 99999;
    pointer-events: none;
  `;

  function updateIndicator() {
    const width = window.innerWidth;
    let breakpoint = 'xs';
    for (const [name, value] of Object.entries(BREAKPOINTS)) {
      if (width >= value) {
        breakpoint = name;
      }
    }
    indicator.textContent = `${width}px | ${breakpoint}`;
  }

  document.body.appendChild(indicator);
  updateIndicator();
  window.addEventListener('resize', updateIndicator);

  console.log(
    '📐 Breakpoint indicator added. Call hideBreakpointIndicator() to remove.',
  );

  return () => {
    indicator.remove();
    window.removeEventListener('resize', updateIndicator);
  };
}

/**
 * Remove breakpoint indicator
 */
export function hideBreakpointIndicator() {
  const indicator = document.getElementById('breakpoint-indicator');
  if (indicator) {
    indicator.remove();
    console.log('📐 Breakpoint indicator removed');
  }
}

/**
 * Simulate a specific viewport size in an iframe
 * @param {number} width - Viewport width
 * @param {number} height - Viewport height
 * @returns {Function} Cleanup function to remove the iframe
 */
export function simulateViewport(width, height) {
  const iframe = document.createElement('iframe');
  iframe.id = 'viewport-simulator';
  iframe.style.cssText = `
    width: ${width}px;
    height: ${height}px;
    border: 2px solid #34dfde;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    background: white;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  `;
  iframe.src = window.location.href;
  document.body.appendChild(iframe);

  console.log(`📱 Simulating ${width}x${height}px viewport`);

  return () => {
    iframe.remove();
    console.log('📱 Viewport simulation removed');
  };
}

/**
 * Simulate a specific device
 * @param {string} deviceName - Name of device from DEVICES object
 * @returns {Function} Cleanup function
 */
export function simulateDevice(deviceName) {
  const device = DEVICES[deviceName];
  if (!device) {
    console.error(`Unknown device: ${deviceName}`);
    console.log('Available devices:', Object.keys(DEVICES).join(', '));
    return () => {};
  }

  console.log(`📱 Simulating ${deviceName} (${device.width}x${device.height})`);
  return simulateViewport(device.width, device.height);
}

// ========================================
// Performance Metrics
// ========================================

/**
 * Get Core Web Vitals metrics
 */
export function getWebVitals() {
  console.group('⚡ Core Web Vitals');

  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`LCP: ${Math.round(lastEntry.startTime)}ms`);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP: Not available');
    }
  }

  // FCP (First Contentful Paint)
  const paintEntries = performance.getEntriesByType('paint');
  const fcp = paintEntries.find(
    (entry) => entry.name === 'first-contentful-paint',
  );
  if (fcp) {
    console.log(`FCP: ${Math.round(fcp.startTime)}ms`);
  }

  // CLS (Cumulative Layout Shift)
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log(`CLS: ${clsValue.toFixed(3)}`);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS: Not available');
    }
  }

  // Navigation timing
  const navTiming = performance.getEntriesByType('navigation')[0];
  if (navTiming) {
    console.log(`DOM Interactive: ${Math.round(navTiming.domInteractive)}ms`);
    console.log(`DOM Complete: ${Math.round(navTiming.domComplete)}ms`);
    console.log(`Load Event: ${Math.round(navTiming.loadEventEnd)}ms`);
  }

  console.groupEnd();
}

// ========================================
// Utility Functions
// ========================================

/**
 * Generate a CSS selector for an element
 * @param {Element} el - The element
 * @returns {string} CSS selector
 */
function generateSelector(el) {
  if (el.id) {
    return `#${el.id}`;
  }

  let selector = el.tagName.toLowerCase();

  if (el.className && typeof el.className === 'string') {
    const classes = el.className
      .split(' ')
      .filter((c) => c.trim())
      .slice(0, 2);
    if (classes.length > 0) {
      selector += `.${classes.join('.')}`;
    }
  }

  return selector;
}

/**
 * Run all tests
 */
export function runAllTests() {
  console.clear();
  console.log('🚀 Running Responsive Design Tests\n');

  runFeatureTests();
  console.log('');
  logViewportInfo();
  console.log('');
  runAccessibilityAudit();
  console.log('');
  getWebVitals();

  console.log('\n✨ Tests complete!');
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.responsiveTests = {
    BREAKPOINTS,
    DEVICES,
    testContainerQueries,
    testClamp,
    testHasSelector,
    runFeatureTests,
    auditTouchTargets,
    auditFocusIndicators,
    auditImageAlt,
    runAccessibilityAudit,
    logViewportInfo,
    showBreakpointIndicator,
    hideBreakpointIndicator,
    simulateViewport,
    simulateDevice,
    getWebVitals,
    runAllTests,
  };

  console.log(
    '📦 Responsive testing utilities loaded! Use window.responsiveTests to access.',
  );
}
