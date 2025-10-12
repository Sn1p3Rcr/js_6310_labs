'use strict';

//Функция для зимнего стиля
function winterThemeStyles() {
    //Создаём элемент <style>
    const style = document.createElement('style');
    style.id = 'winter-styles';

    //Основные стили страницы
    style.textContent = `
    /* Фон основных блоков */
    .page_wrapper, .main_slider_holder, .news_box, header, .footer, .top, .menu {
        background: linear-gradient(180deg, #ffffff 0%, #e7f0ff 100%) !important;
    }

    /* Цвет текста для всех элементов кроме картинок и SVG */
    body *:not(img):not(svg) { color: #0b4da0 !important; }

    /* Цвет текста внутри ссылок и новостных блоков */
    a *, .news_item * { color: #0b4da0 !important; }

    /* SVG иконки */
    svg path { fill: #0b4da0 !important; stroke: #0b4da0 !important; }

    /* Фон футера */
    footer, .footer { background: linear-gradient(90deg, #eaf4ff, #ffffff) !important; }

    /* Ссылки в футере */
    footer a, .footer a, footer * { color: #0b4da0 !important; text-decoration: none !important; }
    footer a:hover, .footer a:hover { color: #0b5acb !important; }

    /* Картинки и видео */
    video, img { filter: brightness(1.05) contrast(1.03) !important; }

    /* Иконки в футере, соцсетях и поиске — делаем синими */
    footer img, header img, .social img, .search img {
        filter: invert(28%) sepia(98%) saturate(7446%) hue-rotate(204deg) brightness(93%) contrast(101%) !important;
    }

    /* SVG в футере и хедере */
    footer svg path, header svg path { fill: #0b4da0 !important; stroke: #0b4da0 !important; }

    /* Ссылки */
    a { color: #054f9d !important; text-decoration: underline !important; }
    a:hover { color: #0b5acb !important; }

    /* Заголовки */
    h1, h2, h3, h4, h5, h6 { color: #063f8b !important; letter-spacing: 0.2px; }

    /* Кнопки */
    button, .btn, input[type="submit"] {
        background: linear-gradient(180deg, #e0f0ff 0%, #a0c4ff 100%) !important;
        border-radius: 6px !important;
        color: #0b4da0 !important;
        border: 1px solid #0b4da0 !important;
    }
    button:hover, .btn:hover, input[type="submit"]:hover {
        background: linear-gradient(180deg, #a0c4ff 0%, #e0f0ff 100%) !important;
    }

    /* Выделенные новости */
    .news_box .news_item.highlight, .news_box .news_item--featured {
        border-left: 4px solid #0b4da0 !important;
        padding-left: 10px !important;
    }
    `;

    // Добавление стиля на страницу
    document.head.appendChild(style);

    //Примеры работы с querySelectorAll, parentElement, children
    const highlightedNews = document.querySelectorAll('.news_box .news_item.highlight');
    highlightedNews.forEach(item => {
        // Изменяем родительский элемент
        item.parentElement.style.padding = '5px';
        // Изменяем первый дочерний элемент
        const children = item.children;
        if(children.length > 0) children[0].style.fontWeight = 'bold';
    });

    //Пример getElementById
    const footer = document.getElementById('footer');
    if (footer) footer.style.borderTop = '2px solid #0b4da0';
}


//Удаление моего стиля
function removeWinterStyles() {
    const style = document.getElementById('winter-styles');
    if (style) style.remove();
}

//Кнопка переключения
function createToggleButton() {
    const button = document.createElement('button');
    button.id = 'winter-toggle-btn';
    button.textContent = 'Включить зимний стиль';
    Object.assign(button.style, {
        position: 'fixed',
        top: '15px',
        right: '15px',
        zIndex: '10000',
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        background: '#0b4da0',
        color: 'white',
        border: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease'
    });

    button.onclick = function() {
        const isEnabled = localStorage.getItem('winterStyle') === 'true';
        if (isEnabled) {
            removeWinterStyles();
            localStorage.setItem('winterStyle', 'false');
            button.textContent = 'Включить зимний стиль';
            button.style.background = '#0b4da0';
        } else {
            winterThemeStyles();
            localStorage.setItem('winterStyle', 'true');
            button.textContent = 'Выключить зимний стиль';
            button.style.background = '#063f8b';
        }
    };

    document.body.appendChild(button);

    //Применяем стиль при перезагрузке
    if (localStorage.getItem('winterStyle') === 'true') {
        winterThemeStyles();
        button.textContent = 'Выключить зимний стиль';
        button.style.background = '#063f8b';
    }
}

function initWinterTheme() {
    createToggleButton();
}

//Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWinterTheme);
} else {
    initWinterTheme();
}





