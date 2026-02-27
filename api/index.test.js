import { describe, it, expect } from 'vitest';
import { timingSafeEqual } from 'crypto';

/**
 * Timing-safe string comparison.
 * Duplicate of api/index.js implementation for isolated testing
 */
function safeCompare(a, b) {
    if (!a || !b) return false;
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
}

describe('safeCompare string matching', () => {
    it('matches identical strings', () => {
        expect(safeCompare('secret123', 'secret123')).toBe(true);
    });

    it('rejects different strings of same length safely', () => {
        expect(safeCompare('secret123', 'secret124')).toBe(false);
    });

    it('rejects different length strings without crashing', () => {
        expect(safeCompare('secret123', 'secret')).toBe(false);
    });

    it('handles null or undefined safely', () => {
        expect(safeCompare(null, 'secret')).toBe(false);
        expect(safeCompare('secret', undefined)).toBe(false);
        expect(safeCompare(null, null)).toBe(false);
    });
});
