import React from 'react'

import styles from './Gallery.module.css'

interface Photo {
  src: string
  alt: string
  caption: string
}

interface GalleryProps {
  photos: Photo[]
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  return (
    <div className={styles.gallery}>
      {photos.map((photo, index) => (
        <div key={index} className={styles.photoItem}>
          <img src={photo.src} alt={photo.alt} className={styles.photo} />
          <div className={styles.caption} title={photo.caption}>
            {photo.caption}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gallery
