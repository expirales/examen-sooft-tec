/**
 * Generates a random 6-digit number.
 *
 * @returns {number} A random 6-digit number.
 */
function randomId(): number {
  return Math.floor(100000 + Math.random() * 900000)
}

export { randomId }
