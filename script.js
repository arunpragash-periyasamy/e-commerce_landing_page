
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



// fetch the data from the api
const getData = async () => {
    const API = 'https://fakestoreapi.com/products';
    const response = await fetch(API);
    const data = await response.json();
    return data;
}

const updateProductGrid = async () => {

}


const updatePage = async ()=> {
    const response = await getData();
    console.log(response);
}

updatePage();





const productColumn =`<div class="col-md-4 ">
<div class="card">
  <div class="ccc">
    <p class="text-center"><img src="https://raw.githubusercontent.com/rxhack/productImage/main/1.jpg"
        class="imw"></p>
    <!--                               <div class="overlay">
      <div class="text">View Details</div>
    </div> -->
  </div>
  <div class="card-body">
    <h5 class="text-center">Apple Watch Series 3</h5>
    <p class="text-center">Price: $550.00</p>
    <p class="text-center"><input type="submit" name="Save" value="Buy" class=" cc1"></p>
  </div>
</div>
</div>`;