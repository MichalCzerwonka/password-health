import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      isolatedModules: true,
    }],
  },
  setupFiles: [
    './setupJest.ts'
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'babel-jest'
  },
  resolver: 'jest-webpack-resolver',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

export default config;
