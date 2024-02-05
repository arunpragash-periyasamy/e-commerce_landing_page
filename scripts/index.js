import { getData, getBackgroundColor, updateProducts } from "./common";
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
