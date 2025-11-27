import { render, screen } from '@testing-library/react'

import ProductCard from './ProductCard'

describe('ProductCard Component', () => {
  test('renders title and description', () => {
    render(
      <ProductCard
        image="https://via.placeholder.com/150"
        title="Тур в Турцию"
        description="7 ночей, всё включено"
        buttonText="Купить тур"
      />
    )

    // Проверяем, что title и description отображаются
    expect(screen.getByText('Тур в Турцию')).toBeInTheDocument()
    expect(screen.getByText('7 ночей, всё включено')).toBeInTheDocument()
  })

  test('renders default title and description when props are not provided', () => {
    // Тестируем, когда пропсы не переданы и используются дефолтные значения
    render(
      <ProductCard />
    )

    // Проверяем, что отображаются дефолтные значения для title и description
    expect(screen.getByText('No title')).toBeInTheDocument()
    expect(screen.getByText('No description')).toBeInTheDocument()
  })

  test('renders button when buttonText is provided', () => {
    render(
      <ProductCard
        image="https://via.placeholder.com/150"
        title="Тур в Турцию"
        description="7 ночей, всё включено"
        buttonText="Купить тур"
      />
    )

    // Проверяем, что кнопка с текстом "Купить тур" отображается
    expect(screen.getByRole('button', { name: /Купить тур/i })).toBeInTheDocument()
  })

  test('renders default button text when buttonText is not provided', () => {
    render(
      <ProductCard
        image="https://via.placeholder.com/150"
        title="Тур в Турцию"
        description="7 ночей, всё включено"
      />
    )

    // Проверяем, что кнопка отображает текст по умолчанию "No text"
    expect(screen.getByRole('button', { name: /No text/i })).toBeInTheDocument()
  })

  test('renders default image if image prop is empty or not provided', () => {
    // Тестируем, когда изображение не передано
    render(
      <ProductCard
        title="Тур в Турцию"
        description="7 ночей, всё включено"
        buttonText="Купить тур"
      />
    )
    
    // Проверяем, что изображение отображается с URL по умолчанию
    const imageElement = screen.getByRole('img')

    expect(imageElement).toHaveAttribute('src', 'https://via.placeholder.com/300')

    // Тестируем с пустым значением для изображения
    render(
      <ProductCard
        image=""
        title="Тур в Турцию"
        description="7 ночей, всё включено"
        buttonText="Купить тур"
      />
    )

    // Проверяем, что изображение отображается с URL по умолчанию
    const imageElementEmpty = screen.getByRole('img')

    expect(imageElementEmpty).toHaveAttribute('src', 'https://via.placeholder.com/300')
  })

  test('renders image when image prop is provided', () => {
    // Тестируем, когда изображение передано
    render(
      <ProductCard
        image="https://via.placeholder.com/150"
        title="Тур в Турцию"
        description="7 ночей, всё включено"
        buttonText="Купить тур"
      />
    )

    // Проверяем, что изображение отображается с переданным URL
    const imageElement = screen.getByRole('img')

    expect(imageElement).toHaveAttribute('src', 'https://via.placeholder.com/150')
  })
})
