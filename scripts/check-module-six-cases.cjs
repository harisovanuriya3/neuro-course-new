// Module 6 cases regression (requires registration in content/index.ts).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const s = fs.readFileSync('content/index.ts','utf8');
assert(s.includes('createModuleSixCases'));
console.log('Module six cases route is registered');
