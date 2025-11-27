import { Gallery, ProductCard } from './index'

describe('ui-library exports', () => {
  test('Gallery should be defined', () => {
    expect(Gallery).toBeDefined()
  })

  test('ProductCard should be defined', () => {
    expect(ProductCard).toBeDefined()
  })
})
