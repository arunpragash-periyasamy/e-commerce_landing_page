
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
  
  