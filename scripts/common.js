
export const getData = async (API) => {
    const response = await fetch(API);
    const data = await response.json();
    console.log(data);
    return data;
}


export const backgroundColors = ['#F5EEE6', '#FFF8E3', '#F3D7CA', '#F9F7C9', '#EAECCC', '#D2E3C8'];


// helper functions
export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const getBackgroundColor = () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
export const updateSection = (categories) => categories.forEach((category) => createSection(getBackgroundColor(), category));
export const truncateTitle = (title, maxLength = 30) => { return (title.length > maxLength) ? title.substring(0, maxLength) + '...' : title };




export const updateProducts = async (category, id = 0) => {
    const data = await getData(Category_API + category);
    data.forEach((product) => {
        (id != product.id) && createProduct(product, category);
    });
}


export const createProduct = (product, category) => {
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

