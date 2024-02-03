
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
const truncateTitle = (title, maxLength = 30) => { return (title.length > maxLength) ? title.substring(0, maxLength) + '...' : title};

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



const createSection = (bgColor, category) => {
  const sectionContent = `<section style="background-color: ${bgColor};">
  <div class="text-center container py-5">
    <h4 class="mt-4 mb-5"><strong>${capitalizeFirstLetter(category)}</strong></h4>


    <div class="row product" id="${category}">
    </div>
    </div>
    </section>`;
    productSection.insertAdjacentHTML('beforeend', sectionContent);
}

const createProduct = (product, category)=>{
  const productElement = `<div class="col-md-4 mb-5">
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
  </div>
  </div>`;
  console.log(category);
  const categoryElement = document.getElementById(category);
  categoryElement.insertAdjacentHTML('beforeend',productElement);
}

const updateProducts = async (category) => {
  const response = await fetch(Category_API + category);
  const data = await response.json();
  data.forEach((product) => {
    createProduct(product, category);
  });
}




const updatePage = () =>{
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
let categories;
const page = async () => {
  categories = await getData(Categories_API);
  updateSection(categories);
  categories.forEach((category) => updateProducts(category.toLowerCase()));
}


page();


