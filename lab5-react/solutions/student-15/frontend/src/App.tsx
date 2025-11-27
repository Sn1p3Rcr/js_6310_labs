import './App.css'
import '@my-app/ui-library/style.css'
import { Gallery, ProductCard } from '@my-app/ui-library'

function App() {
  const photos = [
    { src: 'https://avatars.mds.yandex.net/i?id=267e7b3c3fc0b6e912029aae7cdb7844cec1e5b5-12606366-images-thumbs&n=13', 
      alt: 'Photo 1', 
      caption: 'This is a long caption that will be truncated' },
    { src: 'photo2.jpg', alt: 'Photo 2', caption: 'Another photo with a caption' },
    { src: 'photo3.jpg', alt: 'Photo 3', caption: 'Short caption' },
    { src: 'photo4.jpg', alt: 'Photo 4', caption: 'A fourth photo with a long caption that should be truncated' },
    { src: 'photo5.jpg', alt: 'Photo 5', caption: 'Yet another photo with a different caption' },
    { src: 'photo6.jpg', alt: 'Photo 6', caption: 'This is a photo that also has a long caption' },
    { src: 'photo7.jpg', alt: 'Photo 7', caption: 'A seventh photo, just for testing' },
    { src: 'photo8.jpg', alt: 'Photo 8', caption: 'Another test photo to see the grid layout' }
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>UI Library Demo</h1>
        <p>Демонстрация всех возможностей библиотеки компонентов</p>
      </header>

      <main className="app-main">
        {/* Секция Gallery */}
        <section className="section">
          <h2>Gallery Компонент</h2>
          <Gallery photos={photos} />
        </section>

        {/* Секция Product Card */}
        <section className="section">
          <h2>Product Card Компонент</h2>

          <div className="card-container">
            {/* Карточка с изображением слева */}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              title="Тур в Турцию1"
              description="7 ночей, всё включено"
              buttonText="Купить тур"
              layout="left"
            />

            {/* Карточка с изображением снизу */}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              title=""
              description="Важно!"
              buttonText="Забронировать щас"
              layout="bottom"
            />

            {/* Карточка без изображения */}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              title="Париж — город мечты1"
              description="Суперпредложение!"
              buttonText="Забронировать"
              layout="left"
            />

            {/* Карточка без кнопки */}
            <ProductCard
              image="https://i.pinimg.com/originals/82/91/e6/8291e68741f391efddeb8ce4d9968304.jpg"
              title="Париж — город мечты2"
              description="Романтические выходные"
              buttonText="Купить щас"
              layout="left"
            />

            {/* Карточка с пустым описанием */}
            <ProductCard
              image="https://i.pinimg.com/736x/96/f3/6a/96f36a606be35ff637bc897a4e4023aa.jpg"
              title="Горящий тур в Египет"
              description=""
              buttonText="Купить"
              layout="bottom"
            />

            {/* Карточка с изображением слева */}
            <ProductCard
              title="Париж — город мечты3"
              description="7 ночей, всё включено1"
              buttonText="Купить тур"
              layout="left"
            />

            {/* Карточка без title*/}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              description="7 ночей, всё включено2"
              buttonText="Купить тур"
              layout="left"
            />

            {/* Карточка без description */}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              title="Тур в Турцию2"
              buttonText="Купить"
              layout="left"
            />

            {/* Карточка без buttonText */}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              title="Тур в Турцию3"
              description="7 ночей, всё включен3"
              layout="left"
            />

            {/* Карточка без layout */}
            <ProductCard
              image="https://i.pinimg.com/736x/16/ef/f2/16eff2ca8c5030253965dc5315b73402.jpg"
              title="Тур в Турцию4"
              description="7 ночей, всё включено4"
              buttonText="Купить тур"
            />

          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>UI Library v1.0.0 - Демонстрационное приложение</p>
          <p>React + TypeScript + Vite + Jest</p>
        </div>
      </footer>
    </div>
  )
}

export default App
