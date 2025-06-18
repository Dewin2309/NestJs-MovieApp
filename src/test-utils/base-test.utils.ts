import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';

/**
 * Base testing utilities for creating consistent test modules and mocks
 */
export class BaseTestUtils {
  /**
   * Create a testing module with provided modules, controllers, and providers
   * @param options Configuration for the testing module
   * @returns Promise resolving to a TestingModule instance
   */
  static async createTestModule(options: {
    imports?: any[];
    controllers?: any[];
    providers?: any[];
  }): Promise<TestingModule> {
    const { imports = [], controllers = [], providers = [] } = options;

    return await Test.createTestingModule({
      imports,
      controllers,
      providers,
    }).compile();
  }

  /**
   * Create a mock for a service with optional implementation
   * @param mockMethods Optional methods to mock
   * @returns Partially mocked service
   */
  static createMockService(mockMethods: Record<string, any> = {}): any {
    return {
      ...Object.keys(mockMethods).reduce((acc, key) => {
        acc[key] = vi.fn(mockMethods[key]);
        return acc;
      }, {} as Record<string, any>)
    };
  }

  /**
   * Generate random test data
   * @param type Type of data to generate
   * @returns Randomly generated data
   */
  static generateTestData(type: string): any {
    switch (type) {
      case 'string':
        return `test_${Math.random().toString(36).substring(7)}`;
      case 'number':
        return Math.floor(Math.random() * 1000);
      case 'boolean':
        return Math.random() > 0.5;
      case 'email':
        return `test_${Math.random().toString(36).substring(7)}@example.com`;
      default:
        return null;
    }
  }

  /**
   * Create a mock for a repository with common CRUD methods
   * @returns Mocked repository with common methods
   */
  static createMockRepository() {
    return {
      create: vi.fn(),
      save: vi.fn(),
      find: vi.fn(),
      findOne: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      remove: vi.fn(),
    };
  }
}

// Utility function for type-safe deep copy
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Async utility to simulate delay
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}