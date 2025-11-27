import { render, screen } from '@testing-library/react'

import App from './App'

describe('App Component', () => {
  test('Отображаются все фотографии в галерее', () => {
    render(<App />)

    // Проверяем, что все изображения из галереи отображаются
    const galleryImages = screen.getAllByAltText(/Photo/i)  // Ищем все элементы с alt текстом, содержащим "Photo"

    expect(galleryImages).toHaveLength(8)  // Мы ожидаем 8 изображений в галерее
  })

  test('Карточки с изображениями показывают правильное изображение', () => {
    render(<App />)

    // Проверяем, что карточки с изображениями отображаются
    const productCardImages = screen.getAllByRole('img')  // Ищем все элементы с ролью 'img' (изображения)

    expect(productCardImages).toHaveLength(17)  // 9 карточек, включая те, что с изображениями
  })

  test('Карточки без кнопки не показывают кнопку', () => {
    render(<App />)

    // Проверяем, что кнопки нет в карточках без кнопки
    const buttons = screen.queryAllByRole('button')

    expect(buttons).toHaveLength(10)  // Ожидаем 10 карточек с кнопкой (одна карточка без кнопки)
  })

  test('Карточка без изображения имеет корректное отображение', () => {
    render(<App />)

    // Проверяем, что карточка без изображения отображается корректно
    const noImageCard = screen.getByText(/Париж — город мечты3/i)

    expect(noImageCard).toBeInTheDocument()
  })

  test('Карточки с изображениями показывают правильное изображение по src', () => {
    render(<App />)

    // Проверяем, что в карточке отображается правильное изображение
    const image = screen.getByAltText('Тур в Турцию2')  // Проверяем alt, который передается в ProductCard

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg') // Проверяем атрибут src
  })

  test('Карточка без title отображает текст по умолчанию', () => {
    render(<App />)

    // Проверяем, что карточка без title отображает текст по умолчанию
    const cardWithNoTitle = screen.getByText(/No title/i)

    expect(cardWithNoTitle).toBeInTheDocument()
  })

  test('Карточка без description отображает текст по умолчанию', () => {
    render(<App />)

    // Проверяем, что карточка без description отображает текст по умолчанию
    const cardWithNoDescription = screen.getByText(/No description/i)

    expect(cardWithNoDescription).toBeInTheDocument()
  })

  test('Карточка без buttonText отображает кнопку с текстом по умолчанию', () => {
    render(<App />)

    // Проверяем, что карточка без buttonText отображает кнопку с текстом по умолчанию
    const buttonWithNoText = screen.getByRole('button', { name: /No text/i })

    expect(buttonWithNoText).toBeInTheDocument()
  })
})
