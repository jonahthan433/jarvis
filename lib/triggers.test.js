import { describe, it, expect } from 'vitest';

/**
 * Replace {{body.field}} templates with values from request context
 * Duplicate of lib/triggers.js implementation for isolated testing
 */
function resolveTemplate(template, context) {
    return template.replace(/\{\{(\w+)(?:\.(\w+))?\}\}/g, (match, source, field) => {
        const data = context[source];
        if (data === undefined) return match;
        if (!field) return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        if (data[field] !== undefined) return String(data[field]);
        return match;
    });
}

describe('Triggers template resolution', () => {
    it('interpolates nested body fields correctly', () => {
        const template = 'echo "Issue: {{body.title}}"';
        const context = { body: { title: 'Bug report' } };
        expect(resolveTemplate(template, context)).toBe('echo "Issue: Bug report"');
    });

    it('interpolates missing fields as raw templates', () => {
        const template = 'echo "Issue: {{body.title}}"';
        const context = { body: {} };
        expect(resolveTemplate(template, context)).toBe('echo "Issue: {{body.title}}"');
    });

    it('handles multiple interpolations', () => {
        const template = 'echo "{{body.type}} - {{body.status}}"';
        const context = { body: { type: 'Bug', status: 'Open' } };
        expect(resolveTemplate(template, context)).toBe('echo "Bug - Open"');
    });
});
