import { Provider } from '@nestjs/common';

/**
 * Create a mock provider for dependency injection in tests
 * @param token - Injection token
 * @param mockValue - Mock implementation
 * @returns Mock provider
 */
export function createMockProvider<T>(token: any, mockValue: Partial<T>): Provider {
  return {
    provide: token,
    useValue: mockValue,
  };
}

/**
 * Create a mock implementation with optional method overrides
 * @param methods - Optional method implementations
 * @returns Mock object
 */
export function createMock<T>(methods: Partial<T> = {}): jest.Mocked<T> {
  return methods as jest.Mocked<T>;
}