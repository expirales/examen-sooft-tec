import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'jest-transform-stub',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Asegura que usa este archivo
    },
  },
}

export default config
