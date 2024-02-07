try {
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

} catch (e) { }

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

const updateProductGrid = (product, quantity) => {
  const productItems = document.getElementById('productItems');
  const productCard = `<div class="card mb-3">
  <div class="card-body">
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-row align-items-center">
        <div>
          <img
            src="${product.image}"
            class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
        </div>
        <div class="ms-3">
          <h5>${truncateTitle(product.title)}</h5>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center">
        <div style="width: 50px;">
          <h5 class="fw-normal mb-0">${quantity}</h5>
        </div>
        <div style="width: 80px;">
          <h5 class="mb-0">$${(product.price * quantity).toFixed(2)}</h5>
        </div>
        <a href="#" style="color: #cecece;" onclick=deleteItem(${product.id})><i class="fas fa-trash-alt"></i></a>
      </div>
    </div>
  </div>
  </div>`;
  productItems.insertAdjacentHTML('beforeend', productCard);
}



const updateProducts = async (category, id = 0) => {
  const data = await getData(Category_API + category);
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
const User_API = 'https://fakestoreapi.com/carts?userId=1';


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


// commmon variables

const urlParam = new URLSearchParams(window.location.search);


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

const activeNavbar = async (category) => {
  const element = document.getElementById(`${category}`);
  element.classList.add('active');
}

// product page

const productPage = async () => {
  // Get the search parameters from the URL
  const id = urlParam.get('id');
  const data = await getData(Products_API + `/${id}`);
  createProductDetail(data);
  activeNavbar(data.category + '_nav_item');

  let productDetails = await JSON.parse(localStorage.getItem('productDetails'));
  productDetails = (productDetails === null) ? {} : productDetails;
  if (!productDetails.hasOwnProperty(id)) productDetails[id] = data;
  localStorage.setItem('productDetails', JSON.stringify(productDetails));
  handleCart(id);
}

// category page
const categoryPage = async () => {
  const category = urlParam.get('category');
  console.log(Category_API + encodeURIComponent(category));
  const data = await getData(Category_API + encodeURIComponent(category));
  updateProducts(category);
  console.log(category);
  createSection(getBackgroundColor(), category);
  activeNavbar(category + '_nav_item');
}


// cart page


const getCartDetails = async () => {
  const data = JSON.parse(localStorage.getItem('cartItems'));
  return (data === null) ? {} : data;
}

const cartPage = async () => {
  const data = await getCartDetails();
  const itemCount = Object.keys(data).length;
  let total = 0;
  Object.entries(data).forEach(([key, value]) => {
    const product = JSON.parse(localStorage.getItem('productDetails'))[key];
    updateProductGrid(product, value);
    total += product.price * value;
  });
  document.getElementById('total').innerText = `$${total}`;
  document.getElementById('subTotal').innerText = `$${total}`;
  document.getElementById('checkOutPrice').innerText = `$${total}`;
  document.getElementById('noOfItems').innerText = `You have ${itemCount} items in your cart`;
}

const handleCart = async (id) => {
  const quantity = document.getElementById('quantity');
  const cartItems = await getCartDetails();
  const addToCart = document.getElementById('addToCart');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');

  const redirectURL = () => {
    window.location.href = './cart.html';
  }
  const addEventToCartButton = () => {
    addToCart.innerText = 'Go to Cart';
    addToCart.addEventListener('click', redirectURL);
  }
  const removeEventToCartButton = () => {
    addToCart.innerText = 'Add to Cart';
    addToCart.removeEventListener('click', redirectURL);
  }
  if (cartItems !== null && cartItems.hasOwnProperty(id)) {
    quantity.value = cartItems[id];
    addEventToCartButton();
  }
  const updateQuantity = (increment) => () => {
    const value = parseInt(quantity.value) + increment;
    const pattern = /^[1-9]\d*$/;
    quantity.value = pattern.test(value) ? value : 1;
    removeEventToCartButton();
  }
  // handling the product details
  const addToCartHandler = async () => {
    cartItems[id] = quantity.value;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    addEventToCartButton();
  }

  incrementBtn.addEventListener('click', updateQuantity(1));
  decrementBtn.addEventListener('click', updateQuantity(-1));
  quantity.addEventListener('change', updateQuantity(0));
  addToCart.addEventListener('click', addToCartHandler);
}

const deleteItem = (item) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  delete cartItems[item];
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  window.location.reload();
}

const validField = (field) => {
  return field.value !== '';
}

const paymentSuccess = () => {
  const cardHolderName = document.getElementById('cardHolderName');
  const cardNumber = document.getElementById('cardNumber');
  const expiration = document.getElementById('expiration');
  const cvv = document.getElementById('cvv');
  if (validField(cardHolderName) && validField(cardNumber) && validField(expiration) && validField(cvv)) {
    window.location.href = './paymentSuccess.html';
  } else {
    alert('Please fill all the fields');
  }
}



// getter and setter for localStorage


const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}


const setLocalStorage = (key, value) =>{
  let data = getLocalStorage(key);
  if (data === null) {
    data = {[value.email]: value.password}
    console.log(data);
  }else if(data[value.email] !== undefined){
    return false;
  }else{
    data = {...data, [value.email]: value.password}
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}




// sign in and login content

const changeContent = async (page) => {
  const headingContent = document.getElementById("headingContent");
  const accountContent = document.getElementById("accountContent");
  const button = document.getElementById("buttonContent");
  button.innerHTML = "Sign Up";
  accountContent.innerHTML = `  Already have an account? <a
  href="./signIn.html?page=login" style="color: #393f81;">Login here</a>`;
  console.log("Page")
  headingContent.innerHTML = "SignIn into your account";
  const hideContent = document.querySelector("#hideContent");
  hideContent.classList.remove("d-none");
}

const isValidEmail = async (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

const loginFormHandling = async (emailElement, passwordElement) => {
  removeErrors();
  const emailId = emailElement.value;
  const password = passwordElement.value;
  const data = await getLocalStorage('user');
  if(data !== null && data.hasOwnProperty(emailId)){
    if(data[emailId] === password){
      window.location.href = './cart.html?page=login';
    }else{
      const passwordError = document.getElementById('passwordError');
      passwordError.classList.remove('d-none');
    }
  }else{
    const emailError = document.getElementById('emailError');
    emailError.classList.remove('d-none');
  }
}

const removeErrors = () => {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => {
    element.classList.add('d-none');
  });
}

const signinFormHandling = async (email, password, 
confirmPassword) => {
  console.log("Button clicked");
  removeErrors();
  let validForm = true;
  if (! await isValidEmail(email.value)) {
    const emailError = document.getElementById('emailError');
    emailError.classList.remove('d-none');
    validForm = false;
    return;
  }
  if (password.value === '') {
    const passwordError = document.getElementById('passwordError');
    passwordError.classList.remove('d-none');
    validForm = false;
    return;
  }
  if (password.value!== confirmPassword.value) {
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    confirmPasswordError.classList.remove('d-none');
    validForm = false;
    return;
  }
  if (validForm) {
const object = {email: email.value, password: password.value}
    const result = setLocalStorage('user', object);
    if (!result) {
      alert("user already exists");
      return ;
    }
    window.location.href = './signIn.html?page=login';
  }
}

const logInContent = async () => {
}

const signInContent = async () => {
  changeContent();
}

const signInPage = async () => {

  const email = document.getElementById('emailId');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const button = document.getElementById('buttonContent');
  const page = urlParam.get('page');
  if (page === 'signin') {
    signInContent();
    button.addEventListener('click', ()=>signinFormHandling(email, password, confirmPassword));
  } else {
    button.addEventListener('click', ()=>loginFormHandling(email, password));
  }
}