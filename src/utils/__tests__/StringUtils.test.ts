import { trimStringToLength } from '../StringUtils';

describe('StringUtils', () => {
  describe('trimStringToLength', () => {
    it('should return the same string if length is less than or equal to the specified length', () => {
      expect(trimStringToLength('Hello', 10)).toBe('Hello');
      expect(trimStringToLength('Hello World', 11)).toBe('Hello World');
      expect(trimStringToLength('Test', 4)).toBe('Test');
    });

    it('should trim the string and append "..." if length exceeds the specified length', () => {
      expect(trimStringToLength('Hello World', 8)).toBe('Hello...');
      expect(trimStringToLength('This is a very long string', 10)).toBe(
        'This is...'
      );
      expect(trimStringToLength('123456789', 6)).toBe('123...');
    });

    it('should use default length of 45 when length parameter is not provided', () => {
      const longString = 'A'.repeat(50);
      const result = trimStringToLength(longString);

      expect(result).toBe('A'.repeat(42) + '...');
      expect(result.length).toBe(45);
    });

    it('should handle strings exactly at the default length', () => {
      const exactString = 'A'.repeat(45);
      expect(trimStringToLength(exactString)).toBe(exactString);
    });

    it('should handle empty strings', () => {
      expect(trimStringToLength('', 10)).toBe('');
      expect(trimStringToLength('')).toBe('');
    });

    it('should handle strings with special characters', () => {
      expect(trimStringToLength('Hello @#$% World!', 10)).toBe('Hello @...');
      expect(trimStringToLength('Test 🚀 emoji', 8)).toBe('Test ...');
    });

    it('should handle very short length limits', () => {
      expect(trimStringToLength('Hello', 3)).toBe('...');
      expect(trimStringToLength('Hi', 3)).toBe('Hi');
    });

    it('should handle unicode characters', () => {
      // Unicode characters may count differently, so test the actual behavior
      const result1 = trimStringToLength('Hello 世界', 8);
      const result2 = trimStringToLength('مرحبا بك', 6);

      // Verify results are strings and have reasonable lengths
      expect(typeof result1).toBe('string');
      expect(typeof result2).toBe('string');
      expect(result1.length).toBeLessThanOrEqual(8);
      expect(result2.length).toBeLessThanOrEqual(6);
    });
  });
});
