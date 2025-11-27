import { render, screen } from '@testing-library/react'

import Gallery from './Gallery'

describe('Gallery Component', () => {
  const photos = [
    { src: 'https://via.placeholder.com/150', alt: 'Photo 1', caption: 'Caption 1' },
    { src: 'https://via.placeholder.com/150', alt: 'Photo 2', caption: 'Caption 2' },
    { src: 'https://via.placeholder.com/150', alt: 'Photo 3', caption: 'Caption 3' },
    { src: 'https://via.placeholder.com/150', alt: 'Photo 4', caption: 'Caption 4' },
  ]

  test('renders all photos with captions', () => {
    render(<Gallery photos={photos} />)

    // Проверяем, что все фотографии отображаются
    photos.forEach(photo => {
      expect(screen.getByAltText(photo.alt)).toBeInTheDocument()
      expect(screen.getByText(photo.caption)).toBeInTheDocument()
    })
  })
})
