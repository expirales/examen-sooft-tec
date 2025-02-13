type ClassNamesObject = { [key: string]: boolean }

/**
 * Generates a string of CSS class names based on the provided default and additional class names.
 *
 * @param defaultClassName - A string representing a single default class name or an object where keys are class names and values are booleans indicating whether the class should be included.
 * @param otherClassNames - An optional object where keys are class names and values are booleans indicating whether the class should be included.
 * @returns A string of concatenated class names separated by spaces.
 */
export function cssClassNames(
  defaultClassName: string | ClassNamesObject,
  otherClassNames?: ClassNamesObject
): string {
  let classNames: string = ''

  if (defaultClassName && typeof defaultClassName === 'string') {
    classNames = defaultClassName
  }

  if (defaultClassName && typeof defaultClassName === 'object') {
    classNames = `${Object.keys(defaultClassName)
      .filter((className) => defaultClassName[className] === true)
      .join(' ')}`
  }

  if (otherClassNames && typeof otherClassNames === 'object') {
    classNames = `${classNames} ${Object.keys(otherClassNames)
      .filter((className) => otherClassNames[className] === true)
      .join(' ')}`
  }

  return classNames.trim()
}
