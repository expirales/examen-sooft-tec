type ClassNamesObject = { [key: string]: boolean };

export function cssClassNames(
    defaultClassName: string | ClassNamesObject,
    otherClassNames?: ClassNamesObject
): string {
    let classNames: string = '';

    if (defaultClassName && typeof defaultClassName === 'string') {
        classNames = defaultClassName;
    }

    if (defaultClassName && typeof defaultClassName === 'object') {
        classNames = `${Object.keys(defaultClassName)
            .filter((className) => defaultClassName[className] === true)
            .join(' ')}`;
    }

    if (otherClassNames && typeof otherClassNames === 'object') {
        classNames = `${classNames} ${Object.keys(otherClassNames)
            .filter((className) => otherClassNames[className] === true)
            .join(' ')}`;
    }

    return classNames.trim();
}
