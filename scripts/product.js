
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



const productPage = async () => {
    // Get the search parameters from the URL
    const urlParam = new URLSearchParams(window.location.search);
    const id = urlParam.get('id');
    const data = await getData(Products_API + `/${id}`);
    createProductDetail(data);
  
    handleCart(id);
  }
  