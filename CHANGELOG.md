# BondBox Extension Dashboard — Encoding & Data Fixes

## Summary

Resolved all garbled/corrupted UTF-8 characters throughout the application and ensured KPI card counts are consistent with detail screen item counts.

---

## Encoding Fixes (app.js)

### 1. Em-Dash Double-Encoding (125 instances)

**Problem:** UTF-8 em-dash characters (`—`, U+2014) were double-encoded, producing garbled multi-byte sequences like `â€"` throughout the file.

**Root Cause:** The file was saved with UTF-8 encoding, then re-interpreted through a Windows-1252 codepage, causing each 3-byte UTF-8 sequence (`E2 80 94`) to be expanded into an 8-byte double-encoded sequence (`C3 A2 E2 82 AC E2 80 9D`).

**Fix:** Replaced all 125 double-encoded em-dash sequences with the correct `—` character.

**Locations:** Bond request comments, notification messages, status descriptions, and other text throughout the data arrays.

### 2. Stray Double-Quote Artifacts (4 instances)

**Problem:** After the em-dash byte replacement, four lines retained a trailing `"` character immediately after the corrected `—`, rendering as `—"` instead of just `—`.

**Fix:** Removed the stray `"` from each of the four affected lines.

**Locations:**
- Line 278: `'Interim review —" Q3 financials received'` → `'Interim review — Q3 financials received'`
- Line 288: `'Renewal —" updated financials pending'` → `'Renewal — updated financials pending'`
- Line 299: `'New submission —" awaiting CPA verification'` → `'New submission — awaiting CPA verification'`
- Line 334: `'Initial review —" credit report pulled'` → `'Initial review — credit report pulled'`

### 3. Garbled Emoji Characters (10 patterns)

**Problem:** Emoji characters in the notifications array and global search were double-encoded into multi-byte garbled sequences.

**Fix:** Replaced each garbled sequence with the correct emoji:

| Garbled Sequence | Correct Emoji | Usage |
|---|---|---|
| `â ï¸` | ⚠️ | ARR overdue warnings, claims |
| `ð` | 📋 | Bond requests, WIP schedules |
| `ð` | 📝 | LOA items |
| `ð°` | 💰 | Financial statements |
| `ð` | 🔔 | Deadline reminders |
| `ð` | 📊 | Bond request CPA |
| `ð` | 📎 | Frequency override |
| `ð` | 🔍 | Global search results |

### 4. Right Single Quote (U+2019) Replacements (2 instances)

**Problem:** Two lines contained `'` (right single quote, U+2019) where arrow symbols were intended.

**Fix:**
- Line ~4124: `// Map state ID ' region name for lookups` → `// Map state ID -> region name for lookups`
- Line ~6000: `Underwriter ' Branch Manager ' Regional UW Manager ' Home Office` → `Underwriter → Branch Manager → Regional UW Manager → Home Office`

### 5. Duplicate Line Removal (lines 4124–4128)

**Problem:** A previous edit attempt created duplicate `const stateToRegion = {}; usStates.forEach(...)` declarations.

**Fix:** Removed the duplicate lines, keeping only the single correct declaration.

---

## KPI Data Consistency Fix (app.js)

### Bond Requests KPI Click-Through

**Problem:** The Bond Requests KPI card displayed a count of all bonds with status "Awaiting Approval" OR "UW Review", but clicking the card navigated to the Bond Requests screen pre-filtered to only "Awaiting Approval" — hiding UW Review items.

**Fix:** Changed the KPI card's `onclick` handler to navigate to the "All" tab instead:

```javascript
// Before
onclick="navigateTo('bond-requests'); filterBondRequests('Awaiting Approval', ...)"

// After
onclick="navigateTo('bond-requests'); filterBondRequests('all', ...)"
```

The KPI count logic correctly counts both statuses:
```javascript
const bondReqCount = myBondRequests.filter(
  b => b.status === 'Awaiting Approval' || b.status === 'UW Review'
).length;
```

---

## Files Modified

- **`app.js`** — All encoding fixes and KPI click-through fix

## Deployment

All changes committed and pushed to `master` branch. GitHub Pages auto-rebuilds from the `master` branch at:

**https://cwatsongaig.github.io/Extension-Dashboard/**
