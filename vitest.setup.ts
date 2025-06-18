import 'vitest';
import { vi } from 'vitest';

// Global setup for mocking
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
};

// Optional: Add global mocking for common APIs or libraries
vi.mock('@nestjs/mongoose', () => ({
  Prop: () => {},
  Schema: () => {},
}));