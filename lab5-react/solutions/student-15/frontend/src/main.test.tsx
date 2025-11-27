import '@testing-library/jest-dom'

jest.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: () => {}
  })
}))

test('main.tsx imports without crash', async () => {
  const root = document.createElement('div')

  root.id = 'root'
  document.body.appendChild(root)

  await import('../src/main')

  expect(root).toBeTruthy()
})