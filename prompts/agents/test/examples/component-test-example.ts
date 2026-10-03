// Self-contained illustration: replace the inline helper with the real unit under test.
import { describe, expect, test } from '<test-framework>';

// These helpers stand in for the project's render utility and component.
function renderStatusBanner({ available }: { available: boolean }) {
  return available ? { role: 'status', text: 'Available' } : { role: 'alert', text: 'Unavailable' };
}

function triggerRetry(onRetry: (action: string) => void) {
  onRetry('retry');
}

describe('StatusBanner', () => {
  test('shows a warning state when the feature is unavailable', () => {
    // Example intent:
    // - render a small UI unit
    // - assert visible behavior
    // - avoid child implementation assertions
    expect(renderStatusBanner({ available: false })).toEqual({ role: 'alert', text: 'Unavailable' });
  });

  test('calls the public callback after the user action', () => {
    // Example intent:
    // - trigger one meaningful interaction
    // - assert the public callback payload or visible result
    const actions: string[] = [];
    triggerRetry(action => actions.push(action));
    expect(actions).toEqual(['retry']);
  });
});
