/**
 * @deprecated This regex is meant for reference only and you should use you own regex for your own customization.
 * * **Validation Rules:**
 * - Containing characters only.
 */
export const nameRegExp = /^[{\p{L}}]+$/u;

/**
 * @deprecated This regex is meant for reference only and you should use you own regex for your own customization.
 * * **Validation Rules:**
 * - Matches case insensitive first name, optional unlimited number of middle names and last name separated with space format.
 */
export const fullNameRegExp = /^[{\p{L}}]+(?: [{\p{L}}]+)+$/u;

/**
 * @deprecated This regex is meant for reference only and you should use you own regex for your own customization.
 * * **Validation Rules:**
 * - Matches most common email formats.
 */
export const emailRegExp =
  /^\w+([.-]?\w+)*@[a-zA-Z_]+?(.[a-zA-Z]{2,3}|.[a-zA-Z]{2,3}.[a-zA-Z]{2,3})$/g;

/**
 * @deprecated This regex is meant for reference only and you should use you own regex for your own customization.
 * * **Validation Rules:**
 * - Matches various formats including optional country code, area code with or without parentheses, and different separators like spaces, dots, or hyphens.
 */
export const phoneRegExp =
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;

/**
 * @deprecated This regex is meant for reference only and you should use you own regex for your own customization.
 * * **Validation Rules:**
 * - Minimum 8 characters.
 * - Maximum 50 characters.
 * - No spaces allowed.
 * - Contains at least 1 uppercase letter.
 * - Contains at least 1 lowercase letter.
 * - Contains at least 1 number (0-9).
 * - Contains at least 1 non-alpha numeric number.
 */
export const strictPasswordRegExp =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/g;
