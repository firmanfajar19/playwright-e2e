#!/bin/bash
set -e

SUMMARY_FILE="allure-report/summary.json"
STAT_FILE="allure-report/widgets/statistic.json"

TOTAL=0
PASSED=0
FAILED=0
BROKEN=0
SKIPPED=0
DURATION_MS=0

if [ -f "$STAT_FILE" ]; then
  TOTAL=$(jq -r '.total // 0' "$STAT_FILE" 2>/dev/null || echo 0)
  PASSED=$(jq -r '.passed // 0' "$STAT_FILE" 2>/dev/null || echo 0)
fi

if [ -f "$SUMMARY_FILE" ]; then
  # prefer duration from summary.json if present
  DURATION_MS=$(jq -r '.duration // 0' "$SUMMARY_FILE" 2>/dev/null || echo 0)
  # some installs may include additional counts here
  FAILED_TMP=$(jq -r '.stats.failed // .failed // 0' "$SUMMARY_FILE" 2>/dev/null || echo 0)
  if [ "$FAILED_TMP" != "0" ]; then
    FAILED=$FAILED_TMP
  fi
fi

# if failed not present, compute as total - passed (floor at 0)
if [ "$FAILED" -eq 0 ] && [ "$TOTAL" -gt 0 ]; then
  DIFF=$((TOTAL - PASSED))
  if [ "$DIFF" -gt 0 ]; then
    FAILED=$DIFF
  fi
fi

# convert duration ms to human readable minutes/seconds
if command -v python3 >/dev/null 2>&1; then
  DURATION=$(python3 - "$DURATION_MS" <<'PYSCRIPT'
import sys
ms = int(sys.argv[1]) if len(sys.argv) > 1 else 0
s = ms // 1000
m = s // 60
s = s % 60
print(f"{m}m {s}s")
PYSCRIPT
)
else
  # fallback: show milliseconds
  DURATION="${DURATION_MS}ms"
fi

EMAIL_BODY=$(cat <<'EOF'
- Total: ${TOTAL}
- Passed: ${PASSED}
- Failed: ${FAILED}
- Broken: ${BROKEN}
- Skipped: ${SKIPPED}
- Duration: ${DURATION}

EOF
)

# Substitute shell variables after the heredoc
EMAIL_BODY="${EMAIL_BODY//\$\{TOTAL\}/$TOTAL}"
EMAIL_BODY="${EMAIL_BODY//\$\{PASSED\}/$PASSED}"
EMAIL_BODY="${EMAIL_BODY//\$\{FAILED\}/$FAILED}"
EMAIL_BODY="${EMAIL_BODY//\$\{BROKEN\}/$BROKEN}"
EMAIL_BODY="${EMAIL_BODY//\$\{SKIPPED\}/$SKIPPED}"
EMAIL_BODY="${EMAIL_BODY//\$\{DURATION\}/$DURATION}"

# Write multiline output to GITHUB_OUTPUT
{
  echo "body<<EOF"
  echo "$EMAIL_BODY"
  echo "EOF"
} >> "$GITHUB_OUTPUT"
