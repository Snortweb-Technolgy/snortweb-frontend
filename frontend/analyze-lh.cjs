const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./lh-report2.json', 'utf8'));

console.log("=== LIGHTHOUSE SCORES ===");
console.log("Performance:", data.categories.performance?.score * 100);
console.log("Accessibility:", data.categories.accessibility?.score * 100);
console.log("Best Practices:", data.categories['best-practices']?.score * 100);
console.log("SEO:", data.categories.seo?.score * 100);

console.log("\n=== METRICS ===");
const metrics = data.audits.metrics.details.items[0];
console.log("FCP:", metrics.firstContentfulPaint, "ms");
console.log("LCP:", metrics.largestContentfulPaint, "ms");
console.log("TBT:", metrics.totalBlockingTime, "ms");
console.log("CLS:", metrics.cumulativeLayoutShift);
console.log("Speed Index:", metrics.speedIndex, "ms");

console.log("\n=== MAIN THREAD WORK BREAKDOWN ===");
const threadWork = data.audits['mainthread-work-breakdown']?.details?.items || [];
threadWork.forEach(item => {
  console.log(`${item.groupLabel}: ${item.duration.toFixed(2)} ms`);
});

console.log("\n=== LONG TASKS ===");
const longTasks = data.audits['long-tasks']?.details?.items || [];
if (longTasks.length === 0) console.log("No long tasks found.");
longTasks.forEach(task => {
  console.log(`URL: ${task.url} | Duration: ${task.duration.toFixed(2)} ms`);
});

console.log("\n=== THIRD PARTY SUMMARY ===");
const thirdParty = data.audits['third-party-summary']?.details?.items || [];
thirdParty.forEach(tp => {
  console.log(`${tp.entity.text}: ${tp.blockingTime.toFixed(2)} ms blocking time`);
});

console.log("\n=== BOOTUP TIME (JS Execution) ===");
const bootup = data.audits['bootup-time']?.details?.items || [];
bootup.forEach(b => {
  console.log(`URL: ${b.url} | Total CPU: ${b.total.toFixed(2)} ms | Scripting: ${b.scripting.toFixed(2)} ms`);
});

console.log("\n=== DIAGNOSTICS ===");
console.log("Total Task Time:", data.audits.diagnostics?.details?.items[0]?.totalTaskTime, "ms");
console.log("Max RTT:", data.audits.diagnostics?.details?.items[0]?.maxRtt, "ms");

