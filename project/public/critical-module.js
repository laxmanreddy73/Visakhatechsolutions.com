// Critical Module for Performance Optimization
(() => {
  // Performance monitoring
  const perfMetrics = {
    ttfb: 0,
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0
  };

  // Core Web Vitals monitoring
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        perfMetrics.fcp = entry.startTime;
      }
      if (entry.name === 'largest-contentful-paint') {
        perfMetrics.lcp = entry.startTime;
      }
    });
  }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

  // First Input Delay
  new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
      if (entry.name === 'first-input') {
        perfMetrics.fid = entry.processingStart - entry.startTime;
      }
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift
  new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
      if (!entry.hadRecentInput) {
        perfMetrics.cls += entry.value;
      }
    });
  }).observe({ entryTypes: ['layout-shift'] });

  // Resource timing optimization
  new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
      // Optimize resource loading based on timing
      if (entry.initiatorType === 'script' || entry.initiatorType === 'css') {
        const timing = entry.responseEnd - entry.startTime;
        if (timing > 200) {
          console.warn(`Slow resource load: ${entry.name} (${Math.round(timing)}ms)`);
        }
      }
    });
  }).observe({ entryTypes: ['resource'] });

  // Send metrics to analytics
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'core_web_vitals', {
          metric_id: 'web_vitals',
          metric_value: JSON.stringify(perfMetrics)
        });
      }
    }, 3000);
  });
})();