const config = {
  // Используем jsdom для симуляции браузера
  testEnvironment: 'jsdom',
  // Настроим ts-jest для трансформации TypeScript файлов
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@my-app/ui-library': '<rootDir>/../ui-library/src', // Здесь указываем путь к ui-library
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Путь для глобальных настроек или моков
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
}

export default config
