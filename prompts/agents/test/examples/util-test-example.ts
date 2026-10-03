// Self-contained illustration: replace the inline helper with the real unit under test.
import { describe, expect, test } from '<test-framework>';

function normalizePayload(input?: { id?: string | null; tags?: string[] | null } | null) {
  return { id: input?.id ?? 'unknown', tags: input?.tags ?? [] };
}

describe('normalizePayload', () => {
  test('maps the nominal input shape to the expected output', () => {
    expect(normalizePayload({ id: 'item-1', tags: ['featured'] })).toEqual({
      id: 'item-1',
      tags: ['featured'],
    });
  });

  test('falls back safely for nullish input', () => {
    expect(normalizePayload(undefined)).toEqual({ id: 'unknown', tags: [] });
  });

  test('preserves explicit empty values when they are valid', () => {
    expect(normalizePayload({ id: '', tags: [] })).toEqual({ id: '', tags: [] });
  });
});
