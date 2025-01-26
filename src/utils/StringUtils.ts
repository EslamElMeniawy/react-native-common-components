/**
 * Trims a given string to a specified length, appending '...' if the string exceeds the length.
 *
 * @param string - The string to be trimmed.
 * @param length - The maximum length of the trimmed string, default is 45.
 * @returns The trimmed string, with '...' appended if it was truncated.
 */
export const trimStringToLength = (string: string, length: number = 45) =>
  string.length > length ? string.substring(0, length - 3) + '...' : string;
