import { cssClassNames } from './cssClassNames'

describe('cssClassNames', () => {
  it('should return the default class name when it is a string', () => {
    expect(cssClassNames('default-class')).toBe('default-class')
  })

  it('should return the class names from the defaultClassName object when it is an object', () => {
    const defaultClassNames = { class1: true, class2: false, class3: true }
    expect(cssClassNames(defaultClassNames)).toBe('class1 class3')
  })

  it('should return the combined class names from both defaultClassName and otherClassNames objects', () => {
    const defaultClassNames = { class1: true, class2: false }
    const otherClassNames = { class3: true, class4: false, class5: true }
    expect(cssClassNames(defaultClassNames, otherClassNames)).toBe('class1 class3 class5')
  })

  it('should return the default class name string combined with class names from otherClassNames object', () => {
    const otherClassNames = { class3: true, class4: false, class5: true }
    expect(cssClassNames('default-class', otherClassNames)).toBe('default-class class3 class5')
  })

  it('should return an empty string when no class names are provided', () => {
    expect(cssClassNames('')).toBe('')
    expect(cssClassNames({})).toBe('')
    expect(cssClassNames('', {})).toBe('')
  })

  it('should handle cases where defaultClassName is an empty string and otherClassNames is an object', () => {
    const otherClassNames = { class3: true, class4: false, class5: true }
    expect(cssClassNames('', otherClassNames)).toBe('class3 class5')
  })

  it('should handle cases where defaultClassName is an object and otherClassNames is undefined', () => {
    const defaultClassNames = { class1: true, class2: false, class3: true }
    expect(cssClassNames(defaultClassNames)).toBe('class1 class3')
  })

  it('should handle cases where defaultClassName is a string and otherClassNames is undefined', () => {
    expect(cssClassNames('default-class')).toBe('default-class')
  })
})
