# Практическая работа №2 — CSS, адаптивная вёрстка и SCSS

## Описание
Адаптивный каталог учебных товаров на HTML и SCSS. Данные берутся из `data/catalog.csv`, тема оформления — из `data/theme.json`. Стили организованы через SCSS-переменные, partial-файлы, mixin, функцию и вложенность. Скомпилированный CSS подключается к странице.

## Технологии
- HTML5 (семантическая разметка)
- SCSS (переменные, вложенность, mixin, функция, partial-файлы)
- CSS Grid и Flexbox
- Ванильный JavaScript (фильтрация карточек)

## Использование dataset
- `data/catalog.csv` — источник карточек (18 записей).
- `data/theme.json` — источник цветов, радиуса и отступов (перенесены в SCSS-переменные).
- `assets/product-01.svg`, `product-02.svg`, `product-03.svg` — изображения категорий «Книги», «Курсы», «Инструменты» соответственно; выводятся в карточках через `<img>`.

## Структура проекта
```
├── scss/                исходные SCSS-файлы
│   ├── variables.scss
│   ├── base.scss
│   ├── layout.scss
│   ├── components.scss
│   └── styles.scss
├── css/                 скомпилированный CSS
│   └── styles.css
├── data/                исходный датасет
│   ├── catalog.csv
│   └── theme.json
├── assets/
│   ├── product-01.svg
│   ├── product-02.svg
│   └── product-03.svg
├── js
│   └── app.js
├── index.html
├── README.md
└── .gitignore
```

## Требования
- Node.js и npm (или глобально установленный Dart Sass).

## Установка Sass
```bash
npm install -g sass
```

## Сборка CSS

Разовая сборка:
```bash
sass scss/styles.scss css/styles.css
```

Режим наблюдения:
```bash
sass --watch scss/styles.scss:css/styles.css
```

## Запуск
Откройте `index.html` в браузере. Рекомендуется использовать локальный сервер (например, `npx serve .` или расширение Live Server в VS Code).

## Что реализовано
- Шапка, панель фильтров, область карточек, информационный блок, подвал.
- Минимум 12 карточек (в проекте — 18, все данные из `catalog.csv`).
- Фильтры по категории, максимальной цене и минимальному рейтингу.
- Состояние «ничего не найдено» — пустой блок с сообщением.
- Адаптив: два breakpoint (768px и 480px).
- Сетка карточек через `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`.

## SCSS: ключевые решения

### Переменные vs CSS custom properties
SCSS-переменные (`$accent`, `$space`) существуют только на этапе компиляции и подставляются в CSS как конкретные значения. CSS custom properties (`--accent`) живут в браузере и могут меняться динамически (например, через JS или медиазапрос). В этой работе используются SCSS-переменные, потому что значения фиксированы и берутся из `theme.json`.

### Partial-файлы
`_variables.scss`, `_base.scss`, `_layout.scss`, `_components.scss` — это partial-файлы (начинаются с `_`). Они не компилируются в отдельные CSS, а подключаются в `styles.scss` через `@import`. Это позволяет разделить стили по назначению и не дублировать код.

### Mixin
В `_layout.scss` создан mixin `container($max)` — задаёт ширину, отступы и центрирование. В `_components.scss` — mixin `focus-ring($color)` для единообразного focus-состояния.

### Функция
В `_layout.scss` есть функция `spacing($multiplier)`, которая возвращает `$space * $multiplier`. Это уменьшает повторение при задании отступов.

### Вложенность
Вложенность используется не глубже 3 уровней (например, `.card { &__title { ... } }`).