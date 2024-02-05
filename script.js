
// navbar active state change
const navbarMenu = document.querySelector(".navbar-toggler");
const toggleMenu = () => {
  var navbarCollapse = document.querySelector(".navbar-collapse");
  navbarCollapse.style.transition = 'slideToggle 300ms';
  navbarCollapse.style.display = (navbarCollapse.style.display === 'none' || navbarCollapse.style.display === '') ? 'block' : 'none';
}
navbarMenu.addEventListener("click", toggleMenu);

const navItems = document.querySelectorAll('.navbar-nav .nav-item');

const removeActiveClass = () => {
  navItems.forEach((navItem) => {
    navItem.classList.remove('active');
  });
}
navItems.forEach((item) => {
  item.addEventListener('click', function () {
    removeActiveClass();
    item.classList.add('active');
  });
});



// helper functions
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const getBackgroundColor = () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
const updateSection = (categories) => categories.forEach((category) => createSection(getBackgroundColor(), category));
const maxLength = 10;
const truncateTitle = (title, maxLength = 30) => { return (title.length > maxLength) ? title.substring(0, maxLength) + '...' : title };

// dynamically update the page content

const backgroundColors = ['#F5EEE6', '#FFF8E3', '#F3D7CA', '#F9F7C9', '#EAECCC', '#D2E3C8'];

const productSection = document.querySelector("#productSection");

// const productColumn = `<div class="col-md-4 ">
// <div class="card">
//   <div class="ccc">
//     <p class="text-center"><img src="${productImage}"
//         class="imw"></p>
//   </div>
//   <div class="card-body">
//     <h5 class="text-center">${productName}</h5>
//     <p class="text-center">Price: $${productPrice}</p>
//     <p class="text-center"><input type="button" name="Save" value="Buy" class=" cc1"></p>
//   </div>
// </div>
// </div>`;



const createSection = (bgColor, category, categoryName = null) => {
  const sectionContent = `<section style="background-color: ${bgColor};">
  <div class="text-center container py-5">
    <h4 class="mt-4 mb-5"><strong>${(categoryName === null) ? capitalizeFirstLetter(category) : "Similar Products"}</strong></h4>


    <div class="row product" id="${category}">
    </div>
    </div>
    </section>`;
  productSection.insertAdjacentHTML('beforeend', sectionContent);
}

const createProduct = (product, category) => {
  const productElement = `<div class="col-md-4 mb-5"><a href="./product.html?id=${product.id}" style="text-decoration: none;">
  <div class="card">
    <div class="ccc">
      <p class="text-center"><img src="${product.image}"
          class="imw" style="object-fit: contain; width: 100%; height: 200px;"></p>
    </div>
    <div class="card-body">
      <h5 class="text-center product-title">${truncateTitle(product.title)}</h5>
      <p class="text-center">Price: $${product.price}</p>
      <p class="text-center"><input type="button" name="Save" value="Buy" class=" cc1"></p>
    </div>
  </div></a>
  </div>`;
  const categoryElement = document.getElementById(category);
  categoryElement.insertAdjacentHTML('beforeend', productElement);
}


const createProductDetail = (product) => {
  const productContent = `<div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${product.image}" alt="..." /></div>
  <div class="col-md-6">
      <div class="small mb-1">SKU: BST-498</div>
      <h1 class="display-5 fw-bolder">${capitalizeFirstLetter(product.title)}</h1>
      <div class="fs-5 mb-5">
          <span>$${product.price}</span>
      </div>
      <p class="lead">${product.description}</p>
      <div class="d-flex">
      <div class=" d-flex me-3">
      <button class="btn btn-outline-dark flex-shrink-0" id="incrementBtn" type="button">+</button>
          <input class="form-control text-center " id="quantity" type="num" value="1" style="max-width: 3rem" />
          <button class="btn btn-outline-dark flex-shrink-0" id="decrementBtn" type="button">-</button>
          </div>
          <button class="btn btn-outline-dark flex-shrink-0" id="addToCart" type="button">
              <i class="bi-cart-fill me-1"></i>
              Add to cart
          </button>
      </div>
  </div>`;

  createSection(getBackgroundColor(), product.category, "Similar Products");
  updateProducts(product.category, product.id);
  const productDetail = document.getElementById('productDetail');
  productDetail.insertAdjacentHTML('beforeend', productContent);

}


const updateProducts = async (category, id = 0) => {
  const response = await fetch(Category_API + category);
  const data = await response.json();
  data.forEach((product) => {
    (id != product.id) && createProduct(product, category);
  });
}




const updatePage = () => {
  const randomColor = Math.floor(Math.random() * backgroundColors.length);
  const randomCategory = Math.floor(Math.random() * category.length);
  createSection(backgroundColors[randomColor], category[randomCategory]);
  updateProducts(category[randomCategory]);
  productSection.innerHTML += productColumn;
}
// fetching the data from the api


const Products_API = 'https://fakestoreapi.com/products';
const Categories_API = 'https://fakestoreapi.com/products/categories';
const Category_API = 'https://fakestoreapi.com/products/category/';


// const getProducts = async () => {
//   const API = 'https://fakestoreapi.com/products';
//   const response = await fetch(API);
//   const data = await response.json();
//   return data;
// }

// const updateProductGrid = async () => {

// }


// const getCategory = async () => {
//   const API = 'https://fakestoreapi.com/categories';
//   const response = await fetch(API);
//   const data = await response.json();
//   return data;
// }

const getData = async (API) => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

// const updatePage = async () => {
//   const productsData = await getData(Products_API);
//   // const category = response.reduce((categories, object) => { categories.add(object.category); return categories; }, new Set());
//   const categoryData = await getData(Categories_API);

//   console.log(category);
// }


// page wise function

// home page
let categories;
const homePage = async () => {
  categories = await getData(Categories_API);
  // updateSection(categories);

  categories.forEach((category) => {
    createSection(getBackgroundColor(), category);
    updateProducts(category);
  });
}



// product page

const productPage = async () => {
  // Get the search parameters from the URL
  const urlParam = new URLSearchParams(window.location.search);
  const id = urlParam.get('id');
  const data = await getData(Products_API + `/${id}`);
  createProductDetail(data);

  handleCart(id);
}

const handleCart = async (id) => {
  const quantity = document.getElementById('quantity');
  const cartItems = await JSON.parse(localStorage.getItem('cartItems'));
  const addToCart = document.getElementById('addToCart');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');
  const addEventToCartButton = ()=>{
    addToCart.innerText = 'Go to Cart';
    addToCart.addEventListener('click', () => window.location.href = './cart.html');
  }
  if (cartItems.hasOwnProperty(id)) {
    quantity.value = cartItems[id];
    addEventToCartButton();
  }
  const updateQuantity = (increment) => () => {
    const value = parseInt(quantity.value) + increment;
    const pattern = /^[1-9]\d*$/;
    quantity.value = pattern.test(value) ? value : 1;
  }

  const addToCartHandler = async () => {
    let cart = JSON.parse(localStorage.getItem('cartItems'));
    cart[id] = quantity.value;
    localStorage.setItem('cartItems', JSON.stringify(cart));
    addEventToCartButton();
  }

  incrementBtn.addEventListener('click', updateQuantity(1));
  decrementBtn.addEventListener('click', updateQuantity(-1));
  quantity.addEventListener('change', updateQuantity(0));
  addToCart.addEventListener('click', addToCartHandler);
}
