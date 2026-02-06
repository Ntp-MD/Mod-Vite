# PowerShell script to run tests multiple times
# Usage: .\run-tests-loop.ps1 [rounds]

param(
    [int]$Rounds = 100
)

$passed = 0
$failed = 0
$failedRounds = @()

Write-Host "`n🧪 Running tests $Rounds times to check stability...`n" -ForegroundColor Cyan

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

for ($i = 1; $i -le $Rounds; $i++) {
    $result = npm test -- --run --reporter=dot 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        $passed++
        Write-Host "✓" -NoNewline -ForegroundColor Green
    }
    else {
        $failed++
        $failedRounds += $i
        Write-Host "✗" -NoNewline -ForegroundColor Red
    }
    
    # New line every 50 tests
    if ($i % 50 -eq 0) {
        Write-Host " ($i/$Rounds)" -ForegroundColor Gray
    }
}

$stopwatch.Stop()
$duration = $stopwatch.Elapsed.TotalSeconds

Write-Host "`n`n📊 Test Stability Report:" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Gray
Write-Host "Total Rounds: $Rounds"
Write-Host "✅ Passed:    $passed ($([math]::Round(($passed/$Rounds)*100, 2))%)" -ForegroundColor Green
Write-Host "❌ Failed:    $failed ($([math]::Round(($failed/$Rounds)*100, 2))%)" -ForegroundColor Red
Write-Host "⏱️  Duration:  $([math]::Round($duration, 2))s"
Write-Host "📈 Avg Time:  $([math]::Round($duration/$Rounds, 3))s per run"

if ($failed -eq 0) {
    Write-Host "`n🎉 All tests passed! Your code is stable! 🎉`n" -ForegroundColor Green
    exit 0
}
else {
    Write-Host "`n⚠️  Found $failed flaky test(s) at rounds: $($failedRounds -join ', ')`n" -ForegroundColor Yellow
    exit 1
}
