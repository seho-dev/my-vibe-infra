// Self-contained illustration: replace the inline helper with the real unit under test.
import { describe, expect, test } from '<test-framework>';

function createFeatureStore(loader: () => Promise<{ id: string; label: string }[]>) {
  let view: { status: 'idle' | 'loading' | 'ready' | 'error'; items: string[]; message: string | null } = {
    status: 'idle', items: [], message: null,
  };

  return {
    getView: () => view,
    async load() {
      view = { status: 'loading', items: [], message: null };
      try {
        const items = await loader();
        view = { status: 'ready', items: items.map(item => item.label), message: null };
      } catch {
        view = { status: 'error', items: [], message: 'Unable to load items' };
      }
    },
  };
}

describe('FeatureSection integration', () => {
  test('wires shared state, adapter data, and visible output together', async () => {
    let calls = 0;
    const store = createFeatureStore(async () => {
      calls += 1;
      return [{ id: '1', label: 'Ready' }];
    });
    expect(store.getView()).toEqual({ status: 'idle', items: [], message: null });
    const pending = store.load();
    expect(store.getView()).toEqual({ status: 'loading', items: [], message: null });
    await pending;
    expect(calls).toEqual(1);
    expect(store.getView()).toEqual({ status: 'ready', items: ['Ready'], message: null });
  });

  test('renders the fallback branch when the adapter rejects', async () => {
    let calls = 0;
    const store = createFeatureStore(async () => {
      calls += 1;
      throw new Error('network error');
    });
    await store.load();
    expect(calls).toEqual(1);
    expect(store.getView()).toEqual({ status: 'error', items: [], message: 'Unable to load items' });
  });
});
