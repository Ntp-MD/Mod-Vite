// Test Runner - Run tests multiple times to check stability
// Usage: node test-runner.js [rounds]

import { spawn } from "child_process";

const rounds = parseInt(process.argv[2]) || 100;
let passed = 0;
let failed = 0;

console.log(`🧪 Running tests ${rounds} times to check stability...\n`);

async function runTest(round) {
  return new Promise((resolve) => {
    const test = spawn("npm", ["test", "--", "--run", "--reporter=dot"], {
      shell: true,
      cwd: process.cwd(),
    });

    let output = "";
    let errorOutput = "";

    test.stdout.on("data", (data) => {
      output += data.toString();
    });

    test.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    test.on("close", (code) => {
      if (code === 0) {
        passed++;
        process.stdout.write(`✓`);
      } else {
        failed++;
        process.stdout.write(`✗`);
        console.log(`\n\n❌ Round ${round} failed:`);
        console.log(errorOutput || output);
      }

      // New line every 50 tests
      if (round % 50 === 0) {
        console.log(` (${round}/${rounds})`);
      }

      resolve(code === 0);
    });
  });
}

async function runAllTests() {
  const startTime = Date.now();

  for (let i = 1; i <= rounds; i++) {
    await runTest(i);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log("\n\n📊 Test Stability Report:");
  console.log("═══════════════════════════════════════");
  console.log(`Total Rounds: ${rounds}`);
  console.log(`✅ Passed:    ${passed} (${((passed / rounds) * 100).toFixed(2)}%)`);
  console.log(`❌ Failed:    ${failed} (${((failed / rounds) * 100).toFixed(2)}%)`);
  console.log(`⏱️  Duration:  ${duration}s`);
  console.log(`📈 Avg Time:  ${(duration / rounds).toFixed(3)}s per run`);

  if (failed === 0) {
    console.log("\n🎉 All tests passed! Your code is stable! 🎉");
    process.exit(0);
  } else {
    console.log(`\n⚠️  Found ${failed} flaky test(s)! Check the output above.`);
    process.exit(1);
  }
}

runAllTests().catch(console.error);
