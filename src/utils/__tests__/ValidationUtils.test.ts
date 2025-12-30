import {
  nameRegExp,
  fullNameRegExp,
  emailRegExp,
  phoneRegExp,
  strictPasswordRegExp,
} from '../ValidationUtils';

describe('ValidationUtils', () => {
  describe('nameRegExp', () => {
    it('should match single word names with characters only', () => {
      expect('John'.match(nameRegExp)).toBeTruthy();
      expect('Mary'.match(nameRegExp)).toBeTruthy();
      expect('José'.match(nameRegExp)).toBeTruthy();
      expect('François'.match(nameRegExp)).toBeTruthy();
    });

    it('should match names with unicode characters', () => {
      expect('محمد'.match(nameRegExp)).toBeTruthy();
      expect('김철수'.match(nameRegExp)).toBeTruthy();
      expect('Владимир'.match(nameRegExp)).toBeTruthy();
    });

    it('should not match names with spaces', () => {
      expect('John Doe'.match(nameRegExp)).toBeFalsy();
      expect('Mary Jane'.match(nameRegExp)).toBeFalsy();
    });

    it('should not match names with numbers or special characters', () => {
      expect('John123'.match(nameRegExp)).toBeFalsy();
      expect('Mary-Jane'.match(nameRegExp)).toBeFalsy();
      expect('John@Smith'.match(nameRegExp)).toBeFalsy();
    });

    it('should not match empty strings', () => {
      expect(''.match(nameRegExp)).toBeFalsy();
    });
  });

  describe('fullNameRegExp', () => {
    it('should match full names with at least two parts separated by space', () => {
      expect('John Doe'.match(fullNameRegExp)).toBeTruthy();
      expect('Mary Jane Smith'.match(fullNameRegExp)).toBeTruthy();
      expect('José María García'.match(fullNameRegExp)).toBeTruthy();
    });

    it('should match names with unicode characters', () => {
      expect('محمد أحمد'.match(fullNameRegExp)).toBeTruthy();
      expect('김 철수'.match(fullNameRegExp)).toBeTruthy();
    });

    it('should not match single word names', () => {
      expect('John'.match(fullNameRegExp)).toBeFalsy();
      expect('Mary'.match(fullNameRegExp)).toBeFalsy();
    });

    it('should not match names with numbers or special characters', () => {
      expect('John Doe123'.match(fullNameRegExp)).toBeFalsy();
      expect('Mary-Jane Smith'.match(fullNameRegExp)).toBeFalsy();
    });

    it('should not match empty strings', () => {
      expect(''.match(fullNameRegExp)).toBeFalsy();
    });
  });

  describe('emailRegExp', () => {
    beforeEach(() => {
      // Reset lastIndex for global regex
      emailRegExp.lastIndex = 0;
    });

    it('should match valid email addresses', () => {
      emailRegExp.lastIndex = 0;
      expect('test@example.com'.match(emailRegExp)).toBeTruthy();
      emailRegExp.lastIndex = 0;
      expect('user.name@domain.com'.match(emailRegExp)).toBeTruthy();
      emailRegExp.lastIndex = 0;
      expect('test123@test.co.uk'.match(emailRegExp)).toBeTruthy();
    });

    it('should match emails with hyphens and underscores', () => {
      emailRegExp.lastIndex = 0;
      expect('user_name@example.com'.match(emailRegExp)).toBeTruthy();
      emailRegExp.lastIndex = 0;
      expect('user-name@example.com'.match(emailRegExp)).toBeTruthy();
    });

    it('should not match invalid email formats', () => {
      emailRegExp.lastIndex = 0;
      expect('invalid.email'.match(emailRegExp)).toBeFalsy();
      emailRegExp.lastIndex = 0;
      expect('@example.com'.match(emailRegExp)).toBeFalsy();
      emailRegExp.lastIndex = 0;
      expect('user@'.match(emailRegExp)).toBeFalsy();
    });

    it('should not match emails with spaces', () => {
      emailRegExp.lastIndex = 0;
      expect('user name@example.com'.match(emailRegExp)).toBeFalsy();
    });

    it('should not match empty strings', () => {
      emailRegExp.lastIndex = 0;
      expect(''.match(emailRegExp)).toBeFalsy();
    });
  });

  describe('phoneRegExp', () => {
    beforeEach(() => {
      // Reset lastIndex for global regex
      phoneRegExp.lastIndex = 0;
    });

    it('should match standard US phone numbers', () => {
      phoneRegExp.lastIndex = 0;
      expect('1234567890'.match(phoneRegExp)).toBeTruthy();
      phoneRegExp.lastIndex = 0;
      expect('123-456-7890'.match(phoneRegExp)).toBeTruthy();
      phoneRegExp.lastIndex = 0;
      expect('123.456.7890'.match(phoneRegExp)).toBeTruthy();
    });

    it('should match phone numbers with parentheses', () => {
      phoneRegExp.lastIndex = 0;
      expect('(123) 456-7890'.match(phoneRegExp)).toBeTruthy();
      phoneRegExp.lastIndex = 0;
      expect('(123)456-7890'.match(phoneRegExp)).toBeTruthy();
    });

    it('should match phone numbers with country code', () => {
      phoneRegExp.lastIndex = 0;
      expect('+1 123-456-7890'.match(phoneRegExp)).toBeTruthy();
      phoneRegExp.lastIndex = 0;
      expect('+12 123-456-7890'.match(phoneRegExp)).toBeTruthy();
    });

    it('should not match invalid phone numbers', () => {
      phoneRegExp.lastIndex = 0;
      expect('12345'.match(phoneRegExp)).toBeFalsy();
      phoneRegExp.lastIndex = 0;
      expect('abcdefghij'.match(phoneRegExp)).toBeFalsy();
    });

    it('should not match empty strings', () => {
      phoneRegExp.lastIndex = 0;
      expect(''.match(phoneRegExp)).toBeFalsy();
    });
  });

  describe('strictPasswordRegExp', () => {
    beforeEach(() => {
      // Reset lastIndex for global regex
      strictPasswordRegExp.lastIndex = 0;
    });

    it('should match valid passwords with all requirements', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('Password123!'.match(strictPasswordRegExp)).toBeTruthy();
      strictPasswordRegExp.lastIndex = 0;
      expect('Secure@Pass123'.match(strictPasswordRegExp)).toBeTruthy();
      strictPasswordRegExp.lastIndex = 0;
      expect('MyP@ssw0rd'.match(strictPasswordRegExp)).toBeTruthy();
    });

    it('should not match passwords without uppercase letters', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('password123!'.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match passwords without lowercase letters', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('PASSWORD123!'.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match passwords without numbers', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('Password!'.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match passwords without special characters', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('Password123'.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match passwords shorter than 8 characters', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('Pass1!'.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match passwords longer than 50 characters', () => {
      strictPasswordRegExp.lastIndex = 0;
      const longPassword = 'Password123!' + 'a'.repeat(50);
      expect(longPassword.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match passwords with spaces', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect('Pass word123!'.match(strictPasswordRegExp)).toBeFalsy();
    });

    it('should not match empty strings', () => {
      strictPasswordRegExp.lastIndex = 0;
      expect(''.match(strictPasswordRegExp)).toBeFalsy();
    });
  });
});
