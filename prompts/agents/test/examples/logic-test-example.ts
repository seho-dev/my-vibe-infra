// Self-contained illustration: replace the inline helper with the real unit under test.
import { describe, expect, test } from '<test-framework>';

function createAsyncStatus() {
  let state: { status: 'idle' | 'loading' | 'ready' | 'error'; message?: string } = { status: 'idle' };

  return {
    getState: () => state,
    async load(loader: () => Promise<unknown>) {
      state = { status: 'loading' };
      try {
        await loader();
        state = { status: 'ready' };
      } catch (error) {
        state = { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' };
      }
    },
  };
}

describe('asyncStatus', () => {
  test('starts in idle state', () => {
    expect(createAsyncStatus().getState()).toEqual({ status: 'idle' });
  });

  test('moves through the async success path', async () => {
    const status = createAsyncStatus();
    const pending = status.load(async () => 'done');
    expect(status.getState()).toEqual({ status: 'loading' });
    await pending;
    expect(status.getState()).toEqual({ status: 'ready' });
  });

  test('returns the error contract after failure', async () => {
    const status = createAsyncStatus();
    const pending = status.load(async () => { throw new Error('network error'); });
    expect(status.getState()).toEqual({ status: 'loading' });
    await pending;
    expect(status.getState()).toEqual({ status: 'error', message: 'network error' });
  });
});
