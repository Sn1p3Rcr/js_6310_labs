import React from 'react'

import styles from './ProductCard.module.css'

export interface ProductCardProps {
  title?: string
  description?: string
  image?: string
  buttonText?: string
  layout?: 'left' | 'bottom'
}

const ProductCard: React.FC<ProductCardProps> = ({
  title = "No title",
  description = "No description",
  image = "https://via.placeholder.com/300",
  buttonText = "No text",
  layout = 'left'
}) => {
  return (
    <div className={`${styles['product-card']} ${styles[`product-card--${layout}`]}`}>
      
      {image && image !== "" && (
        <div className={styles['product-card__image-wrapper']}>
          <img src={image} alt={title} className={styles['product-card__image']} />
        </div>
      )}

      <div className={styles['product-card__content']}>
        <h3 className={styles['product-card__title']}>{title}</h3>
        <p className={styles['product-card__description']}>{description}</p>

        {buttonText && (
          <button className={styles['product-card__button']}>{buttonText}</button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
