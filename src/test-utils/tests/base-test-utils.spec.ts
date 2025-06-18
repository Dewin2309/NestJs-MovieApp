import { describe, it, expect, vi } from 'vitest';
import { BaseTestUtils, deepCopy, wait } from '../base-test.utils';

describe('BaseTestUtils', () => {
  describe('createTestModule', () => {
    it('should create a testing module', async () => {
      const module = await BaseTestUtils.createTestModule({
        providers: [
          { 
            provide: 'TEST_SERVICE', 
            useValue: { test: () => 'test' } 
          }
        ]
      });

      expect(module).toBeDefined();
      expect(module.get('TEST_SERVICE')).toBeDefined();
    });
  });

  describe('createMockService', () => {
    it('should create a mock service with provided methods', () => {
      const mockMethod = vi.fn();
      const mockService = BaseTestUtils.createMockService({ testMethod: mockMethod });

      expect(mockService.testMethod).toBe(mockMethod);
    });
  });

  describe('generateTestData', () => {
    it('should generate different types of test data', () => {
      const stringData = BaseTestUtils.generateTestData('string');
      const numberData = BaseTestUtils.generateTestData('number');
      const booleanData = BaseTestUtils.generateTestData('boolean');
      const emailData = BaseTestUtils.generateTestData('email');

      expect(typeof stringData).toBe('string');
      expect(typeof numberData).toBe('number');
      expect(typeof booleanData).toBe('boolean');
      expect(typeof emailData).toBe('string');
      expect(emailData).toMatch(/@/);
    });
  });

  describe('createMockRepository', () => {
    it('should create a mock repository with CRUD methods', () => {
      const mockRepo = BaseTestUtils.createMockRepository();

      const methods = [
        'create', 'save', 'find', 'findOne', 
        'update', 'delete', 'remove'
      ];

      methods.forEach(method => {
        expect(mockRepo[method]).toBeDefined();
        expect(typeof mockRepo[method]).toBe('function');
      });
    });
  });

  describe('deepCopy', () => {
    it('should create a deep copy of an object', () => {
      const original = { 
        name: 'Test', 
        nested: { value: 42 } 
      };
      const copied = deepCopy(original);

      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
      expect(copied.nested).toEqual(original.nested);
      expect(copied.nested).not.toBe(original.nested);
    });
  });

  describe('wait', () => {
    it('should create a delay', async () => {
      const start = Date.now();
      await wait(100);
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(100);
    });
  });
});