// Данные из data/catalog.csv (перенесены вручную)
const PRODUCTS = [
  { id: 1,  name: "Учебный товар 1",  category: "Книги",       price: 575,  rating: 4.0 },
  { id: 2,  name: "Учебный товар 2",  category: "Курсы",       price: 660,  rating: 4.2 },
  { id: 3,  name: "Учебный товар 3",  category: "Инструменты", price: 745,  rating: 4.4 },
  { id: 4,  name: "Учебный товар 4",  category: "Книги",       price: 830,  rating: 4.6 },
  { id: 5,  name: "Учебный товар 5",  category: "Курсы",       price: 915,  rating: 4.8 },
  { id: 6,  name: "Учебный товар 6",  category: "Инструменты", price: 1000, rating: 3.8 },
  { id: 7,  name: "Учебный товар 7",  category: "Книги",       price: 1085, rating: 4.0 },
  { id: 8,  name: "Учебный товар 8",  category: "Курсы",       price: 1170, rating: 4.2 },
  { id: 9,  name: "Учебный товар 9",  category: "Инструменты", price: 1255, rating: 4.4 },
  { id: 10, name: "Учебный товар 10", category: "Книги",       price: 1340, rating: 4.6 },
  { id: 11, name: "Учебный товар 11", category: "Курсы",       price: 1425, rating: 4.8 },
  { id: 12, name: "Учебный товар 12", category: "Инструменты", price: 1510, rating: 3.8 },
  { id: 13, name: "Учебный товар 13", category: "Книги",       price: 1595, rating: 4.0 },
  { id: 14, name: "Учебный товар 14", category: "Курсы",       price: 1680, rating: 4.2 },
  { id: 15, name: "Учебный товар 15", category: "Инструменты", price: 1765, rating: 4.4 },
  { id: 16, name: "Учебный товар 16", category: "Книги",       price: 1850, rating: 4.6 },
  { id: 17, name: "Учебный товар 17", category: "Курсы",       price: 1935, rating: 4.8 },
  { id: 18, name: "Учебный товар 18", category: "Инструменты", price: 2020, rating: 3.8 }
];

// Карта изображений из assets/ по категориям
const CATEGORY_IMAGES = {
  "Книги":       "assets/product-01.svg",
  "Курсы":       "assets/product-02.svg",
  "Инструменты": "assets/product-03.svg"
};

const catalogEl = document.getElementById("catalog");
const countEl = document.getElementById("result-count");
const formEl = document.getElementById("filters-form");
const priceInput = document.getElementById("filter-price");
const priceValue = document.getElementById("price-value");
const categorySelect = document.getElementById("filter-category");
const ratingSelect = document.getElementById("filter-rating");
const resetBtn = document.getElementById("reset-filters");

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function renderCards(items) {
  if (items.length === 0) {
    catalogEl.innerHTML = `<div class="catalog__empty">По заданным фильтрам ничего не найдено. Попробуйте изменить условия.</div>`;
    countEl.textContent = "0";
    return;
  }

  catalogEl.innerHTML = items.map(item => {
    const imgSrc = CATEGORY_IMAGES[item.category] || "";
    const imgAlt = `Изображение категории «${item.category}»`;

    return `
      <article class="card" data-id="${item.id}">
        <div class="card__media">
          <img class="card__image" src="${imgSrc}" alt="${imgAlt}" loading="lazy" width="64" height="64">
        </div>
        <div class="card__top">
          <h3 class="card__title">${item.name}</h3>
          <span class="card__badge">${item.category}</span>
        </div>
        <p class="card__meta">ID: ${item.id}</p>
        <div class="card__footer">
          <span class="card__price">${formatPrice(item.price)}</span>
          <span class="card__rating">★ ${item.rating.toFixed(1)}</span>
        </div>
      </article>
    `;
  }).join("");

  countEl.textContent = items.length;
}

function applyFilters() {
  const category = categorySelect.value;
  const maxPrice = Number(priceInput.value);
  const minRating = Number(ratingSelect.value);

  priceValue.textContent = maxPrice;

  const filtered = PRODUCTS.filter(p => {
    const byCategory = !category || p.category === category;
    const byPrice = p.price <= maxPrice;
    const byRating = p.rating >= minRating;
    return byCategory && byPrice && byRating;
  });

  renderCards(filtered);
}

formEl.addEventListener("input", applyFilters);
formEl.addEventListener("change", applyFilters);

resetBtn.addEventListener("click", () => {
  setTimeout(() => {
    priceValue.textContent = priceInput.value;
    applyFilters();
  }, 0);
});

renderCards(PRODUCTS);