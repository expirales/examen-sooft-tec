import { randomId } from './randomId'

describe('randomId', () => {
  it('should return a number', () => {
    const id = randomId()
    expect(typeof id).toBe('number')
  })

  it('should return a 6-digit number', () => {
    const id = randomId()
    expect(id).toBeGreaterThanOrEqual(100000)
    expect(id).toBeLessThanOrEqual(999999)
  })

  it('should return different values on subsequent calls', () => {
    const id1 = randomId()
    const id2 = randomId()
    expect(id1).not.toBe(id2)
  })

  it('should return a number within the expected range', () => {
    for (let i = 0; i < 1000; i++) {
      const id = randomId()
      expect(id).toBeGreaterThanOrEqual(100000)
      expect(id).toBeLessThanOrEqual(999999)
    }
  })
})
